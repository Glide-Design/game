import React from 'react';
import PropTypes from 'prop-types';
import { clamp } from 'lodash/fp';
import { getSrcsetFromContent } from 'xi-core/gallery/utils';
import { DragScrollTouchController, DragScrollMouseController } from './DragScrollController';
import DragScrollList from './DragScrollList';
import Thumbnail, { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT } from './Thumbnail';
const THUMBNAIL_RATIO = THUMBNAIL_WIDTH / THUMBNAIL_HEIGHT;

class ScrollableThumbnails extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    scrollByPixels: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    scrollToIndex: PropTypes.func,
    cursor: PropTypes.number,
    content: PropTypes.array,
    className: PropTypes.string,
  };

  renderThumbnail = ({ key, item, index, width, distanceFromCentre }) => {
    const { scrollToIndex } = this.props;
    const clampedDistance = clamp(0, 1, distanceFromCentre);
    const opacity = 1 - clampedDistance * 0.7;
    const scale = 1.1 - clampedDistance * 0.1;

    const sources = getSrcsetFromContent(THUMBNAIL_RATIO, item);

    return (
      <Thumbnail
        key={key}
        src={sources.src}
        srcset={sources.srcset}
        onClick={e => {
          e.preventDefault();
          scrollToIndex(index);
        }}
        opacity={opacity}
        scale={scale}
      />
    );
  };

  render() {
    const {
      width,
      scrollByPixels,
      onScrollStart,
      onScrollEnd,
      cursor,
      content,
      className,
    } = this.props;

    return (
      <DragScrollTouchController
        scrollByPixels={scrollByPixels}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
      >
        {touchEventHandlers => (
          <DragScrollMouseController
            scrollByPixels={scrollByPixels}
            onScrollStart={onScrollStart}
            onScrollEnd={onScrollEnd}
          >
            {mouseEventHandlers => (
              <DragScrollList
                eventHandlers={{ ...touchEventHandlers, ...mouseEventHandlers }}
                className={className}
                cursor={cursor}
                overscan={6}
                width={width}
                itemWidth={THUMBNAIL_WIDTH}
                items={content}
                renderItem={this.renderThumbnail}
              />
            )}
          </DragScrollMouseController>
        )}
      </DragScrollTouchController>
    );
  }
}

export default ScrollableThumbnails;
