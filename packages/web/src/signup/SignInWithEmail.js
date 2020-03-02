import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { compose, get } from 'lodash/fp';
import { signInWithEmailSteps } from 'xi-core/signup/reducer';
import { setCollectedDetails, sendLoginEmail, authCtaAction } from 'xi-core/signup/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { isAuthenticatedAndProfileReceived } from 'xi-core/member/selectors';
import { ThreeDevices } from 'xi-core/signup/locale';
import appFormValidation from 'xi-core/app/formValidation';
import { authenticationSteps } from 'xi-core/signup/constants';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';
import { UnstyledButtonLink, ViolaButton } from '../common/buttons';
import HelpIcon from '../common/icons/Help';
import OtroBadge from '../common/icons/OtroBadge';
import LoaderCircularSpinner from '../common/LoaderCircularSpinner';
import { FontFamily } from '../common/typography';
import SignInContainer from './components/SignInContainer';
import { FacebookLoginButton } from './components/SocialLoginButton';
import OrDivider from './components/OrDivider';
import EmailInput from './components/EmailInput';
import { loginOrRegistrationComplete, newFacebookRegistration } from './JoinOptions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 50px;
  overflow: auto;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const LoginTitleContainer = styled.div`
  ${FontFamily.bold}
  text-transform: uppercase;
  margin-top: 100px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 124px;
  }
  text-align: center;
  max-width: 100%;
  @media ${CoreDevices.tiny} {
    font-size: 16px;
    line-height: 24px;
    margin-top: 30px;
  }
  @media ${CoreDevices.small} {
    font-size: 16px;
    line-height: 24px;
    margin-top: 30px;
  }
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 32px;
    margin-top: 30px;
  }
`;

const WelcomeTitleContainer = styled.div`
  ${FontFamily.bold}
  text-transform: uppercase;
  margin-top: 100px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 30px;
  }
  text-align: center;
  max-width: 100%;
  @media ${CoreDevices.tiny} {
    font-size: 32px;
    line-height: 24px;
    margin-top: 30px;
  }
  @media ${CoreDevices.small} {
    font-size: 32px;
    line-height: 24px;
    margin-top: 30px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 48px;
    margin-top: 30px;
  }
`;

const Elements = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: space-between;

  > * {
    margin-top: 30px;
  }

  @media ${CoreDevices.medium} {
    max-width: 500px;
    width: calc(100% - ${SIDE_MARGIN_PX.medium * 2}px);
    > * {
      margin-top: 50px;
    }
  }

  @media ${CoreDevices.large} {
    max-width: 500px;
    width: calc(100% - ${SIDE_MARGIN_PX.large * 2}px);
    > * {
      margin-top: 50px;
    }
  }
`;

const StyledButtonLink = styled(UnstyledButtonLink)`
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 16px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    padding: 0;
  }
`;

const HelpText = styled.div`
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
`;

const MoreInfoContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: none;
`;

export const EmailFieldContainer = styled.div`
  background: #c9132c;
  position: relative;
  padding: 16px 24px;
`;

const StyledViolaButton = styled(ViolaButton)`
  flex-basis: auto;
  padding: 12px 0;
  width: 100%;

  @media ${CoreDevices.large} {
    font-size: 20px;
  }
`;

const StyledSingupText = styled.div`
  font-family: 'GT-America-Bold', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 16px;
`;

export const loginEmailJustSent = (prevSignInWithEmailStep, signInWithEmailStep) => {
  return (
    prevSignInWithEmailStep !== signInWithEmailStep &&
    signInWithEmailStep === signInWithEmailSteps.SENT
  );
};

const validate = values => Object.assign({}, appFormValidation.email('email', values));

class SignInWithEmail extends React.Component {
  state = {
    showCodeHelp: false,
  };

  componentDidUpdate(prevProps) {
    const {
      changeStep,
      signInWithEmailStep,
      profileAndEntitlementRecieved,
      closeWizard,
      temporaryRegistrationToken,
    } = this.props;
    if (loginEmailJustSent(prevProps.signInWithEmailStep, signInWithEmailStep)) {
      changeStep(authenticationSteps.CheckYourEmail, { signIn: true });
    } else if (
      newFacebookRegistration(prevProps.temporaryRegistrationToken, temporaryRegistrationToken)
    ) {
      changeStep(authenticationSteps.CollectNames);
    } else if (
      loginOrRegistrationComplete(
        prevProps.profileAndEntitlementRecieved,
        profileAndEntitlementRecieved
      )
    ) {
      closeWizard();
    }
  }

  render() {
    const { valid, handleSubmit, backButton, changeStep, submitting, authCtaAction } = this.props;
    const { showCodeHelp } = this.state;

    return (
      <Fragment>
        <SignInContainer>
          <form disabled={submitting} onSubmit={handleSubmit}>
            <Container>
              <LoginTitleContainer>
                <FormattedMessage id="join.log_in" defaultMessage="LOG IN" />
              </LoginTitleContainer>

              <BadgeContainer>
                <OtroBadge />
              </BadgeContainer>

              <WelcomeTitleContainer>
                <FormattedMessage id="signInEmail.WelcomeBack" defaultMessage="Welcome Back" />
              </WelcomeTitleContainer>

              <Elements>
                <Row>
                  <FacebookLoginButton
                    onClick={() =>
                      authCtaAction(PropertyKeys.COMMON_AUTH_ACTION.WELCOME_BACK, 'Facebook')
                    }
                    signInText
                  />
                </Row>
                <OrDivider />
                <EmailFieldContainer>
                  <EmailInput />
                  <MoreInfoContainer>
                    <UnstyledButtonLink
                      onClick={() => {
                        this.setState({
                          showCodeHelp: !showCodeHelp,
                        });
                      }}
                      type="button"
                    >
                      <HelpIcon />
                    </UnstyledButtonLink>
                  </MoreInfoContainer>
                </EmailFieldContainer>
                {showCodeHelp ? (
                  <Row>
                    <HelpText>
                      <FormattedMessage
                        id="signInEmail.codeHelp"
                        defaultMessage="A login code allows you to log into OTRO without creating a password. Enter the code sent in your email and you will be signed in."
                      />
                    </HelpText>
                  </Row>
                ) : null}
                <Row>
                  <StyledViolaButton
                    disabled={!valid || submitting}
                    data-test-id="sign-in-email-send-magic-link"
                    type="submit"
                  >
                    <FormattedMessage id="signup_signin_email.send_code" defaultMessage="Sign In" />
                  </StyledViolaButton>
                </Row>

                <Row>
                  <ThreeDevices />
                </Row>

                <Row>
                  <StyledSingupText>
                    <FormattedMessage
                      id="signInEmail.notMemberYet"
                      defaultMessage="Not a member yet?"
                    />{' '}
                    <StyledButtonLink
                      onClick={() => {
                        changeStep(authenticationSteps.JoinOptions);
                      }}
                      data-test-id="join-otro"
                    >
                      <FormattedMessage
                        id="signInEmail.joinOTRO"
                        defaultMessage="Join now for free "
                      />
                    </StyledButtonLink>
                  </StyledSingupText>
                </Row>
              </Elements>
            </Container>
            {submitting && <LoaderCircularSpinner />}
          </form>
        </SignInContainer>
        {backButton}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    temporaryRegistrationToken: state.user.temporaryRegistrationToken,
    signInWithEmailStep: get('user.signInWithEmailStep', state),
    initialValues: {
      email: state.user.email,
    },
    profileAndEntitlementRecieved: isAuthenticatedAndProfileReceived(state),
  };
};

const mapActionsToProps = dispatch => ({
  sendLoginEmail: returnUrl => dispatch(sendLoginEmail(returnUrl)),
  setCollectedDetails: details => dispatch(setCollectedDetails(details)),
  authCtaAction: (cta, val) => dispatch(authCtaAction(cta, val)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapActionsToProps
  ),
  reduxForm({
    form: 'signInEmail',
    validate,
    onSubmit: async (
      values,
      dispatch,
      { setCollectedDetails, sendLoginEmail, location, authCtaAction }
    ) => {
      setCollectedDetails({
        email: values.email,
      });
      await sendLoginEmail(location.pathname);
      authCtaAction(PropertyKeys.COMMON_AUTH_ACTION.WELCOME_BACK, 'Email');
    },
  })
)(SignInWithEmail);
