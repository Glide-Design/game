import React from 'react';
import PropTypes from 'prop-types';
import { clamp, noop } from 'lodash/fp';
import { Spring } from 'react-spring';
import CancelDragClicks from '../../common/CancelDragClicks';

class DragScrollMouseController extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func,
    scrollByPixels: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
  };

  static defaultProps = {
    onScrollStart: noop,
    onScrollEnd: noop,
  };

  isMouseDown = false;
  lastX = 0;

  componentDidMount() {
    document.addEventListener('mousemove', this.onDocumentMouseMove);
    document.addEventListener('mouseup', this.onDocumentMouseUp);
    window.addEventListener('blur', this.onWindowBlur);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    window.removeEventListener('blur', this.onWindowBlur);
  }

  onMouseDown = e => {
    this.isMouseDown = true;
    this.lastX = e.pageX;
    this.props.onScrollStart();
  };

  onDocumentMouseMove = e => {
    if (this.isMouseDown) {
      e.preventDefault();
      const xDistance = this.lastX - e.pageX;
      this.lastX = e.pageX;
      this.props.scrollByPixels(xDistance);
    }
  };

  onDocumentMouseUp = () => {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.props.onScrollEnd();
    }
  };

  onWindowBlur = e => {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.props.onScrollEnd();
    }
  };

  onDragStart = e => {
    // prevent dragging previews
    e.preventDefault();
  };

  render = () => {
    const { children } = this.props;

    return (
      <CancelDragClicks>
        {({ onMouseDown }) =>
          children({
            onDragStart: this.onDragStart,
            onMouseDown: e => {
              onMouseDown(e);
              this.onMouseDown(e);
            },
          })
        }
      </CancelDragClicks>
    );
  };
}

class DragScrollTouchController extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func,
    scrollByPixels: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
  };

  static defaultProps = {
    onScrollStart: noop,
    onScrollEnd: noop,
  };

  lastX = 0;

  onTouchStart = e => {
    const touch = e.touches[0];
    this.lastX = touch.pageX;
    this.props.onScrollStart();
  };

  onTouchMove = e => {
    const touch = e.touches[0];
    const xDistance = this.lastX - touch.pageX;
    this.lastX = touch.pageX;
    this.props.scrollByPixels(xDistance);
  };

  onTouchEnd = e => {
    this.props.onScrollEnd();
  };

  onTouchCancel = e => {
    this.props.onScrollEnd();
  };

  render = () => {
    const { children } = this.props;

    return children({
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onTouchCancel: this.onTouchCancel,
    });
  };
}

class DragScrollController extends React.PureComponent {
  state = {
    targetCursor: 0,
  };

  static propTypes = {
    children: PropTypes.func,
    width: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemCount: PropTypes.number.isRequired,
    onChangePaging: PropTypes.func,
    onChangeActiveIndex: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
  };

  static defaultProps = {
    onChangePaging: noop,
    onChangeActiveIndex: noop,
    onScrollStart: noop,
    onScrollEnd: noop,
  };

  endInput = () => {
    const { targetCursor } = this.state;
    const closestIndex = Math.round(targetCursor);
    this.scrollToIndex(closestIndex);
  };

  clamp = cursor => {
    const { itemCount } = this.props;
    const overscroll = 0.3;
    const lower = 0 - overscroll;
    const upper = itemCount - 1 + overscroll;
    return clamp(lower, upper, cursor);
  };

  scrollByPixels = distance => {
    const { itemWidth } = this.props;
    const targetCursor = this.clamp(this.state.targetCursor + distance / itemWidth);
    this.setState({ targetCursor, isScrolling: true });
  };

  scrollToIndex = index => {
    this.setState({
      targetCursor: Math.round(this.clamp(index)),
    });
  };

  clampIndex = targetIndex => {
    const { itemCount } = this.props;
    return clamp(0, itemCount - 1, targetIndex);
  };

  updatePagingIfRequired = (targetCursor, prevTargetCursor) => {
    const { onChangePaging, onChangeActiveIndex, itemWidth, width } = this.props;
    const prevTargetIndex = this.clampIndex(Math.round(prevTargetCursor));
    const targetIndex = this.clampIndex(Math.round(targetCursor));

    const targetIndexHasChanged = targetIndex !== prevTargetIndex;
    if (targetIndexHasChanged) {
      const halfPageWidth = Math.round(width / itemWidth / 2);
      const startIndex = this.clampIndex(targetIndex - halfPageWidth);
      const endIndex = this.clampIndex(targetIndex + halfPageWidth);
      onChangeActiveIndex(targetIndex);
      onChangePaging(startIndex, endIndex);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { targetCursor: prevTargetCursor } = prevState;
    const { targetCursor } = this.state;

    this.updatePagingIfRequired(targetCursor, prevTargetCursor);
  }

  renderMotion = ({ cursor }) =>
    this.props.children({
      cursor,
      scrollToIndex: this.scrollToIndex,
      scrollByPixels: this.scrollByPixels,
      endInput: this.endInput,
    });

  render() {
    const { targetCursor } = this.state;

    return <Spring to={{ cursor: targetCursor }}>{this.renderMotion}</Spring>;
  }
}

export { DragScrollTouchController, DragScrollMouseController };
export default DragScrollController;
