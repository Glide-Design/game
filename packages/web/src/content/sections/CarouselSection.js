// This file is structurally identical to HeroSection except withRequest. This will change when:
// 1) We have a better understanding of section names
// 2) We remove the notion feeds

import React from 'react';
import { branch, renderComponent } from 'recompose';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getContentIdsBySectionId } from 'xi-core/content/selectors';
import withLoadOneByOne from 'xi-core/withLoadOneByOne';
import ContentTile from '../tiles/ContentTile';
import MediaCarousel from '../../common/MediaCarousel';
import PlainSectionContainer from './PlainSectionContainer';

const CarouselSection = ({ contentIds, hideAvatar, oneItemLoaded }) => (
  <PlainSectionContainer>
    {contentIds.length > 1 ? (
      <MediaCarousel
        items={contentIds.map(id => (
          <ContentTile id={id} key={id} hideAvatar={hideAvatar} loaded={oneItemLoaded} />
        ))}
      />
    ) : (
      <ContentTile id={contentIds[0]} hideAvatar={hideAvatar} loaded={oneItemLoaded} />
    )}
  </PlainSectionContainer>
);

const noContent = ({ contentIds }) => !contentIds || !contentIds.length;

export default compose(
  withRequest({
    requestAction: fetchSectionItems,
    responseSelector: getContentIdsBySectionId,
    responseAlias: 'contentIds',
  }),
  branch(noContent, renderComponent(PlainSectionContainer)),
  withLoadOneByOne({
    itemsLabel: 'contentIds',
    count: 1,
  })
)(CarouselSection);
