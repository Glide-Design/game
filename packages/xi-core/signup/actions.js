// import { matchPath } from 'react-router';
// import { routes } from '../../App';
import { get } from 'lodash/fp';
import { SubmissionError } from 'redux-form';
import { isAuthenticated, isAuthenticatedAndNewMember } from 'xi-core/member/selectors';
import { validationMessages } from '../locale/signup';
import { getEndPointUrl as ep } from '../app/selectors';
import { setItem, getItem, removeItem, multiSet } from '../storageMiddleware';
import { fetch } from '../fetchMiddleware';
import {
  createMemberProfile,
  fetchMemberProfile,
  persistTokens,
  fetchMemberContentInfo,
  logoutMember,
} from '../member/actions';
import { getStarReferrerId } from '../member/selectors';
import { decodeAccessToken, mapConfirmationEmailDecodedPropsFromJWT } from './jwtValidator';
import { isOpen } from './selectors';
import { authenticationSteps } from './constants';

export const AUTH_WITH_FACEBOOK_REQUEST = 'auth/AUTH_WITH_FACEBOOK_REQUEST';
export const LOGIN_WITH_FACEBOOK_SUCCESS = 'auth/LOGIN_WITH_FACEBOOK_SUCCESS';
export const AUTH_WITH_FACEBOOK_FAILURE = 'auth/AUTH_WITH_FACEBOOK_FAILURE';
export const NEW_FACEBOOK_USER_SUCCESS = 'signup/NEW_FACEBOOK_USER_SUCCESS';
export const LOGIN_WITH_FACEBOOK_CANCEL = 'auth/LOGIN_WITH_FACEBOOK_CANCEL';

export const AUTHENTICATE_USER_REQUEST = 'auth/AUTHENTICATE_USER_REQUEST';
export const AUTHENTICATE_USER_SUCCESS = 'auth/AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'auth/AUTHENTICATE_USER_FAILURE';
export const AUTHENTICATE_USER_FINISH = 'auth/AUTHENTICATE_USER_FINISH';
export const RESTORE_LOGIN_REQUEST = 'auth/RESTORE_LOGIN_REQUEST';
export const RESTORE_LOGIN_SUCCESS = 'auth/RESTORE_LOGIN_SUCCESS';
export const RESTORE_LOGIN_FAILURE = 'auth/RESTORE_LOGIN_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'auth/CLEAR_LOGIN_ERRORS';
export const RESTORE_LAST_LOGIN_EMAIL = 'RESTORE_LAST_LOGIN_EMAIL';
export const RESTORE_WAITING_LOGIN_CODE = 'RESTORE_WAITING_LOGIN_CODE';
export const AUTH_ACTION = 'AUTH_ACTION';

export const SIGNIN_CODE_LENGTH = 6;

export const clearLoginErrors = () => ({ type: CLEAR_LOGIN_ERRORS });

export const restoreLastLoginEmail = () => async dispatch => {
  const lastLoginEmail = await dispatch(getItem('lastLoginEmail'));
  if (lastLoginEmail) {
    dispatch({ type: RESTORE_LAST_LOGIN_EMAIL, email: lastLoginEmail });
  }
};

export const restoreWaitingOnLoginCode = () => async dispatch => {
  const waitingOnLoginCode = await dispatch(getItem('waitingOnLoginCode'));
  if (waitingOnLoginCode) {
    dispatch({ type: RESTORE_WAITING_LOGIN_CODE });
  }
};

export const restoreLogin = () => async dispatch => {
  dispatch({ type: RESTORE_LOGIN_REQUEST });
  const [accessToken, refreshToken, hasExplicitlyLoggedOutAsString] = await Promise.all([
    dispatch(getItem('accessToken')),
    dispatch(getItem('refreshToken')),
    dispatch(getItem('hasExplicitlyLoggedOut')),
  ]);

  const hasExplicitlyLoggedOut = Boolean(hasExplicitlyLoggedOutAsString);

  try {
    if (accessToken != null) {
      await dispatch(authenticateUser(accessToken, refreshToken));
      dispatch({ type: RESTORE_LOGIN_SUCCESS, hasExplicitlyLoggedOut });
    } else {
      dispatch({ type: RESTORE_LOGIN_FAILURE, hasExplicitlyLoggedOut });
    }
  } catch (err) {
    dispatch({ type: RESTORE_LOGIN_FAILURE, hasExplicitlyLoggedOut });
    dispatch(logoutMember({ hasExplicitlyLoggedOut: false }));
  }
};

export const NEW_USER = 'NEW_USER';
export const authenticateWithFacebook = (socialAccessToken, shouldFailForNewUser = false) => async (
  dispatch,
  getState
) => {
  dispatch({ type: AUTH_WITH_FACEBOOK_REQUEST });

  const state = getState();

  const temporaryExternalId = get('user.temporaryRegistrationId', state);

  try {
    let {
      accessToken,
      refreshToken,
      isNew,
      id,
      facebookUserId,
      email,
      forename,
      surname,
      gender,
      birthday,
      error,
      errorBody,
    } = await exchangeFacebookAccessTokenForUserCredentials(
      dispatch,
      state,
      socialAccessToken,
      temporaryExternalId
    );

    if (error) {
      return dispatch({ type: AUTH_WITH_FACEBOOK_FAILURE, error: true, errorBody });
    }

    function hasGrantedFacebookPermissionsButNotCompletedSignUp() {
      return isNew && shouldFailForNewUser;
    }

    if (hasGrantedFacebookPermissionsButNotCompletedSignUp()) {
      return dispatch({ type: AUTH_WITH_FACEBOOK_FAILURE });
    }

    let newUserProperties;

    if (isNew) {
      await dispatch(
        setCollectedDetails({
          temporaryRegistrationToken: accessToken,
          email,
          birthday,
          forename,
          surname,
        })
      );
      dispatch({ type: NEW_FACEBOOK_USER_SUCCESS });
      return NEW_USER;
    }

    const authenticateUserAndSetUserPropertiesInState = authenticateUser;

    //Third argument (isFacebookLogin) is sent as true so that
    //loading does not stop unless all of the promises are resolved
    await dispatch(authenticateUserAndSetUserPropertiesInState(accessToken, refreshToken, true));

    await Promise.all([
      dispatch(persistTokens(accessToken, refreshToken)),
      dispatch(setItem('hasExplicitlyLoggedOut', '')),
      dispatch(removeItem('lastLoginEmail')),
    ]);

    dispatch({
      type: LOGIN_WITH_FACEBOOK_SUCCESS,
      provider: 'FACEBOOK',
      socialAccessToken,
      accessToken,
      refreshToken,
      isNew,
      id,
      facebookUserId,
      gender,
      email,
      ...newUserProperties,
    });
  } catch (error) {
    dispatch({ type: AUTH_WITH_FACEBOOK_FAILURE, error });
    throw error;
  }
};

export const cancelFacebookLogin = () => dispatch => {
  dispatch({ type: LOGIN_WITH_FACEBOOK_CANCEL });
};

async function exchangeFacebookAccessTokenForUserCredentials(
  dispatch,
  state,
  facebookAccessToken,
  temporaryExternalId
) {
  try {
    const { data } = await dispatch(
      fetch(ep(state)('memberAuth'), {
        method: 'post',
        data: {
          regType: 'FACEBOOK',
          accessToken: facebookAccessToken,
          externalId: temporaryExternalId,
        },
      })
    );

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      externalId: id,
      isNew = false,
      memberData,
    } = data;

    // I don't think we need to hack this anymore as Id is no longer used further on in the flow
    const hackedId = id || decodeAccessToken(accessToken).sub;

    const {
      id: facebookUserId,
      email,
      first_name: forename,
      last_name: surname,
      name: nickname,
      gender,
      birthday,
    } = memberData;

    return {
      accessToken,
      refreshToken,
      isNew,
      id: hackedId,
      facebookUserId,
      email,
      forename,
      surname,
      nickname,
      gender,
      birthday,
    };
  } catch (e) {
    return {
      error: true,
      errorBody: e,
    };
  }
}

export const SET_COLLECTED_DETAILS = 'SET_COLLECTED_DETAILS';
export const setCollectedDetails = ({
  temporaryRegistrationToken,
  temporaryRegistrationId,
  email,
  marketingEmailConsent,
  allowPartnerConsent,
  birthday,
  forename,
  surname,
  nickname,
}) => dispatch => {
  dispatch({
    type: SET_COLLECTED_DETAILS,
    details: {
      temporaryRegistrationToken,
      temporaryRegistrationId,
      email,
      marketingEmailConsent: marketingEmailConsent || false,
      allowPartnerConsent: allowPartnerConsent || false,
      birthday,
      forename,
      surname,
      nickname,
    },
  });
};

export const authenticateUser = (
  accessToken,
  refreshToken,
  isFacebookLogin = false
) => async dispatch => {
  dispatch({ type: AUTHENTICATE_USER_REQUEST });

  if (!accessToken) {
    return dispatch({ type: AUTHENTICATE_USER_FAILURE });
  }

  const { sub: id } = validateAccessToken(accessToken);

  dispatch({
    type: AUTHENTICATE_USER_SUCCESS,
    user: {
      accessToken,
      refreshToken,
      id,
    },
    isFacebookLogin: isFacebookLogin,
  });

  await dispatch(fetchMemberProfile());
  dispatch(fetchMemberContentInfo(id));
  await dispatch(updateGuestFreeVideoWatchCount(true));

  dispatch({ type: AUTHENTICATE_USER_FINISH });
};

function validateAccessToken(accessToken) {
  return decodeAccessToken(accessToken);
}

export const SEND_REGISTRATION_EMAIL_REQUEST = 'signup/SEND_REGISTRATION_EMAIL_REQUEST';
export const SEND_REGISTRATION_EMAIL_SUCCESS = 'signup/SEND_REGISTRATION_EMAIL_SUCCESS';
export const SEND_REGISTRATION_EMAIL_FAILURE = 'signup/SEND_REGISTRATION_EMAIL_FAILURE';

export const sendRegistrationEmail = (returnUrl = '/', resend = false) => async (
  dispatch,
  getState
) => {
  const state = getState();

  if (!get('user.isRegisteringWithEmail', state)) {
    const {
      birthday,
      email,
      marketingEmailConsent = false,
      allowPartnerConsent = false,
      temporaryRegistrationId: externalId,
    } = state.user;

    const { platform } = state.app;

    const data = {
      birthday,
      email,
      marketingEmailConsent,
      allowPartnerConsent,
      externalId,
      platformUsed: platform,
    };

    const referrerId = getStarReferrerId(state) || '';

    dispatch({ type: SEND_REGISTRATION_EMAIL_REQUEST, data });

    try {
      const endPoint = ep(state)('memberOutbound');
      const { data: response } = await dispatch(
        fetch(
          `${endPoint}?shortcode=true&referrerId=${referrerId}&returnUrl=${encodeURIComponent(
            encodeURIComponent(returnUrl)
          )}`, // Double encode incase returnUrl has queryString
          {
            method: 'post',
            data,
          }
        )
      );

      dispatch(setItem('lastLoginEmail', email));
      dispatch({ type: SEND_REGISTRATION_EMAIL_SUCCESS, response, resend });
    } catch (e) {
      console.error(e);
      dispatch({ type: SEND_REGISTRATION_EMAIL_FAILURE, data });
    }
  }
};

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const registerUser = ({ registeringWithEmail = true } = {}) => async (
  dispatch,
  getState
) => {
  if (!get('user.isRegisteringWithEmail', getState())) {
    const state = getState();
    const user = state.user;

    const data = {
      forename: user.forename,
      surname: user.surname,
      nickname: user.nickname,
      birthday: user.birthday,
      email: user.email,
      marketingEmailConsent: user.marketingEmailConsent,
      allowPartnerConsent: user.allowPartnerConsent,
    };

    dispatch({ type: REGISTRATION_REQUEST, data, registeringWithEmail });

    try {
      const { data: response } = await dispatch(
        createMemberProfile(user.temporaryRegistrationToken || user.accessToken, data)
      );

      const { access_token: accessToken, refresh_token: refreshToken, externalId: id } = response;

      await Promise.all([
        dispatch(persistTokens(accessToken, refreshToken)),
        dispatch(setItem('hasExplicitlyLoggedOut', '')),
        dispatch(setItem('lastLoginEmail', user.email)),
      ]);

      await dispatch({
        type: REGISTRATION_SUCCESS,
        accessToken,
        refreshToken,
        id,
      });

      await dispatch(fetchMemberProfile());
    } catch (e) {
      console.error(e);
      dispatch({ type: REGISTRATION_FAILURE, data });
    }
  }
};

export const SEND_LOGIN_EMAIL_REQUESTED = 'SEND_LOGIN_EMAIL_REQUESTED';
export const SEND_LOGIN_EMAIL_SUCCESS = 'SEND_LOGIN_EMAIL_SUCCESS';
export const SEND_LOGIN_EMAIL_FAILURE = 'SEND_LOGIN_EMAIL_FAILURE';

export const sendLoginEmail = (returnUrl = '/', resent = false) => async (dispatch, getState) => {
  const state = getState();

  if (!get('user.isRegisteringWithEmail', state)) {
    const { platform } = state.app;
    const { email, temporaryRegistrationId: externalId } = state.user;
    const data = {
      email,
      externalId,
      platformUsed: platform,
      marketingEmailConsent: false,
      allowPartnerConsent: false,
    };

    dispatch({ type: SEND_LOGIN_EMAIL_REQUESTED, data });

    try {
      const endPoint = ep(state)('memberOutbound');
      const url = `${endPoint}?returnUrl=${encodeReturnUrl(returnUrl)}&shortcode=true`;
      const { data: response } = await dispatch(fetch(url, { method: 'post', data }));

      dispatch({ type: SEND_LOGIN_EMAIL_SUCCESS, response, resent });
      dispatch(multiSet([['lastLoginEmail', email], ['waitingOnLoginCode', 'true']]));
    } catch (e) {
      console.error(e);
      dispatch({ type: SEND_LOGIN_EMAIL_FAILURE, data });
    }
  }
};

const encodeReturnUrl = returnUrl => encodeURIComponent(encodeURIComponent(returnUrl)); // Double encode incase returnUrl has queryString

export const LOGIN_WITH_CODE_REQUEST = 'LOGIN_WITH_CODE_REQUEST';
export const LOGIN_WITH_CODE_SUCCESS = 'LOGIN_WITH_CODE_SUCCESS';
export const LOGIN_WITH_CODE_FAILURE = 'LOGIN_WITH_CODE_FAILURE';

export const loginWithCode = (code, email) => (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_CODE_REQUEST, code });

  const state = getState();

  return dispatch(
    fetch(ep(state)('memberAuth'), {
      method: 'post',
      data: {
        shortCode: code,
        email,
      },
    })
  )
    .then(async response => {
      const { data: { access_token: accessToken, refresh_token } = {} } = response;

      await Promise.all([
        dispatch(authenticateUser(accessToken, refresh_token)),
        dispatch(persistTokens(accessToken, refresh_token)),
      ]);
      dispatch({ type: LOGIN_WITH_CODE_SUCCESS, code });
    })
    .catch(error => {
      dispatch({ type: LOGIN_WITH_CODE_FAILURE, code });

      if (!!error.response) {
        switch (error.response.status) {
          case 403:
            throw new SubmissionError({ code: validationMessages.login_code_expired });
          case 404:
            throw new SubmissionError({ code: validationMessages.invalid_email });
          case 406:
            throw new SubmissionError({ code: validationMessages.invalid_email_login_code });
          default:
            throw new SubmissionError({ code: validationMessages.code_submit_failed });
        }
      }
    });
};

export const UPDATE_GUEST_FREE_VIDEO_WATCH = 'UPDATE_GUEST_FREE_VIDEO_WATCH';

const getGuestFreeVideoWatchCount = async dispatch =>
  await dispatch(getItem('guestFreeVideoWatchCount', 0));

export const updateGuestFreeVideoWatchCount = (reset = false) => async dispatch => {
  const watchCount = reset ? 0 : Number(await getGuestFreeVideoWatchCount(dispatch)) + 1;
  await dispatch(setItem('guestFreeVideoWatchCount', watchCount.toString()));
  dispatch({ type: UPDATE_GUEST_FREE_VIDEO_WATCH, watchCount });
};

export const restoreGuestWatchVideoCount = () => async dispatch => {
  const watchCount = Number(await getGuestFreeVideoWatchCount(dispatch));
  await dispatch({ type: UPDATE_GUEST_FREE_VIDEO_WATCH, watchCount });
};

export const BLOCKED_USER_SHOW = 'BLOCKED_USER_SHOW';
export const BLOCKED_USER_HIDE = 'BLOCKED_USER_HIDE';

export const showBlockedUser = () => async dispatch => {
  dispatch({ type: BLOCKED_USER_SHOW });
};

export const hideBlockedUser = () => async dispatch => {
  dispatch({ type: BLOCKED_USER_HIDE });
};

const AUTH_WIZARD_STARTED = 'AUTH_WIZARD_STARTED';
export const AUTH_WIZARD_CLOSED = 'AUTH_WIZARD_ENDED';
export const CHANGE_AUTH_WIZARD_STEP = 'CHANGE_AUTH_WIZARD_STEP';

export const showAuthWizard = ({
  history,
  historyAction = 'push',
  locationState = {},
  forceStep,
}) => async (dispatch, getState) => {
  const state = getState();

  if (!isOpen(state)) {
    const memberIsAuthenticated = isAuthenticated(state);
    const memberIsPersistedOnServer = !isAuthenticatedAndNewMember(state);

    if (!memberIsAuthenticated || !memberIsPersistedOnServer) {
      const signupWizardOpen = get('location.state.signUpWizard', history);

      if (!signupWizardOpen) {
        // const lastLoginEmail = await dispatch(getItem('lastLoginEmail'));
        const waitingOnLoginCode = state.user.waitingOnLoginCode;
        const defaultStep = waitingOnLoginCode
          ? authenticationSteps.CheckYourEmail
          : // : lastLoginEmail
            // ? authenticationSteps.SignInWithEmail
            authenticationSteps.Registration;
        history[historyAction](history.location.pathname, {
          signUpWizard: forceStep || defaultStep,
          signIn: waitingOnLoginCode,
          ...locationState,
        });
      }

      dispatch({ type: AUTH_WIZARD_STARTED });
    }
  }
};

export const closeAuthWizard = history => (dispatch, getState) => {
  dispatch({ type: AUTH_WIZARD_CLOSED, waitingOnLoginCode: false });
  dispatch(removeItem('waitingOnLoginCode'));
};

export const changeAuthWizardStep = ({ history, nextStep, custom }) => async (
  dispatch,
  getState
) => {
  history.replace(history.location.pathname, { signUpWizard: nextStep, ...custom });

  let waitingOnLoginCode = true;
  if (nextStep !== authenticationSteps.EmailResent) {
    waitingOnLoginCode = false;
    if (getState().user.waitingOnLoginCode) {
      dispatch(removeItem('waitingOnLoginCode'));
    }
  }

  dispatch({ type: CHANGE_AUTH_WIZARD_STEP, waitingOnLoginCode });
};

export const BLOCK_COMMENTING = 'BLOCK_COMMENTING';
export const blockCommenting = blocked => dispatch => dispatch({ type: BLOCK_COMMENTING, blocked });

export const loginWithGuestPass = (token = false, setCollectedDetails) => {
  if (token) {
    setCollectedDetails({
      ...mapConfirmationEmailDecodedPropsFromJWT(Object.assign({}, decodeAccessToken(token))),
      temporaryRegistrationToken: token,
    });
  }

  return !!token;
};

export const authCtaAction = (ctaKey, value = true) => dispatch => {
  dispatch({ type: AUTH_ACTION, ctaKey, value });
};
