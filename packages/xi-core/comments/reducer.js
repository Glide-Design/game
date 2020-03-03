import { get, set, getOr, orderBy, omit } from 'lodash/fp';
import { NAVIGATION_CHANGE, NAVIGATION_LOADED } from '../app/actions';
import {
  FETCH_COMMENTS_HIGHLIGHTS_SUCCESS,
  COMMENT_LIKE_REQUEST,
  COMMENT_UNLIKE_REQUEST,
  COMMENT_LIKE_FAILURE,
  COMMENT_UNLIKE_FAILURE,
  FETCH_COMMENTS_SUCCESS,
  CONTENT_COMMENT_SUCCESS,
  REPLYING_TO_COMMENT,
  CLOSE_COMMENT_REPLIES,
  OPEN_COMMENT_REPLIES,
  REPLY_TO_COMMENT_SUCCESS,
  CHANGE_REPLY_COUNT,
  DELETE_COMMENT_SUCCESS,
  CLEAR_COMMENTS_FOR_CONTENT,
  CLOSE_ALL_COMMENT_REPLIES,
  LOADING_COMMENTS_START,
  LOADING_COMMENTS_END,
  COMMENT_ERROR,
  CLEAR_COMMENT_ERROR,
  OPEN_COMMENTS,
  FETCH_ALL_REPLIES_SUCCESS,
  FETCH_REPLIES_AFTER_REPLY_SUCCESS,
  FETCH_REPLIES_BEFORE_REPLY_SUCCESS,
  PIN_COMMENT,
  UNPIN_COMMENT,
} from './actions';
import _mockComments1 from './_mockComments1';
import _mockComments2 from './_mockComments2';

const testComments = { '0': _mockComments1, '2000': _mockComments2, '4000': _mockComments1 };

const getInitials = comment => {
  if (get(['forename', 0], comment) && get(['surname', 0], comment)) {
    return get(['forename', 0], comment) + get(['surname', 0], comment);
  }

  let name = comment.forename || comment.surname || '';
  let initials = name ? name.match(/\b\w/g) || [] : [];
  let returnInitials = (
    (initials.shift() || '') + (initials.pop() || (name[1] || ''))
  ).toUpperCase();

  return returnInitials;
};

const getDisplayName = comment => {
  if (get('forename', comment) && get('surname', comment)) {
    return get('forename', comment) + ' ' + get('surname', comment);
  }

  if (get('forename', comment)) {
    return get('forename', comment);
  }

  if (get('surname', comment)) {
    return get('surname', comment);
  }

  return '';
};

export const comments = (
  state = {
    test: testComments,
  },
  action
) => {
  switch (action.type) {
    case FETCH_COMMENTS_HIGHLIGHTS_SUCCESS:
      let comments = getOr([], `commentHighlights.${action.contentId}`, state);
      action.comments.forEach(newComment => {
        newComment.displayName = getDisplayName(newComment);
        newComment.initials = getInitials(newComment);

        if (
          comments.filter(currentComment => currentComment.externalId === newComment.externalId)
            .length === 0
        ) {
          comments = comments.concat([omit(['importantReplies'], newComment)]);
        }

        const importantReplies = orderBy(['postedDateTime'], ['asc'], newComment.importantReplies);
        importantReplies.forEach(importantReply => {
          importantReply.parent = newComment.externalId;
          importantReply.initials = getInitials(importantReply);
          importantReply.displayName = getDisplayName(importantReply);
          importantReply.importantReply = true;
          if (
            comments.filter(
              currentComment => currentComment.externalId === importantReply.externalId
            ).length === 0
          ) {
            comments = comments.concat([importantReply]);
          }
        });
      });

      return set(`commentHighlights.${action.contentId}`, comments, state);

    case FETCH_COMMENTS_SUCCESS:
    case FETCH_ALL_REPLIES_SUCCESS:
    case FETCH_REPLIES_AFTER_REPLY_SUCCESS:
    case FETCH_REPLIES_BEFORE_REPLY_SUCCESS:
      let currentComments = getOr([], `${action.contentId}`, state).map(item => item);
      action.comments.comments.forEach(newComment => {
        newComment.parent = action.parent;
        newComment.initials = getInitials(newComment);
        newComment.displayName = getDisplayName(newComment);
        if (
          currentComments.filter(
            currentComment => currentComment.externalId === newComment.externalId
          ).length === 0
        ) {
          currentComments = currentComments.concat([omit(['importantReplies'], newComment)]);
        }

        const importantReplies = orderBy(['postedDateTime'], ['asc'], newComment.importantReplies);

        importantReplies.forEach(importantReply => {
          importantReply.parent = newComment.externalId;
          importantReply.initials = getInitials(importantReply);
          importantReply.displayName = getDisplayName(importantReply);
          importantReply.importantReply = true;
          if (
            currentComments.filter(
              currentComment => currentComment.externalId === importantReply.externalId
            ).length === 0
          ) {
            currentComments = currentComments.concat([importantReply]);
          }
        });
      });
      return set(`${action.contentId}`, currentComments, state);

    case COMMENT_LIKE_REQUEST:
    case COMMENT_UNLIKE_FAILURE:
      const likeCommentsKey = `${
        action.discussionHighlights
          ? `commentHighlights.${action.contentId}`
          : `${action.contentId}`
      }`;

      let likeComments = get(likeCommentsKey, state);
      let newLikeComments = likeComments.map(comment => {
        if (comment.externalId === action.commentId) {
          return {
            ...comment,
            likedByMe: true,
            numberOfLikes: Number(comment.numberOfLikes) + 1,
          };
        }
        return comment;
      });

      return set(likeCommentsKey, newLikeComments, state);
    case COMMENT_UNLIKE_REQUEST:
    case COMMENT_LIKE_FAILURE:
      const unlikeCommentsKey = `${
        action.discussionHighlights
          ? `commentHighlights.${action.contentId}`
          : `${action.contentId}`
      }`;

      let unlikeComments = get(unlikeCommentsKey, state);
      let newUnlikeComments = unlikeComments.map(comment => {
        if (comment.externalId === action.commentId) {
          return { ...comment, likedByMe: false, numberOfLikes: Number(comment.numberOfLikes) - 1 };
        }
        return comment;
      });
      return set(unlikeCommentsKey, newUnlikeComments, state);

    case CONTENT_COMMENT_SUCCESS:
      let currentContentComments = getOr([], `${action.contentId}`, state).map(item => item);
      action.newComment.parent = 0;
      action.newComment.initials = getInitials(action.newComment);
      action.newComment.displayName = getDisplayName(action.newComment);

      currentContentComments = [action.newComment].concat(currentContentComments);
      return set(`${action.contentId}`, currentContentComments, state);

    case REPLY_TO_COMMENT_SUCCESS:
      let currentReplyToComments = getOr([], `${action.contentId}`, state).map(item => item);
      action.newComment.parent = action.commentId;
      action.newComment.initials = getInitials(action.newComment);
      action.newComment.displayName = getDisplayName(action.newComment);
      action.newComment.importantReply = true;

      currentReplyToComments = [action.newComment].concat(currentReplyToComments);
      return set(`${action.contentId}`, currentReplyToComments, state);

    case REPLYING_TO_COMMENT:
      return set(
        'currentlyReplyingTo',
        action.contentId
          ? {
              contentId: action.contentId,
              commentId: action.commentId,
              replyingTo: action.replyingTo,
            }
          : null,
        state
      );

    case OPEN_COMMENT_REPLIES:
      let openedReplies = getOr([], 'openedReplies', state).map(item => item);
      if (openedReplies.indexOf(action.commentId) === -1) {
        openedReplies.push(action.commentId);
      }
      return set('openedReplies', openedReplies, state);

    case CLOSE_COMMENT_REPLIES:
      let closeOpenedReplies = getOr([], 'openedReplies', state).map(item => item);
      let index = closeOpenedReplies.indexOf(action.commentId);
      if (index > -1) {
        closeOpenedReplies.splice(index, 1);
      }
      return set('openedReplies', closeOpenedReplies, state);

    case CLOSE_ALL_COMMENT_REPLIES:
      return set('openedReplies', [], state);

    case CHANGE_REPLY_COUNT:
      let replyCountComments = getOr([], `${action.contentId}`, state);
      let newReplyCountComments = replyCountComments.map(comment => {
        if (comment.externalId === action.commentId) {
          return {
            ...comment,
            expandable: comment.numberOfReplies + action.amount > 0 ? true : false,
            numberOfReplies: Number(comment.numberOfReplies) + action.amount,
          };
        }
        return comment;
      });
      return set(`${action.contentId}`, newReplyCountComments, state);

    case DELETE_COMMENT_SUCCESS:
      let nonDeletedComments = getOr([], `${action.contentId}`, state).map(item => item);
      let toDelete = nonDeletedComments
        .map(comment => comment.externalId)
        .indexOf(action.commentId);
      if (toDelete > -1) {
        nonDeletedComments.splice(toDelete, 1);
      }
      return set(`${action.contentId}`, nonDeletedComments, state);

    case CLEAR_COMMENTS_FOR_CONTENT:
      return set(`${action.contentId}`, testComments, state); //[], state);
    case LOADING_COMMENTS_START:
      return action.loadType
        ? set(`loading.${action.contentId}.${action.parent}.${action.loadType}`, true, state)
        : set(`loading.${action.contentId}.${action.parent}`, true, state);
    case LOADING_COMMENTS_END:
      return action.loadType
        ? set(`loading.${action.contentId}.${action.parent}.${action.loadType}`, false, state)
        : set(`loading.${action.contentId}.${action.parent}`, false, state);
    case NAVIGATION_CHANGE:
    case NAVIGATION_LOADED:
      return set('openComments', getOr(null, 'comments', action.historyState), state);
    case COMMENT_ERROR:
      return set('commentFailure', action.errorMsg, state);
    case CLEAR_COMMENT_ERROR:
      return set('commentFailure', false, state);
    case OPEN_COMMENTS:
      return set('openComments', action.contentId, state);
    case PIN_COMMENT:
      return set(`pinComment.${action.contentId}`, action.pinComment, state);
    case UNPIN_COMMENT:
      return omit(['pinComment'], state);
    default:
      return state;
  }
};
