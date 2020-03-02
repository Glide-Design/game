import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
import { discoveryPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { getTargetDevice, getViewportWidth } from '../state/app/selectors';
import { CoreDevices, SIDE_MARGIN_PX } from './dimensions';
import { NavButton } from './NavButton';

const StyledVirtualList = styled(VirtualList)`
  ::-webkit-scrollbar {
    display: none;
  }

  // This style targets a react-tiny-list wrapper
  > div {
    height: 100%;
  }
`;

const ListItemWrapper = styled.div`
  height: 100%;
  &:first-of-type {
    margin-left: ${SIDE_MARGIN_PX.small}px;
    @media ${CoreDevices.medium} {
      margin-left: ${SIDE_MARGIN_PX.medium}px;
    }
    @media ${CoreDevices.large} {
      margin-left: ${SIDE_MARGIN_PX.large}px;
    }
  }
`;

const ListWrapper = styled.div`
  position: relative;
  ${({ width }) => 'width: ' + width + ';'};
  ${({ height }) => 'height: ' + height + ';'};
`;

class List extends React.Component {
  state = {
    stateScrollOffset: null,
    scrollable: false,
    showLeft: false,
    showRight: false,
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  getContainerSize(target) {
    return target[this.props.scrollDirection === 'vertical' ? 'offsetHeight' : 'offsetWidth'];
  }

  onScroll(scrollDistance, event) {
    const target = event.target.firstChild;
    const containerSize = this.getContainerSize(target);
    const scrollBuffer = this.props.itemSize * 2;

    if (this.props.onScrollEnd) {
      this.props.onScrollEnd(scrollDistance);
    }

    if (containerSize >= scrollDistance + scrollBuffer) {
      this.props.getNextPage();
    }
  }

  renderItem = ({ index, style }) => {
    return (
      <ListItemWrapper style={style} itemWrapperCss={this.props.itemWrapperCss} key={index}>
        {this.props.items[index]}
      </ListItemWrapper>
    );
  };

  getDimensions() {
    const { itemSize, items } = this.props;
    const parentWidth = this.getParentWidth();
    const totalWidth = items.length * itemSize;
    const fitsInViewport = parentWidth - totalWidth >= 0;

    return {
      totalWidth,
      fitsInViewport,
    };
  }

  getParentWidth() {
    const listWrapper = this.listWrapper;

    if (!listWrapper) {
      return 0;
    }
    return listWrapper.parentNode.offsetWidth;
  }

  getItemCountInView(exact = false) {
    const { itemSize } = this.props;
    const parentWidth = this.getParentWidth();
    const result = parentWidth / itemSize;

    return exact ? result : Math.floor(result);
  }

  moveForward(e) {
    const { stateScrollOffset } = this.state;
    const { itemSize, items, scrollOffset, sectionArrowClicked } = this.props;
    const actualScrollOffset =
      typeof stateScrollOffset === 'number' ? stateScrollOffset : scrollOffset;
    const itemCountInView = this.getItemCountInView(true);
    const inViewWidth = itemCountInView * itemSize;
    const totalWidth = itemSize * items.length;
    const onLastPage = totalWidth - actualScrollOffset <= inViewWidth;
    const calculatedNewPos = actualScrollOffset + itemSize * itemCountInView;

    if (onLastPage) {
      return;
    }

    this.onScroll(calculatedNewPos, {
      target: {
        firstChild: e.target.parentElement.lastChild,
      },
      type: 'faked',
    });

    this.setState({
      stateScrollOffset: calculatedNewPos,
    });

    sectionArrowClicked();
  }

  moveBackward(e) {
    const { stateScrollOffset } = this.state;
    const { itemSize, scrollOffset, sectionArrowClicked } = this.props;
    const actualScrollOffset =
      typeof stateScrollOffset === 'number' ? stateScrollOffset : scrollOffset;
    const calculatedNewPos = actualScrollOffset - itemSize * this.getItemCountInView();
    const finalPosition = calculatedNewPos > 0 ? calculatedNewPos : 0;

    this.onScroll(finalPosition, {
      target: {
        firstChild: e.target.parentElement.lastChild,
      },
      type: 'faked',
    });

    this.setState({
      stateScrollOffset: finalPosition,
    });

    sectionArrowClicked();
  }

  render() {
    const {
      width = '100%',
      height = '100%',
      itemSize,
      scrollDirection = 'vertical',
      onScrollEnd,
      getNextPage,
      items,
      targetDevice,
      scrollOffset = 0,
      useNavButtons,
    } = this.props;

    const { stateScrollOffset, scrollable } = this.state;
    const { fitsInViewport } = this.getDimensions();
    const actualScrollOffset =
      typeof stateScrollOffset === 'number' ? stateScrollOffset : scrollOffset;

    const showButton = () => {
      return useNavButtons && targetDevice === 'large' && !fitsInViewport && !scrollable;
    };

    return (
      <ListWrapper
        width={width || '100%'}
        height={height || '100%'}
        innerRef={comp => (this.listWrapper = comp)}
      >
        {showButton() ? <NavButton position="left" onClick={e => this.moveBackward(e)} /> : null}
        {showButton() ? <NavButton position="right" onClick={e => this.moveForward(e)} /> : null}
        <StyledVirtualList
          width={width || '100%'}
          height={height || '100%'}
          itemCount={items.length}
          itemSize={index => (index === 0 ? itemSize + SIDE_MARGIN_PX[targetDevice] : itemSize)}
          scrollDirection={scrollDirection || 'vertical'}
          onScroll={onScrollEnd || getNextPage ? this.onScroll : null}
          renderItem={this.renderItem}
          scrollOffset={actualScrollOffset}
          overscanCount={8}
          scrollToAlignment="start"
        />
      </ListWrapper>
    );
  }
}

const mapStateToProps = state => ({
  targetDevice: getTargetDevice(state),
  viewportWidth: getViewportWidth(state),
});

const mapDispatchToProps = dispatch => ({
  sectionArrowClicked: () =>
    dispatch(discoveryPageInteraction(PropertyKeys.DISCOVERY_INTERACTIONS.SECTION_ARROW)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
