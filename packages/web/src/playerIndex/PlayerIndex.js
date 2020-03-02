import React, { Fragment } from 'react';
import { first, get, compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import withRequest from 'xi-core/withRequest';
import { fetchTemplateSections } from 'xi-core/content/actions';
import { getSectionsForTemplateId } from 'xi-core/content/selectors';
import { getTemplateId } from 'xi-core/config/selectors';
import SectionDivider from '../common/SectionDivider';
import PlayerList from './PlayerList';
import Headline from './Headline';

const PlayerIndex = ({ sections = [] }) => (
  <Fragment>
    <Headline sectionId={get('externalId', first(sections))} />
    <SectionDivider />
    <PlayerList />
  </Fragment>
);

const mapStateToProps = state => ({
  playerIndexTemplateId: getTemplateId('playerIndex')(state),
});

export default compose(
  connect(mapStateToProps),
  withRequest({
    requestIdAlias: 'playerIndexTemplateId',
    requestAction: fetchTemplateSections,
    responseSelector: getSectionsForTemplateId,
    responseAlias: 'sections',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  }),
  lifecycle({
    componentWillMount: () => (document.title = 'OTRO'),
  })
)(PlayerIndex);
