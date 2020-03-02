import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose, difference } from 'lodash/fp';
import { connect } from 'react-redux';
import { withProps, lifecycle, branch, renderComponent } from 'recompose';
import withPlayerProfileLoadedEvent from 'xi-core/analytics/withPlayerProfileLoadedEvent';
import { fetchSectionItems } from 'xi-core/content/actions';
import { currentOpenComments } from 'xi-core/comments/selectors';
import { getContentIdsBySectionId, getSectionsByIds } from 'xi-core/content/selectors';
import { fetchStar } from 'xi-core/stars/actions';
import {
  getSectionIdsForStarId,
  getDefaultSectionIdForStarId,
  getStarById,
  getStarName,
  getStarByAlias,
} from 'xi-core/stars/selectors';
import { getFetching } from 'xi-core/app/selectors';
import withRequest from 'xi-core/withRequest';
import NoMatch from '../app/NoMatch';
import PoppyScrollView from '../common/PoppyScrollView';
import { CoreDevices } from '../common/dimensions';
import SectionDivider from '../common/SectionDivider';
import FixedToolbarOnScroll from '../common/FixedToolbarOnScroll';
import ContentTile from '../content/tiles/ContentTile';
import TileGridSection from '../content/sections/TileGridSection';
import BioSection from '../content/sections/BioSection';
import Sections from '../content/sections';
import ModalComments from '../comments/ModalComments';
import LoadingSpinner from '../content/pages/LoadingSpinner';
import Headline from './Headline';

const StyledBioSection = styled(BioSection)`
  @media ${CoreDevices.medium} {
    margin-top: -100px;
  }
  @media ${CoreDevices.large} {
    margin-top: -72px;
  }
`;

const getItems = itemIds =>
  itemIds.map(id => (
    <ContentTile id={id} containerInset={true} hideAvatar={true} playerProfile={true} />
  ));

const AboutTab = compose(
  withRequest({
    responseSelector: (state, ownProps) => () => getSectionsByIds(state)(ownProps.sectionIds),
    responseAlias: (response, state, id) => {
      const isFetchingSectionItems = getFetching(id)(state);
      return {
        sections: response,
        loading: isFetchingSectionItems,
      };
    },
  })
)(({ starId, sections = [], loading = true }) =>
  loading ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <StyledBioSection starId={starId} />
      <SectionDivider />
      <Sections sections={sections} />
    </Fragment>
  )
);

const FeedTab = compose(
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: ids => {
      return fetchSectionItems(ids);
    },
    responseSelector: getContentIdsBySectionId,
    responseAlias: (response, state, id) => {
      const isFetchingSectionItems = getFetching(id)(state);
      return {
        itemIds: response,
        loading: isFetchingSectionItems,
      };
    },
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(({ itemIds = [], loading = true }) => {
  return loading ? (
    <LoadingSpinner />
  ) : (
    <TileGridSection tiles={getItems(itemIds)} loading={loading} />
  );
});

const PlayerProfile = ({
  starId,
  star = {},
  sectionIds = [],
  defaultSectionId,
  location: { hash },
  commentsContentId,
  starName,
}) => (
  <Fragment>
    <FixedToolbarOnScroll title={starName} />
    <PoppyScrollView
      headlineCreatives={star.headlineCreatives}
      headlineElements={<Headline {...star} />}
      items={
        hash === '#about' ? (
          <AboutTab starId={starId} sectionIds={difference(sectionIds, [defaultSectionId])} />
        ) : (
          <FeedTab sectionId={defaultSectionId} />
        )
      }
    />
    <ModalComments contentId={commentsContentId} />
  </Fragment>
);

const mapStateToProps = (state, { match, starId }) => ({
  commentsContentId: currentOpenComments(state),
  starName: getStarName(state)(match.params.starId),
});

export default compose(
  connect(mapStateToProps),
  withProps(({ match }) => ({ starId: match.params.starId })),
  withRequest({
    requestIdAlias: 'starId',
    requestAction: fetchStar,
    responseSelector: getStarById,
    responseAlias: (response, state, id) => {
      id = getStarByAlias(state)(id);
      return {
        starId: id,
        star: response,
        sectionIds: getSectionIdsForStarId(state)(id),
        defaultSectionId: getDefaultSectionIdForStarId(state)(id),
      };
    },
    requestCondition: ({ responseData = {} }) => !responseData.sections,
  }),
  lifecycle({
    shouldComponentUpdate: ({ starName = 'OTRO' }) => {
      if (starName && starName !== document.title) {
        document.title = starName;
      }
      return true;
    },
  }),
  withPlayerProfileLoadedEvent,
  branch(() => window.is404, renderComponent(NoMatch))
)(PlayerProfile);
