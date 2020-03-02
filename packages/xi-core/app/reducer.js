import { get, merge, set, flow } from 'lodash/fp';
import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_ALL_REPLIES_SUCCESS,
  FETCH_REPLIES_AFTER_REPLY_SUCCESS,
  FETCH_REPLIES_BEFORE_REPLY_SUCCESS,
} from '../comments/actions';
import {
  FETCH_SECTION_ITEMS_SUCCESS,
  FETCH_SECTION_ITEMS_REQUEST,
  FETCH_RELATED_CONTENT_SUCCESS,
  FETCH_RELATED_CONTENT_REQUEST,
} from '../content/actions';
import {
  FETCH_GALLERY_REQUEST,
  FETCH_GALLERY_SUCCESS,
  FETCH_GALLERY_FAILURE,
} from '../gallery/actions';
import { CLEAR_PAGING_DATA } from '../comments/actions';

import {
  UPDATE_SCROLL_POSITION,
  APP_BOOTSTRAP_COMPLETE,
  APP_BLUR,
  APP_FOCUS,
  APP_UNLOADED,
  UPDATE_PLATFORM_TYPE,
} from './actions';

export const app = (state = { bootstrapped: false }, action) => {
  switch (action.type) {
    case APP_BOOTSTRAP_COMPLETE:
      return set('bootstrapped', true, state);
    case UPDATE_PLATFORM_TYPE:
      return set('platform', action.platformType, state);
    case APP_BLUR:
      return set('focused', false, state);
    case APP_FOCUS:
      return set('focused', true, state);
    case APP_UNLOADED:
      return set('unloaded', true, state);
    default:
      return state;
  }
};

export const lists = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RELATED_CONTENT_REQUEST:
      return merge(state, {
        [get('contentId', action)]: { _fetching: true },
      });
    case FETCH_SECTION_ITEMS_REQUEST:
      return merge(state, {
        [get('sectionId', action)]: { _fetching: true },
      });
    case UPDATE_SCROLL_POSITION:
      const offset = {
        [get('identifier', action)]: { scrollOffset: get('scrollOffset', action) },
      };
      return merge(state, offset);
    case FETCH_SECTION_ITEMS_SUCCESS:
      const totalElements = {
        [get('sectionId', action)]: {
          totalElements: get('totalElements', action),
          _fetching: false,
          page: get('page', action),
        },
      };
      return merge(state, totalElements);
    case FETCH_COMMENTS_SUCCESS:
      let totalCommentsElements;
      const key = get('commentId', action)
        ? get('contentId', action) + ',' + get('commentId', action)
        : get('contentId', action);

      totalCommentsElements = {
        [key]: {
          totalElements: get('comments.totalElements', action),
          _fetching: false,
          page: get('comments.page', action),
        },
      };
      return merge(state, totalCommentsElements);
    case FETCH_ALL_REPLIES_SUCCESS:
    case FETCH_REPLIES_AFTER_REPLY_SUCCESS:
    case FETCH_REPLIES_BEFORE_REPLY_SUCCESS:
      const repliesListKey = get('parentId', action)
        ? get('contentId', action) +
          ',' +
          get('parentId', action) +
          ',' +
          get('replyId', action) +
          ',' +
          get('loadType', action) +
          ',' +
          get('nextImportantReplyId', action)
        : get('contentId', action);
      let totalRepliesElements = {
        [repliesListKey]: {
          totalElements: get('comments.totalElements', action),
          _fetching: false,
          page: get('comments.page', action),
        },
      };
      return merge(state, totalRepliesElements);
    case FETCH_RELATED_CONTENT_SUCCESS:
      let totalRelatedElements;
      totalRelatedElements = {
        [get('contentId', action)]: {
          totalElements: get('response.totalElements', action),
          _fetching: false,
          page: get('response.number', action),
        },
      };
      return merge(state, totalRelatedElements);
    case CLEAR_PAGING_DATA:
      let flowItems = [];
      for (var stateKey in state) {
        let contentId = stateKey.split(',')[0];
        if (contentId === action.contentId) {
          flowItems.push(() => set(stateKey, {}, state));
        }
      }
      return flow.apply(flowItems);

    case FETCH_GALLERY_REQUEST:
      const galleryRequestState = {
        [get('galleryId', action)]: {
          _fetching: true,
        },
      };
      return merge(state, galleryRequestState);
    case FETCH_GALLERY_SUCCESS:
      const gallerySuccessState = {
        [get('galleryId', action)]: {
          totalElements: get('totalElements', action),
          _fetching: false,
          page: get('page', action),
        },
      };
      return merge(state, gallerySuccessState);
    case FETCH_GALLERY_FAILURE:
      const galleryFailureState = {
        [get('galleryId', action)]: {
          _fetching: false,
        },
      };
      return merge(state, galleryFailureState);

    default:
      return state;
  }
};
