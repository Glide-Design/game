import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose, get } from 'lodash/fp';
import { connect } from 'react-redux';
import { AuthenticationRed } from 'xi-core/colours';
import { authenticationSteps } from 'xi-core/signup/constants';
import appFormValidation from 'xi-core/app/formValidation';
import { setCollectedDetails, sendRegistrationEmail, authCtaAction } from 'xi-core/signup/actions';
import { isAuthenticatedAndProfileReceived } from 'xi-core/member/selectors';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import TitledArea, {
  TitleText,
  TitleContainer,
  ItemsContainer,
  ElementsContainer,
} from '../common/TitledArea';
import { ViolaButton } from '../common/buttons';
import { CoreDevices, SIDE_MARGIN_PX, HelperDevices } from '../common/dimensions';
import LoaderCircularSpinner from '../common/LoaderCircularSpinner';
import { FontFamily } from '../common/typography';
import OtroBadge from '../common/icons/OtroBadge';
import { FacebookLoginButton } from './components/SocialLoginButton';
import OrDivider from './components/OrDivider';
import EmailInput, { emailAddressPlaceholder } from './components/EmailInput';
import { signupEmailJustSent } from './SignUpWithEmail';
import { Row } from './SignInWithEmail';

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overscroll-behavior: contain;
  color: white;
`;

const StyledTitledArea = styled(TitledArea)`
  height: 100%;

  & ${TitleText} {
    text-align: center;
    max-width: 100%;
    @media ${CoreDevices.tiny} {
      font-size: 16px;
      padding-top: 30px;
    }
    @media ${CoreDevices.small} {
      font-size: 16px;
      padding-top: 38px;
    }
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      font-size: 48px;
      padding-top: 72px;
    }
  }

  & ${TitleContainer} {
    @media ${CoreDevices.tiny} {
      font-size: 24px;
      padding-top: 30px;
    }
    @media ${CoreDevices.small} {
      padding-top: 38px;
    }
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      padding-top: 72px;
    }
  }

  & ${ItemsContainer} {
    flex: 1;
  }

  & ${ElementsContainer} {
    overflow: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
  align-self: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 48px;

  & > *:not(:last-child) {
    margin-bottom: 28px;
  }

  width: 100%;

  @media ${HelperDevices.belowMedium} {
  }

  @media ${CoreDevices.medium} {
    max-width: 404px;
    width: calc(100% - ${SIDE_MARGIN_PX.medium * 2}px);
    & > *:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  @media ${CoreDevices.large} {
    max-width: 404px;
    width: calc(100% - ${SIDE_MARGIN_PX.large * 2}px);

    & > *:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  & button:not(:last-child) {
    width: 100%;
  }
`;

const LoginLink = styled.div`
  ${FontFamily.bold}
  font-size: 20px;
  color: #fff;
  text-decoration: underline;
  text-align: center;
  margin-top: 28px;

  @media ${HelperDevices.belowMedium} {
    font-size: 14px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 150px;
  }
`;

const StyledViolaButton = styled(ViolaButton)`
  flex-basis: auto;
  padding: 12px 0;
  width: 100%;
  min-height: 48px;

  @media ${CoreDevices.large} {
    font-size: 20px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmailFieldContainer = styled.div`
  background: #c9132c;
  position: relative;
  padding: 16px 24px;
`;

export const newFacebookRegistration = (
  prevTemporaryRegistrationToken,
  temporaryRegistrationToken
) => {
  return (
    temporaryRegistrationToken && prevTemporaryRegistrationToken !== temporaryRegistrationToken
  );
};

export const loginOrRegistrationComplete = (
  prevProfileAndEntitlementRecieved,
  profileAndEntitlementRecieved
) => {
  if (
    profileAndEntitlementRecieved &&
    prevProfileAndEntitlementRecieved !== profileAndEntitlementRecieved
  ) {
    return true;
  }
  return false;
};

const validate = values => Object.assign({}, appFormValidation.email('email', values));

class JoinOptions extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      closeWizard,
      profileAndEntitlementRecieved,
      changeStep,
      temporaryRegistrationToken,
      isRegisteringWithEmailSent,
    } = this.props;
    if (newFacebookRegistration(prevProps.temporaryRegistrationToken, temporaryRegistrationToken)) {
      changeStep(authenticationSteps.CollectNames);
    } else if (
      signupEmailJustSent(prevProps.isRegisteringWithEmailSent, isRegisteringWithEmailSent)
    ) {
      changeStep(authenticationSteps.CheckYourEmail);
    }

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
    const { changeStep, backButton, valid, submitting, handleSubmit, authCtaAction } = this.props;
    return (
      <Fragment>
        <Form data-test-id="sign-in-container" onSubmit={handleSubmit}>
          <StyledTitledArea
            name={<FormattedMessage id="join.JoinForFree" defaultMessage="CREATE YOUR ACCOUNT" />}
            bgColour={AuthenticationRed}
          >
            <ButtonContainer>
              <BadgeContainer>
                <OtroBadge />
              </BadgeContainer>

              <Row>
                <FacebookLoginButton
                  onClick={() =>
                    authCtaAction(PropertyKeys.COMMON_AUTH_ACTION.CREATE_ACCOUNT, 'Facebook')
                  }
                />
              </Row>

              <OrDivider />

              <EmailFieldContainer>
                <EmailInput getPlaceholder={emailAddressPlaceholder} />
              </EmailFieldContainer>

              <Row>
                <StyledViolaButton
                  disabled={!valid || submitting}
                  data-test-id="signup-with-email"
                  type="submit"
                >
                  <FormattedMessage
                    id="join.continue_with_email"
                    defaultMessage="Continue with email"
                  />
                </StyledViolaButton>
              </Row>

              <LoginLink
                onClick={() => {
                  changeStep(authenticationSteps.SignInWithEmail);
                  authCtaAction(PropertyKeys.COMMON_AUTH_ACTION.CREATE_ACCOUNT, 'Email');
                }}
                data-test-id="log-in"
              >
                <FormattedMessage id="join.log_in" defaultMessage="LOG IN" />
              </LoginLink>
            </ButtonContainer>
          </StyledTitledArea>
        </Form>
        {submitting && <LoaderCircularSpinner />}
        {backButton}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isRegisteringWithEmailSent: get('user.isRegisteringWithEmailSent', state),
  temporaryRegistrationToken: state.user.temporaryRegistrationToken,
  profileAndEntitlementRecieved: isAuthenticatedAndProfileReceived(state),
  initialValues: {
    email: state.user.email,
  },
});

const mapActionsToProps = dispatch => ({
  sendRegistrationEmail: returnUrl => dispatch(sendRegistrationEmail(returnUrl)),
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
    form: 'joinOptions',
    validate,
    onSubmit: async (
      values,
      dispatch,
      { setCollectedDetails, sendRegistrationEmail, location }
    ) => {
      setCollectedDetails({
        email: values.email,
      });

      await sendRegistrationEmail(location.pathname);
    },
  })
)(JoinOptions);
