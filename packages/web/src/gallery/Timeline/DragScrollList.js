import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NonPassiveTouchTarget from './NonPassiveTouchTarget';

const DragScrollContainer = styled(NonPassiveTouchTarget)`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;

const DragScrollTrack = styled(NonPassiveTouchTarget)`
  height: 100%;
  display: flex;
  will-change: transform;
`;

/**
 * A controlled virtualised scrollable list, this cannot be scrolled
 * Currently only works horizontally
 * Used instead of react-virtualised etc as they are built around normal scroll behaviour
 * It must be controlled by an external component e.g. DragScrollController via the cursor prop
 */
class DragScrollList extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    itemWidth: PropTypes.number,
    items: PropTypes.array,
    overscan: PropTypes.number,
  };

  static defaultProps = {
    overscan: 2,
  };

  getBaseIndex = () => {
    const { cursor } = this.props;
    return Math.round(cursor);
  };

  getAdjustedCursor = () => {
    const { cursor } = this.props;
    const baseIndex = this.getBaseIndex();
    const adjustedCursor = baseIndex - cursor;
    return adjustedCursor;
  };

  getTrackOffset = () => {
    const { itemWidth, width } = this.props;
    const trackWidth = this.getTrackWidth();
    const offsetFromStartOfPage = this.getAdjustedCursor() * itemWidth;
    const offsetToCenterOfTrack = (trackWidth - width) / 2;

    return offsetFromStartOfPage - offsetToCenterOfTrack;
  };

  getNumberOfItemsToRender = () => {
    const { width, itemWidth, overscan } = this.props;
    let numberOfItems = Math.ceil(width / itemWidth) + overscan;
    if (numberOfItems % 2 === 0) {
      numberOfItems = numberOfItems + 1;
    }
    return numberOfItems;
  };

  getTrackWidth = () => {
    const { itemWidth } = this.props;
    const numberOfItems = this.getNumberOfItemsToRender();
    return numberOfItems * itemWidth;
  };

  renderItem = (empty, index) => {
    const { items, itemWidth, renderItem } = this.props;
    const totalItemsToRender = this.getNumberOfItemsToRender();
    const baseIndex = this.getBaseIndex();

    const indexOffset = Math.floor(totalItemsToRender / 2);
    const currentIndex = index - indexOffset;
    const itemIndex = baseIndex + currentIndex;
    const item = items[itemIndex];

    const distanceFromCentre = Math.abs(currentIndex + this.getAdjustedCursor());

    return renderItem({
      key: itemIndex,
      isActive: currentIndex === 0,
      item,
      index: itemIndex,
      width: itemWidth,
      distanceFromCentre,
    });
  };

  render() {
    const { width, className, eventHandlers } = this.props;
    const itemsToRender = this.getNumberOfItemsToRender();
    const trackWidth = this.getTrackWidth();
    const trackOffset = this.getTrackOffset();

    const children = Array.from({ length: itemsToRender }, this.renderItem);

    return (
      <DragScrollContainer style={{ width }} className={className} {...eventHandlers}>
        <DragScrollTrack
          style={{
            width: trackWidth,
            transform: `translate(${trackOffset}px)`,
          }}
        >
          {children}
        </DragScrollTrack>
      </DragScrollContainer>
    );
  }
}

export default DragScrollList;
