import React from 'react';
import { authenticationSteps } from 'xi-core/signup/constants';
import FixedFullScreenContainer from '../../common/FixedFullScreenContainer';
import Join from '../join';

const getContainer = children => <FixedFullScreenContainer>{children}</FixedFullScreenContainer>;

export default () => (
  <Join
    container={getContainer}
    locationState={{ signUpWizard: authenticationSteps.JoinOptions }}
  />
);
