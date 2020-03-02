import React from 'react';
import { connect } from 'react-redux';
import { getGalleryIdBySectionId } from 'xi-core/content/selectors';
import TimelineTile from '../tiles/TimelineTile';
import PlainSectionContainer from './PlainSectionContainer';

const TimelineSection = ({ className, galleryId, loaded, ...section }) => (
  <PlainSectionContainer className={className}>
    <TimelineTile {...section} galleryId={galleryId} loaded={loaded} />
  </PlainSectionContainer>
);

const mapStateToProps = (state, { externalId }) => ({
  galleryId: getGalleryIdBySectionId(state)(externalId),
});

export default connect(mapStateToProps)(TimelineSection);
