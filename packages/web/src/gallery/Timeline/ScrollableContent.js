import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragScrollTouchController, DragScrollMouseController } from './DragScrollController';
import DragScrollList from './DragScrollList';
import TimelineContent from './TimelineContent';

const StyledTimelineContent = styled(TimelineContent)`
  height: 100%;
  width: 100%;
`;

class ScrollableContent extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    scrollByPixels: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    cursor: PropTypes.number,
    content: PropTypes.array,
    className: PropTypes.string,
  };

  renderContent = ({ key, item, isActive }) => {
    const { width, height } = this.props;

    return (
      <StyledTimelineContent
        key={key}
        content={item}
        isActive={isActive}
        width={width}
        height={height}
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
                itemWidth={width}
                items={content}
                renderItem={this.renderContent}
              />
            )}
          </DragScrollMouseController>
        )}
      </DragScrollTouchController>
    );
  }
}

export default ScrollableContent;
