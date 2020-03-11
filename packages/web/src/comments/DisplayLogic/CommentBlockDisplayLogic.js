import React from 'react';
import { connect } from 'react-redux';
import { getCommentsByContentId } from 'xi-core/comments/selectors';
import Comment from '../Comment';
import CrossFadeComments from './CrossFadeComments';
import FadeComments from './FadeComments';
import mergeNewComments from './mergeNewComments';

export default WrappedCommentBlock => {
  class CommentsDisplayLogic extends React.Component {
    state;

    constructor(props) {
      super(props);
      const comments = props.comments || [];
      this.state = {
        lastComments: comments,
        currentComments: comments,
      };
    }

    newCommentsAreAvailable = (oldComments, newComments) => {
      const { currentComments } = this.state;
      return (
        newComments.length > 0 &&
        (!oldComments.length ||
          !currentComments.length ||
          oldComments.some((c, i) =>
            !newComments[i] ? true : c.externalId !== newComments[i].externalId
          ))
      );
    };

    componentDidUpdate = ({ comments: oldComments }) => {
      const { comments: newComments, time } = this.props;

      if (this.newCommentsAreAvailable(oldComments, newComments)) {
        const { currentComments } = this.state;
        this.setState({
          lastComments: currentComments,
          currentComments: mergeNewComments(currentComments, newComments, { time }),
        });
      }
    };

    renderComment = (comment, absolute = false) => {
      const { contentId, focusTextArea, time } = this.props;
      return (
        <Comment
          key={`comment-${comment.externalId}-${comment.owner}`}
          comment={comment}
          contentId={contentId}
          focusTextArea={focusTextArea}
          time={time}
        />
      );
    };

    renderComments = () => {
      const { replyId } = this.props;
      const { lastComments = [], currentComments = [] } = this.state;

      return (
        <FadeComments>
          {currentComments.map((comment, i) => {
            return comment.externalId !== replyId ? (
              <div key={i} style={{ position: 'relative' }}>
                <CrossFadeComments
                  newComment={this.renderComment(comment)}
                  oldComment={lastComments[i] ? this.renderComment(lastComments[i]) : null}
                />
              </div>
            ) : null;
          })}
        </FadeComments>
      );
    };

    render() {
      const { comments, ...passThroughProps } = this.props;
      return <WrappedCommentBlock {...passThroughProps} renderComments={this.renderComments} />;
    }
  }

  const mapStateToProps = (state, { contentId, time }) => {
    return {
      comments: getCommentsByContentId(state)(contentId, Math.floor(time)),
    };
  };

  return connect(mapStateToProps)(CommentsDisplayLogic);
};
