import React from 'react';
import styled from 'styled-components';
import { CoreDevices, SECTION_HEIGHT_VH } from '../../../common/dimensions';
import TitledArea from '../../../common/TitledArea';
import ListOfContentThumbnails from './ListOfContentThumbnails';
import ListOfSections from './ListOfSections';

export const SECTION_CONTAINER_MAX_HEIGHT_PX = {
  tiny: 414,
  small: 425,
  medium: 608,
  large: 608,
};

export const SECTION_CONTAINER_MIN_HEIGHT_PX = {
  small: 420,
  medium: 608,
};

const StyledTitledArea = styled(TitledArea)`
  height: ${SECTION_HEIGHT_VH}vh;
  overflow: hidden;
  max-height: ${SECTION_CONTAINER_MAX_HEIGHT_PX.tiny}px;
  @media ${CoreDevices.small} {
    max-height: ${SECTION_CONTAINER_MAX_HEIGHT_PX.small}px;
    min-height: ${SECTION_CONTAINER_MIN_HEIGHT_PX.small}px;
  }
  @media ${CoreDevices.medium} {
    max-height: ${SECTION_CONTAINER_MAX_HEIGHT_PX.medium}px;
    min-height: ${SECTION_CONTAINER_MIN_HEIGHT_PX.medium}px;
  }
  @media ${CoreDevices.large} {
    max-height: ${SECTION_CONTAINER_MAX_HEIGHT_PX.large}px;
  }
`;

const ListWrapper = styled.div`
  margin: auto 0;
  position: relative;
  width: 100%;
  height: 238px;

  @media ${CoreDevices.small} {
    height: 280px;
  }

  @media ${CoreDevices.medium} {
    height: 336px;
  }

  @media ${CoreDevices.large} {
    height: 368px;
  }
`;

const HorizontalThumbnailListSection = ({
  theme,
  name,
  creatives,
  externalId,
  hasChildren,
  loaded,
  hideAvatar,
}) => {
  return (
    <StyledTitledArea {...theme} creatives={creatives} name={name}>
      <ListWrapper>
        {hasChildren ? (
          <ListOfSections sectionId={externalId} hideAvatar={hideAvatar} loaded={loaded} />
        ) : (
          <ListOfContentThumbnails sectionId={externalId} hideAvatar={hideAvatar} loaded={loaded} />
        )}
      </ListWrapper>
    </StyledTitledArea>
  );
};

export default HorizontalThumbnailListSection;
