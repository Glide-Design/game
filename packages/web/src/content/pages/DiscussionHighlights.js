import React from 'react';
import { isEmpty, compose } from 'lodash/fp';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { connect } from 'react-redux';
import withRequest from 'xi-core/withRequest';
import { Grey5 } from 'xi-core/colours';
import { getCommentHighlightsByContentId } from 'xi-core/comments/selectors';
import { openComments } from 'xi-core/comments/actions';
import { fetchComments } from 'xi-core/comments/actions';
import { CoreDevices } from '../../common/dimensions';
import Comment from '../../comments/Comment';
import { routes } from '../../App';

const Discussion = styled.div`

  position: relative;
  z-index: 1;
  
  ${props => (props.article ? 'padding: 18px 0px;' : 'padding: 18px 0px;')}
  
  @media ${CoreDevices.medium} {
    ${({ article }) => (article ? 'padding: 18px 0px;' : 'padding: 18px 32px 18px 22px;')}
  }

  @media ${CoreDevices.large} {
    ${({ article }) => (article ? 'padding: 18px 0px;' : 'padding: 18px 66px;')}
  }
`;

const Divider = styled.div`
  height: 8px;
  background: ${Grey5};

  @media ${CoreDevices.medium}, ${CoreDevices.small} {
    height: 4px;
  }
`;

const CommentWrapper = styled.div`
  padding-bottom: 10px;
`;

const DiscussionHighlights = ({
  history,
  contentId,
  comments = [],
  article = false,
  openContentComments,
}) => {
  const handleCommentClick = ({ focusTextArea, pinComment }) => {
    if (!matchPath(history.location.pathname, routes.content)) {
      history.push(routes.content.path.replace(':contentId', contentId), {
        openComments: true,
      });
      return;
    }
    openContentComments(contentId, focusTextArea, pinComment);
  };

  return (
    !isEmpty(comments) && (
      <React.Fragment>
        {!article && <Divider />}
        <Discussion article={article}>
          {comments.map(comment => {
            if (!comment.removed && comment.displayName) {
              return (
                <CommentWrapper key={comment.externalId}>
                  <Comment
                    comment={comment}
                    discussionHighlights={true}
                    contentId={contentId}
                    focusTextArea={() =>
                      handleCommentClick({ focusTextArea: true, pinComment: comment.externalId })
                    }
                    onLikesClick={() =>
                      handleCommentClick({ focusTextArea: false, pinComment: comment.externalId })
                    }
                  />
                </CommentWrapper>
              );
            } else {
              return null;
            }
          })}
        </Discussion>
      </React.Fragment>
    )
  );
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
  ),
  withRequest({
    requestAction: fetchComments,
    requestIdAlias: 'contentId',
    responseSelector: state => contentId => getCommentHighlightsByContentId(state)(contentId),
    responseAlias: 'comments',
    itemsPerPage: 10000,
    pageable: true,
  })
)(DiscussionHighlights);
