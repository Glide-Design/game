import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { injectGlobal, keyframes } from 'styled-components';

const CrossFadeDuration = 750;

const zoom = keyframes`
  from {
    transform: scale(1.05);
  }

  to {
    transform: scale(1.0);
  }
`;

injectGlobal`
  .commentCrossFade-leave {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 1;
    animation: ${zoom} 0.5s ease-in-out;
  }

  .commentCrossFade-leave.commentCrossFade-leave-active {
    opacity: 0.1;
    transition: opacity ${CrossFadeDuration}ms ease-out;
  }

  .commentCrossFade-enter {
    opacity: 0.01;
  }

  .commentCrossFade-enter.commentCrossFade-enter-active {
    opacity: 1;
    transition: opacity ${CrossFadeDuration}ms ease-in;
  }
`;

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
        transitionLeaveTimeout={CrossFadeDuration}
        transitionEnterTimeout={CrossFadeDuration}
      >
        {newComment}
        {oldComment && !this.state.mounted ? oldComment : null}
      </ReactCSSTransitionGroup>
    );
  }
}

export default CrossFadeComments;
