import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'lodash/fp';
import { contentTypes } from 'xi-core/content/contentTypes';
import durationFromSeconds from 'xi-core/content/durationFromSeconds';
import { PrimaryGreen } from 'xi-core/colours';
import { CoreDevices, LIST_ITEM_ASPECT_RATIO, HelperDevices } from '../../common/dimensions';
import Thumbnail from '../thumbnails';
import { Button9 } from '../../common/buttons';
import Tick from '../../common/icons/TickTransparent';
import getSourcesByRatio from '../../common/getSourcesByRatio';
import PlayIcon from '../../common/icons/PlayIcon';
import VideoProgressBar from '../../common/VideoProgressBar';
import CardThumbnailTitle, { TitleHoverStyle, TitleActiveStyle } from './CardThumbnailTitle';

export const LIST_ITEM_WIDTH = { tiny: 98, small: 98, medium: 136, large: 136 };
export const LIST_ITEM_RHS_MARGIN = { tiny: 8, small: 8, medium: 8, large: 8 };
export const LIST_ITEM_HEIGHT = { tiny: 128, small: 128, medium: 173, large: 173 };

const StyledThumbnail = styled(Thumbnail)`
  height: ${LIST_ITEM_HEIGHT.tiny}px;
  > div {
    margin-right: ${LIST_ITEM_RHS_MARGIN.tiny}px;
  }
  width: ${LIST_ITEM_WIDTH.tiny + LIST_ITEM_RHS_MARGIN.tiny}px;
  min-width: ${LIST_ITEM_WIDTH.tiny + LIST_ITEM_RHS_MARGIN.tiny}px;
  position: relative;

  @media ${CoreDevices.small} {
    height: ${LIST_ITEM_HEIGHT.small}px;
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN.small}px;
    }
    width: ${LIST_ITEM_WIDTH.small + LIST_ITEM_RHS_MARGIN.small}px;
    min-width: ${LIST_ITEM_WIDTH.small + LIST_ITEM_RHS_MARGIN.small}px;
  }

  @media ${CoreDevices.medium} {
    height: ${LIST_ITEM_HEIGHT.medium}px;
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN.medium}px;
    }
    width: ${LIST_ITEM_WIDTH.medium + LIST_ITEM_RHS_MARGIN.medium}px;
    min-width: ${LIST_ITEM_WIDTH.medium + LIST_ITEM_RHS_MARGIN.medium}px;
  }

  @media ${CoreDevices.large} {
    height: ${LIST_ITEM_HEIGHT.large}px;
    > div {
      margin-right: ${LIST_ITEM_RHS_MARGIN.large}px;
    }
    width: ${LIST_ITEM_WIDTH.large + LIST_ITEM_RHS_MARGIN.large}px;
    min-width: ${LIST_ITEM_WIDTH.large + LIST_ITEM_RHS_MARGIN.large}px;
  }
`;

const CoveringLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  color: inherit;
  cursor: pointer;

  &:hover {
    ${TitleHoverStyle}
  }

  &:active {
    ${TitleActiveStyle}
  }

  ${({ disabled }) => disabled && DisabledLink}
`;

const DisabledLink = css`
  cursor: default;
`;

const Duration = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 11px;
  text-align: center;
  line-height: 11px;
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 0 4px;
  font-size: 6px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 8px;
  }
`;

const IconHoverStyle = css`
  filter: grayscale(100%) contrast(100);
`;

const IconActiveStyle = css`
  filter: none;
`;

const StyledPlayIcon = styled(PlayIcon)`
  color: ${PrimaryGreen};
  height: 24px;
  width: 24px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    height: 38px;
    width: 38px;
  }

  ${CoveringLink}:hover & {
    ${IconHoverStyle}
  }

  ${CoveringLink}:active & {
    ${IconActiveStyle}
  }
`;

const StyledPlayIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CTAButton = styled(Button9)`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  padding-left: 0;
  padding-right: 0;
  border: 1px solid rgb(124, 82, 246);

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    width: calc(100% - 16px);
    bottom: 8px;
  }

  @media ${HelperDevices.belowMedium} {
    width: calc(100% - 8px);
    bottom: 4px;
  }
`;

const SelectButton = styled(CTAButton)`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  left: auto;
  right: 6px;
`;

const VideoProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
`;

const CardThumbnail = ({
  creatives,
  externalId,
  duration,
  editMode,
  isSelected,
  onSelectClick,
  contentTypeName,
  title,
  comingSoonContent,
  onClick,
}) => {
  const durationText = durationFromSeconds(duration);
  const href = '/content/' + externalId;
  const isPlayIcon = contentTypeName === contentTypes.VIDEO;

  return (
    <StyledThumbnail
      backgroundImgSources={getSourcesByRatio(creatives, LIST_ITEM_ASPECT_RATIO)}
      selected={!editMode || isSelected}
    >
      {!editMode ? (
        <React.Fragment>
          <CoveringLink
            to={href}
            data-test-id="content-thumbnail"
            disabled={comingSoonContent}
            onClick={e => {
              onClick && onClick();
              if (comingSoonContent) {
                e.preventDefault();
              } else {
                onClick && onClick();
              }
            }}
          >
            {false && durationText && <Duration>{durationText}</Duration>}
            {isPlayIcon && !comingSoonContent && (
              <StyledPlayIconContainer>
                <StyledPlayIcon />
              </StyledPlayIconContainer>
            )}
            {!comingSoonContent && <CardThumbnailTitle>{title}</CardThumbnailTitle>}
            <VideoProgressBarContainer>
              <VideoProgressBar externalId={externalId} />
            </VideoProgressBarContainer>
          </CoveringLink>
        </React.Fragment>
      ) : (
        <SelectButton onClick={onSelectClick(externalId)} data-test-id="select-bookmark">
          {isSelected && <Tick />}
        </SelectButton>
      )}
    </StyledThumbnail>
  );
};

export default compose(withRouter)(CardThumbnail);
