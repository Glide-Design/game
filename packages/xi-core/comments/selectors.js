import { get, getOr, find, orderBy } from 'lodash/fp';

export const REMOVED_BY = {
  USER: 'USER',
  MODERATOR: 'MODERATOR',
};

export const ERRORS = {
  BLOCKED: 'BLOCKED',
  COMMENT: 'COMMENT',
  ERROR: 'ERROR',
  REPLY: 'REPLY',
};

export const REPLIES_LOAD_TYPE = {
  ALL_REPLIES: 'all',
  MORE_REPLIES: 'more',
  PREVIOUS_REPLIES: 'previous',
};

export const PLACEHOLDERS = {
  NEXT_REPLY_ID: 'placeholder',
};

export const getCommentHighlightsByContentId = state => contentId => {
  let results = get(`comments.commentHighlights.${contentId}`, state);
  return results ? results.filter(comment => !comment.importantReply && !comment.removed) : [];
};

export const getCommentsByContentId = state => (contentId, time) => {
  let results = get(`comments.${contentId}.${time}`, state);
  return results; // ? results.filter(comment => comment.parent === 0) : [];
};

export const getRepliesByContentIdAndCommentId = state => (contentId, commentId) => {
  let results = get(`comments.${contentId}`, state);
  return results ? results.filter(comment => comment.parent === commentId) : [];
};

export const getRepliesBeforeReplyToComment = state => (contentId, parentId, replyId) => {
  let results = get(`comments.${contentId}`, state);
  let reply = find({ externalId: replyId }, results);

  return results
    ? orderBy(
        ['postedDateTime'],
        ['asc'],
        results.filter(comment => {
          return comment.parent === parentId && comment.postedDateTime < reply.postedDateTime;
        })
      )
    : [];
};

export const getRepliesToParentComment = state => (contentId, parentId) => {
  let results = get(`comments.${contentId}`, state);
  return results
    ? orderBy(['postedDateTime'], ['asc'], results.filter(comment => comment.parent === parentId))
    : [];
};

export const getRepliesAfterReplyToComment = state => (
  contentId,
  parentId,
  replyId,
  loadType,
  nextImportantReplyId
) => {
  let results = get(`comments.${contentId}`, state);
  let reply = find({ externalId: replyId }, results);
  let nextReply =
    nextImportantReplyId !== PLACEHOLDERS.NEXT_REPLY_ID
      ? find({ externalId: nextImportantReplyId }, results)
      : null;

  return results
    ? results.filter(comment => {
        return (
          comment.parent === parentId &&
          comment.postedDateTime > reply.postedDateTime &&
          (nextReply ? comment.postedDateTime < nextReply.postedDateTime : true)
        );
      })
    : [];
};

export const getReplyingTo = state => {
  return get('comments.currentlyReplyingTo', state);
};

export const showReplies = state => commentId => {
  return !!(getOr([], 'comments.openedReplies', state).indexOf(commentId) > -1);
};

export const isLoading = state => (contentId, parent, loadType = null) => {
  return loadType
    ? get(`comments.loading.${contentId}.${parent}.${loadType}`, state)
    : get(`comments.loading.${contentId}.${parent}`, state);
};

export const currentOpenComments = state => {
  return get('comments.openComments', state);
};

export const getPinnedComment = state => contentId => {
  if (get('comments.pinComment', state)) {
    return get(`comments.pinComment.${contentId}`, state);
  }
  return null;
};

export const getImportantRepliesByContentIdAndCommentId = state => (
  commentId,
  contentId,
  discussionHighlights = false,
  time
) => {
  let results = {};

  if (!discussionHighlights) {
    results = get(`comments.${contentId}.${time}`, state);
  } else {
    results = get(`comments.commentHighlights.${contentId}`, state);
  }

  return results
    ? orderBy(
        ['postedDateTime'],
        ['asc'],
        results.filter(comment => comment.parent === commentId && comment.importantReply === true)
      )
    : [];
};

export const getCommentError = state => get('comments.commentFailure', state);

export const getErrorMessages = intl => ({
  [ERRORS.BLOCKED]: intl.formatMessage({
    id: 'comment.blockedError',
    defaultMessage: 'You have been blocked from commenting',
  }),
  [ERRORS.COMMENT]: intl.formatMessage({
    id: 'comment.commentError',
    defaultMessage: 'Error adding comment. Please try again later.',
  }),
  [ERRORS.ERROR]: intl.formatMessage({
    id: 'comment.error',
    defaultMessage: 'Error',
  }),
  [ERRORS.REPLY]: intl.formatMessage({
    id: 'comment.replyError',
    defaultMessage: 'Error adding reply. Please try again later.',
  }),
});
