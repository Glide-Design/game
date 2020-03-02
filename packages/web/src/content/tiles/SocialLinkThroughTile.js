import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose, first } from 'lodash/fp';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCtaText } from 'xi-core/content/selectors';
import {
  ROW_HEIGHT_PX,
  CoreDevices,
  HelperDevices,
  SIDE_MARGIN_PX,
  ContainerPaddingCss,
} from '../../common/dimensions';
import { CtaButton } from '../../common/buttons';
import Gradients from '../components/Gradients';
import ContentInteractionFooter from '../components/ContentInteractionFooter';
import AvatarGroup from '../../common/AvatarGroup';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import TileTitle from './components/TileTitle';
import DefaultBackground from './components/DefaultBackground';
import TileDescription from './components/TileDescription';
import { TileContainerLinkHover } from './components/TileContainer';
import { StyledSocialIcon } from './SocialTile';

const BottomElements = styled.div`
  margin-top: auto;
`;

const StyledTileDescription = styled(TileDescription)`
  margin-top: ${ROW_HEIGHT_PX * 3}px;

  @media ${HelperDevices.belowMedium} {
    margin-top: ${ROW_HEIGHT_PX * 2}px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${ROW_HEIGHT_PX * 4}px;
  margin-top: ${ROW_HEIGHT_PX * 3}px;
  ${ContainerPaddingCss};

  @media ${HelperDevices.belowMedium} {
    margin-bottom: ${ROW_HEIGHT_PX * 3}px;
    margin-top: ${ROW_HEIGHT_PX * 2}px;
  }
`;

const ButtonRowInset = styled(ButtonRow)`
  margin-bottom: ${ROW_HEIGHT_PX}px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    margin-top: ${ROW_HEIGHT_PX * 2}px;
  }
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  margin-bottom: 30px;
  ${ContainerPaddingCss};
  @media ${HelperDevices.belowMedium} {
    margin-bottom: 16px;
  }
`;

const SocialLinkThroughTile = ({
  externalId,
  creatives,
  title,
  description,
  hideAvatar,
  contributors,
  partners,
  contentTypeName,
  loaded,
  getCtaText,
}) => {
  const href = `/content/${externalId}`;
  return (
    <Fragment key={externalId}>
      <DefaultBackground />
      <Gradients>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>

      <TileContainerLinkHover
        to={href}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        data-test-id="hero-link"
      >
        <StyledSocialIcon partner={first(partners)} />
        <BottomElements>
          {contributors.length && !hideAvatar ? (
            <StyledAvatarGroup starIds={contributors} inset={true} />
          ) : null}
          <TileTitle inset>{title}</TileTitle>

          <StyledTileDescription inset>{description}</StyledTileDescription>

          <ButtonRowInset>
            <CtaButton
              inset
              data-test-id="read-article-button"
              contentType={contentTypeName}
              className="ctaButton"
            >
              {getCtaText()}
            </CtaButton>
            <ContentInteractionFooter contentId={externalId} hideComments hideLikes />
          </ButtonRowInset>
        </BottomElements>
      </TileContainerLinkHover>
    </Fragment>
  );
};

export default compose(
  connect((state, { contentTypeName, externalId }) => ({
    getCtaText: () => getCtaText(state)(contentTypeName, false, externalId),
  })),
  withRouter
)(SocialLinkThroughTile);
