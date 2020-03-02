import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';
import { galleryShape } from 'xi-core/gallery/constants';
import TimelineController from 'xi-core/gallery/timeline/TimelineController';
import { ROW_HEIGHT_PX } from '../../common/dimensions';
import BackButton from '../../common/BackButton';
import FixedToolbar from '../../common/FixedToolbar';
import LoaderSpinner from '../../common/LoaderSpinner';
import { CoreDevices } from '../../common/dimensions';
import ScrollableContent from './ScrollableContent';
import ScrollableThumbnails from './ScrollableThumbnails';
import TimelineContentDetail from './TimelineContentDetail';
import TimelineContentDescription from './TimelineContentDescription';
import DragScrollController from './DragScrollController';
import { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT } from './Thumbnail';
import LessMoreButton from './LessMoreButton';

const CenteredLoaderSpinner = styled(LoaderSpinner)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimelineContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 3;
  touch-action: pan-y;
`;

const StyledScrollableThumbnails = styled(ScrollableThumbnails)`
  flex-shrink: 0;
  margin-bottom: ${4 * ROW_HEIGHT_PX}px;
  margin-top: ${1 * ROW_HEIGHT_PX}px;
  width: 100%;
  z-index: 2;
  height: ${THUMBNAIL_HEIGHT}px;

  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    margin-bottom: ${2 * ROW_HEIGHT_PX}px;
  }
`;

const StyledScrollableContent = styled(ScrollableContent)`
  z-index: -1;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledTimelineContentDetail = styled(TimelineContentDetail)`
  margin-bottom: auto;
  pointer-events: none;
  transition: all 0.4s ease;
  transform: translate3d(0, ${props => (props.visible ? '-100vh' : '0vh')}, 0);
`;

const StyledTimelineContentDescription = styled(TimelineContentDescription)``;

const DescriptionFadeOverlay = styled.div`
  transition: all 0.4s ease;
  transform: translate3d(0, ${props => (props.visible ? '0vh' : '100vh')}, 0);
  position: absolute;
  display: flex;
  justify-content: left;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 52px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    padding-top: 72px;
  }
`;

const FlexToolbar = styled(FixedToolbar)`
  flex-shrink: 0;
`;

class Timeline extends React.Component {
  static propTypes = {
    gallery: galleryShape,
    title: PropTypes.string,
  };

  renderWithSize = ({ size }) => {
    const { gallery, title, currentPage, itemsPerPage, getNextPage } = this.props;

    return (
      <TimelineController
        gallery={gallery}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        getNextPage={getNextPage}
        initialActiveIndex={0}
      >
        {({
          // state
          activeContent,
          activeIndex,
          isDetailOpen,
          isDescriptionOpen,
          isContentScrollingEnabled,

          // controls
          onChangePaging,
          onChangeActiveIndex,
          openDetail,
          closeDetail,
          openDescription,
          closeDescription,
          onThumbnailScrollStart,
          onContentScrollStart,
        }) => {
          return (
            <DragScrollController
              width={size.width}
              itemWidth={THUMBNAIL_WIDTH}
              itemCount={gallery.totalElements}
              onChangePaging={onChangePaging}
              onChangeActiveIndex={onChangeActiveIndex}
            >
              {({ cursor, scrollByPixels, scrollToIndex, endInput }) => (
                <TimelineContainer onClick={isDetailOpen ? closeDetail : openDetail}>
                  <StyledScrollableContent
                    width={size.width}
                    height={size.height}
                    scrollByPixels={scrollByPixels}
                    onScrollStart={onContentScrollStart}
                    onScrollEnd={endInput}
                    cursor={isContentScrollingEnabled ? cursor : activeIndex}
                    content={gallery.content}
                  />
                  {isDetailOpen && (
                    <React.Fragment>
                      <FlexToolbar leftButton={<BackButton />} title={title} />
                      <StyledTimelineContentDetail
                        content={activeContent}
                        visible={isDescriptionOpen}
                      />
                      <LessMoreButton
                        isOpen={isDescriptionOpen}
                        onClose={closeDescription}
                        onOpen={openDescription}
                      />
                      <StyledScrollableThumbnails
                        scrollToIndex={scrollToIndex}
                        width={size.width}
                        scrollByPixels={scrollByPixels}
                        onScrollStart={onThumbnailScrollStart}
                        onScrollEnd={endInput}
                        cursor={cursor}
                        content={gallery.content}
                      />
                      <DescriptionFadeOverlay visible={isDescriptionOpen}>
                        <StyledTimelineContentDescription content={activeContent} />
                      </DescriptionFadeOverlay>
                    </React.Fragment>
                  )}
                </TimelineContainer>
              )}
            </DragScrollController>
          );
        }}
      </TimelineController>
    );
  };

  render() {
    const { gallery } = this.props;

    if (!gallery) {
      return <CenteredLoaderSpinner />;
    }

    return <SizeMe monitorHeight={true}>{this.renderWithSize}</SizeMe>;
  }
}

export default Timeline;
