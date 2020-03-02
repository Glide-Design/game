import React from 'react';
import { authenticationSteps } from 'xi-core/signup/constants';
import Join from '../join';

export default () => (
  <Join locationState={{ signUpWizard: authenticationSteps.CheckYourEmail, signIn: true }} />
);
