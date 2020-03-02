import { getOr, orderBy, concat } from 'lodash/fp';
import { getName, getAvatar, getForename, getSurname, isVip } from 'xi-core/member/selectors';

import { PropertyKeys } from 'xi-core/analytics/analyticEvents';

import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { blockCommenting } from '../signup/actions';
import { ERRORS, getPinnedComment } from './selectors';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const FETCH_REPLIES_REQUEST = 'FETCH_REPLIES_REQUEST';
export const FETCH_REPLIES_SUCCESS = 'FETCH_REPLIES_SUCCESS';

export const FETCH_COMMENTS_HIGHLIGHTS_REQUEST = 'FETCH_COMMENTS_HIGHLIGHTS_REQUEST';
export const FETCH_COMMENTS_HIGHLIGHTS_SUCCESS = 'FETCH_COMMENTS_HIGHLIGHTS_SUCCESS';

export const FETCH_REPLIES_AFTER_REPLY_REQUEST = 'FETCH_REPLIES_AFTER_REPLY_REQUEST';
export const FETCH_REPLIES_AFTER_REPLY_SUCCESS = 'FETCH_REPLIES_AFTER_REPLY_SUCCESS';

export const FETCH_REPLIES_BEFORE_REPLY_REQUEST = 'FETCH_REPLIES_BEFORE_REPLY_REQUEST';
export const FETCH_REPLIES_BEFORE_REPLY_SUCCESS = 'FETCH_REPLIES_BEFORE_REPLY_SUCCESS';

export const FETCH_ALL_REPLIES_REQUEST = 'FETCH_ALL_REPLIES_REQUEST';
export const FETCH_ALL_REPLIES_SUCCESS = 'FETCH_ALL_REPLIES_SUCCESS';

const createComment = (state, externalId, message) => ({
  externalId,
  comment: message,
  name: getName(state),
  forename: getForename(state),
  surname: getSurname(state),
  displayName: getName(state),
  avatarUrl: getAvatar(state),
  blocked: false,
  expandable: false,
  likedByMe: false,
  numberOfLikes: 0,
  numberOfReplies: 0,
  owner: true,
  postedDateTime: new Date().getTime(),
  removed: false,
  reported: false,
  vip: isVip(state),
  // TODO - docs for the member API are currently broken so I'm not sure where to get this data from
  star: false,
  starId: '',
});

export const fetchComments = (contentId, paging = {}) => async (dispatch, getState) => {
  dispatch({ type: FETCH_COMMENTS_HIGHLIGHTS_REQUEST, contentId });

  const state = getState();

  const commentsRequest = fetch(ep(state)('showReel', { contentId }), {
    params: {
      ...paging,
    },
  });

  const commentsResponse = await dispatch(commentsRequest);

  const comments = !!commentsResponse
    ? orderBy(['postedDateTime'], ['desc'], commentsResponse.data.content)
    : {};

  dispatch({ type: FETCH_COMMENTS_HIGHLIGHTS_SUCCESS, contentId, comments });
};

export const fetchCommentsForContent = (contentId, paging = {}) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_COMMENTS_REQUEST, contentId });
  dispatch(startLoadingComments(contentId, 0));

  let pinnedComment = [];
  const pinnedCommentId = getPinnedComment(state)(contentId);
  if (pinnedCommentId) {
    const pinnedCommentRequest = fetch(
      ep(state)('fetchACommentByContentIdAndCommentId', { contentId, commentId: pinnedCommentId })
    );
    const { data } = await dispatch(pinnedCommentRequest);
    pinnedComment.push(data);
  }

  const commentsRequest = fetch(ep(state)('contentComments', { contentId }), {
    params: {
      ...paging,
    },
  });
  const { data } = await dispatch(commentsRequest);

  const comments = concat(pinnedComment, data.content);

  dispatch({
    type: FETCH_COMMENTS_SUCCESS,
    contentId,
    parent: 0,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, 0));
};

export const getRepliesToComment = (contentId, commentId, paging = {}) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST, commentId });
  dispatch(startLoadingComments(contentId, commentId));

  const state = getState();

  const endpoint = ep(state)('getRepliesToComment', { contentId, commentId });

  const repliesRequest = fetch(endpoint, {
    params: {
      ...paging,
    },
  });
  const { data } = await dispatch(repliesRequest);

  const comments = data.content;

  dispatch({
    type: FETCH_COMMENTS_SUCCESS,
    contentId,
    commentId,
    parent: commentId,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, commentId));
};

export const fetchRepliesAfterReplyToComment = (
  contentId,
  parentId,
  replyId,
  loadType,
  nextImportantReplyId,
  paging = {}
) => async (dispatch, getState) => {
  dispatch({ type: FETCH_REPLIES_AFTER_REPLY_REQUEST, parentId, replyId });
  dispatch(startLoadingComments(contentId, parentId, loadType + ',' + replyId));

  const state = getState();

  const endpoint = ep(state)('getRepliesAfterReplyToComment', { replyId, parentId });

  const repliesRequest = fetch(endpoint, {
    params: {
      sort: 'postedDateTime',
      'postedDateTime.dir': 'asc',
      ...paging,
      after: true,
    },
  });
  const { data } = await dispatch(repliesRequest);

  const comments = data.content;
  dispatch({
    type: FETCH_REPLIES_AFTER_REPLY_SUCCESS,
    contentId,
    parentId,
    replyId,
    loadType,
    parent: parentId,
    nextImportantReplyId,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, parentId, loadType + ',' + replyId));
};

export const fetchRepliesBeforeReplyToComment = (
  contentId,
  parentId,
  replyId,
  loadType,
  nextImportantReplyId,
  paging = {}
) => async (dispatch, getState) => {
  dispatch({ type: FETCH_REPLIES_BEFORE_REPLY_REQUEST, parentId, replyId });
  dispatch(startLoadingComments(contentId, parentId, loadType + ',' + replyId));

  const state = getState();

  const endpoint = ep(state)('getRepliesAfterReplyToComment', { replyId, parentId });

  const repliesRequest = fetch(endpoint, {
    params: {
      ...paging,
      sort: 'postedDateTime',
      'postedDateTime.dir': 'desc',
      after: false,
    },
  });
  const { data } = await dispatch(repliesRequest);

  const comments = data.content;
  dispatch({
    type: FETCH_REPLIES_BEFORE_REPLY_SUCCESS,
    contentId,
    parentId,
    replyId,
    parent: parentId,
    loadType,
    nextImportantReplyId,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, parentId, loadType + ',' + replyId));
};

export const fetchRepliesInBetweenTwoRepliesToComment = (
  contentId,
  parentId,
  replyId,
  loadType,
  nextImportantReplyId,
  paging = {}
) => async (dispatch, getState) => {
  dispatch({ type: FETCH_REPLIES_AFTER_REPLY_REQUEST, parentId, replyId });
  dispatch(startLoadingComments(contentId, parentId, loadType + ',' + replyId));

  const state = getState();

  const endpoint = ep(state)('getRepliesInbetweenTwoRepliesToComment', {
    replyId,
    parentId,
    nextImportantReplyId,
  });

  const repliesRequest = fetch(endpoint, {
    params: {
      sort: 'postedDateTime',
      'postedDateTime.dir': 'asc',
      ...paging,
      after: false,
    },
  });
  const { data } = await dispatch(repliesRequest);

  const comments = data.content;
  dispatch({
    type: FETCH_REPLIES_AFTER_REPLY_SUCCESS,
    contentId,
    parentId,
    replyId,
    parent: parentId,
    loadType,
    nextImportantReplyId,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, parentId, loadType + ',' + replyId));
};

export const fetchAllRepliesToComment = (
  contentId,
  parentId,
  replyId,
  loadType,
  nextImportantReplyId,
  paging = {}
) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ALL_REPLIES_REQUEST, parentId, replyId });
  dispatch(startLoadingComments(contentId, parentId, loadType + ',' + replyId));

  const state = getState();

  const endpoint = ep(state)('getRepliesToComment', { contentId, commentId: parentId });

  const repliesRequest = fetch(endpoint, {
    params: {
      ...paging,
    },
  });
  const { data } = await dispatch(repliesRequest);

  const comments = data.content;
  dispatch({
    type: FETCH_ALL_REPLIES_SUCCESS,
    contentId,
    parentId,
    replyId,
    loadType,
    parent: parentId,
    nextImportantReplyId,
    comments: {
      contentId,
      comments,
      totalElements: data.totalElements,
      page: data.number,
    },
  });
  dispatch(endLoadingComments(contentId, parentId, loadType + ',' + replyId));
};

export const resetReplies = (contentId, commentId) => dispatch => {
  dispatch({
    type: FETCH_REPLIES_SUCCESS,
    contentId,
    commentId,
    comments: {
      contentId,
      comments: [],
      totalElements: 0,
      page: 0,
    },
  });
};

export const setLikeStatus = (
  isLiked,
  contentId,
  commentId,
  discussionHighlights = false
) => dispatch => {
  return isLiked
    ? dispatch(unlikeAComment(contentId, commentId, discussionHighlights))
    : dispatch(likeAComment(contentId, commentId, discussionHighlights));
};

export const COMMENT_LIKE_REQUEST = 'COMMENT_LIKE_REQUEST';
export const COMMENT_LIKE_SUCCESS = 'COMMENT_LIKE_SUCCESS';
export const COMMENT_LIKE_FAILURE = 'COMMENT_LIKE_FAILURE';

export const likeAComment = (contentId, commentId, discussionHighlights) => async (
  dispatch,
  getState
) => {
  dispatch({ type: COMMENT_LIKE_REQUEST, contentId, commentId, discussionHighlights });

  const state = getState();

  try {
    await dispatch(
      fetch(ep(state)('likeAComment', { contentId, commentId }), {
        method: 'post',
      })
    );
    dispatch({ type: COMMENT_LIKE_SUCCESS, contentId, commentId, discussionHighlights });
  } catch (e) {
    dispatch({ type: COMMENT_LIKE_FAILURE, contentId, commentId, discussionHighlights });
  }
};

export const COMMENT_UNLIKE_REQUEST = 'COMMENT_UNLIKE_REQUEST';
export const COMMENT_UNLIKE_SUCCESS = 'COMMENT_UNLIKE_SUCCESS';
export const COMMENT_UNLIKE_FAILURE = 'COMMENT_UNLIKE_FAILURE';

export const unlikeAComment = (contentId, commentId, discussionHighlights) => async (
  dispatch,
  getState
) => {
  dispatch({ type: COMMENT_UNLIKE_REQUEST, contentId, commentId, discussionHighlights });

  const state = getState();

  try {
    await dispatch(
      fetch(ep(state)('likeAComment', { contentId, commentId, discussionHighlights }), {
        method: 'delete',
      })
    );
    dispatch({ type: COMMENT_UNLIKE_SUCCESS, contentId, commentId, discussionHighlights });
    dispatch(commentSpotlightInteraction(PropertyKeys.COMMENT_SPOTLIGHT.COMMENT_UNLIKED));
  } catch (e) {
    dispatch({ type: COMMENT_UNLIKE_FAILURE, contentId, commentId, discussionHighlights });
  }
};

export const addComment = (contentId, comment, replyingTo) => async dispatch => {
  return replyingTo
    ? dispatch(replyToComment(contentId, replyingTo.commentId, comment))
    : dispatch(commentOnContent(contentId, comment));
};

export const CONTENT_COMMENT_REQUEST = 'CONTENT_COMMENT_REQUEST';
export const CONTENT_COMMENT_SUCCESS = 'CONTENT_COMMENT_SUCCESS';

export const commentOnContent = (contentId, comment) => async (dispatch, getState) => {
  dispatch(startLoadingComments(contentId, 0));

  const state = getState();

  try {
    dispatch({ type: CONTENT_COMMENT_REQUEST, contentId });
    const commentResponse = await dispatch(
      fetch(ep(state)('postContentComment', { contentId }), {
        method: 'post',
        data: {
          comment: comment,
        },
      })
    );

    const { externalId } = commentResponse.data;

    const newComment = createComment(state, externalId, comment);

    dispatch({ type: CONTENT_COMMENT_SUCCESS, contentId, newComment });
  } catch (error) {
    if (getOr(0, 'response.status', error) === 400 && comment.length) {
      dispatch(blockCommenting(true));
      dispatch(addCommentError(ERRORS.BLOCKED));
    } else {
      dispatch(addCommentError(ERRORS.COMMENT));
    }
  } finally {
    dispatch(endLoadingComments(contentId, 0));
  }
};

export const REPLY_TO_COMMENT_REQUEST = 'REPLY_TO_COMMENT_REQUEST';
export const REPLY_TO_COMMENT_SUCCESS = 'REPLY_TO_COMMENT_SUCCESS';

export const replyToComment = (contentId, commentId, comment) => async (dispatch, getState) => {
  const state = getState();

  dispatch(startLoadingComments(contentId, commentId));
  try {
    dispatch({ type: REPLY_TO_COMMENT_REQUEST, contentId });
    const commentResponse = await dispatch(
      fetch(ep(state)('postReplyToComment', { contentId, commentId }), {
        method: 'post',
        data: {
          comment: comment,
        },
      })
    );
    const { externalId } = commentResponse.data;

    const newComment = createComment(state, externalId, comment);

    dispatch({ type: REPLY_TO_COMMENT_SUCCESS, contentId, newComment, commentId });
    dispatch(openReplies(commentId));
    dispatch(changeReplyCount(commentId, contentId, 1));
  } catch (error) {
    if (getOr(0, 'response.status', error) === 400 && comment.length) {
      dispatch(blockCommenting(true));
      dispatch(addCommentError(ERRORS.BLOCKED));
    } else {
      dispatch(addCommentError(ERRORS.REPLY));
    }
  } finally {
    dispatch(endLoadingComments(contentId, commentId));
  }
};

export const CHANGE_REPLY_COUNT = 'CHANGE_REPLY_COUNT';

export const changeReplyCount = (commentId, contentId, amount) => async dispatch => {
  dispatch({ type: CHANGE_REPLY_COUNT, commentId, contentId, amount });
};

export const REPLYING_TO_COMMENT = 'REPLYING_TO_COMMENT';

export const onReplyComment = (contentId, commentId, replyingTo) => dispatch => {
  dispatch({ type: REPLYING_TO_COMMENT, contentId, commentId, replyingTo });
};

export const OPEN_COMMENT_REPLIES = 'OPEN_COMMENT_REPLIES';

export const openReplies = commentId => async dispatch => {
  dispatch({ type: OPEN_COMMENT_REPLIES, commentId });
};

export const CLOSE_COMMENT_REPLIES = 'CLOSE_COMMENT_REPLIES';

export const closeReplies = commentId => async dispatch => {
  dispatch({ type: CLOSE_COMMENT_REPLIES, commentId });
};

export const CLOSE_ALL_COMMENT_REPLIES = 'CLOSE_ALL_COMMENT_REPLIES';

export const closeAllReplies = () => async dispatch => {
  dispatch({ type: CLOSE_ALL_COMMENT_REPLIES });
};

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

export const deleteComment = (comment, contentId) => async (dispatch, getState) => {
  const state = getState();
  let commentId = comment.externalId;
  dispatch({ type: DELETE_COMMENT_REQUEST, commentId });
  await dispatch(
    fetch(ep(state)('deleteComment', { contentId, commentId }), {
      method: 'delete',
    })
  );
  dispatch({ type: DELETE_COMMENT_SUCCESS, commentId, contentId });
  dispatch(changeReplyCount(comment.parent, contentId, -1));
};

export const REPORT_COMMENT_REQUEST = 'REPORT_COMMENT_REQUEST';
export const REPORT_COMMENT_SUCCESS = 'REPORT_COMMENT_SUCCESS';

export const reportComment = (comment, contentId) => async (dispatch, getState) => {
  const state = getState();
  let commentId = comment.externalId;
  dispatch({ type: REPORT_COMMENT_REQUEST, commentId });
  await dispatch(
    fetch(ep(state)('reportComment', { contentId, commentId }), {
      method: 'post',
    })
  );
  dispatch({ type: REPORT_COMMENT_SUCCESS, commentId, contentId });
};

export const CLEAR_COMMENTS_FOR_CONTENT = 'CLEAR_COMMENTS_FOR_CONTENT';
export const CLEAR_PAGING_DATA = 'CLEAR_PAGING_DATA';

export const clearContentComments = contentId => async dispatch => {
  dispatch({ type: CLEAR_COMMENTS_FOR_CONTENT, contentId });
  dispatch({ type: CLEAR_PAGING_DATA, contentId });
  dispatch(closeAllReplies());
};

export const LOADING_COMMENTS_START = 'LOADING_COMMENTS_START';
export const LOADING_COMMENTS_END = 'LOADING_COMMENTS_END';

export const startLoadingComments = (contentId, parent, loadType = null) => async dispatch => {
  dispatch({
    type: LOADING_COMMENTS_START,
    contentId,
    parent,
    loadType,
  });
};

export const endLoadingComments = (contentId, parent, loadType = null) => async dispatch => {
  dispatch({
    type: LOADING_COMMENTS_END,
    contentId,
    parent,
    loadType,
  });
};

export const OPEN_COMMENTS = 'OPEN_COMMENTS';
export const CLOSE_COMMENTS = 'CLOSE_COMMENTS';

export const openComments = (
  contentId,
  history,
  focusTextArea = false,
  pinComment = null
) => async dispatch => {
  history.push(history.location.pathname, {
    comments: contentId,
    focusTextArea: focusTextArea,
    pinComment: pinComment,
  });

  if (pinComment) {
    dispatch(setPinComment(contentId, pinComment));
  }

  dispatch(setCurrentComments(contentId));
};

export const setCurrentComments = contentId => async dispatch => {
  dispatch({ type: OPEN_COMMENTS, contentId });
};

export const closeComments = history => async dispatch => {
  history && history.goBack();
  dispatch(onReplyComment());
  dispatch(unPinComment());
  dispatch({ type: CLOSE_COMMENTS });
};

export const COMMENT_ERROR = 'COMMENT_ERROR';
export const addCommentError = errorMsg => async dispatch => {
  dispatch({ type: COMMENT_ERROR, errorMsg });
};

export const CLEAR_COMMENT_ERROR = 'CLEAR_COMMENT_ERROR';
export const clearCommentError = () => async dispatch => {
  dispatch({ type: CLEAR_COMMENT_ERROR });
};

export const PIN_COMMENT = 'PIN_COMMENT';
export const setPinComment = (contentId, pinComment) => async dispatch => {
  dispatch({ type: PIN_COMMENT, contentId, pinComment });
};

export const UNPIN_COMMENT = 'UNPIN_COMMENT';
export const unPinComment = () => async dispatch => {
  dispatch({ type: UNPIN_COMMENT });
};

export const COMMENT_SPOTLIGHT_ACTION = 'COMMENT_SPOTLIGHT_ACTION';

export const commentSpotlightInteraction = ctaKey => dispatch => {
  dispatch({ type: COMMENT_SPOTLIGHT_ACTION, [ctaKey]: true, Source: 'Comment spotlight' });
};

export const COMMENTS_PAGE_ACTION = 'COMMENTS_PAGE_ACTION';

export const commentsPageInteraction = ctaKey => dispatch => {
  dispatch({ type: COMMENTS_PAGE_ACTION, [ctaKey]: true, Source: 'Comments page ONLY' });
};

export const COMMENTS_DEEP_LINK_ACTION = 'COMMENTS_DEEP_LINK_ACTION';

export const commentsDeepLinkInteraction = ctaKey => dispatch => {
  dispatch({ type: COMMENTS_DEEP_LINK_ACTION, [ctaKey]: true });
};
