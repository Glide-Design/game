import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { posFixedZIndex } from '../dimensions';

const drawerPositions = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const getToggledState = drawState => {
  if (drawState === drawerPositions.OPEN) {
    return drawerPositions.CLOSED;
  }
  if (drawState === drawerPositions.CLOSED) {
    return drawerPositions.OPEN;
  }
};

const drawPositionForState = {
  [drawerPositions.OPEN]: '0',
  [drawerPositions.CLOSED]: '-100vh',
};

const TransitionTime = 0.4;

const Container = styled.div`
  position: fixed;
  bottom: -100vh;
  width: 100%;
  height: 100%;
  z-index: ${posFixedZIndex.popUp};
  transition: bottom ${TransitionTime}s;
`;

class SlideUpDrawer extends React.Component {
  /* Avoiding state in this component - If the position state/open prop change quickly
     we see janky behaviour with animation due to the fact we have to wait on state updates
     taking effect.
   */
  position = drawerPositions.CLOSED;

  componentDidMount() {
    if (this.props.open) {
      this.slideUp();
    }
  }

  slideUp() {
    this.position = drawerPositions.OPEN;
    this.forceUpdate();
  }

  slideDown() {
    this.position = drawerPositions.CLOSED;
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.toggle();
    }
  }

  toggle = () => {
    const { finishedClosing } = this.props;

    const newDrawState = getToggledState(this.position);
    switch (newDrawState) {
      case drawerPositions.OPEN:
        return this.slideUp();
      case drawerPositions.CLOSED:
        if (finishedClosing) {
          setTimeout(finishedClosing, TransitionTime * 1000);
        }
        return this.slideDown();
      default:
        return;
    }
  };

  render() {
    const { children, className } = this.props;
    const bottom = drawPositionForState[this.position];
    return ReactDOM.createPortal(
      <Container style={{ bottom }} className={className}>
        {children}
      </Container>,
      document.getElementById('root')
    );
  }
}

export default SlideUpDrawer;
