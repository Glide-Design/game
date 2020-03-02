import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose, get, isEmpty } from 'lodash/fp';
import { connect } from 'react-redux';
import { sendRegistrationEmail, sendLoginEmail } from 'xi-core/signup/actions';
import { isAuthenticatedAndProfileReceived } from 'xi-core/member/selectors';
import { authenticationSteps } from 'xi-core/signup/constants';
import { getExternalLink } from 'xi-core/config/selectors';
import { CoreDevices, SIDE_MARGIN_PX, HelperDevices } from '../common/dimensions';
import { FontFamily } from '../common/typography';
import TitleContainer from '../common/TitleContainer';
import SignInContainer from './components/SignInContainer';
import CodeInput from './components/CodeInput';
import { loginEmailJustSent } from './SignInWithEmail';
import { signupEmailJustSent } from './SignUpWithEmail';
import { loginOrRegistrationComplete } from './JoinOptions';

export const JOURNEY_TYPE = {
  SIGNIN: 'signin',
  SIGNUP: 'signup',
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Elements = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > * {
    margin-top: 26px;
    /* padding: 0px 30px; */
  }

  width: calc(100% - ${SIDE_MARGIN_PX.small * 2}px);

  @media ${CoreDevices.medium} {
    width: calc(100% - ${SIDE_MARGIN_PX.medium * 2}px);
    > * {
      margin-top: 50px;
    }
  }

  @media ${CoreDevices.large} {
    width: calc(100% - ${SIDE_MARGIN_PX.large * 2}px);
    > * {
      margin-top: 32px;
    }
  }
`;

const ResendElements = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > * {
    margin-top: 26px;
    padding: 0px 30px;
  }

  @media ${HelperDevices.belowMedium} {
    font-size: 12px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 40px;
    font-size: 14px;
  }
`;

const BottomContainer = styled.div`
  margin-top: auto;
  align-self: center;
  margin-bottom: 26px;
  height: 80px;
  font-size: 14px;

  @media ${HelperDevices.belowMedium} {
    margin-bottom: 42px;
  }

  display: none;
`;

const CenteredText = styled.div`
  text-align: center;
  font-size: 18px;
  line-height: 24px;

  @media ${HelperDevices.belowMedium} {
    font-size: 14px;
    line-height: 20px;
  }
`;

const LinkATag = styled.a`
  text-transform: uppercase;
  ${FontFamily.bold};
`;

const CodeWrapper = styled.div`
  width: 200px;
  margin: auto;
  margin-top: 20px;
`;

export const CheckYourEmailElements = ({
  email,
  changeStep,
  type,
  children,
  location,
  sendRegistrationEmail,
  sendLoginEmail,
  setFlowType,
}) => (
  <Elements>
    <Fragment>
      {type === JOURNEY_TYPE.SIGNIN ? (
        <Fragment>
          <CenteredText>
            <FormattedMessage
              id="checkYourEmail.weSentCode"
              defaultMessage="We've sent a code to:"
            />
            <br />
            {email}
          </CenteredText>
          <CenteredText>
            <FormattedMessage
              id="checkYourEmail.openYourEmailCode"
              defaultMessage="Open your email, copy the code into the form below and you'll be signed in."
            />
            <CodeWrapper>
              <CodeInput />
            </CodeWrapper>
          </CenteredText>
        </Fragment>
      ) : (
        <Fragment>
          {/* <CenteredText>
            <FormattedMessage
              id="emailsent.received_code"
              defaultMessage="Received a login code? You're already a member, {clickToLogin} to login"
              values={{
                clickToLogin: (
                  <LinkATag
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      changeStep(authenticationSteps.CheckYourEmail, { signIn: true });
                    }}
                  >
                    <FormattedMessage id="emailsent.login_with_code" defaultMessage="click here" />
                  </LinkATag>
                ),
              }}
            />
          </CenteredText> */}
          <CenteredText>
            <FormattedMessage
              id="checkYourEmail.weSentLink"
              defaultMessage="We've sent an email to:"
            />
            <br />
            {email}
          </CenteredText>

          <CenteredText>
            <FormattedMessage
              id="checkYourEmail.openYourEmailTap"
              defaultMessage="Please open the email and select the link to log in."
            />
          </CenteredText>
        </Fragment>
      )}
      <ResendElements>
        {/* <SmallCenteredText>
        <FormattedMessage id="emailsent.didnt_get_email" defaultMessage="Didn't get the email?" />
      </SmallCenteredText> */}
        <CenteredText>
          <LinkATag
            href="#"
            onClick={e => {
              e.preventDefault();
              type !== JOURNEY_TYPE.SIGNIN
                ? sendRegistrationEmail(location.pathname)
                : sendLoginEmail(location.pathname);
            }}
          >
            <FormattedMessage
              id="emailsent.send_again"
              defaultMessage="Didn’t receive email? - Resend"
            />
          </LinkATag>
        </CenteredText>
        {/* <SmallCenteredText>
          <FormattedMessage
            id="emailsent.wrong_email"
            defaultMessage="Wrong email address? {edit}"
            values={{
              edit: (
                <LinkATag
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    type !== JOURNEY_TYPE.SIGNIN
                      ? changeStep(authenticationSteps.JoinOptions)
                      : changeStep(authenticationSteps.SignInWithEmail);
                  }}
                >
                  <FormattedMessage id="emailsent.edit" defaultMessage="Edit" />
                </LinkATag>
              ),
            }}
          />
        </SmallCenteredText> */}
      </ResendElements>
    </Fragment>
    {children}
  </Elements>
);

class CheckYourEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.getType(props.location),
    };
  }

  componentDidMount() {
    const { email, changeStep } = this.props;

    if (isEmpty(email)) {
      changeStep(
        this.state.type === JOURNEY_TYPE.SIGNUP
          ? authenticationSteps.JoinOptions
          : authenticationSteps.SignInWithEmail
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      changeStep,
      isRegisteringWithEmailSent,
      closeWizard,
      signInWithEmailStep,
      profileAndEntitlementRecieved,
      location,
    } = this.props;

    if (signupEmailJustSent(prevProps.isRegisteringWithEmailSent, isRegisteringWithEmailSent)) {
      changeStep(authenticationSteps.EmailResent);
    } else if (loginEmailJustSent(prevProps.signInWithEmailStep, signInWithEmailStep)) {
      changeStep(authenticationSteps.EmailResent, { signIn: true });
    }

    if (
      loginOrRegistrationComplete(
        prevProps.profileAndEntitlementRecieved,
        profileAndEntitlementRecieved
      )
    ) {
      closeWizard();
    }

    if (this.getType(prevProps.location) !== this.getType(location)) {
      this.setState({ type: this.getType(location) });
    }
  }

  getType = location => (get('state.signIn', location) ? JOURNEY_TYPE.SIGNIN : JOURNEY_TYPE.SIGNUP);

  render() {
    const {
      location,
      email,
      changeStep,
      helpLink,
      sendLoginEmail,
      sendRegistrationEmail,
      backButton,
    } = this.props;

    const { type } = this.state;

    return (
      <SignInContainer>
        <Container>
          <TitleContainer>
            <FormattedMessage
              id="checkYourEmail.check_your_email"
              defaultMessage="Check your email"
            />
          </TitleContainer>
          <CheckYourEmailElements
            email={email}
            changeStep={changeStep}
            type={type}
            location={location}
            sendRegistrationEmail={sendRegistrationEmail}
            sendLoginEmail={sendLoginEmail}
          >
            <BottomContainer type={type}>
              <FormattedMessage
                id="emailsent.faqs"
                defaultMessage="Need help? Take a look at our {faqsLink}"
                values={{
                  faqsLink: (
                    <LinkATag href={helpLink} style={{ textDecorationLine: 'underline' }}>
                      <FormattedMessage id="emailsent.faqsLink" defaultMessage="FAQs" />
                    </LinkATag>
                  ),
                }}
              />
            </BottomContainer>
          </CheckYourEmailElements>
        </Container>
        {backButton}
      </SignInContainer>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  isRegisteringWithEmailSent: state.user.isRegisteringWithEmailSent,
  signInWithEmailStep: get('user.signInWithEmailStep', state),
  profileAndEntitlementRecieved: isAuthenticatedAndProfileReceived(state),
  helpLink: getExternalLink('help')(state),
});

const mapActionsToProps = dispatch => ({
  sendRegistrationEmail: returnUrl => dispatch(sendRegistrationEmail(returnUrl, true)),
  sendLoginEmail: returnUrl => dispatch(sendLoginEmail(returnUrl, true)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(CheckYourEmail);
