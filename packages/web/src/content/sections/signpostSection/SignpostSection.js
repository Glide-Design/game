import React from 'react';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import SignpostItem from './SignpostItem';

const SignpostSection = ({ externalId, loaded }) => (
  <SignpostItem sectionId={externalId} loaded={loaded} />
);

export default withLoadedFlag()(SignpostSection);
