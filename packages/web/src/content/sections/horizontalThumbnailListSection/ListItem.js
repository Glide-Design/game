import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, includes } from 'lodash/fp';
import { withRouter, Link } from 'react-router-dom';
import { contentTypes } from 'xi-core/content/contentTypes';
import durationFromSeconds from 'xi-core/content/durationFromSeconds';
import { getCtaText, getTagType, isContentComingSoon } from 'xi-core/content/selectors';
import { tagTypes } from 'xi-core/content/tagTypes';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import {
  ROW_HEIGHT_PX,
  SIDE_MARGIN_PX,
  LIST_ITEM_BORDER_PX,
  CoreDevices,
} from '../../../common/dimensions';
import AvatarGroup from '../../../common/AvatarGroup';
import VideoProgressBar from '../../../common/VideoProgressBar';
import { CtaButton, CtaButtonHover, CtaButtonActive } from '../../../common/buttons';
import Thumbnail from '../../thumbnails';
import ThumbnailTitle from '../../thumbnails/ThumbnailTitle';
import Tag from '../../components/Tag';

export const List_item_width_px = {
  tiny: 183,
  small: 215,
  medium: 264,
  large: 292,
};

export const List_item_rhs_margin_px = {
  tiny: 11,
  small: 13,
  medium: 16,
  large: 32,
};

const StyledNormalThumbnail = styled(Thumbnail)`
  height: 100%;

  > div {
    margin-right: ${List_item_rhs_margin_px.tiny}px;
  }
  width: ${List_item_width_px.tiny + List_item_rhs_margin_px.tiny}px;

  @media ${CoreDevices.small} {
    > div {
      margin-right: ${List_item_rhs_margin_px.small}px;
    }
    width: ${List_item_width_px.small + List_item_rhs_margin_px.small}px;
  }

  @media ${CoreDevices.medium} {
    > div {
      margin-right: ${List_item_rhs_margin_px.medium}px;
    }
    width: ${List_item_width_px.medium + List_item_rhs_margin_px.medium}px;
  }

  @media ${CoreDevices.large} {
    > div {
      margin-right: ${List_item_rhs_margin_px.large}px;
    }
    width: ${List_item_width_px.large + List_item_rhs_margin_px.large}px;
  }
`;

const LIST_ITEM_RHS_MARGIN_STACKED_PX = {
  tiny: 65,
  small: 70,
  medium: 86,
  large: 140,
};

const StyledStackedThumbnail = styled(Thumbnail)`
  height: 100%;

  > div {
    margin-right: ${LIST_ITEM_RHS_MARGIN_STACKED_PX.tiny}px;
  }
  width: ${List_item_width_px.tiny + LIST_ITEM_RHS_MARGIN_STACKED_PX.tiny}px;

  @media ${CoreDevices.small} {
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN_STACKED_PX.small}px;
    }
    width: ${List_item_width_px.small + LIST_ITEM_RHS_MARGIN_STACKED_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN_STACKED_PX.medium}px;
    }
    width: ${List_item_width_px.medium + LIST_ITEM_RHS_MARGIN_STACKED_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN_STACKED_PX.large}px;
    }
    width: ${List_item_width_px.large + LIST_ITEM_RHS_MARGIN_STACKED_PX.large}px;
  }
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  margin: ${ROW_HEIGHT_PX * 2}px 0 0 ${SIDE_MARGIN_PX.small - LIST_ITEM_BORDER_PX}px;
  img {
    width: 40px;
    height: 40px;
  }
  :not(.expanded a) {
    margin-right: -18px !important;
  }
  .expanded a {
    margin-right: 16px !important;
  }
`;

const BottomElements = styled.div`
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: auto;
`;

const StyledCtaButton = styled(CtaButton)`
  margin: 0 auto ${ROW_HEIGHT_PX * 2}px;
`;

const CoveringLink = styled(Link)`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: inherit;

  &:hover {
    button {
      ${CtaButtonHover}
    }
  }

  &:active {
    button {
      ${CtaButtonActive}
    }
  }

  ${({ disabled }) => disabled && DisabledLink}
`;

const StyledTag = styled(Tag)`
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
`;

const DurationText = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 3px 5px;
  line-height: 12px;
`;

const DisabledLink = css`
  cursor: default;
`;

const getCTA = (getCtaText, stacked, contentTypeName, comingSoonContent) => {
  if (comingSoonContent) {
    return null;
  }

  let testId = null;
  switch (contentTypeName) {
    case contentTypes.VIDEO:
      testId = 'watch-video-button';
      break;
    case contentTypes.ARTICLE:
      testId = 'read-article-button';
      break;
    case contentTypes.SOCIAL:
      testId = 'view-social-button';
      break;
    default:
      break;
  }

  return (
    <StyledCtaButton contentType={contentTypeName} data-test-id={testId}>
      {stacked ? (
        <FormattedMessage id="listItem.viewAll" defaultMessage="View All" />
      ) : (
        getCtaText()
      )}
    </StyledCtaButton>
  );
};

const ListItem = ({
  stacked = false,
  href,
  backgroundImgSources,
  title,
  showPublisher = false,
  contentTypeName,
  contributors = [],
  loaded,
  loadingComplete,
  hideAvatar,
  getCtaText,
  externalId,
  tagType,
  comingSoonContent,
  duration,
}) => {
  const StyledThumbnail = stacked ? StyledStackedThumbnail : StyledNormalThumbnail;
  const durationText = durationFromSeconds(duration);
  const displayDurationText = !includes(tagType, [tagTypes.COMING_SOON]);

  return (
    <StyledThumbnail backgroundImgSources={backgroundImgSources} stacked={stacked} loaded={loaded}>
      {loadingComplete ? (
        <Fragment>
          <CoveringLink
            to={href}
            data-test-id={stacked ? 'view-all' : 'watch video'}
            onClick={e => {
              if (comingSoonContent) {
                e.preventDefault();
              }
            }}
            disabled={comingSoonContent}
          >
            {!!durationText && displayDurationText && (
              <DurationText>
                {durationText} <FormattedMessage id="videoItem.min" defaultMessage="mins" />
              </DurationText>
            )}
            <StyledTag tagType={tagType} />
            {showPublisher && contributors.length && !hideAvatar ? (
              <StyledAvatarGroup starIds={contributors} />
            ) : null}
            <BottomElements>
              <ThumbnailTitle stacked={stacked}>{title}</ThumbnailTitle>
              {getCTA(getCtaText, stacked, contentTypeName, comingSoonContent)}
              {!comingSoonContent && <VideoProgressBar externalId={externalId} />}
            </BottomElements>
          </CoveringLink>
        </Fragment>
      ) : null}
    </StyledThumbnail>
  );
};

export default compose(
  connect((state, { contentTypeName, externalId }) => ({
    getCtaText: () => getCtaText(state)(contentTypeName, false, externalId),
    tagType: getTagType(state)(contentTypeName, externalId),
    comingSoonContent: isContentComingSoon(state)(externalId),
  })),
  withRouter,
  withLoadedFlag()
)(ListItem);
