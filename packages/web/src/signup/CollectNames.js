import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { compose, get } from 'lodash/fp';
import { connect } from 'react-redux';
import formValidation from 'xi-core/signup/formValidation';
import { setCollectedDetails, registerUser } from 'xi-core/signup/actions';
import { isAuthenticatedAndProfileReceived, isVip } from 'xi-core/member/selectors';
import { FontFamily } from '../common/typography';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';
import { ViolaButton } from '../common/buttons';
import LoaderCircularSpinner from '../common/LoaderCircularSpinner';
import SignInTextField from './components/SignInTextField';
import SignInContainer from './components/SignInContainer';
import { handleActivateFlow } from './AuthRedirect';
import MarketingConsentInput from './components/MarketingConsentInput';
import PartnerConsentInput from './components/PartnerConsentInput';
import EmailInput from './components/EmailInput';
import TermsAndConditions from './components/TermsAndConditions';
import { loginOrRegistrationComplete } from './JoinOptions';
import { EmailFieldContainer, Row } from './SignInWithEmail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 50px;
  overflow: auto;
`;

const TitleContainer = styled.div`
  ${FontFamily.bold}
  font-size: 16px;
  text-align: center;
  margin-top: 76px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 150px;
    font-size: 48px;
  }
  text-transform: uppercase;
`;

const Elements = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  > * {
    margin-top: 10px;
  }
  & > *:first-child {
    margin-top: 22px;
  }
  & > :nth-child(4) {
    margin-top: 24px;
  }

  width: 100%;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    max-width: 404px;
    width: calc(100% - ${SIDE_MARGIN_PX.large * 2}px);
    > * {
      margin-top: 24px;
      font-size: 18px;
    }
    & > *:first-child {
      margin-top: 48px;
    }
    & > *:nth-child(4) {
      margin-top: 56px;
    }
  }
`;

const StyledViolaButton = styled(ViolaButton)`
  flex-basis: auto;
  padding: 12px 0;
  width: 100%;

  @media ${CoreDevices.large} {
    font-size: 20px;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  padding: 0px 30px;
  margin-top: 20px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 30px;
    font-size: 18px;
  }
`;

const StyledFieldsContainer = styled(EmailFieldContainer)`
  padding: 16px 24px;
`;

const StyledRow = styled(Row)`
  margin-top: 24px;
`;

const validate = values => ({
  ...formValidation.firstname('forename', values),
  ...formValidation.lastname('surname', values),
});

class CollectNames extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    if (!token) {
      this.getTokenFromStorage();
    } else {
      this.saveTokenIncaseUserRefreshes(token);
    }
  }

  getTokenFromStorage = () => {
    const token = sessionStorage.getItem('temporaryRegistrationToken');
    if (token) {
      handleActivateFlow({
        token,
        setCollectedDetails: this.props.setCollectedDetails,
        redirect: false,
      });
    }
  };

  saveTokenIncaseUserRefreshes = token =>
    token && sessionStorage.setItem('temporaryRegistrationToken', token);

  componentDidUpdate(prevProps) {
    const { closeWizard, initialize, initialValues, profileAndEntitlementRecieved } = this.props;

    if (
      loginOrRegistrationComplete(
        prevProps.profileAndEntitlementRecieved,
        profileAndEntitlementRecieved
      )
    ) {
      closeWizard();
    }

    if (this.initialValuesArrivedAsync(prevProps)) {
      initialize(initialValues);
    }
  }

  initialValuesArrivedAsync = prevProps => {
    const { anyTouched, initialValues } = this.props;
    if (!anyTouched && !prevProps.initialValues.email && initialValues.email) {
      return true;
    }
  };

  render() {
    const { valid, handleSubmit, userId, token, submitting, backButton } = this.props;

    const isDisabled = !valid || submitting;

    return (
      <SignInContainer>
        <form onSubmit={handleSubmit}>
          <Container>
            <TitleContainer>
              <FormattedMessage
                id="collectNames.LetsGetStarted"
                defaultMessage="Enter your details"
              />
            </TitleContainer>
            <SubTitle>
              <FormattedMessage
                id="signup_send_email.subtitle"
                defaultMessage="Almost done, let's finish setting up your account."
              />
            </SubTitle>
            <Elements>
              <StyledFieldsContainer>
                <FormattedMessage id="collectNames.firstName" defaultMessage="First name">
                  {placeholder => (
                    <Field
                      name="forename"
                      type="text"
                      placeholder={placeholder}
                      component={SignInTextField}
                    />
                  )}
                </FormattedMessage>

                <FormattedMessage id="collectNames.lastName" defaultMessage="Last name">
                  {placeholder => (
                    <Field
                      name="surname"
                      type="text"
                      placeholder={placeholder}
                      component={SignInTextField}
                    />
                  )}
                </FormattedMessage>

                <EmailInput disabled />
              </StyledFieldsContainer>

              <StyledRow>
                <MarketingConsentInput />
              </StyledRow>

              <StyledRow>
                <PartnerConsentInput />
              </StyledRow>

              <StyledRow>
                <TermsAndConditions />
              </StyledRow>

              <Field name="userId" type="hidden" value={userId} component={'input'} />

              <Field name="token" type="hidden" value={token} component={'input'} />

              <StyledRow>
                <StyledViolaButton disabled={isDisabled} type="submit" data-test-id="enter">
                  <FormattedMessage id="signup_send_email.continue" defaultMessage="Continue" />
                </StyledViolaButton>
              </StyledRow>
            </Elements>
          </Container>
          {submitting && <LoaderCircularSpinner />}
        </form>
        {backButton}
      </SignInContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: get('user.temporaryRegistrationId', state) || get('user.id', state),
    token: get('user.temporaryRegistrationToken', state) || get('user.accessToken', state),
    profileAndEntitlementRecieved: isAuthenticatedAndProfileReceived(state),
    isVip: isVip(state),
    initialValues: {
      forename: state.user.forename,
      surname: state.user.surname,
      email: state.user.email,
    },
  };
};

const mapActionsToProps = (dispatch, ownProps) => ({
  setCollectedDetails: details => dispatch(setCollectedDetails(details)),
  registerUser: () => dispatch(registerUser()),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapActionsToProps
  ),
  reduxForm({
    form: 'collectNames',
    validate,
    onSubmit: async (values, dispatch, { initialValues, setCollectedDetails, registerUser }) => {
      setCollectedDetails({
        forename: values.forename,
        surname: values.surname,
        marketingEmailConsent: values.marketingEmailConsent,
        allowPartnerConsent: values.allowPartnerConsent,
        nickname: values.forename + values.surname,
      });
      await registerUser();
    },
  })
)(CollectNames);
