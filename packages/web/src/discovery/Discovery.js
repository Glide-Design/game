import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'lodash/fp';
import { lifecycle } from 'recompose';
import withRequest from 'xi-core/withRequest';
import { fetchTemplateSections } from 'xi-core/content/actions';
import { getSectionsForTemplateId } from 'xi-core/content/selectors';
import { getTemplateId } from 'xi-core/config/selectors';
import { CoreDevices, HelperDevices } from '../common/dimensions';
import PullToRefresh from '../common/PullToRefresh';
import Sections from '../content/sections';

const StyledLogo = styled.img`
  position: absolute;
  margin: auto;
  z-index: 1;
  left: 0;
  right: 0;
  top: 34px;
  height: 40px;
  @media ${HelperDevices.belowMedium} {
    height: 19px;
  }
  @media ${CoreDevices.medium} {
    top: 39px;
    height: 25px;
  }
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const TopGradient = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0), #000000);
  height: 72px;
  @media ${CoreDevices.medium} {
    height: 88px;
  }
  @media ${CoreDevices.large} {
    display: none;
  }
`;

export const TopLogo = () => (
  <Fragment>
    <TopGradient />
    <StyledLogo src="/images/logo/otro-logo@2x.png" alt="Otro" />
  </Fragment>
);

const Discovery = ({ sections = [] }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <TopLogo />
      <Sections sections={sections} hideAvatar={true} />
    </PullToRefresh>
  );
};

const mapStateToProps = state => ({
  discoveryTemplateId: getTemplateId('discover')(state),
});

export default compose(
  connect(mapStateToProps),
  withRequest({
    requestIdAlias: 'discoveryTemplateId',
    requestAction: fetchTemplateSections,
    responseSelector: getSectionsForTemplateId,
    responseAlias: 'sections',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  }),
  lifecycle({
    componentWillMount: () => (document.title = 'OTRO'),
  })
)(Discovery);
