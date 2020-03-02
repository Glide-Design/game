import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { getTargetDevice } from '../../state/app/selectors';
import { SIDE_MARGIN_PX, posFixedZIndex } from '../dimensions';
import { FixedFullScreenContainerAnimated } from '../FixedFullScreenContainer';
import SlideUpDrawer from './SlideUpDrawer';
import Modal from './Modal';

ReactModal.setAppElement('#root');

const StyledSlideUpDrawer = styled(SlideUpDrawer)`
  width: 100%;
  height: 100%;
`;

class Overlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The optional state.memory is provided to help keep the contents of the overlay mounted
      // (and therefore visible) during its slide transition off the screen.
      memory: props.memory,
      fullScreen: props.fullScreen,
    };
  }

  componentDidUpdate(prevProps) {
    this.updateMemoryIfTruthy(prevProps);

    if (this.hasClosed(prevProps)) {
      const { targetDevice, finishedClosing } = this.props;
      if (targetDevice !== 'tiny' && targetDevice !== 'small') {
        if (finishedClosing) {
          finishedClosing();
        }
      }
    }
  }

  updateMemoryIfTruthy = prevProps => {
    const { memory } = this.props;
    if (memory && prevProps.memory !== memory) {
      this.setState({ memory });
    }
  };

  hasClosed = prevProps => {
    return !this.props.open && prevProps.open;
  };

  defaultModalStyles = ({ targetDevice }) => {
    const smallDevice = targetDevice === 'small' || targetDevice === 'tiny';
    const positionOffset = !smallDevice ? `${SIDE_MARGIN_PX[targetDevice]}px` : '0';
    return {
      overlay: {
        zIndex: posFixedZIndex.popUp,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      content: {
        border: '10px solid white',
        background: 'black',
        borderRadius: 0,
        padding: 0,
        top: positionOffset,
        left: positionOffset,
        right: positionOffset,
        bottom: positionOffset,
      },
    };
  };

  render() {
    const {
        targetDevice,
        open,
        children,
        finishedClosing: slideUpDrawerFinishedClosing,
        delayStart,
        className,
        modalStyles = this.defaultModalStyles,
        userExperience,
      } = this.props,
      sidePanelUx = userExperience === 'sidePanel';

    const { memory, fullScreen } = this.state;

    if (!sidePanelUx && (targetDevice === 'small' || targetDevice === 'tiny')) {
      return (
        <StyledSlideUpDrawer
          open={open}
          finishedClosing={slideUpDrawerFinishedClosing}
          delayStart={delayStart}
          className={className}
        >
          {children({ memory })}
        </StyledSlideUpDrawer>
      );
    } else {
      if (!open) {
        return null;
      }

      if (fullScreen) {
        return (
          <FixedFullScreenContainerAnimated>
            {children({ memory })}
          </FixedFullScreenContainerAnimated>
        );
      } else {
        return (
          <Modal modalStyles={modalStyles({ targetDevice })} userExperience={userExperience}>
            {({ onClose }) => children({ onClose, memory })}
          </Modal>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  targetDevice: getTargetDevice(state),
});

export default connect(mapStateToProps)(Overlay);
