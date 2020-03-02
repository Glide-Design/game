import axios from 'axios';
import { get, merge, noop } from 'lodash/fp';
import { loggly } from 'xi-core/app/actions';
import { getEndPointUrl as ep } from './app/selectors';
import { getConsoleLogFetch } from './config/selectors';
import { getLanguage } from './locale/selectors';
import { getItem } from './storageMiddleware';
import { getToken, getTemporaryToken } from './member/selectors';
import { persistTokens, logoutMember, REFRESH_TOKEN_SUCCESS } from './member/actions';
import { decodeAccessToken } from './signup/jwtValidator';
import appendQueryParameter from './utils/appendQueryParameter';
import { RetryNumber, DefaultAPIRetryDelay } from './utils/sleep';
import { shouldUseLoggly } from './utils/request';

const log = process.env.NODE_ENV === 'development' ? console.log : noop;

const FETCH = 'middleware/FETCH';

export default ({ onError, devicePlatform = 'web' } = {}) => ({ dispatch, getState }) => {
  const setAuthHeader = (headers = {}, temporaryTokenFallback = false) => {
    const accessToken = getToken(getState());
    const temporaryToken = temporaryTokenFallback ? getTemporaryToken(getState()) : null;
    if (accessToken || temporaryToken) {
      headers['Authorization'] = `Bearer ${accessToken || temporaryToken}`;
    }
    return headers;
  };

  const isTokenInvalid = error =>
    get('response.status', error) === 401 && get('response.data.error', error) === 'invalid_token';

  const isSignInCodeInvalid = error =>
    get('response.status', error) === 400 && get('response.data', error) === 'Invalid short code';

  const hasTokenExpired = () => {
    const token = getToken(getState());
    return token && decodeAccessToken(token).exp < Math.round(Date.now() / 1000);
  };

  let refreshTokenQueue = Promise.resolve();

  async function refreshTokenAction() {
    const endPoint = ep(getState())('memberTokenRefresh');
    const currentRefreshToken = await dispatch(getItem('refreshToken'));
    try {
      const {
        data: { access_token: accessToken, refresh_token: refreshToken },
      } = await axios(`${endPoint}?refresh_token=${currentRefreshToken}`);
      await dispatch(persistTokens(accessToken, refreshToken));
      await dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        accessToken,
        refreshToken,
      });
      return true;
    } catch (error) {
      await dispatch(logoutMember({ hasExplicitlyLoggedOut: false }));
      return false;
    }
  }

  function invalidTokenAction() {
    refreshTokenQueue = refreshTokenQueue.then(() => refreshTokenAction());
    return refreshTokenQueue;
  }

  function refreshTokenIfNeeded(action, headers) {
    refreshTokenQueue = refreshTokenQueue.then(
      async () => {
        const customAccessTokenSet = get('params.headers.Authorization', action);
        if (hasTokenExpired() && !customAccessTokenSet) {
          await refreshTokenAction();
          setAuthHeader(headers);
        }
      },
      msg => {
        console.warn(msg);
      }
    );
    return refreshTokenQueue;
  }

  return next => async action => {
    if (!action) {
      return;
    }

    if (action && action.type !== FETCH) {
      return next(action);
    }

    const state = getState();
    const language = getLanguage(state).toLowerCase();

    const endPoint = action.url;

    const uri = appendQueryParameter(endPoint, [`language=${language}`]);

    const consoleLogging = getConsoleLogFetch(state);
    if (consoleLogging) {
      log('fetching', `${uri}`, action.params);
    }

    const getParams = () => {
      const defaultParams = {
        method: 'get',
        headers: {
          ...setAuthHeader({}, get('params.temporaryTokenFallback', action)),
        },
      };
      return merge(defaultParams, action.params);
    };

    return refreshTokenIfNeeded(action, getParams().headers)
      .then(() => axios(uri, getParams()))
      .catch(async error => {
        const request = error.config;

        if (isTokenInvalid(error)) {
          const refreshed = await invalidTokenAction();
          if (refreshed === true) {
            setAuthHeader(request.headers);
            return axios(request);
          }
        } else if (isSignInCodeInvalid(error)) {
        } else {
          throw error;
        }
      })
      .catch(async error => {
        const status = get('response.status', error);
        const body = get('response.data', error);
        const message = error.message;
        const messageId = Math.round(Math.random() * 100000);
        const params = getParams();
        const logMessage = `API failure: id: ${messageId} ${uri} (error ${status}, ${message}) params: ${JSON.stringify(
          params
        )}, body: ${JSON.stringify(body)}`;

        dispatch(
          loggly({
            url: action.url,
            message: logMessage,
            status,
            devicePlatform,
          })
        );

        console.warn(logMessage);
        if (onError) {
          dispatch(onError(logMessage));
        }

        //Retry API call code, limiting the number of requests and setting a delay between multiple requests
        if (
          !!action.params.retry &&
          action.params.retry.active &&
          action.params.retry.count < RetryNumber
        ) {
          await retry(action, dispatch)();
        } else {
          throw error;
        }
      })
      .then(response => (consoleLogging && log(action.url, response)) || response);
  };
};

export const retry = (action, dispatch) => async () =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await dispatch(
          fetch(action.url, {
            ...action.params,
            retry: {
              active: action.params.retry.active,
              count: action.params.retry.count + 1,
            },
          })
        );
        resolve();
      } catch (e) {
        reject(e);
      }
    }, DefaultAPIRetryDelay);
  });

export const fetch = (url, params = {}) => {
  return {
    type: FETCH,
    url,
    params: {
      ...params,
      retry: {
        active: !!params.retry && !!params.retry.active ? params.retry.active : false,
        count: !!params.retry && !!params.retry.count ? params.retry.count : 1,
      },
    },
  };
};
