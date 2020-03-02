import React, { Fragment } from 'react';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { withProps } from 'recompose';
import { fetchTemplateSections } from 'xi-core/content/actions';
import { getSectionsForTemplateId } from 'xi-core/content/selectors';
import Sections from '../content/sections';
import FixedToolbarOnScroll from '../common/FixedToolbarOnScroll';

const ContentIndex = ({ sections = [] }) => {
  return (
    <Fragment>
      <FixedToolbarOnScroll />
      <Sections sections={sections} hideAvatar={true} />
    </Fragment>
  );
};

export default compose(
  withProps(({ match }) => ({ contentIndexId: `content-index/${match.params.contentIndexId}` })),
  withRequest({
    requestIdAlias: 'contentIndexId',
    requestAction: fetchTemplateSections,
    responseSelector: getSectionsForTemplateId,
    responseAlias: 'sections',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(ContentIndex);
