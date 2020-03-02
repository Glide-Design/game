import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getExternalLink } from 'xi-core/config/selectors';

const Anchor = styled.a`
  text-decoration: underline;
`;

const TermsAndConditions = ({ termsLink, privacyLink }) => (
  <div>
    <FormattedMessage
      id="signUpWithEmail.byClickingAccept"
      defaultMessage="By continuing you agree to our {terms} and {privacy}"
      values={{
        terms: (
          <Anchor href={termsLink} target="_blank">
            <FormattedMessage id="helpAndInfo.termsOfUse" defaultMessage="Terms of Use" />
          </Anchor>
        ),
        privacy: (
          <Anchor href={privacyLink} target="_blank">
            <FormattedMessage id="helpAndInfo.dataPolicy" defaultMessage="Privacy Policy" />
          </Anchor>
        ),
      }}
    />
  </div>
);

export default connect(state => ({
  termsLink: getExternalLink('termsConditions')(state),
  privacyLink: getExternalLink('privacyPolicy')(state),
}))(TermsAndConditions);
