import React, { Fragment } from 'react';
import styled from 'styled-components';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCtaText, getTagType, isContentComingSoon } from 'xi-core/content/selectors';
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
import Tag from '../components/Tag';
import TileTitle from './components/TileTitle';
import DefaultBackground from './components/DefaultBackground';
import { TileContainerLinkHover, TileContainerLink } from './components/TileContainer';

const BottomElements = styled.div`
  margin-top: auto;
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

const StyledAvatarGroupInset = styled(StyledAvatarGroup)`
  left: ${SIDE_MARGIN_PX.small}px;
  @media ${CoreDevices.medium} {
    left: ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.large} {
    left: ${SIDE_MARGIN_PX.small}px;
  }
`;

const StyledTag = styled(Tag)`
  margin: 0 0 20px ${SIDE_MARGIN_PX.small}px;

  ${({ inset }) =>
    !inset &&
    `
      @media ${CoreDevices.medium} {
        margin-left: ${SIDE_MARGIN_PX.medium}px;
      }
      @media ${CoreDevices.large} {
        margin-left: ${SIDE_MARGIN_PX.large}px;
      }
  `}
`;

const Placeholder = styled.div`
  display: flex;
`;

const ArticleTile = ({
  externalId,
  creatives,
  title,
  containerInset,
  hideAvatar,
  contributors,
  contentTypeName,
  loaded,
  getCtaText,
  tagType,
  comingSoonContent,
  hero = false,
}) => {
  const href = `/content/${externalId}`;
  return (
    <Fragment key={externalId}>
      <DefaultBackground />
      <Gradients>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>

      {containerInset ? (
        <TileContainerLinkHover
          to={href}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          data-test-id="hero-link"
          onClick={e => {
            if (comingSoonContent) {
              e.preventDefault();
            }
          }}
        >
          <BottomElements>
            {contributors.length && !hideAvatar ? (
              <StyledAvatarGroup starIds={contributors} inset={true} />
            ) : null}
            <StyledTag tagType={tagType} inset />
            <TileTitle hero={hero} inset>
              {title}
            </TileTitle>

            <ButtonRowInset>
              {comingSoonContent ? (
                <Placeholder />
              ) : (
                <CtaButton
                  inset
                  data-test-id="read-article-button"
                  contentType={contentTypeName}
                  className="ctaButton"
                >
                  {getCtaText()}
                </CtaButton>
              )}
              <ContentInteractionFooter contentId={externalId} hideComments hideLikes />
            </ButtonRowInset>
          </BottomElements>
        </TileContainerLinkHover>
      ) : (
        <TileContainerLink
          to={href}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          data-test-id="hero-link"
          disabled={comingSoonContent}
          onClick={e => {
            if (comingSoonContent) {
              e.preventDefault();
            }
          }}
        >
          <BottomElements>
            {contributors.length && !hideAvatar ? (
              <StyledAvatarGroupInset starIds={contributors} />
            ) : null}
            <StyledTag tagType={tagType} />
            <TileTitle hero={hero}>{title}</TileTitle>
            <ButtonRow>
              {comingSoonContent ? (
                <Placeholder />
              ) : (
                <CtaButton data-test-id="read-article-button" contentType={contentTypeName}>
                  {getCtaText()}
                </CtaButton>
              )}
              <ContentInteractionFooter contentId={externalId} hideComments hideLikes />
            </ButtonRow>
          </BottomElements>
        </TileContainerLink>
      )}
    </Fragment>
  );
};

export default compose(
  connect((state, { contentTypeName, externalId }) => ({
    getCtaText: () => getCtaText(state)(contentTypeName, false, externalId),
    tagType: getTagType(state)(contentTypeName, externalId),
    comingSoonContent: isContentComingSoon(state)(externalId),
  })),
  withRouter
)(ArticleTile);
