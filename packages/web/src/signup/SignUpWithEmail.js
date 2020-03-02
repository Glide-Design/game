import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, get } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { setCollectedDetails, sendRegistrationEmail } from 'xi-core/signup/actions';
import { authenticationSteps } from 'xi-core/signup/constants';
import signUpFormValidation from 'xi-core/signup/formValidation';
import { getDefaultBirthday } from 'xi-core/member/selectors';
import appFormValidation from 'xi-core/app/formValidation';
import { getSignupRestrictionLessThanAge } from 'xi-core/config/selectors';
import { Grey20 } from 'xi-core/colours';
import BulletTitle from '../common/BulletTitle';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';
import HelpIcon from '../common/icons/Help';
import { Button3 } from '../common/buttons';
import LoaderCircularSpinner from '../common/LoaderCircularSpinner';
import { routes } from '../App';
import SignInContainer from './components/SignInContainer';
import SignInTextField from './components/SignInTextField';
import MarketingConsentInput from './components/MarketingConsentInput';
import PartnerConsentInput from './components/PartnerConsentInput';
import DateOfBirthInput from './components/DateOfBirthInput';
import TermsAndConditions from './components/TermsAndConditions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 50px;
  overflow: auto;
`;

const TitleContainer = styled.div`
  margin-top: 100px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 124px;
  }
`;

const Elements = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    margin-top: 30px;
  }

  width: calc(100% - ${SIDE_MARGIN_PX.small * 2}px);

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

const StyledPrimaryButton = styled(Button3)`
  align-self: flex-start;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

const ButtonHelpIconWrapper = styled.div`
  flex: 0 0 40px;

  svg {
    margin-top: 6px;
  }
`;
const ButtonContainer = styled.div`
  margin-right: 10px;
`;

const HelpText = styled.div`
  color: ${Grey20};
  font-size: 12px;
  margin-top: 5px;
`;

export const signupEmailJustSent = (prevIsRegisteringWithEmailSent, isRegisteringWithEmailSent) =>
  !prevIsRegisteringWithEmailSent && isRegisteringWithEmailSent;

const validate = (values, { minAge }) => ({
  ...appFormValidation.email('email', values),
  ...signUpFormValidation.birthday('day', values, minAge),
});

class SignUpWithEmail extends React.Component {
  state = {
    showBirthdayHelp: false,
    showMagicLinkHelp: false,
  };

  componentDidUpdate(prevProps) {
    const { changeStep, isRegisteringWithEmailSent, location, closeWizard } = this.props;

    if (signupEmailJustSent(prevProps.isRegisteringWithEmailSent, isRegisteringWithEmailSent)) {
      if (matchPath(location.pathname, routes.joinotro)) {
        closeWizard();
      } else {
        changeStep(authenticationSteps.CheckYourEmail);
      }
    }
  }

  render() {
    const { valid, handleSubmit, backButton, submitting } = this.props;
    const { showMagicLinkHelp } = this.state;
    return (
      <Fragment>
        <SignInContainer>
          <form onSubmit={handleSubmit}>
            <Container>
              <TitleContainer>
                <BulletTitle>
                  <FormattedMessage id="signUpWithEmail.joinUsAt" defaultMessage="Join OTRO" />
                </BulletTitle>
              </TitleContainer>
              <Elements>
                <FormattedMessage id="signUpWithEmail.emailAddress" defaultMessage="Email address">
                  {placeholder => (
                    <Field
                      name="email"
                      type="email"
                      placeholder={placeholder}
                      component={SignInTextField}
                      normalize={v => v.toLowerCase()}
                    />
                  )}
                </FormattedMessage>

                <DateOfBirthInput />

                <MarketingConsentInput />
                <PartnerConsentInput />

                <TermsAndConditions />

                <FieldWrapper>
                  <ButtonContainer>
                    <StyledPrimaryButton
                      disabled={!valid || submitting}
                      data-test-id="sign-up-email-send-magic-link"
                      type="submit"
                    >
                      <FormattedMessage
                        id="signUpWithEmail.sendMagicLink"
                        defaultMessage="Send me a magic link"
                      />
                    </StyledPrimaryButton>
                  </ButtonContainer>
                  <ButtonHelpIconWrapper
                    onClick={() => {
                      this.setState({
                        showMagicLinkHelp: !showMagicLinkHelp,
                      });
                    }}
                  >
                    <HelpIcon />
                  </ButtonHelpIconWrapper>
                </FieldWrapper>
                {showMagicLinkHelp ? (
                  <HelpText>
                    <FormattedMessage
                      id="signUpWithEmail.magicLinkHelp"
                      defaultMessage="A magic link allows you to log into OTRO without creating a password. Clicking on the link automatically signs you in. "
                    />
                  </HelpText>
                ) : null}
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
  const values = get('form.signUpWithEmail.values', state) || {};
  const dateOfBirthParts = getDefaultBirthday(state)(true);
  return {
    isRegisteringWithEmailSent: get('user.isRegisteringWithEmailSent', state),
    formValues: values,
    minAge: getSignupRestrictionLessThanAge(state),
    initialValues: {
      email: state.user.email,
      marketingEmailConsent: state.user.marketingEmailConsent,
      allowPartnerConsent: state.user.allowPartnerConsent,
      day: dateOfBirthParts.day,
      month: dateOfBirthParts.month,
      year: dateOfBirthParts.year,
    },
  };
};

const mapActionsToProps = (dispatch, { location }) => ({
  sendRegistrationEmail: returnUrl => {
    if (matchPath(location.pathname, routes.joinotro)) {
      return dispatch(sendRegistrationEmail('/join'));
    } else {
      return dispatch(sendRegistrationEmail(returnUrl));
    }
  },
  setCollectedDetails: details => dispatch(setCollectedDetails(details)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapActionsToProps
  ),
  reduxForm({
    form: 'signUpWithEmail',
    validate,
    onSubmit: async (
      values,
      dispatch,
      { setCollectedDetails, sendRegistrationEmail, location }
    ) => {
      const d = moment(new Date(values.year, values.month, values.day));
      const birthday = d.format('YYYY-MM-DD');

      setCollectedDetails({
        email: values.email,
        birthday,
        marketingEmailConsent: values.marketingEmailConsent,
        allowPartnerConsent: values.allowPartnerConsent,
      });

      await sendRegistrationEmail(location.pathname);
    },
  })
)(SignUpWithEmail);
