import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'lodash/fp';
import { FixedSizeGrid as Grid } from 'react-window';
import InsetTileContainer, {
  InsetTileWidth,
  InsetTileMaxHeight,
} from '../content/tiles/components/InsetTileContainer';
import {
  getTargetDevice,
  getOrientation,
  getViewportWidth,
  getViewportHeight,
} from '../state/app/selectors';
import { SIDE_MARGIN_PX, HelperDevices } from './dimensions';

const StyledGrid = styled(Grid)`
  & > div {
    margin: auto;
    position: relative;
  }
`;

const StyledInsetTileContainer = styled(InsetTileContainer)`
  @media ${HelperDevices.belowMedium} {
    height: ${({ viewportHeight }) => viewportHeight * 0.8}px;
  }
`;

class LazyGrid extends React.Component {
  getRowHeight = () => Math.min(InsetTileMaxHeight, this.props.viewportHeight * 0.8);

  getColWidth = () => {
    const { targetDevice, viewportWidth, orientation } = this.props;
    if (targetDevice === 'medium') {
      return InsetTileWidth.medium;
    } else if (targetDevice === 'large') {
      return InsetTileWidth.large;
    } else {
      return orientation === 'portrait' ? viewportWidth : InsetTileWidth.medium;
    }
  };

  getRowCount = () => {
    const { targetDevice, items } = this.props;
    const itemsLength = items.length;
    if (targetDevice === 'medium') {
      return Math.ceil(itemsLength / this.getColumnCount());
    } else if (targetDevice === 'large') {
      return Math.ceil(itemsLength / this.getColumnCount());
    } else {
      return itemsLength;
    }
  };

  getColumnCount = () => {
    const { targetDevice, viewportWidth } = this.props;

    if (targetDevice === 'medium' || targetDevice === 'large') {
      const availableSpace = viewportWidth - SIDE_MARGIN_PX[targetDevice] * 2;
      return Math.floor(availableSpace / this.getColWidth());
    } else {
      return 1;
    }
  };

  scrollHandler = ({ scrollTop }) => {
    const rowHeight = this.getRowHeight();
    const buffer = rowHeight;
    if (scrollTop + rowHeight + buffer >= rowHeight * this.getRowCount()) {
      this.props.getNextPage();
    }
  };

  cell = ({ columnIndex, rowIndex, style }) => {
    const { items, renderTile, viewportHeight } = this.props;
    let index = rowIndex * this.getColumnCount() + columnIndex;
    return (
      <div style={style}>
        <StyledInsetTileContainer viewportHeight={viewportHeight}>
          {renderTile(items[index])}
        </StyledInsetTileContainer>
      </div>
    );
  };

  render() {
    const { viewportWidth, containerHeight } = this.props;

    return (
      <StyledGrid
        columnCount={this.getColumnCount()}
        columnWidth={this.getColWidth()}
        height={containerHeight}
        rowCount={this.getRowCount()}
        rowHeight={this.getRowHeight()}
        width={viewportWidth}
        onScroll={this.scrollHandler}
      >
        {this.cell}
      </StyledGrid>
    );
  }
}

const mapStateToProps = (state, { contentId }) => {
  return {
    targetDevice: getTargetDevice(state),
    viewportWidth: getViewportWidth(state),
    viewportHeight: getViewportHeight(state),
    orientation: getOrientation(state),
  };
};

export default compose(connect(mapStateToProps))(LazyGrid);
