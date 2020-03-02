import React from 'react';
import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { openComments } from 'xi-core/comments/actions';
import { routes } from '../App';
import Comment from './Comment';

const ImportantReplies = ({
  importantReplies,
  contentId,
  focusTextArea,
  discussionHighlights,
  history,
  openContentComments,
}) => {
  const getNextImportantReplyId = index => {
    if (index < importantReplies.length - 1) {
      return importantReplies[index + 1].externalId;
    } else {
      return null;
    }
  };

  const handleCommentClick = ({ focusTextArea, pinComment }) => {
    if (!matchPath(history.location.pathname, routes.content)) {
      history.push(routes.content.path.replace(':contentId', contentId), {
        openComments: true,
      });
      return;
    }
    openContentComments(contentId, focusTextArea, pinComment);
  };

  return importantReplies.map((importantReply, index) => {
    return (
      <Comment
        key={'important_reply' + importantReply.externalId}
        comment={importantReply}
        contentId={contentId}
        focusTextArea={
          discussionHighlights
            ? () =>
                handleCommentClick({
                  focusTextArea: true,
                  pinComment: importantReply.externalId,
                })
            : focusTextArea
        }
        onLikesClick={
          discussionHighlights
            ? () =>
                handleCommentClick({
                  focusTextArea: false,
                  pinComment: importantReply.externalId,
                })
            : null
        }
        isImportantReply={true}
        nextImportantReplyId={getNextImportantReplyId(index)}
        discussionHighlights={discussionHighlights}
      />
    );
  });
};

const mapDispatchToProps = (dispatch, { history }) => ({
  openContentComments: (contentId, focusTextArea, pinComment) =>
    dispatch(openComments(contentId, history, focusTextArea, pinComment)),
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(ImportantReplies);
