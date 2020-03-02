import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getJoinUrl } from 'xi-core/config/selectors';
import { ReferralMedium } from 'xi-core/app/utm';
import { SHARE_TYPES } from 'xi-core/share/constants';
import SocialForm from './SocialForm';
import SocialModalBase from './SocialModalBase';
import SocialModalSection from './SocialModalSection';
import SocialModalTitle from './SocialModalTitle';

Modal.setAppElement('#root');

const InviteModal = ({ joinUrl, onRequestClose, clientAppBaseUrl }) => (
  <SocialModalBase data-test-id="invite-modal" onRequestClose={onRequestClose}>
    <SocialModalSection>
      <SocialModalTitle>
        <FormattedMessage id="invite.invite_link" defaultMessage="Invite your friends" />
      </SocialModalTitle>
      <FormattedMessage
        id="invite.join_message"
        defaultMessage="Create your free account."
      >
        {message => (
          <SocialForm
            url={joinUrl}
            referralMedium={ReferralMedium.INVITE}
            message={message}
            type={SHARE_TYPES.INVITE}
          />
        )}
      </FormattedMessage>
    </SocialModalSection>
  </SocialModalBase>
);

const mapStateToProps = state => ({
  joinUrl: getJoinUrl(state),
});

export default connect(mapStateToProps)(InviteModal);
