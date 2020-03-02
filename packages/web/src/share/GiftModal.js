import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { compose } from 'recompose';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { isPremium } from 'xi-core/member/selectors';
import { CoreDevices } from '../common/dimensions';
import Ticket from '../common/icons/Ticket';
import { getTargetDevice } from '../state/app/selectors';
import GiftForm from './GiftForm';
import SocialModalBase from './SocialModalBase';
import SocialModalSection from './SocialModalSection';
import SocialModalTitle from './SocialModalTitle';

Modal.setAppElement('#root');

const TicketIcon = styled(Ticket)`
  width: 1.4em;
  height: 1.4em;
  @media ${CoreDevices.medium}, @media ${CoreDevices.large} {
    margin-bottom: 20px;
  }
`;

const getMaxWidth = targetDevice => {
  switch (targetDevice) {
    case 'medium':
      return '540px';
    case 'large':
      return '880px';

    default:
      return '100%';
  }
};

const StyledSocialModalSection = styled(SocialModalSection)`
  width: 100vw;
  max-width: ${({ targetDevice }) => getMaxWidth(targetDevice)};
  box-sizing: border-box;
`;

class GiftModal extends React.Component {
  static propTypes = {
    contentId: PropTypes.string,
    onRequestClose: PropTypes.func,
  };

  render() {
    const { isPremium, contentId, onRequestClose, targetDevice } = this.props;

    return (
      <SocialModalBase data-test-id="share-modal" onRequestClose={onRequestClose}>
        {isPremium && (
          <React.Fragment>
            <StyledSocialModalSection targetDevice={targetDevice}>
              <SocialModalTitle>
                <FormattedMessage id="share.gift_header" defaultMessage="GUEST PASS" />
                <TicketIcon />
              </SocialModalTitle>
              <p>
                <FormattedMessage
                  id="share.unlimited_club"
                  defaultMessage="As a member you can share exclusive Unlimited videos with your friends."
                />
              </p>
              <p>
                <FormattedMessage
                  id="share.gift_friend"
                  defaultMessage="Just choose a friend and enter their email address below."
                />
              </p>
              <GiftForm contentId={contentId} closeModal={this.closeModal} />
            </StyledSocialModalSection>
          </React.Fragment>
        )}
      </SocialModalBase>
    );
  }
}

export default compose(
  injectIntl,
  connect(state => ({
    isPremium: isPremium(state),
    targetDevice: getTargetDevice(state),
  }))
)(GiftModal);
