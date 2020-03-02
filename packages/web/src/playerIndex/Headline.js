import React from 'react';
import { branch, renderComponent } from 'recompose';
import { compose, first } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { contentTypes } from 'xi-core/content/contentTypes';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getContentIdsBySectionId, getContentItemById } from 'xi-core/content/selectors';
import PlainSectionContainer from '../content/sections/PlainSectionContainer';
import StarProfileTile from '../content/tiles/StarProfileTile';

const Headline = ({ content }) => (
  <PlainSectionContainer>
    <StarProfileTile {...content} contentTypeName={contentTypes.PLAYER} gradients={false} />
  </PlainSectionContainer>
);

const noContent = ({ content }) => !content;

export default compose(
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: fetchSectionItems,
    responseSelector: state => sectionId => {
      const ids = getContentIdsBySectionId(state)(sectionId);
      return getContentItemById(state)(first(ids));
    },
    responseAlias: 'content',
    requestCondition: ({ responseData = {} }) => !responseData.externalId,
  }),
  branch(noContent, renderComponent(PlainSectionContainer))
)(Headline);
