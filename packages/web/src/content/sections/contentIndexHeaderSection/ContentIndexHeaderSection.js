import React from 'react';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import ContentIndexHeaderItem from './ContentIndexHeaderItem';

const ContentIndexHeaderSection = ({ externalId, loaded }) => (
  <ContentIndexHeaderItem sectionId={externalId} loaded={loaded} />
);

export default withLoadedFlag()(ContentIndexHeaderSection);
