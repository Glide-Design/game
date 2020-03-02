import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { CoreDevices, posFixedZIndex } from '../common/dimensions';
import { UnstyledButtonLink } from '../common/buttons';
import Cross from '../common/icons/Cross';
import Modal from '../common/overlay/Modal';

const modalStyles = () => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: posFixedZIndex.popUp,
  },
  content: {
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
    color: 'black',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '7px 0px 0px 0px',
    margin: 'auto',
    transform: 'translate(-50%, -50%)',
  },
});

const CancelButton = styled(UnstyledButtonLink)`
  height: 48px;
  width: 100%;
  border-top: 1px solid #cbcbcb;
  :hover {
    background-color: rgba(1, 1, 1, 0.4);
  }
`;

const CloseButton = styled(Cross)`
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;

  @media ${CoreDevices.tiny} {
    display: none;
  }
  @media ${CoreDevices.small} {
    display: none;
  }
`;

class SocialModalBase extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    children: PropTypes.node,
  };

  render() {
    const { onRequestClose, children } = this.props;

    return (
      <Modal modalStyles={modalStyles()}>
        {({ onClose }) => (
          <React.Fragment>
            <CloseButton onClick={onClose(onRequestClose)} />
            {children}
            <CancelButton onClick={onClose(onRequestClose)} data-test-id="close-share-modal">
              <FormattedMessage id="share.cancel" defaultMessage="Done" />
            </CancelButton>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default SocialModalBase;
