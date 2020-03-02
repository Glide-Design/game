import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, get } from 'lodash/fp';
import { connect } from 'react-redux';
import { closeAuthWizard } from 'xi-core/signup/actions';
import { authenticationSteps } from 'xi-core/signup/constants';
import Overlay from '../common/overlay';
import Progress from '../common/Progress';
import OverlayBackButton from '../common/OverlayBackButton';
import AuthenticationWizard from './AuthenticationWizard';

class AuthenticationOverlay extends React.Component {
  getBackButton = () => {
    const { step, getPreviousStep, changeAuthWizardStep, closeAuthWizard } = this.props;
    return getPreviousStep(step) !== null ? (
      <OverlayBackButton onClick={() => changeAuthWizardStep(getPreviousStep(step))} />
    ) : (
      <OverlayBackButton onClick={() => closeAuthWizard(true)} />
    );
  };

  getProgressStep = selectedStep => {
    switch (selectedStep) {
      case authenticationSteps.JoinOptions:
        return 1;
      case authenticationSteps.CheckYourEmail:
        return 2;
      case authenticationSteps.CollectNames:
        return 3;
      default:
        return;
    }
  };

  render() {
    const { open, step, getCurrentStep, location } = this.props;
    const type = get('state.signIn', location) ? 'signin' : 'signup';

    return (
      <Overlay open={open} memory={step} fullScreen>
        {({ memory: step }) => {
          return (
            <React.Fragment>
              {this.getProgressStep(step) && type === 'signup' ? (
                <Progress steps={4} currentStep={this.getProgressStep(step)} />
              ) : null}
              {getCurrentStep(step, this.getBackButton())}
            </React.Fragment>
          );
        }}
      </Overlay>
    );
  }
}

export default compose(
  withRouter,
  connect(
    null,
    (dispatch, { history }) => ({
      closeAuthWizard: open => {
        if (open) {
          dispatch(closeAuthWizard(history));
          const location = history.location;
          if (get('state.fromActivation', location)) {
            history.replace(location.pathname);
          } else {
            history.goBack();
          }
        }
      },
    })
  ),
  AuthenticationWizard
)(AuthenticationOverlay);
