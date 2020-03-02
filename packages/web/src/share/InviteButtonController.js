import React from 'react';
import PropTypes from 'prop-types';
import InviteModal from 'web/src/share/InviteModal';

class ShareButton extends React.Component {
  static propTypes = {
    children: PropTypes.func,
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
    const { children } = this.props;
    return (
      <React.Fragment>
        {children({ onClick: this.open })}
        {isOpen && <InviteModal onRequestClose={this.close} />}
      </React.Fragment>
    );
  }
}

export default ShareButton;
