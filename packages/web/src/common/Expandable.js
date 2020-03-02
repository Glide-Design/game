import React from 'react';
import styled from 'styled-components';
import Measure from './Measure';

const HeightController = styled.div`
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  overflow: hidden;
`;

/**
 * Measures the component which is attached to the child's ref prop
 * When that component changes size this component animates the change
 * Very similar to ExpandableContainer, should probably be one component,
 * but needed a different API and this responds dynamically to sizing changes
 *
 * example:
 *   <Expandable>
 *     {({ open, close, isOpen, ref }) => (
 *       <div
 *         ref={ref}
 *         style={{ height: isOpen ? 200 : 100 }}
 *         onClick={isOpen ? close : open}
 *       />
 *     )}
 *   </Expandable>
 */
class Expandable extends React.Component {
  state = {
    isOpen: false,
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return (
      <Measure>
        {({ ref, width, height }) => {
          return (
            <HeightController width={width} height={height}>
              {children({ isOpen, ref, open: this.open, close: this.close })}
            </HeightController>
          );
        }}
      </Measure>
    );
  }
}

export default Expandable;
