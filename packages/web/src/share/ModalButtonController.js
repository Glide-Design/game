import React from 'react';
import PropTypes from 'prop-types';

class ModalButtonController extends React.Component {
  static propTypes = {
    contentId: PropTypes.string,
    children: PropTypes.func,
    renderModal: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const { children, renderModal } = this.props;
    return (
      <React.Fragment>
        {children({ onClick: this.open })}
        {isOpen && renderModal({ onRequestClose: this.close })}
      </React.Fragment>
    );
  }
}

export default ModalButtonController;
