import { set, flow, get, getOr, map, remove, filter } from 'lodash/fp';
import { remove as lodashRemove } from 'lodash';
import { transformAPIContentItemResponse } from '../content/reducer';
import {
  MEMBER_AVATAR_SIGN_REQUEST,
  MEMBER_AVATAR_SIGN_FAILURE,
  MEMBER_AVATAR_SIGN_SUCCESS,
  MEMBER_CLOUDINARY_REQUEST,
  MEMBER_CLOUDINARY_FAILURE,
  MEMBER_CLOUDINARY_SUCCESS,
  REQUESTING_USER_CONTENT_STATUS_SUCCESS,
  CONTENT_LIKE_REQUEST,
  CONTENT_LIKE_FAILURE,
  CONTENT_UNLIKE_REQUEST,
  CONTENT_UNLIKE_FAILURE,
  CONTENT_BOOKMARK_REQUEST,
  CONTENT_BOOKMARK_FAILURE,
  CONTENT_UNBOOKMARK_REQUEST,
  CONTENT_UNBOOKMARK_FAILURE,
  FETCH_BOOKMARKS_REQUEST,
  FETCH_BOOKMARKS_FAILURE,
  FETCH_BOOKMARKS_SUCCESS,
  LOCKER_REMOVE_BOOKMARK,
  NOTIFICATIONS_GET_PREFS_SUCCESS,
  NOTIFICATIONS_ADD_PREF_SUCCESS,
  NOTIFICATIONS_REMOVE_PREF_SUCCESS,
  FETCH_PAYMENT_HISTORY_SUCCESS,
  UPDATE_COOKIE_STATUS,
  FETCH_ZENDESK_TOKEN_SUCCESS,
  LOGOUT_SUCCESS,
} from './actions';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from './../products/actions';

const defaultState = {
  avatarSignature: { data: {} },
  cloudinaryResponse: { data: {} },
  avatarUploading: false,
  isLoading: false,
  fetchProductsError: false,
};

export const member = (state = defaultState, action) => {
  let currentLikes;
  let newLikes;
  let currentBookmarks;
  let newBookmarks;
  switch (action.type) {
    case MEMBER_AVATAR_SIGN_REQUEST:
      return set('avatarUploading', true, state);
    case MEMBER_AVATAR_SIGN_FAILURE:
      return flow(
        set('avatarSignature', action.response),
        set('avatarUploading', false)
      )(state);
    case MEMBER_AVATAR_SIGN_SUCCESS:
      return flow(
        set('avatarSignature', action.response),
        set('avatarUploading', false)
      )(state);
    case MEMBER_CLOUDINARY_REQUEST:
      return set('avatarUploading', true, state);
    case MEMBER_CLOUDINARY_FAILURE:
      return flow(
        set('cloudinaryResponse', action.response),
        set('avatarUploading', false)
      )(state);
    case MEMBER_CLOUDINARY_SUCCESS:
      return flow(
        set('cloudinaryResponse', action.response),
        set('avatarUploading', false)
      )(state);
    case REQUESTING_USER_CONTENT_STATUS_SUCCESS:
      let contentStatuses = {
        liked: [],
        viewed: [],
        bookmarked: [],
        commented: [],
      };

      action.response.forEach(entry => {
        if (entry.isLiked) {
          contentStatuses.liked.push(entry.externalId);
        }
        if (entry.isViewed) {
          contentStatuses.viewed.push(entry.externalId);
        }
        if (entry.isBookmarked) {
          contentStatuses.bookmarked.push(entry.externalId);
        }
        if (entry.isCommented) {
          contentStatuses.commented.push(entry.externalId);
        }
      });

      return set('contentStatuses', contentStatuses, state);
    case CONTENT_LIKE_REQUEST:
    case CONTENT_UNLIKE_FAILURE:
      currentLikes = getOr([], 'contentStatuses.liked', state);
      newLikes = [...currentLikes, action.contentId];
      return set('contentStatuses.liked', newLikes, state);
    case CONTENT_LIKE_FAILURE:
    case CONTENT_UNLIKE_REQUEST:
      currentLikes = getOr([], 'contentStatuses.liked', state);
      currentLikes.splice(currentLikes.indexOf(action.contentId, 1));
      return set('contentStatuses.liked', currentLikes, state);
    case CONTENT_BOOKMARK_REQUEST:
    case CONTENT_UNBOOKMARK_FAILURE:
      currentBookmarks = getOr([], 'contentStatuses.bookmarked', state);
      newBookmarks = [...currentBookmarks, action.contentId];
      return set('contentStatuses.bookmarked', newBookmarks, state);
    case CONTENT_BOOKMARK_FAILURE:
    case CONTENT_UNBOOKMARK_REQUEST:
      currentBookmarks = getOr([], 'contentStatuses.bookmarked', state);
      lodashRemove(currentBookmarks, item => item === action.contentId);
      return set('contentStatuses.bookmarked', currentBookmarks, state);
    case FETCH_BOOKMARKS_REQUEST:
      return set('isLoading', true, state);
    case FETCH_BOOKMARKS_FAILURE:
      return set('isLoading', false, state);
    case FETCH_BOOKMARKS_SUCCESS:
      return flow(
        set('isLoading', false),
        set(
          'bookmarks',
          flow(
            get('response'),
            filter(item => item.externalId),
            map(transformAPIContentItemResponse)
          )(action)
        )
      )(state);
    case LOCKER_REMOVE_BOOKMARK:
      return set(
        'bookmarks',
        flow(
          get('bookmarks'),
          remove(b => b.externalId === action.externalId)
        )(state),
        state
      );
    case NOTIFICATIONS_GET_PREFS_SUCCESS:
      let data = getOr([], 'response.enabledMessageChannels', action);
      return set('contactPreferences', data, state);
    case NOTIFICATIONS_ADD_PREF_SUCCESS:
      let exisitingData = getOr([], 'contactPreferences', state).map(item => item);
      exisitingData.push(action.channel);
      return set('contactPreferences', exisitingData, state);
    case NOTIFICATIONS_REMOVE_PREF_SUCCESS:
      let removeTarget = getOr([], 'contactPreferences', state).map(item => item);
      removeTarget.splice(removeTarget.indexOf(action.channel), 1);
      return set('contactPreferences', removeTarget, state);
    case FETCH_PAYMENT_HISTORY_SUCCESS:
      return set('payments', action.response.content, state);
    case UPDATE_COOKIE_STATUS:
      return set('cookiesStatus', action.cookiesStatus, state);
    case FETCH_ZENDESK_TOKEN_SUCCESS:
      return set('zendesktoken', action.response.access_token, state);
    case FETCH_PRODUCTS_REQUEST:
    case FETCH_PRODUCTS_SUCCESS:
      return set('fetchProductsError', false, state);
    case FETCH_PRODUCTS_ERROR:
      return set('fetchProductsError', true, state);
    case LOGOUT_SUCCESS:
      return flow(
        set('contentStatuses.bookmarked', []),
        set('contentStatuses.liked', [])
      )(state);
    default:
      return state;
  }
};
