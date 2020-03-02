import { RUNTIME_ERR_LABEL, API_ERR_LABEL } from '../utils/logglyConstants';
import { logToLoggly } from '../utils/loggly';
import { getLogglyKey } from '../config/selectors';
import { fetch } from '../fetchMiddleware';
import externalLinks from '../externalLinks';
import { setItem, getItem } from '../storageMiddleware';
import { setLocale } from '../locale/actions';
import { getLanguage } from '../member/selectors';
import { getEndPointUrl as ep, getAppPlatform } from '../app/selectors';
import {
  restoreLogin,
  restoreGuestWatchVideoCount,
  restoreLastLoginEmail,
  restoreWaitingOnLoginCode,
} from '../signup/actions';
import { restoreCookiesStatus } from '../member/actions';
import { loadResumePoints } from '../video/actions';
import { ReferralType } from './utm';
export const NAVIGATION_CHANGE = 'NAVIGATION_CHANGE';
export const NAVIGATION_LOADED = 'NAVIGATION_LOADED';
export const UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION';
export const PWA_ADDED_TO_HOMESCREEN = 'PWA_ADDED_TO_HOMESCREEN';
export const SAVE_REFERRER_INFO = 'SAVE_REFERRER_INFO';
export const APP_LOADED = 'APP_LOADED';
export const APP_UNLOADED = 'APP_UNLOADED';
export const APP_BLUR = 'APP_BLUR';
export const APP_FOCUS = 'APP_FOCUS';
export const CONTENT_PAGE_LOADED = 'CONTENT_PAGE_LOADED';
export const PLAYER_PROFILE_PAGE_LOADED = 'PLAYER_PROFILE_PAGE_LOADED';

const logglyUtil = (error, dispatch) => {
  dispatch(
    logglyRuntimeError({
      message: error.message,
    })
  );
};

export const bootstrapRedux = defaultLocale => async (dispatch, getState) => {
  try {
    await dispatch(restoreGuestWatchVideoCount());
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    await dispatch(restoreCookiesStatus());
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    await dispatch(restoreLastLoginEmail());
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    await dispatch(restoreWaitingOnLoginCode());
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    await dispatch(restoreLogin());
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    const memberLanguage = getLanguage(getState(), defaultLocale ? false : true);
    await dispatch(setLocale((memberLanguage || defaultLocale).toLowerCase()));
  } catch (e) {
    logglyUtil(e, dispatch);
  }

  try {
    await dispatch(loadResumePoints());
  } catch (e) {
    logglyUtil(e, dispatch);
  }
};

export const APP_BOOTSTRAP_COMPLETE = 'APP_BOOTSTRAP_COMPLETE';

export const appBootstrapComplete = () => dispatch => {
  dispatch({ type: APP_BOOTSTRAP_COMPLETE });
};

export const registerDeviceForPush = deviceId => (dispatch, getState) => {
  const state = getState();
  try {
    dispatch(
      fetch(ep(state)('notificationDeviceRegister'), {
        method: 'post',
        data: { deviceId },
      })
    );
  } catch (e) {
    logglyUtil(e, dispatch);
    console.error(e);
  }
};

export const saveReferrerInfo = (parsedQueryString, starRouteId) => async dispatch => {
  const {
    utm_campaign: campaign,
    utm_content: content,
    utm_source: source,
    utm_medium: medium,
  } = parsedQueryString;

  const starReferrerId = content && campaign === ReferralType.PLAYER ? content : starRouteId;
  const memberReferrerId = content && campaign === ReferralType.MEMBER ? content : null;

  if (starReferrerId) {
    await dispatch(setItem('starReferrerId', starReferrerId));
  } else if (memberReferrerId) {
    await dispatch(setItem('memberReferrerId', memberReferrerId));
  }

  if (campaign) {
    await dispatch(setItem('referrerCampaign', campaign));
  }

  if (source) {
    await dispatch(setItem('referrerSource', source));
  }

  if (medium) {
    await dispatch(setItem('referrerMedium', medium));
  }

  dispatch({
    type: SAVE_REFERRER_INFO,
    starReferrerId: await dispatch(getItem('starReferrerId')),
    memberReferrerId: await dispatch(getItem('memberReferrerId')),
    referrerSource: await dispatch(getItem('referrerSource')),
    referrerMedium: await dispatch(getItem('referrerMedium')),
    referrerCampaign: await dispatch(getItem('referrerCampaign')),
  });
};

export const saveScrollPosition = (identifier, scrollOffset) => async dispatch => {
  dispatch({ type: UPDATE_SCROLL_POSITION, identifier, scrollOffset });
};

export const dispatchAppLoaded = () => dispatch => dispatch({ type: APP_LOADED, externalLinks });

export const dispatchAppUnloaded = () => dispatch => dispatch({ type: APP_UNLOADED });

export const dispatchAppBlur = () => dispatch => dispatch({ type: APP_BLUR });

export const dispatchAppFocus = () => dispatch => dispatch({ type: APP_FOCUS });

export const dispatchContentPageLoaded = contentId => dispatch => {
  return dispatch({ type: CONTENT_PAGE_LOADED, contentId });
};

export const dispatchPlayerProfilePageLoaded = starId => dispatch => {
  return dispatch({ type: PLAYER_PROFILE_PAGE_LOADED, starId });
};

export const UPDATE_PLATFORM_TYPE = 'UPDATE_PLATFORM_TYPE';

export const updatePlatformType = platformType => dispatch => {
  dispatch({
    type: UPDATE_PLATFORM_TYPE,
    platformType: platformType,
  });
};

export const VIEWPORT_RESIZED = 'VIEWPORT_RESIZED';
export const viewportResized = details => dispatch => {
  dispatch({
    type: VIEWPORT_RESIZED,
    details,
  });
};

export const WINDOW_SCROLLED = 'WINDOW_SCROLLED';
export const windowScrolled = () => dispatch => dispatch({ type: WINDOW_SCROLLED });

const LOG_TO_LOGGLY_REQUEST = 'LOG_TO_LOGGLY_REQUEST';

export const loggly = ({
  message = '',
  status = '',
  url = '',
  type = [API_ERR_LABEL],
  platformOverride,
}) => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: LOG_TO_LOGGLY_REQUEST });
  logToLoggly({
    logglyKey: getLogglyKey(state),
    message,
    status,
    devicePlatform: platformOverride ? platformOverride : getAppPlatform(state) || 'bootstrap',
    url,
    type,
    state,
  });
};

export const logglyRuntimeError = ({ type = [], ...props }) => dispatch => {
  dispatch(
    loggly({
      ...props,
      type: [RUNTIME_ERR_LABEL, ...type],
    })
  );
};
