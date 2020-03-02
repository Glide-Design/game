import React from 'react';
import Modal from 'react-modal';
import { compose } from 'recompose';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getClientAppBaseUrl } from 'xi-core/config/selectors';
import { ContentTypeReferralMediumMapping } from 'xi-core/app/utm';
import {
  getContentSharingTitleById,
  getContentSharingUrlById,
  getContentType,
} from 'xi-core/content/selectors';
import { SHARE_TYPES } from 'xi-core/share/constants';
import SocialForm from './SocialForm';
import SocialModalBase from './SocialModalBase';
import SocialModalSection from './SocialModalSection';
import SocialModalTitle from './SocialModalTitle';

Modal.setAppElement('#root');

const ShareModal = ({
  sharingTitle,
  sharingUrl,
  onRequestClose,
  referralMedium,
}) => (
    <SocialModalBase data-test-id="share-modal" onRequestClose={onRequestClose}>
      <SocialModalSection>
        <SocialModalTitle>
          <FormattedMessage id="share.share_link" defaultMessage="Share content" />
        </SocialModalTitle>
        <SocialForm
          url={sharingUrl}
          referralMedium={referralMedium}
          message={sharingTitle}
          type={SHARE_TYPES.SHARE} />
      </SocialModalSection>
    </SocialModalBase>
  );

export default compose(
  injectIntl,
  connect((state, { contentId, intl }) => ({
    referralMedium: ContentTypeReferralMediumMapping[getContentType(state)(contentId)],
    sharingTitle: getContentSharingTitleById(state)(contentId, intl),
    sharingUrl: getContentSharingUrlById(state)(contentId, getClientAppBaseUrl(state)),
  }))
)(ShareModal);
