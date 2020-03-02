import React from 'react';
import ReactModal from 'react-modal';

const openingTime = 200;
const closingTime = 200;

class Modal extends React.PureComponent {
  state = {
    isOpen: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  transitionModalStyles = modalStyles => {
    const { isOpen } = this.state,
      { userExperience } = this.props,
      sidePanelUx = userExperience === 'sidePanel';

    return {
      overlay: {
        ...modalStyles.overlay,
        opacity: `${isOpen ? '1' : '0'}`,
        transition: `opacity ${isOpen ? openingTime : closingTime}ms ease-in`,
      },
      content: {
        ...modalStyles.content,
        top: !sidePanelUx
          ? `${isOpen ? modalStyles.content.top || '0' : '100vh'}`
          : modalStyles.content.top,
        left: sidePanelUx
          ? `${isOpen ? modalStyles.content.left || '0' : '150vh'}`
          : modalStyles.content.left,
        right: sidePanelUx
          ? `${isOpen ? modalStyles.content.right || '0' : '-150vh'}`
          : modalStyles.content.right,
        transition: sidePanelUx
          ? `left ${isOpen ? openingTime : closingTime}ms ease-in, 
                     right ${isOpen ? openingTime : closingTime}ms ease-in`
          : `top ${isOpen ? openingTime : closingTime}ms ease-in`,
      },
    };
  };

  onClose = userFunction => () => {
    this.setState({ isOpen: false });
    this.timeout = setTimeout(userFunction, closingTime);
  };

  render() {
    const { children, modalStyles, ...passThroughProps } = this.props;

    return (
      <ReactModal
        isOpen={true}
        parentSelector={() => document.getElementById('root')}
        onAfterOpen={() => this.setState({ isOpen: true })}
        style={this.transitionModalStyles(modalStyles)}
      >
        {children({ onClose: this.onClose, ...passThroughProps })}
      </ReactModal>
    );
  }
}

export default Modal;
