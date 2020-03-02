import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose, get } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import * as joinActions from 'xi-core/signup/actions';
import { getErrorBody } from 'xi-core/signup/selectors';
import { connect } from 'react-redux';
import { Button12 } from '../../common/buttons';
import { CoreDevices } from '../../common/dimensions';
import LoaderSpinner from '../../common/LoaderSpinner';
import withFacebook from './withFacebook';

const StyledButton12 = styled(Button12)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  user-select: none;
  border: 0;
  justify-content: center;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    max-height: 48px;
    font-size: 20px;
  }
`;

const TwitterButtonContents = styled(StyledButton12)`
  background-color: #64ccf1;
`;

const ContinueWithTwitterButton = ({ registerWithFacebook }) => (
  <TwitterButtonContents onClick={registerWithFacebook}>
    <img src="/images/twitter-logo.svg" alt="twitter" />
    <FormattedMessage
      id="join.continue_with_social"
      values={{ provider: 'Twitter' }}
      defaultMessage="CONTINUE WITH {provider}"
    />
  </TwitterButtonContents>
);

const FacebookButtonContents = styled(StyledButton12)`
  background-color: #4267b2;
  font-family: 'GT-America-Bold', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
`;

const StyledLoadingSpinnner = styled(LoaderSpinner)`
  text-align: center;
`;

const FacebookErrorMessage = styled.div`
  margin-bottom: 12px !important;
  color: red;
  text-align: center;
`;

const errorMessage = errorBody => {
  const status = get('response.status', errorBody);
  if (status) {
    switch (status) {
      case 406:
        return (
          <FormattedMessage
            id="fbLogin.emailMissing"
            defaultMessage="Facebook registration user email is missing."
          />
        );
      default:
        return <FormattedMessage id="fbLogin.generalError" defaultMessage="Unexpected error." />;
    }
  } else {
    return null;
  }
};

const ContinueWithFacebookButton = ({
  authenticateWithFacebook,
  facebookSDKReady,
  emailDeclined,
  onClick,
  signInText,
  errorBody,
}) =>
  facebookSDKReady ? (
    <Fragment>
      {emailDeclined && (
        <FacebookErrorMessage>
          <FormattedMessage
            id="fbLogin.emailRequired"
            defaultMessage="Please provide your Facebook email"
          />
        </FacebookErrorMessage>
      )}
      {errorMessage(errorBody) && (
        <FacebookErrorMessage>{errorMessage(errorBody)}</FacebookErrorMessage>
      )}
      <FacebookButtonContents
        type="button"
        onClick={e => {
          onClick && onClick(e);
          authenticateWithFacebook(e);
        }}
        data-test-id="continue-with-facebook"
      >
        {signInText ? (
          <FormattedMessage
            id="join.sign_in_with_social"
            values={{ provider: 'FACEBOOK' }}
            defaultMessage="SIGN IN WITH {provider}"
          />
        ) : (
          <FormattedMessage
            id="join.continue_with_social"
            values={{ provider: 'Facebook' }}
            defaultMessage="CONTINUE WITH {provider}"
          />
        )}
      </FacebookButtonContents>
    </Fragment>
  ) : (
    <StyledLoadingSpinnner />
  );

const mapDispatchToProps = (dispatch, { facebookLogin }) => ({
  authenticateWithFacebook: async () => {
    const { socialAccessToken } = await facebookLogin();
    if (socialAccessToken) {
      dispatch(joinActions.authenticateWithFacebook(socialAccessToken));
    }
  },
});

const mapStateToProps = state => ({
  errorBody: getErrorBody(state),
});

export const FacebookLoginButton = compose(
  withFacebook,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ContinueWithFacebookButton);

export const TwitterLoginButton = connect(
  null,
  mapDispatchToProps
)(ContinueWithTwitterButton);
