import axios from 'axios';
import { map } from 'lodash/fp';
import { setLocale } from '../locale/actions';
import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { setItem, multiSet, multiRemove, getItem } from '../storageMiddleware';
import { clearRecent } from '../search/actions';
import { removeAllResumePoints } from '../video/actions';
import { restoreLastLoginEmail, closeAuthWizard } from '../signup/actions';
import { isAuthenticated } from '../member/selectors';
import { getAvatar, getMemberId, getStarReferrerId } from './selectors';

export const FETCH_MEMBER_PROFILE_REQUEST = 'member/FETCH_MEMBER_PROFILE_REQUEST';
export const FETCH_MEMBER_PROFILE_SUCCESS = 'member/FETCH_MEMBER_PROFILE_SUCCESS';

export const UPDATE_MEMBER_PROFILE_REQUEST = 'member/UPDATE_MEMBER_PROFILE_REQUEST';
export const UPDATE_MEMBER_PROFILE_SUCCESS = 'member/UPDATE_MEMBER_PROFILE_SUCCESS';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';

export const INVITE_EMAIL_SUCCESS = 'member/INVITE_EMAIL_SUCCESS';

export const CANCEL_PREMIUM_INTENT = 'CANCEL_PREMIUM_INTENT';

export const USER_PROFILE_ACTION = 'USER_PROFILE_ACTION';

export const fetchMemberProfile = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_MEMBER_PROFILE_REQUEST });

  const state = getState();

  try {
    const retry = {
      active: true,
    };
    const { data: user } = await dispatch(fetch(ep(state)('memberProfile'), { retry }));

    await dispatch(fetchEnablement());

    await dispatch(setLocale(user.language.toLowerCase()));

    dispatch(setMemberTracking(user.tracking || {}));

    dispatch({ type: FETCH_MEMBER_PROFILE_SUCCESS, user });
  } catch (e) {
    throw e;
  }
};

export const FETCH_MEMBER_ENABLEMENT_REQUEST = 'FETCH_MEMBER_ENABLEMENT_REQUEST';
export const FETCH_MEMBER_ENABLEMENT_SUCCESS = 'FETCH_MEMBER_ENABLEMENT_SUCCESS';
const fetchEnablement = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_MEMBER_ENABLEMENT_REQUEST });
  // const state = getState();
  // const retry = { active: true };

  // const { data: enablement } = await dispatch(fetch(ep(state)('fetchMemberEnablement'), { retry }));

  dispatch({ type: FETCH_MEMBER_ENABLEMENT_SUCCESS, enablement: {} });
};

export const updateMemberProfile = (
  userId,
  { forename, surname, aboutMe, avatarUrl, email, birthday, marketingEmailConsent, language }
) => async (dispatch, getState) => {
  const state = getState();

  if (!isAuthenticated(state)) {
    if (language) {
      await dispatch(setLocale(language.toLowerCase()));
    }

    dispatch({
      type: UPDATE_MEMBER_PROFILE_SUCCESS,
      userId,
      forename,
      surname,
      aboutMe,
      birthday,
      avatar: avatarUrl,
      language,
    });

    return;
  }

  const getMostRecentAvatarIfNotDefined = ({ avatarUrl, state }) => avatarUrl || getAvatar(state);
  const willAvatarDelete = avatarUrl => avatarUrl === null;

  const avatar = willAvatarDelete(avatarUrl)
    ? avatarUrl
    : getMostRecentAvatarIfNotDefined({ avatarUrl, state });

  dispatch({
    type: UPDATE_MEMBER_PROFILE_REQUEST,
    userId,
    forename,
    surname,
    aboutMe,
    avatar,
    email,
    birthday,
    marketingEmailConsent,
    language,
  });

  await dispatch(
    fetch(ep(state)('memberProfile'), {
      method: 'put',
      data: {
        forename,
        surname,
        memberAttributes: [{ name: 'aboutMe', value: aboutMe }],
        avatarUrl: avatar,
        email,
        birthday,
        marketingEmailConsent,
        language,
      },
    })
  );

  if (language) {
    await dispatch(setLocale(language.toLowerCase()));
  }

  dispatch({
    type: UPDATE_MEMBER_PROFILE_SUCCESS,
    userId,
    forename,
    surname,
    aboutMe,
    birthday,
    avatar: avatarUrl,
    language,
  });
};

const CREATE_MEMBER_PROFILE_REQUEST = 'member/CREATE_MEMBER_PROFILE_REQUEST';
const CREATE_MEMBER_PROFILE_FAILURE = 'member/CREATE_MEMBER_PROFILE_FAILURE';
export const CREATE_MEMBER_PROFILE_SUCCESS = 'member/CREATE_MEMBER_PROFILE_SUCCESS';

export const createMemberProfile = (
  accessToken,
  {
    forename,
    surname,
    nickname,
    email,
    birthday,
    marketingEmailConsent,
    allowPartnerConsent,
    externalId,
    platformExternalId,
  }
) => async (dispatch, getState) => {
  const state = getState();

  const referrerId = getStarReferrerId(state) || '';

  const data = {
    forename,
    surname,
    nickname,
    email,
    birthday,
    marketingEmailConsent,
    allowPartner: allowPartnerConsent,
    externalId,
    platformExternalId,
    referrerId,
  };

  dispatch({
    type: CREATE_MEMBER_PROFILE_REQUEST,
    accessToken,
    ...data,
  });

  try {
    const endPoint = ep(state)('memberRegistration');
    const response = await dispatch(
      fetch(`${endPoint}?token=${accessToken}`, {
        method: 'post',
        data,
      })
    );
    dispatch({
      type: CREATE_MEMBER_PROFILE_SUCCESS,
      accessToken,
      ...data,
    });

    return response;
  } catch (error) {
    dispatch({
      type: CREATE_MEMBER_PROFILE_FAILURE,
      error,
      accessToken,
      ...data,
    });
    throw error;
  }
};

// const SEND_MEMBER_TRACKING = 'SEND_MEMBER_TRACKING';
const setMemberTracking = (currentTracking = {}) => async (dispatch, getState) => {
  try {
    // const tracking = await getTrackingData();
    // const nothingNew = () => difference(keys(tracking), keys(currentTracking)).length === 0;
    // if (nothingNew()) {
    //   return;
    // }
    // dispatch({
    //   type: SEND_MEMBER_TRACKING,
    //   tracking,
    // });
    // const state = getState();
    // const endPoint = ep(state)('tracking');
    // await dispatch(
    //   fetch(`${endPoint}`, {
    //     method: 'put',
    //     data: tracking,
    //   })
    // );
  } catch (error) {}
};

export const inviteEmail = (email, externalId) => async (dispatch, getState) => {
  try {
    const state = getState();

    const memberId = getMemberId(state);

    await dispatch(
      fetch(ep(state)('memberInvite', { memberId }), {
        method: 'post',
        data: {
          email,
          contentExternalId: externalId,
        },
      })
    );

    dispatch({ type: INVITE_EMAIL_SUCCESS, email, contentId: externalId });
  } catch (error) {
    throw error;
  }
};

export const MEMBER_AVATAR_SIGN_REQUEST = 'MEMBER_AVATAR_SIGN_REQUEST';
export const MEMBER_AVATAR_SIGN_FAILURE = 'MEMBER_AVATAR_SIGN_FAILURE';
export const MEMBER_AVATAR_SIGN_SUCCESS = 'MEMBER_AVATAR_SIGN_SUCCESS';
export const MEMBER_CLOUDINARY_REQUEST = 'MEMBER_CLOUDINARY_REQUEST';
export const MEMBER_CLOUDINARY_FAILURE = 'MEMBER_CLOUDINARY_FAILURE';
export const MEMBER_CLOUDINARY_SUCCESS = 'MEMBER_CLOUDINARY_SUCCESS';

export const uploadAvatarSign = avatar => async (dispatch, getState) => {
  const state = getState();

  try {
    dispatch({ type: MEMBER_AVATAR_SIGN_REQUEST });
    const { data: response } = await dispatch(
      fetch(ep(state)('memberUpload'), {
        method: 'post',
        body: avatar,
      })
    );
    dispatch({
      type: MEMBER_AVATAR_SIGN_SUCCESS,
      response: {
        data: response,
        error: false,
      },
    });
  } catch (error) {
    dispatch({
      type: MEMBER_AVATAR_SIGN_FAILURE,
      response: {
        error: true,
      },
    });
  }
};

export const uploadCloudinary = dispatch => async (
  file,
  { apiKey, cloudName, publicId, signature, timestamp }
) => {
  dispatch({ type: MEMBER_CLOUDINARY_REQUEST });
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('public_id', publicId);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp);
  axios(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'post',
    data: formData,
  })
    .then(response =>
      dispatch({
        type: MEMBER_CLOUDINARY_SUCCESS,
        response: {
          data: {
            secureUrl: response.data.secure_url,
          },
          error: false,
        },
      })
    )
    .catch(error =>
      dispatch({
        type: MEMBER_CLOUDINARY_FAILURE,
        response: {
          error: true,
        },
      })
    );
};

export const persistTokens = (accessToken, refreshToken) => async dispatch => {
  await dispatch(
    multiSet([['accessToken', accessToken || ''], ['refreshToken', refreshToken || '']])
  );
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logoutMember = ({ hasExplicitlyLoggedOut = true } = {}) => async dispatch => {
  dispatch({ type: LOGOUT_REQUEST, hasExplicitlyLoggedOut });

  await dispatch(multiRemove(['accessToken', 'refreshToken']));
  await dispatch(setItem('hasExplicitlyLoggedOut', hasExplicitlyLoggedOut ? '1' : ''));
  await dispatch(clearRecent());
  await dispatch(removeAllResumePoints());
  await dispatch(
    multiRemove([
      'starReferrerId',
      'memberReferrerId',
      'referrerCampaign',
      'referrerSource',
      'referrerMedium',
    ])
  );
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(restoreLastLoginEmail());
  dispatch(closeAuthWizard(true));

  // TO DO refactor the temporary fix below
  // Added if statement around this as it breaks native
  if (window && window.location) {
    window.location.reload(true);
  }
};

export const REQUESTING_USER_CONTENT_STATUS = 'REQUESTING_USER_CONTENT_STATUS';
export const REQUESTING_USER_CONTENT_STATUS_SUCCESS = 'REQUESTING_USER_CONTENT_STATUS_SUCCESS';
export const REQUESTING_USER_CONTENT_STATUS_FAILURE = 'REQUESTING_USER_CONTENT_STATUS_FAILURE';

export const fetchMemberContentInfo = id => async (dispatch, getState) => {
  dispatch({ type: REQUESTING_USER_CONTENT_STATUS });
  const state = getState();
  try {
    const endPoint = ep(state)('fetchMemberContent', { id });
    const { data: response } = await dispatch(fetch(`${endPoint}?onlyFlags=true`));
    dispatch({
      type: REQUESTING_USER_CONTENT_STATUS_SUCCESS,
      response,
    });
  } catch (e) {
    dispatch({ type: REQUESTING_USER_CONTENT_STATUS_FAILURE });
    console.error(e);
  }
};

export const CONTENT_LIKE_REQUEST = 'CONTENT_LIKE_REQUEST';
export const CONTENT_LIKE_SUCCESS = 'CONTENT_LIKE_SUCCESS';
export const CONTENT_LIKE_FAILURE = 'CONTENT_LIKE_FAILURE';

export const setLikeStatus = (contentId, isLiked) => dispatch => {
  return isLiked ? dispatch(like(contentId)) : dispatch(unlike(contentId));
};

export const like = contentId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: CONTENT_LIKE_REQUEST, contentId });

  try {
    await dispatch(
      fetch(ep(state)('contentLike', { contentId }), {
        method: 'get',
      })
    );

    dispatch({ type: CONTENT_LIKE_SUCCESS, contentId });
  } catch (e) {
    dispatch({ type: CONTENT_LIKE_FAILURE, contentId });
  }
};

export const CONTENT_UNLIKE_REQUEST = 'CONTENT_UNLIKE_REQUEST';
export const CONTENT_UNLIKE_SUCCESS = 'CONTENT_UNLIKE_SUCCESS';
export const CONTENT_UNLIKE_FAILURE = 'CONTENT_UNLIKE_FAILURE';

export const unlike = contentId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: CONTENT_UNLIKE_REQUEST, contentId });

  try {
    await dispatch(
      fetch(ep(state)('contentLike', { contentId }), {
        method: 'delete',
      })
    );

    dispatch({ type: CONTENT_UNLIKE_SUCCESS, contentId });
  } catch (e) {
    dispatch({ type: CONTENT_UNLIKE_FAILURE, contentId });
  }
};

export const CONTENT_ADD_VIEW = 'CONTENT_ADD_VIEW';

export const addToViewCount = contentId => async (dispatch, getState) => {
  try {
    const state = getState();

    dispatch({ type: CONTENT_ADD_VIEW, contentId });
    await dispatch(
      fetch(ep(state)('contentView', { contentId }), {
        method: 'get',
      })
    );
  } catch (e) {
    console.error(e);
  }
};

export const setBookmarkStatus = (contentId, isBookmarked) => dispatch => {
  return isBookmarked ? dispatch(bookmark(contentId)) : dispatch(unbookmark(contentId));
};

export const CONTENT_BOOKMARK_REQUEST = 'CONTENT_BOOKMARK_REQUEST';
export const CONTENT_BOOKMARK_SUCCESS = 'CONTENT_BOOKMARK_SUCCESS';
export const CONTENT_BOOKMARK_FAILURE = 'CONTENT_BOOKMARK_FAILURE';

export const bookmark = contentId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: CONTENT_BOOKMARK_REQUEST, contentId });

  try {
    await dispatch(fetch(ep(state)('contentBookmark', { contentId })));

    dispatch({ type: CONTENT_BOOKMARK_SUCCESS, contentId });
  } catch (e) {
    dispatch({ type: CONTENT_BOOKMARK_FAILURE, contentId });
  }
};

export const CONTENT_UNBOOKMARK_REQUEST = 'CONTENT_UNBOOKMARK_REQUEST';
export const CONTENT_UNBOOKMARK_SUCCESS = 'CONTENT_UNBOOKMARK_SUCCESS';
export const CONTENT_UNBOOKMARK_FAILURE = 'CONTENT_UNBOOKMARK_FAILURE';

export const unbookmark = contentId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: CONTENT_UNBOOKMARK_REQUEST, contentId });

  try {
    await dispatch(
      fetch(ep(state)('contentBookmark', { contentId }), {
        method: 'delete',
      })
    );

    dispatch({ type: CONTENT_UNBOOKMARK_SUCCESS, contentId });
  } catch (e) {
    dispatch({ type: CONTENT_UNBOOKMARK_FAILURE, contentId });
  }
};

export const FETCH_BOOKMARKS_REQUEST = 'FETCH_BOOKMARKS_REQUEST';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_FAILURE = 'FETCH_BOOKMARKS_FAILURE';

export const fetchBookmarks = externalId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_BOOKMARKS_REQUEST });
  try {
    const endPoint = ep(state)('fetchMemberContent', { id: externalId });
    const { data: contentIds } = await dispatch(
      fetch(`${endPoint}?bookmarked=true&commented=false&liked=false&onlyFlags=false&viewed=false`)
    );

    const bookmarkedContentIds = map(bookmarkedContent => bookmarkedContent.externalId)(contentIds);
    const { data: bookmarkedContents } = await dispatch(
      fetch(ep(state)('bookmarks'), {
        method: 'POST',
        data: {
          bookmarkedContentIds: bookmarkedContentIds,
        },
      })
    );

    const { content: response } = bookmarkedContents;

    dispatch({ type: FETCH_BOOKMARKS_SUCCESS, response });
  } catch (error) {
    dispatch({ type: FETCH_BOOKMARKS_FAILURE });
  }
};

export const LOCKER_REMOVE_BOOKMARK = 'LOCKER_REMOVE_BOOKMARK';

export const removeBookmarkFromLocker = dispatch => externalId => {
  dispatch({ type: LOCKER_REMOVE_BOOKMARK, externalId });
};

export const NOTIFICATIONS_GET_PREFS_REQUEST = 'NOTIFICATIONS_GET_PREFS_REQUEST';
export const NOTIFICATIONS_GET_PREFS_SUCCESS = 'NOTIFICATIONS_GET_PREFS_SUCCESS';
export const NOTIFICATIONS_GET_PREFS_FAILURE = 'NOTIFICATIONS_GET_PREFS_FAILURE';

export const fetchUserNotificationPrefs = () => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: NOTIFICATIONS_GET_PREFS_REQUEST });
  try {
    const { data: response } = await dispatch(fetch(ep(state)('notificationPrefs')));

    dispatch({ type: NOTIFICATIONS_GET_PREFS_SUCCESS, response });
  } catch (error) {
    dispatch({ type: NOTIFICATIONS_GET_PREFS_FAILURE });
  }
};

export const NOTIFICATIONS_ADD_PREF_REQUEST = 'NOTIFICATIONS_ADD_PREF_REQUEST';
export const NOTIFICATIONS_ADD_PREF_SUCCESS = 'NOTIFICATIONS_ADD_PREF_SUCCESS';
export const NOTIFICATIONS_ADD_PREF_FAILURE = 'NOTIFICATIONS_ADD_PREF_FAILURE';

export const addNotificationPref = channel => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: NOTIFICATIONS_ADD_PREF_REQUEST });
  try {
    await dispatch(
      fetch(ep(state)('addNotificationPref'), {
        method: 'POST',
        data: {
          messageChannel: channel,
        },
      })
    );

    dispatch({ type: NOTIFICATIONS_ADD_PREF_SUCCESS, channel });
  } catch (error) {
    dispatch({ type: NOTIFICATIONS_ADD_PREF_FAILURE });
  }
};

export const NOTIFICATIONS_REMOVE_PREF_REQUEST = 'NOTIFICATIONS_REMOVE_PREF_REQUEST';
export const NOTIFICATIONS_REMOVE_PREF_SUCCESS = 'NOTIFICATIONS_REMOVE_PREF_SUCCESS';
export const NOTIFICATIONS_REMOVE_PREF_FAILURE = 'NOTIFICATIONS_REMOVE_PREF_FAILURE';

export const removeNotificationPref = channel => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: NOTIFICATIONS_REMOVE_PREF_REQUEST });
  try {
    await dispatch(
      fetch(ep(state)('rmNotificationPref', { channel }), {
        method: 'DELETE',
      })
    );

    dispatch({ type: NOTIFICATIONS_REMOVE_PREF_SUCCESS, channel });
  } catch (error) {
    dispatch({ type: NOTIFICATIONS_REMOVE_PREF_FAILURE });
  }
};

export const CANCEL_MEMBERSHIP_REQUEST = 'CANCEL_MEMBERSHIP_REQUEST';
export const CANCEL_MEMBERSHIP_SUCCESS = 'CANCEL_MEMBERSHIP_SUCCESS';
export const CANCEL_MEMBERSHIP_FAILURE = 'CANCEL_MEMBERSHIP_FAILURE';

export const cancelMembership = enablementId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: CANCEL_MEMBERSHIP_REQUEST });
  try {
    await dispatch(
      fetch(ep(state)('cancelMembership', { enablementId }), {
        method: 'DELETE',
      })
    );
    dispatch(fetchEnablement());
    dispatch({ type: CANCEL_MEMBERSHIP_SUCCESS, enablementId });
  } catch (error) {
    dispatch({ type: CANCEL_MEMBERSHIP_FAILURE });
  }
};

export const FETCH_PAYMENT_HISTORY_REQUEST = 'FETCH_PAYMENT_HISTORY_REQUEST';
export const FETCH_PAYMENT_HISTORY_SUCCESS = 'FETCH_PAYMENT_HISTORY_SUCCESS';
export const FETCH_PAYMENT_HISTORY_FAILURE = 'FETCH_PAYMENT_HISTORY_FAILURE';

export const fetchPaymentHistory = config => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_PAYMENT_HISTORY_REQUEST });
  try {
    const { data: response } = await dispatch(
      fetch(ep(state)('paymentHistory'), {
        method: 'GET',
      })
    );

    dispatch({ type: FETCH_PAYMENT_HISTORY_SUCCESS, response });
  } catch (error) {
    dispatch({ type: FETCH_PAYMENT_HISTORY_FAILURE });
  }
};

const getCookieStatus = async dispatch => {
  return await dispatch(getItem('cookiesAccepted', 0));
};

export const UPDATE_COOKIE_STATUS = 'UPDATE_COOKIE_STATUS';

export const restoreCookiesStatus = () => async dispatch => {
  const cookiesStatus = Boolean(await getCookieStatus(dispatch));
  await dispatch({ type: UPDATE_COOKIE_STATUS, cookiesStatus });
};

export const acceptCookies = () => async dispatch => {
  await dispatch(setItem('cookiesAccepted', 1));
  dispatch({ type: UPDATE_COOKIE_STATUS, cookiesStatus: true });
};

export const FETCH_ZENDESK_TOKEN_REQUEST = 'FETCH_ZENDESK_TOKEN_REQUEST';
export const FETCH_ZENDESK_TOKEN_SUCCESS = 'FETCH_ZENDESK_TOKEN_SUCCESS';
export const FETCH_ZENDESK_TOKEN_FAILURE = 'FETCH_ZENDESK_TOKEN_FAILURE';

export const fetchZendeskToken = config => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_ZENDESK_TOKEN_REQUEST });
  try {
    const { data: response } = await dispatch(
      fetch(ep(state)('zendeskToken'), {
        method: 'GET',
      })
    );

    dispatch({ type: FETCH_ZENDESK_TOKEN_SUCCESS, response });
  } catch (error) {
    dispatch({ type: FETCH_ZENDESK_TOKEN_FAILURE });
  }
};

export const SIGNUP_CTA_PREMIUM_CONTENT_ID = 'signUpCTAPremiumContentId';

export const getSignUpCTAPremiumContentId = () => async dispatch => {
  return await dispatch(getItem(SIGNUP_CTA_PREMIUM_CONTENT_ID));
};

export const setSignUpCTAPremiumContentId = contentId => async dispatch => {
  await dispatch(setItem(SIGNUP_CTA_PREMIUM_CONTENT_ID, contentId));
};

export const userProfileCtaAction = ctaKey => dispatch => {
  dispatch({ type: USER_PROFILE_ACTION, [ctaKey]: true });
};
