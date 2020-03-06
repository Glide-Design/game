import React from 'react';
import { connect } from 'react-redux';
import { getCommentsByContentId } from 'xi-core/comments/selectors';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from './Comment';

class CrossFadeComments extends React.Component {
  state = { mounted: false };

  componentDidMount() {
    this.setState({ mounted: true });
  }
  render() {
    const { oldComment, newComment } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="commentCrossFade"
        transitionLeaveTimeout={500}
        transitionEnterTimeout={500}
      >
        {newComment}
        {oldComment && !this.state.mounted ? oldComment : null}
      </ReactCSSTransitionGroup>
    );
  }
}

export default WrappedCommentBlock => {
  class CommentsDisplayLogic extends React.Component {
    state;

    constructor(props) {
      super(props);
      this.state = {
        lastComments: props.comments || [],
        currentComments: props.comments || [],
      };
    }

    componentDidUpdate = () => {
      if (this.props.comments.length > 0) {
        if (
          !this.state.currentComments.length ||
          this.state.currentComments.some((c, i) =>
            !this.props.comments[i] ? true : c.externalId !== this.props.comments[i].externalId
          )
        ) {
          this.setState({
            lastComments: this.state.currentComments,
            currentComments: this.props.comments,
          });
        }
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
        <ReactCSSTransitionGroup
          transitionName="commentFade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
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
        </ReactCSSTransitionGroup>
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
