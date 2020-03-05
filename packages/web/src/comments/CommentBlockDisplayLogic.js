import React from 'react';
import { connect } from 'react-redux';
import { getCommentsByContentId } from 'xi-core/comments/selectors';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from './Comment';

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
        if (this.state.currentComments.length !== this.props.comments.length) {
          this.setState({
            lastComments: this.state.currentComments,
            currentComments: this.props.comments,
          });
        }
      }
    };

    renderComments = () => {
      const { replyId, contentId, focusTextArea } = this.props;
      const { lastComments = [], currentComments = [] } = this.state;

      return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          {currentComments.map((comment, i) => {
            return comment.externalId !== replyId ? (
              <div key={i} style={{ position: 'relative' }}>
                <Comment
                  key={`comment-${comment.externalId}-${comment.owner}`}
                  comment={comment}
                  contentId={contentId}
                  focusTextArea={focusTextArea}
                  time={this.props.time}
                  commentBeingReplaced={lastComments[i]}
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
