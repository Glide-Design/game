import React from 'react';
import { compose, first } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getSectionItems } from 'xi-core/content/selectors';
import ContentIndexHeaderTile from '../../tiles/ContentIndexHeaderTile';
import PlainSectionContainer from '../PlainSectionContainer';

const ContentIndexHeaderItem = ({ items, loaded }) => {
  const headerItem = first(items);

  if (!headerItem) {
    return null;
  }

  const { title, description, creatives } = headerItem;

  return (
    <PlainSectionContainer>
      <ContentIndexHeaderTile
        creatives={creatives}
        title={title}
        description={description}
        loaded={loaded}
      />
    </PlainSectionContainer>
  );
};

export default compose(
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: fetchSectionItems,
    responseSelector: getSectionItems,
    responseAlias: 'items',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(ContentIndexHeaderItem);
