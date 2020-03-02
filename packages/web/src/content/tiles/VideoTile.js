import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, includes } from 'lodash/fp';
import { getTimestamp, getPartner } from 'xi-core/content/selectors';
import { getCtaText, getTagType, isContentComingSoon } from 'xi-core/content/selectors';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import durationFromSeconds from 'xi-core/content/durationFromSeconds';
import { tagTypes } from 'xi-core/content/tagTypes';
import {
  ROW_HEIGHT_PX,
  CoreDevices,
  HelperDevices,
  SIDE_MARGIN_PX,
  ContainerPaddingCss,
} from '../../common/dimensions';
import { CtaButton } from '../../common/buttons';
import { BodySmall } from '../../common/typography';
import Gradients from '../components/Gradients';
import ContentInteractionFooter from '../components/ContentInteractionFooter';
import DayAndTime from '../../common/DayAndTime';
import AvatarGroup from '../../common/AvatarGroup';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import VideoProgressBar from '../../common/VideoProgressBar';
import Partner from '../components/Partner';
import Tag from '../components/Tag';
import TileTitle from './components/TileTitle';
import DefaultBackground from './components/DefaultBackground';
import TileDescription from './components/TileDescription';
import { TileContainerLink, TileContainerLinkHover } from './components/TileContainer';

const TopElements = styled.div`
  ${ContainerPaddingCss};
`;

const TopElementsInset = styled(TopElements)`
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
`;

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

const CTAInfo = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 20px;
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

const StyledPartner = styled(Partner)`
  margin-top: ${ROW_HEIGHT_PX}px;
  max-width: 130px;
  @media ${CoreDevices.medium} {
    margin-top: ${ROW_HEIGHT_PX * 2}px;
    max-width: 170px;
  }
  @media ${CoreDevices.large} {
    margin-top: ${ROW_HEIGHT_PX * 4}px;
    max-width: 210px;
  }
  ${ContainerPaddingCss};
  ${BodySmall};
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

const VideoTile = ({
  history,
  externalId,
  creatives,
  title,
  description,
  duration,
  containerInset,
  hideAvatar,
  hideTimestamp,
  contributors,
  contentTypeName,
  timestamp,
  partner = {},
  loaded,
  loadingComplete,
  getCtaText,
  tagType,
  comingSoonContent,
  hero = false,
}) => {
  const durationText = durationFromSeconds(duration);
  const displayDurationText = !includes(tagType, [tagTypes.COMING_SOON]);

  return (
    <Fragment key={externalId}>
      <DefaultBackground />
      <Gradients>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>

      {loadingComplete ? (
        <Fragment>
          {containerInset ? (
            <TileContainerLinkHover
              to={`/content/${externalId}`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
              data-test-id="hero-link"
              disabled={comingSoonContent}
              onClick={e => {
                if (comingSoonContent) {
                  e.preventDefault();
                }
              }}
            >
              <TopElementsInset>
                <DayAndTime timestamp={timestamp} />
              </TopElementsInset>

              <BottomElements>
                {contributors.length && !hideAvatar ? (
                  <StyledAvatarGroup starIds={contributors} inset={true} />
                ) : null}
                <StyledTag tagType={tagType} inset />
                <TileTitle hero={hero} inset>
                  {title}
                </TileTitle>

                {partner.creatives ? (
                  <StyledPartner creatives={partner.creatives} alt={partner.titleBrief} />
                ) : (
                  <StyledTileDescription inset>{description}</StyledTileDescription>
                )}

                <ButtonRowInset>
                  {comingSoonContent ? (
                    <Placeholder />
                  ) : (
                    <CtaButton
                      inset
                      data-test-id="watch-video-button"
                      contentType={contentTypeName}
                      className="ctaButton"
                    >
                      {getCtaText()}
                    </CtaButton>
                  )}
                  {durationText && displayDurationText && (
                    <CTAInfo>
                      {durationText} <FormattedMessage id="videoItem.min" defaultMessage="mins" />
                    </CTAInfo>
                  )}
                  <ContentInteractionFooter contentId={externalId} hideComments hideLikes />
                </ButtonRowInset>
                {!comingSoonContent && <VideoProgressBar externalId={externalId} />}
              </BottomElements>
            </TileContainerLinkHover>
          ) : (
            <TileContainerLink
              to={`/content/${externalId}`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
              data-test-id="hero-link"
              disabled={comingSoonContent}
              onClick={e => {
                if (comingSoonContent) {
                  e.preventDefault();
                }
              }}
            >
              {hideTimestamp ? null : (
                <TopElements>
                  <DayAndTime timestamp={timestamp} />
                </TopElements>
              )}

              <BottomElements>
                {contributors.length && !hideAvatar ? (
                  <StyledAvatarGroupInset starIds={contributors} />
                ) : null}
                <StyledTag tagType={tagType} />
                <TileTitle hero={hero}>{title}</TileTitle>

                {partner.creatives ? (
                  <StyledPartner creatives={partner.creatives} alt={partner.titleBrief} />
                ) : (
                  <StyledTileDescription>{description}</StyledTileDescription>
                )}
                <ButtonRow>
                  {comingSoonContent ? (
                    <Placeholder />
                  ) : (
                    <CtaButton
                      data-test-id="watch-video-button"
                      onClick={e => {
                        e.preventDefault();
                        history.push(`/content/${externalId}`);
                      }}
                      contentType={contentTypeName}
                    >
                      {getCtaText()}
                    </CtaButton>
                  )}
                  {durationText && displayDurationText && (
                    <CTAInfo>
                      {durationText} <FormattedMessage id="videoItem.min" defaultMessage="mins" />
                    </CTAInfo>
                  )}
                  <ContentInteractionFooter contentId={externalId} hideComments hideLikes />
                </ButtonRow>
                <VideoProgressBar externalId={externalId} />
              </BottomElements>
            </TileContainerLink>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state, { contentTypeName, externalId }) => ({
  timestamp: getTimestamp(state)(externalId),
  partner: getPartner(state)(externalId),
  getCtaText: () => getCtaText(state)(contentTypeName, false, externalId),
  tagType: getTagType(state)(contentTypeName, externalId),
  comingSoonContent: isContentComingSoon(state)(externalId),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withLoadedFlag()
)(VideoTile);
