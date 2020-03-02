import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { get, compose } from 'lodash/fp';
import { authenticationSteps } from 'xi-core/signup/constants';
import { changeAuthWizardStep } from 'xi-core/signup/actions';
import { isOpen, getStep } from 'xi-core/signup/selectors';
import Registration from './Registration';
import JoinOptions from './JoinOptions';
import SignUpWithEmail from './SignUpWithEmail';
import CheckYourEmail from './CheckYourEmail';
import SignInWithEmail from './SignInWithEmail';
import CollectNames from './CollectNames';
import EmailResent from './EmailResent';

const getKeyFromStep = step =>
  Object.keys(authenticationSteps).find(key => authenticationSteps[key] === step);

export default WrappedComponent => {
  class AuthenticationWizard extends React.Component {
    stepComponents = backButton => {
      const { changeAuthWizardStep, closeAuthWizard, open } = this.props;

      const standardProps = {
        changeStep: changeAuthWizardStep,
        closeWizard: () => closeAuthWizard(open),
        backButton,
      };

      return {
        Registration: <Registration {...standardProps} />,
        JoinOptions: <JoinOptions {...standardProps} />,
        SignUpWithEmail: <SignUpWithEmail {...standardProps} />,
        // SendEmail: <SendEmail />,
        CheckYourEmail: <CheckYourEmail {...standardProps} />,
        // SignUpWithPassword: <SignUpWithPassword />,
        CollectNames: <CollectNames {...standardProps} />,
        EmailResent: <EmailResent {...standardProps} />,
        SignInWithEmail: <SignInWithEmail {...standardProps} />,
      };
    };

    getCurrentStep = (step, backButton) => {
      return this.stepComponents(backButton)[getKeyFromStep(step)];
    };

    getPreviousStep = currentStep => {
      switch (currentStep) {
        case authenticationSteps.Registration:
        case authenticationSteps.CollectNames:
          return null;
        case authenticationSteps.JoinOptions:
          return authenticationSteps.Registration;
        case authenticationSteps.SignInWithEmail:
          return authenticationSteps.JoinOptions;
        case authenticationSteps.CheckYourEmail:
          if (get('state.signIn', this.props.location)) {
            return authenticationSteps.SignInWithEmail;
          } else {
            return authenticationSteps.JoinOptions;
          }
        default:
          return authenticationSteps[getKeyFromStep(currentStep - 1)];
      }
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      return (
        <WrappedComponent
          {...this.props}
          getCurrentStep={this.getCurrentStep}
          getPreviousStep={this.getPreviousStep}
        />
      );
    }
  }
  const mapStateToProps = state => ({
    step: getStep(state),
    open: isOpen(state),
  });

  const mapDispatchToProps = (dispatch, { history }) => ({
    changeAuthWizardStep: (nextStep, custom = {}) =>
      dispatch(changeAuthWizardStep({ history, nextStep, custom })),
  });

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(AuthenticationWizard);
};
