import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router';
import { getPublisherIdForContent } from 'xi-core/content/selectors';
import { getCtaText } from 'xi-core/content/selectors';
import {
  ROW_HEIGHT_PX,
  CoreDevices,
  SIDE_MARGIN_PX,
  ContainerPaddingCss,
} from '../../common/dimensions';
import { Button3 } from '../../common/buttons';
import Gradients from '../components/Gradients';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import TileTitle from './components/TileTitle';
import TileDescription from './components/TileDescription';
import DefaultBackground from './components/DefaultBackground';
import TileContainer, { TileContainerLink } from './components/TileContainer';

const StyledTileDescription = styled(TileDescription)`
  margin-top: ${ROW_HEIGHT_PX}px;
  @media ${CoreDevices.medium} {
    margin-top: ${ROW_HEIGHT_PX * 2}px;
  }
  @media ${CoreDevices.large} {
    margin-top: ${ROW_HEIGHT_PX * 3}px;
  }
`;

const ElementsWrapper = styled.div`
  margin-top: auto;
`;

const ButtonRow = styled.div`
  margin-bottom: 62px;
  margin-top: ${ROW_HEIGHT_PX * 3}px;
  @media ${CoreDevices.medium} {
    margin-top: 34px;
    margin-bottom: 92px;
  }
  @media ${CoreDevices.large} {
    margin-top: 60px;
    margin-bottom: 88px;
  }
  ${ContainerPaddingCss};
`;

const ButtonRowInset = styled(ButtonRow)`
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
`;

const StarProfileTile = ({
  creatives,
  containerInset,
  title,
  description,
  starId,
  externalId,
  history,
  loaded,
  getCtaText,
  gradients = true,
}) => {
  const button = (
    <Button3
      inset={containerInset}
      onClick={() => history.push(`/star/${starId}`)}
      data-test-id="view-star-profile"
    >
      {getCtaText()}
    </Button3>
  );
  return (
    <Fragment key={externalId}>
      <DefaultBackground />
      <Gradients hideLinearGradient={!gradients} hideFade={!gradients}>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>

      {starId ? (
        <TileContainerLink
          to={`/star/${starId}`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          data-test-id="hero-link"
        >
          <ElementsWrapper>
            <TileTitle inset={containerInset}>{title}</TileTitle>

            <StyledTileDescription inset={containerInset}>{description}</StyledTileDescription>

            {containerInset ? (
              <ButtonRowInset>{button}</ButtonRowInset>
            ) : (
              <ButtonRow>{button}</ButtonRow>
            )}
          </ElementsWrapper>
        </TileContainerLink>
      ) : (
        <TileContainer>
          <ElementsWrapper>
            <TileTitle>{title}</TileTitle>
            <StyledTileDescription>{description}</StyledTileDescription>
            <ButtonRowInset />
          </ElementsWrapper>
        </TileContainer>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state, { contentTypeName, externalId }) => ({
  starId: getPublisherIdForContent(state)(externalId),
  getCtaText: () => getCtaText(state)(contentTypeName, false, externalId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(StarProfileTile);
