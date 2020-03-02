import React from 'react';
import PropTypes from 'prop-types';

const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

/**
 * Waits for drag events on children and cancels any associated click events
 * Passes an event handler via render props e.g.
 *  <CancelDragClicks>
 *    {({ onMouseDown }) => {
 *
 *    }
 *  </CancelDragClicks>
 */
class CancelDragClicks extends React.PureComponent {
  startX = 0;
  startY = 0;
  isClicking = false;

  static propTypes = {
    tolerance: PropTypes.number,
    children: PropTypes.func,
  };

  static defaultProps = {
    tolerance: 5,
  };

  componentDidMount() {
    // Listen in the capture phase, so we can prevent the clicks
    document.addEventListener('click', this.onDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  onDocumentClick = e => {
    if (this.isClicking) {
      this.isClicking = false;

      // cancel clicks that were actually drag events
      const moveDistance = distance(this.startX, this.startY, e.pageX, e.pageY);
      if (moveDistance > this.props.tolerance) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  onMouseDown = e => {
    this.isClicking = true;
    this.startX = e.pageX;
    this.startY = e.pageY;
  };

  render() {
    return this.props.children({ onMouseDown: this.onMouseDown });
  }
}

export default CancelDragClicks;
