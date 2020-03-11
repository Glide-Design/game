import React from 'react';
import { injectGlobal } from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FadeDuration = 500;

injectGlobal`
  .commentFade-enter {
    opacity: 0.01;
  }

  .commentFade-enter.commentFade-enter-active {
    opacity: 1;
    transition: opacity ${FadeDuration}ms ease-in;
  }

  .commentFade-leave {
    opacity: 1;
  }

  .commentFade-leave.commentFade-leave-active {
    opacity: 0.01;
    transition: opacity ${FadeDuration}ms ease-in;
  }
`;

export default ({ children }) => (
  <ReactCSSTransitionGroup
    transitionName="commentFade"
    transitionEnterTimeout={FadeDuration}
    transitionLeaveTimeout={FadeDuration}
  >
    {children}
  </ReactCSSTransitionGroup>
);
