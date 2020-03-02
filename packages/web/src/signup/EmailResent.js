import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose, get, isEmpty } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticatedAndProfileReceived } from 'xi-core/member/selectors';
import { getExternalLink } from 'xi-core/config/selectors';
import { authenticationSteps } from 'xi-core/signup/constants';
import { sendRegistrationEmail, sendLoginEmail } from 'xi-core/signup/actions';
import TitleContainer from '../common/TitleContainer';
import SignInContainer from './components/SignInContainer';
import { CheckYourEmailElements, JOURNEY_TYPE } from './CheckYourEmail';
import { loginOrRegistrationComplete } from './JoinOptions';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  align-self: center;
  margin-top: auto;
  margin-bottom: 50px;
  height: 80px;
`;

const StyledLink = styled.a`
  color: inherit;
  text-decoration: underline;
`;

class EmailResent extends React.Component {
  constructor(props) {
    super(props);
    this.type = get('state.signIn', props.location) ? JOURNEY_TYPE.SIGNIN : JOURNEY_TYPE.SIGNUP;
  }

  componentDidMount() {
    const { email, changeStep } = this.props;
    if (isEmpty(email)) {
      changeStep(authenticationSteps.JoinOptions);
    }
  }

  componentDidUpdate(prevProps) {
    const { closeWizard, profileAndEntitlementRecieved } = this.props;
    if (
      loginOrRegistrationComplete(
        prevProps.profileAndEntitlementRecieved,
        profileAndEntitlementRecieved
      )
    ) {
      closeWizard();
    }
  }

  render() {
    const {
      email,
      changeStep,
      location,
      signUpHelpLink,
      sendLoginEmail,
      sendRegistrationEmail,
    } = this.props;

    return (
      <SignInContainer>
        <Container>
          <TitleContainer>
            <FormattedMessage
              id="emailResent.sentNewEmail"
              defaultMessage="We've sent you a new email."
            />
          </TitleContainer>
          <CheckYourEmailElements
            email={email}
            changeStep={changeStep}
            type={this.type}
            location={location}
            sendLoginEmail={sendLoginEmail}
            sendRegistrationEmail={sendRegistrationEmail}
          >
            <BottomContainer>
              <FormattedMessage id="emailResent.anyIssue" defaultMessage="Having problems?" />{' '}
              <StyledLink href={signUpHelpLink} alt="Visit Support" target="_blank">
                <FormattedMessage id="emailResent.vistSupport" defaultMessage="Get help." />
              </StyledLink>
            </BottomContainer>
          </CheckYourEmailElements>
        </Container>
      </SignInContainer>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  profileAndEntitlementRecieved: isAuthenticatedAndProfileReceived(state),
  signUpHelpLink: getExternalLink('signUpHelp')(state),
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
)(EmailResent);
