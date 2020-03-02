import {
  flow,
  unset,
  set,
  merge,
  omitBy,
  isNil,
  pick,
  get,
  getOr,
  keyBy,
  mapValues,
} from 'lodash/fp';
import { NAVIGATION_CHANGE, NAVIGATION_LOADED } from 'xi-core/app/actions';
import {
  LOGOUT_REQUEST,
  FETCH_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  CREATE_MEMBER_PROFILE_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  FETCH_MEMBER_ENABLEMENT_SUCCESS,
} from '../member/actions';
import { SAVE_REFERRER_INFO } from '../app/actions';
import {
  AUTH_WITH_FACEBOOK_REQUEST,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  AUTH_WITH_FACEBOOK_FAILURE,
  LOGIN_WITH_FACEBOOK_CANCEL,
  SEND_REGISTRATION_EMAIL_REQUEST,
  SEND_REGISTRATION_EMAIL_SUCCESS,
  SEND_REGISTRATION_EMAIL_FAILURE,
  SEND_LOGIN_EMAIL_REQUESTED,
  SEND_LOGIN_EMAIL_SUCCESS,
  SEND_LOGIN_EMAIL_FAILURE,
  LOGIN_WITH_CODE_REQUEST,
  LOGIN_WITH_CODE_SUCCESS,
  LOGIN_WITH_CODE_FAILURE,
  SET_COLLECTED_DETAILS,
  REGISTRATION_REQUEST,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  RESTORE_LOGIN_SUCCESS,
  RESTORE_LOGIN_FAILURE,
  CLEAR_LOGIN_ERRORS,
  UPDATE_GUEST_FREE_VIDEO_WATCH,
  RESTORE_LAST_LOGIN_EMAIL,
  RESTORE_WAITING_LOGIN_CODE,
  AUTH_WIZARD_CLOSED,
  CHANGE_AUTH_WIZARD_STEP,
  BLOCK_COMMENTING,
  BLOCKED_USER_SHOW,
  NEW_FACEBOOK_USER_SUCCESS,
  BLOCKED_USER_HIDE,
} from './actions';

export const signInWithEmailSteps = {
  NOT_STARTED: 0,
  SENDING: 1,
  SENT: 2,
  FAILED: 3,
};

const defaultState = {
  hasAttemptedToRestoreLogin: false,
  hasExplicitlyLoggedOut: false,
  hasCodeSucceeded: false,
  isAuthenticating: false,
  isAuthenticated: false,
  signInWithEmailStep: signInWithEmailSteps.NOT_STARTED,
  isSignInWithCodeSending: false,
  isActivated: false,
  didFailAuthentication: false,
  isNew: false,
  hasUserInfo: false,
  blockedFromCommenting: false,
  blockedFromPremium: false,
  accessToken: null,
  refreshToken: null,
  forename: null,
  surname: null,
  nickname: null,
  email: null,
  birthday: null,
  id: null,
  avatar: null,
  socialUserId: null,
  provider: null,
  emailReceived: null,
  emailFail: null,
  isRestoringLogin: true,
  guestFreeVideoWatchCount: 0,
  profileAndEntitlementRecieved: false,
  memberReferrerId: null,
  starReferrerId: null,
  referrerSource: null,
  referrerMedium: null,
  memberEnablementReceived: false,
  errorBody: {},
};

const userProperties = [
  'forename',
  'surname',
  'aboutMe',
  'avatar',
  'email',
  'gender',
  'nickname',
  'birthday',
  'language',
  'createdDate',
  'isVip',
  'blockedFromCommenting',
  'blockedFromPremium',
];

const getMemberAttributes = flow(
  get('memberAttributes'),
  keyBy('name'),
  mapValues('value')
);

const getMemberCategory = flow(
  get('memberCategory'),
  pick(['isVip'])
);

const user = (state = defaultState, { type, ...action }) => {
  switch (type) {
    case SAVE_REFERRER_INFO:
      return {
        ...state,
        starReferrerId: action.starReferrerId,
        memberReferrerId: action.memberReferrerId,
        referrerCampaign: action.referrerCampaign,
        referrerSource: action.referrerSource,
        referrerMedium: action.referrerMedium,
      };
    case RESTORE_LAST_LOGIN_EMAIL:
      return { ...state, email: action.email };
    case RESTORE_WAITING_LOGIN_CODE:
      return { ...state, waitingOnLoginCode: true };
    case REFRESH_TOKEN_SUCCESS:
      return { ...state, accessToken: action.accessToken, refreshToken: action.refreshToken };
    case AUTH_WITH_FACEBOOK_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      return {
        ...state,
        ...action,
        isAuthenticating: false,
        isAuthenticated: true,
        hasExplicitlyLoggedOut: false,
        temporaryRegistrationToken: null,
        temporaryRegistrationId: null,
      };
    case AUTH_WITH_FACEBOOK_FAILURE:
      return {
        ...state,
        ...action,
        isAuthenticating: false,
        didFailAuthentication: true,
        errorBody: action.errorBody,
      };
    case LOGIN_WITH_FACEBOOK_CANCEL:
      return {
        ...state,
        isAuthenticating: false,
        didFailAuthentication: false,
        temporaryRegistrationToken: null,
        email: null,
        forename: null,
        surname: null,
        birthday: null,
      };
    case SEND_REGISTRATION_EMAIL_REQUEST:
    case REGISTRATION_REQUEST:
      return flow(
        set('isRegisteringWithEmail', action.registeringWithEmail),
        unset('isRegisteringWithEmailSent'),
        unset('isRegisteringWithEmailFailed')
      )(state);
    case SEND_REGISTRATION_EMAIL_SUCCESS:
      return flow(
        set('isRegisteringWithEmailSent', true),
        unset('isRegisteringWithEmail')
      )(state);
    case SEND_REGISTRATION_EMAIL_FAILURE:
    case REGISTRATION_FAILURE:
      return flow(
        set('isRegisteringWithEmailFailed', true),
        unset('isRegisteringWithEmail')
      )(state);
    case REGISTRATION_SUCCESS:
      return flow(
        unset('temporaryRegistrationToken'),
        unset('temporaryRegistrationId'),
        unset('isRegisteringWithEmail'),
        unset('isNew'),
        set('id', action.id),
        set('accessToken', action.accessToken),
        set('refreshToken', action.refreshToken),
        set('hasExplicitlyLoggedOut', false),
        set('isAuthenticating', false),
        set('isAuthenticated', true)
      )(state);
    case SET_COLLECTED_DETAILS: {
      const updatedDetails = omitBy(isNil, action.details);
      return merge(state, updatedDetails);
    }
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
      };
    case NEW_FACEBOOK_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        isAuthenticating: action.isFacebookLogin || false,
        isAuthenticated: true,
        hasAttemptedToRestoreLogin: true,
        guestFreeVideoWatchCount: 0,
      };
    case RESTORE_LOGIN_SUCCESS:
    case RESTORE_LOGIN_FAILURE:
      return {
        ...state,
        ...action,
        hasAttemptedToRestoreLogin: true,
        isRestoringLogin: false,
      };
    case FETCH_MEMBER_PROFILE_SUCCESS:
      const avatarUrl = getOr(null, 'avatarUrl', action.user);

      return flow(
        pick(userProperties),
        set('avatar', avatarUrl),
        merge(getMemberAttributes(action.user)),
        merge(getMemberCategory(action.user)),
        set('profileAndEntitlementRecieved', true),
        merge(state)
      )(action.user);
    case FETCH_MEMBER_ENABLEMENT_SUCCESS:
      return {
        ...state,
        enablement: action.enablement,
        memberEnablementReceived: true,
      };
    case UPDATE_MEMBER_PROFILE_SUCCESS:
      return flow(
        pick(userProperties),
        merge(state)
      )(action);
    case CREATE_MEMBER_PROFILE_SUCCESS:
      return { ...state };
    case LOGOUT_REQUEST:
      return {
        ...defaultState,
        hasAttemptedToRestoreLogin: true,
        hasExplicitlyLoggedOut: action.hasExplicitlyLoggedOut,
        isRestoringLogin: false,
        profileAndEntitlementRecieved: false,
      };
    case AUTH_WIZARD_CLOSED:
    case CHANGE_AUTH_WIZARD_STEP:
      return { ...state, waitingOnLoginCode: action.waitingOnLoginCode };
    case CLEAR_LOGIN_ERRORS:
      return { ...state, didFailAuthentication: false };
    case SEND_LOGIN_EMAIL_REQUESTED:
      return { ...state, signInWithEmailStep: signInWithEmailSteps.SENDING };
    case SEND_LOGIN_EMAIL_SUCCESS:
      return { ...state, signInWithEmailStep: signInWithEmailSteps.SENT };
    case SEND_LOGIN_EMAIL_FAILURE:
      return { ...state, signInWithEmailStep: signInWithEmailSteps.FAILED };
    case LOGIN_WITH_CODE_REQUEST:
      return { ...state, isSignInWithCodeSending: true };
    case LOGIN_WITH_CODE_SUCCESS:
    case LOGIN_WITH_CODE_FAILURE:
      return { ...state, isSignInWithCodeSending: false };
    case UPDATE_GUEST_FREE_VIDEO_WATCH:
      return { ...state, guestFreeVideoWatchCount: action.watchCount };
    case BLOCK_COMMENTING:
      return { ...state, blockedFromCommenting: action.blocked };
    case BLOCKED_USER_SHOW:
      return { ...state, blockedUserOpen: true };
    case BLOCKED_USER_HIDE:
      return { ...state, blockedUserOpen: false };
    default:
      return state;
  }
};

const signup = (state = { step: null }, { type, ...action }) => {
  const step = get('signUpWizard', action.historyState);

  switch (type) {
    case NAVIGATION_LOADED:
      if (step) {
        return { ...state, step };
      }
      return state;

    case NAVIGATION_CHANGE:
      return { ...state, step };

    default:
      return state;
  }
};

export { user, signup };
