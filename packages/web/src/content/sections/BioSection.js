import React from 'react';
import StarProfileBioTile from '../tiles/StarProfileBioTile';
import PlainSectionContainer from './PlainSectionContainer';

const BioSection = ({ starId, className }) => (
  <PlainSectionContainer className={className}>
    <StarProfileBioTile starId={starId} />
  </PlainSectionContainer>
);

export default BioSection;
