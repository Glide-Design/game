import React from 'react';
import throttle from 'lodash/throttle';
import styled from 'styled-components';

const THROTTLE_TOUCH_MOVE_EVENT = 20;
const DEADZONE_HEIGHT = 50; // maximum touch distance at which component doesn't react to pulling
const REFRESH_THRESHOLD = 200; // minimal distance at which the refresh triggers

const Relative = styled.div`
  position: relative;
`;

class PullToRefresh extends React.PureComponent {
  ref = React.createRef();
  startClientY = 0;
  startWindowScroll = 0;

  state = {
    moving: false,
    expandHeight: 0,
  };

  onTouchStart = event => {
    this.startClientY = event.changedTouches[0].clientY;
    this.startWindowScroll = window.scrollY;

    this.setState({ moving: true });
  };

  onTouchMove = event => {
    const { moving } = this.state;
    const { deadzoneHeight = DEADZONE_HEIGHT } = this.props;

    const currentY = event.changedTouches[0].clientY;
    const deltaY = this.startClientY - currentY < 0 ? this.startClientY - currentY : 0;
    const expandHeight =
      deltaY + this.startWindowScroll < -deadzoneHeight ? -deltaY - deadzoneHeight : 0;

    if (moving) {
      this.setState({
        expandHeight,
      });
    }
  };

  onTouchEnd = event => {
    const { onRefresh, threshold = REFRESH_THRESHOLD } = this.props;
    const { expandHeight } = this.state;

    if (expandHeight >= threshold) {
      onRefresh && onRefresh();
    }
    this.setState({ expandHeight: 0, moving: false });
  };

  componentDidMount() {
    const { current: element } = this.ref;

    element.addEventListener('touchstart', this.onTouchStart, false);
    element.addEventListener(
      'touchmove',
      throttle(this.onTouchMove, THROTTLE_TOUCH_MOVE_EVENT),
      false
    );
    element.addEventListener('touchend', this.onTouchEnd, false);
  }

  componentWillUnmount() {
    const { current: element } = this.ref;

    element.removeEventListener('touchstart', this.onTouchStart, false);
    element.removeEventListener('touchmove', this.onTouchMove, false);
    element.removeEventListener('touchend', this.onTouchEnd, false);
  }

  render() {
    const { children, threshold = REFRESH_THRESHOLD } = this.props;
    const { expandHeight } = this.state;

    return (
      <div ref={this.ref}>
        <div style={{ minHeight: Math.min(threshold, expandHeight) }} />
        <Relative>{children}</Relative>
      </div>
    );
  }
}

export default PullToRefresh;
