import React from 'react';
import styled from 'styled-components';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { connect } from 'react-redux';
import { Grey50 } from 'xi-core/colours';
import { sendShare } from 'xi-core/share/actions';
import { SHARE_PROVIDERS } from 'xi-core/share/constants';
import { generateQueryStringUTM } from 'xi-core/member/selectors';
import { ReferralSource } from 'xi-core/app/utm';
import { CoreDevices } from '../common/dimensions';

const SocialButtonsContainer = styled.div`
  display: inline-flex;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin-right: 19px;
  }
  & [role='button'] {
    cursor: pointer;
  }

  @media ${CoreDevices.tiny} {
    padding-left: 4px;
    padding-right: 4px;

    & > *:not(:last-child) {
      margin-right: 9px;
    }
  }

  @media ${CoreDevices.small} {
    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }
`;

const SocialLabel = styled.div`
  color: ${Grey50};
  font-size: 11px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  margin: 10px 0 0 0;
  text-align: center;

  @media ${CoreDevices.tiny} {
    margin-top: 6px;
  }

  @media ${CoreDevices.small} {
    margin-top: 8px;
  }
`;

const SocialForm = ({ url, referralMedium, generateQueryStringUTM, message, type, onBeforeShare }) => (
  <SocialButtonsContainer>
    <EmailShareButton
      url={`${url}?${generateQueryStringUTM(ReferralSource.OTRO, referralMedium)}`}
      subject={message}
      beforeOnClick={onBeforeShare(type, SHARE_PROVIDERS.EMAIL)}
      data-test-id="share-modal-email"
    >
      <EmailIcon round={true} iconBgStyle={{ fill: '#70a1ef' }} />
      <SocialLabel>EMAIL</SocialLabel>
    </EmailShareButton>
    <FacebookShareButton
      url={`${url}?${generateQueryStringUTM(ReferralSource.FACEBOOK, referralMedium)}`}
      quote={message}
      beforeOnClick={onBeforeShare(type, SHARE_PROVIDERS.FACEBOOK)}
      data-test-id="share-modal-facebook"
    >
      <FacebookIcon round={true} />
      <SocialLabel>FACEBOOK</SocialLabel>
    </FacebookShareButton>
    <TwitterShareButton
      url={`${url}?${generateQueryStringUTM(ReferralSource.TWITTER, referralMedium)}`}
      title={message}
      beforeOnClick={onBeforeShare(type, SHARE_PROVIDERS.TWITTER)}
      data-test-id="share-modal-twitter"
    >
      <TwitterIcon round={true} />
      <SocialLabel>TWITTER</SocialLabel>
    </TwitterShareButton>
    <WhatsappShareButton
      url={`${url}?${generateQueryStringUTM(ReferralSource.WHATSAPP, referralMedium)}`}
      title={message}
      beforeOnClick={onBeforeShare(type, SHARE_PROVIDERS.WHATSAPP)}
      data-test-id="share-modal-whatsapp"
    >
      <WhatsappIcon round={true} />
      <SocialLabel>WHATSAPP</SocialLabel>
    </WhatsappShareButton>
  </SocialButtonsContainer>
);

export default connect(
  state => ({
    generateQueryStringUTM: (source, medium) => generateQueryStringUTM(state)(source, medium),
  }),
  dispatch => ({
    onBeforeShare: (shareType, shareProvider) => () =>
      dispatch(sendShare(shareType, shareProvider)),
  })
)(SocialForm);
