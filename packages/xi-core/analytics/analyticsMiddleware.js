import { get, omitBy, isNil } from 'lodash/fp';
import { getStarById } from '../stars/selectors';
import { getUTMCampaign, getUTMContent, getUTMMedium, getUTMSource } from '../member/selectors';

import {
  NEW_FACEBOOK_USER_SUCCESS,
  LOGIN_WITH_FACEBOOK_SUCCESS,
  REGISTRATION_SUCCESS,
  SEND_LOGIN_EMAIL_SUCCESS,
  SEND_REGISTRATION_EMAIL_SUCCESS,
  LOGIN_WITH_CODE_SUCCESS,
  AUTH_ACTION,
} from '../signup/actions';
import { INVITE_EMAIL_SUCCESS, USER_PROFILE_ACTION } from '../member/actions';
import {
  VIDEO_PLAYBACK_STARTED,
  VIDEO_PLAYBACK_PAUSED,
  VIDEO_PLAYBACK_RESUMED,
  VIDEO_PLAYBACK_ENDED,
  VIDEO_PLAYBACK_PROGRESS,
} from '../video/actions';
import { CONTENT_PAGE_LOADED, PLAYER_PROFILE_PAGE_LOADED } from '../app/actions';
import { PRODUCTS_ACTION } from '../products/actions';
import { START_TIMELINE, PLAYER_INDEX_ACTION } from '../stars/actions';
import { FETCH_SEARCH_SUCCESS } from '../search/actions';
import { SEND_SHARE } from '../share/actions';
import { SHARE_TYPES } from '../share/constants';
import { DISCOVERY_ACTION, CONTENT_DETAIL_ACTION } from '../content/actions';
import {
  COMMENT_SPOTLIGHT_ACTION,
  COMMENTS_PAGE_ACTION,
  COMMENTS_DEEP_LINK_ACTION,
} from '../comments/actions';

import Analytics from './Analytics';
import { decorateWithContentInfo } from './middlewareHelpers';
import { AnalyticsEvents, PropertyKeys, PropertyKeyValues } from './analyticEvents';

let platform;

const track = (eventName, data) => {
  Analytics.track({ eventName, data, platform });
};

const analyticsMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (!platform) {
    platform = get('app.platform')(state);
  }

  const { type, ...eventData } = action;

  switch (type) {
    case AUTH_ACTION:
      recordAuthAction(action.ctaKey, action.value);
      break;
    case SEND_LOGIN_EMAIL_SUCCESS:
    case SEND_REGISTRATION_EMAIL_SUCCESS:
      recordAuthAction(
        action.resent
          ? PropertyKeys.COMMON_AUTH_ACTION.EMAIL_RESENT
          : PropertyKeys.COMMON_AUTH_ACTION.EMAIL_SENT
      );
      break;
    case NEW_FACEBOOK_USER_SUCCESS:
      recordAuthAction(PropertyKeys.SIGN_UP_REGISTRATION.FACEBOOK_SUCCESS);
      break;
    case LOGIN_WITH_CODE_SUCCESS:
      authSuccessAction(LOGIN_WITH_CODE_SUCCESS, state);
      break;
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      authSuccessAction(LOGIN_WITH_FACEBOOK_SUCCESS, state);
      break;
    case REGISTRATION_SUCCESS:
      authSuccessAction(REGISTRATION_SUCCESS, state);
      break;
    case VIDEO_PLAYBACK_STARTED:
      recordVideoPlaybackStartedMetric(state, action.contentId);
      break;
    case VIDEO_PLAYBACK_PAUSED:
      recordVideoPlaybackPausedMetric(state, action.contentId, action.currentTime);
      break;
    case VIDEO_PLAYBACK_RESUMED:
      recordVideoPlaybackResumedMetric(
        state,
        action.contentId,
        action.currentTime,
        action.pauseDuration
      );
      break;
    case VIDEO_PLAYBACK_ENDED:
      recordVideoPlaybackEndedMetric(state, action.contentId, action.totalTimeSpentPaused);
      break;
    case VIDEO_PLAYBACK_PROGRESS:
      recordVideoPlaybackProgressMetric(state, action.contentId, action.progress);
      break;
    case CONTENT_PAGE_LOADED:
      recordContentPageLoadedMetric(state, action.contentId);
      break;
    case PLAYER_PROFILE_PAGE_LOADED:
      recordPlayerProfilePageLoadedMetric(state, action.starId);
      break;
    case SEND_SHARE:
      recordSendShare(action.shareType, action.shareProvider);
      break;
    case INVITE_EMAIL_SUCCESS:
      recordGuestPass(state, action.contentId, action.email);
      break;
    case START_TIMELINE:
      recordTimelineStarted(state, action.starId);
      break;
    case USER_PROFILE_ACTION:
      recordUserProfileAction(eventData);
      break;
    case PRODUCTS_ACTION:
      recordProductsPageAction(eventData);
      break;
    case DISCOVERY_ACTION:
      recordDiscoveryPageAction(eventData);
      break;
    case CONTENT_DETAIL_ACTION:
      recordContentDetailPageAction(eventData);
      break;
    case FETCH_SEARCH_SUCCESS:
      recordSearchMetric(state, action.searchTerm);
      break;
    case PLAYER_INDEX_ACTION:
      recordPlayerIndexAction(action.data, state);
      break;
    case COMMENT_SPOTLIGHT_ACTION:
    case COMMENTS_PAGE_ACTION:
      recordCommentsPageAction(eventData);
      break;
    case COMMENTS_DEEP_LINK_ACTION:
      recordCommentsDeepLinkAction(eventData);
      break;
    default:
      break;
  }

  return result;
};

function recordVideoPlaybackStartedMetric(state, contentId) {
  const eventData = decorateWithContentInfo(contentId, state, { Playback: true });
  track(AnalyticsEvents.content.START, eventData);
}

function recordVideoPlaybackPausedMetric(state, contentId, currentTime) {
  const eventData = decorateWithContentInfo(contentId, state, {
    Playback: true,
    'Playhead Time': currentTime,
  });

  track(AnalyticsEvents.content.PAUSE, eventData);
}

function recordVideoPlaybackResumedMetric(state, contentId, currentTime, pauseDuration) {
  const eventData = decorateWithContentInfo(contentId, state, {
    Playback: true,
    'Playhead Time': currentTime,
    'Pause Duration': pauseDuration,
  });

  track(AnalyticsEvents.content.RESUME, eventData);
}

function recordVideoPlaybackEndedMetric(state, contentId, timeSpentPaused) {
  const eventData = decorateWithContentInfo(contentId, state, {
    Playback: true,
    'Completed Content?': true,
    'Time Spent Paused': timeSpentPaused,
  });

  track(AnalyticsEvents.content.END, eventData);
}

function recordVideoPlaybackProgressMetric(state, contentId, progress) {
  const progressAsPercentage = Math.round(progress * 100);
  const eventName = AnalyticsEvents.content.PROGRESS(progressAsPercentage);

  const eventData = decorateWithContentInfo(contentId, state, {
    Playback: true,
  });

  track(eventName, eventData);
}

function recordContentPageLoadedMetric(state, contentId) {
  track(AnalyticsEvents.page.VIEW_CONTENT_DETAIL, decorateWithContentInfo(contentId, state, {}));
}

function recordSearchMetric(state, searchTerm) {
  track(AnalyticsEvents.search.SEARCH, {
    'Search Term': searchTerm,
  });
}

function recordPlayerProfilePageLoadedMetric(state, starId) {
  const { forename, surname } = getStarById(state)(starId);

  const playerProfileData = {
    'Player ID': starId,
    'Player Name': `${forename} ${surname}`,
  };

  const entryPoint = get('locationInfo.entryPoint')(state);

  if (entryPoint) {
    playerProfileData['Entry Point'] = entryPoint;
  }

  track(AnalyticsEvents.page.VIEW_PLAYER_PROFILE, playerProfileData);
}

function recordSendShare(shareType, shareProvider) {
  switch (shareType) {
    case SHARE_TYPES.INVITE:
      recordUserProfileAction({ [PropertyKeys.USER_PROFILE_ACTION.INVITE]: shareProvider });
      break;
    case SHARE_TYPES.SHARE:
      const trackPayload = { Provider: shareProvider };
      track(AnalyticsEvents.share.SEND_SHARE, trackPayload);
      break;
    default:
      break;
  }
}

function recordGuestPass(state, contentId, email) {
  const eventData = decorateWithContentInfo(contentId, state, {
    'Guest Pass Email': email,
    'Content Publisher IDs': null,
    'Content Partners': null,
    'Content Contributor IDs': null,
    'Content Contributors': null,
    'Premium Content': null,
  });

  track(AnalyticsEvents.share.SEND_GUEST_PASS, eventData);
}

function recordTimelineStarted(state, starId) {
  const { forename, surname } = getStarById(state)(starId);

  const playerProfileData = {
    'Player ID': starId,
    'Player Name': `${forename} ${surname}`,
  };
  track(AnalyticsEvents.star.TIMELINE_STARTED, playerProfileData);
}

function recordUserProfileAction(eventData) {
  track(AnalyticsEvents.member.USER_PROFILE_ACTION, eventData);
}

function recordProductsPageAction(eventData) {
  track(AnalyticsEvents.page.PRODUCT_INTERACTIONS, eventData);
}

function recordDiscoveryPageAction(eventData) {
  track(AnalyticsEvents.page.DISCOVERY_INTERACTIONS, eventData);
}

function recordCommentsPageAction(eventData) {
  track(AnalyticsEvents.page.COMMENTS_INTERACTIONS, eventData);
}

function recordCommentsDeepLinkAction(eventData) {
  track(AnalyticsEvents.deepLinks.COMMENT_DEEP_LINK_CLICKED, eventData);
}

function recordContentDetailPageAction(eventData) {
  track(AnalyticsEvents.page.CONTENT_DETAIL_INTERACTIONS, eventData);
}

const saveToSessionStorage = (key, val) => {
  try {
    sessionStorage.setItem(key, val);
  } catch (e) {}
};

const getFromSessionStorage = key => {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {}
};

let authData = {};
const sessionAuthData = getFromSessionStorage('authData');
if (sessionAuthData) {
  authData = JSON.parse(sessionAuthData);
}

const recordAuthAction = (key, val = true) => {
  Object.assign(authData, { [key]: val });
  saveToSessionStorage('authData', JSON.stringify(authData));
};

function authSuccessAction(action, state) {
  switch (action) {
    case LOGIN_WITH_CODE_SUCCESS:
    case LOGIN_WITH_FACEBOOK_SUCCESS:
      if (action === LOGIN_WITH_CODE_SUCCESS) {
        authData[PropertyKeys.LOGIN.LOGIN_CODE_SUCCESS] = true;
      } else {
        authData[PropertyKeys.LOGIN.FACEBOOK_SUCCESS] = true;
      }
      track(AnalyticsEvents.member.LOGIN, authData);
      break;
    case REGISTRATION_SUCCESS:
      authData['UTM Campaign'] = getUTMCampaign(state);
      authData['UTM Content'] = getUTMContent(state);
      authData['UTM Source'] = getUTMSource(state);
      authData['UTM Medium'] = getUTMMedium(state);
      track(AnalyticsEvents.member.SIGN_UP_REGISTRATION, authData);
      break;
    default:
      console.error('Unknown auth sucess action');
      break;
  }
  saveToSessionStorage('authData', '');
  authData = {};
}

const recordPlayerIndexAction = (
  { starId, position, type = PropertyKeyValues.PLAYER_INDEX_ACTION.TYPE.CLICK },
  state
) => {
  const data = omitBy(isNil, {
    [PropertyKeys.PLAYER_INDEX_ACTION.PLAYER]: starId,
    [PropertyKeys.PLAYER_INDEX_ACTION.POSITION]: position,
    [PropertyKeys.PLAYER_INDEX_ACTION.TYPE]: type,
  });
  track(AnalyticsEvents.star.PLAYER_INDEX_ACTION, data);
};

export default analyticsMiddleware;
