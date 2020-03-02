import React from 'react';
import { AutoSizer, Collection, WindowScroller } from 'react-virtualized';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CoreDevices, HelperDevices, SIDE_MARGIN_PX } from '../../common/dimensions';
import {
  InsetTileMargin,
  InsetTileWidth,
  InsetTileMaxHeight,
} from '../tiles/components/InsetTileContainer';
import { getTargetDevice } from '../../state/app/selectors';

const DummyContainer = styled.div``;

const StyledCollection = styled(Collection)`
  @media ${HelperDevices.belowMediumLandscape}, ${CoreDevices.medium}, ${CoreDevices.large} {
    margin: 0 auto 0;
  }
  margin: auto;
  outline: none;
`;

class LazyLoadGridSection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cellRenderer = this.cellRenderer.bind(this);
    this.cellSizeAndPositionGetter = this.cellSizeAndPositionGetter.bind(this);
    this.storeCollectionRef = this.storeCollectionRef.bind(this);
    this.renderAutoSizer = this.renderAutoSizer.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.onResize = this.onResize.bind(this);
    this.storeAutoSizerRef = this.storeAutoSizerRef.bind(this);
  }

  list = [];

  componentDidUpdate() {
    this.onResize();
  }

  chunkArray(myArray, chunkSize) {
    var results = [];
    var localArray = myArray.map(item => item);

    if (chunkSize < 1) {
      return [];
    }

    while (localArray.length) {
      results.push(localArray.splice(0, chunkSize));
    }

    return results;
  }

  calculateChunkSize() {
    return Math.floor(this.overallWidth / this.composeWidthArea(this.margin, this.width));
  }

  composeWidthArea() {
    return this.margin * 2 + this.width;
  }

  composeInitialMargin() {
    let takenArea = this.composeWidthArea() * this.chunkSize;
    let remainingSpace = this.overallWidth - takenArea;

    return remainingSpace / 2;
  }

  calculateSizes() {
    const { tiles, targetDevice } = this.props;
    this.height = InsetTileMaxHeight;
    this.margin = 0;
    this.sideMargin = 0;
    /* eslint-disable no-restricted-globals */
    this.autoresizerWidth = window.outerWidth || window.innerWidth;
    const windowHeight = window.outerHeight || window.innerHeight;

    /* eslint-enable no-restricted-globals */
    switch (targetDevice) {
      case 'small':
        this.width = this.autoresizerWidth;
        this.topArea = 52;
        break;
      case 'medium':
        this.width = InsetTileWidth.medium;
        this.margin = InsetTileMargin.medium;
        this.sideMargin = SIDE_MARGIN_PX.medium;
        this.topArea = 52;
        break;
      default:
      case 'large':
        this.width = InsetTileWidth.large;
        this.margin = InsetTileMargin.large;
        this.sideMargin = SIDE_MARGIN_PX.large;
        this.topArea = 72;
        break;
    }

    this.overallHeight = windowHeight - this.topArea - this.margin;
    this.overallWidth = this.autoresizerWidth - this.sideMargin * 2 + this.margin * 2;
    this.chunkSize = this.calculateChunkSize();
    this.chunks = this.chunkArray(tiles, this.chunkSize);
    this.offset =
      (this.autoresizerWidth -
        this.composeInitialMargin() * 2 -
        this.composeWidthArea() * this.chunkSize) /
      2;
  }

  createItems() {
    let list = [];
    let x;
    let y;

    this.chunks.forEach((row, idx) => {
      y = this.topArea + this.margin + (this.margin * 2 + this.height) * idx;
      row.forEach((col, idx) => {
        x = this.margin + this.offset + this.composeInitialMargin() + this.composeWidthArea() * idx;
        list.push({
          component: col,
          width: this.width,
          height: this.height,
          x: x,
          y: y,
        });
      });
    });

    this.list = list;
    this.listLength = this.list.length;
  }

  cellRenderer({ index, key, style }) {
    return (
      <DummyContainer key={key} style={style}>
        {this.list[index].component}
      </DummyContainer>
    );
  }

  cellSizeAndPositionGetter({ index }) {
    const datum = this.list[index];

    return {
      height: datum.height,
      width: datum.width,
      x: datum.x,
      y: datum.y,
    };
  }

  storeCollectionRef(ref) {
    this.collection = ref;
  }

  storeAutoSizerRef(ref) {
    this.autosizer = ref;
  }

  onResize() {
    this.calculateSizes();
    this.createItems();

    this.collection.recomputeCellSizesAndPositions();
  }

  renderCollection({ height }) {
    this.calculateSizes();
    this.createItems();

    const { nextPage, hasMore } = this.props;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={nextPage}
        hasMore={hasMore}
        initialLoad={false}
        threshold={1000}
        width="100%"
        useWindow={true}
      >
        <StyledCollection
          cellCount={this.listLength}
          cellRenderer={this.cellRenderer}
          cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
          width={this.autoresizerWidth}
          innerRef={this.storeCollectionRef}
          autoheight
          height={height}
          verticalOverscanSize={100}
        />
      </InfiniteScroll>
    );
  }

  renderAutoSizer() {
    return (
      <WindowScroller>
        {({ height }) => {
          /* eslint-disable no-restricted-globals */
          let windowHeight = window.outerHeight || window.innerHeight;
          /* eslint-enable no-restricted-globals */
          return (
            <AutoSizer
              disableHeight
              height={windowHeight}
              onResize={this.onResize}
              rowCount={this.props.tiles.length}
              width="100%"
              innerRef={this.storeAutoSizerRef}
              style={{ width: '100%' }}
            >
              {() => this.renderCollection({ height: windowHeight })}
            </AutoSizer>
          );
        }}
      </WindowScroller>
    );
  }

  render() {
    return this.renderAutoSizer();
  }
}

const mapStateToProps = state => ({
  targetDevice: getTargetDevice(state),
});

export default connect(mapStateToProps)(LazyLoadGridSection);
