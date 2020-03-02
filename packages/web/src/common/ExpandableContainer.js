import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const DefaultSpeed = 0.35;

const ExpandableArea = styled.div`
  overflow: hidden;
  transition: max-height ${({ speed }) => speed}s ease;

  max-height: ${({ collapsedHeight, collapsedHeightUnits }) =>
    `${collapsedHeight}${collapsedHeightUnits}`};

  &.contentHeightNotSet {
    overflow: hidden;
  }

  &.expanded {
    max-height: ${({ contentHeight }) => contentHeight}px !important;
  }
`;

const Container = styled.div`
  ${({ containerCSS }) => containerCSS || ''};
`;

class ExpandableContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.expandedStatus !== false && props.expandedStatus !== true) {
      this.uncontrolled = true;
    }

    this.state = {
      contentHeight: null,
      expanded: props.initialStatus ? true : false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.deviceConfigurationHasChanged(prevProps.viewport, this.props.viewport) ||
      prevProps.text !== this.props.text
    ) {
      this.setContentHeight();
    }

    if (!this.uncontrolled && prevProps.expandedStatus !== this.props.expandedStatus) {
      this.changeExpanded(this.props.expandedStatus);
    }
  }

  changeExpanded = expanded => {
    this.setState({ expanded });
  };

  deviceConfigurationHasChanged = (oldViewport, newViewport) => {
    return (
      oldViewport.targetDevice !== newViewport.targetDevice ||
      oldViewport.width !== newViewport.width ||
      oldViewport.orientation !== newViewport.orientation
    );
  };

  containerMounted = ref => {
    if (!this.content && ref) {
      this.content = ref;
      this.setContentHeight();
    }
  };

  setContentHeight = () => {
    if (this.content) {
      this.setState(
        () => ({ contentHeight: null }),
        () => this.setState(() => ({ contentHeight: this.content.offsetHeight }))
      );
    }
  };

  onClickHandler = e => {
    const { onClick } = this.props;
    const { expanded } = this.state;

    if (this.uncontrolled) {
      this.changeExpanded(!expanded);
    } else {
      onClick && onClick(e);
    }
  };

  render() {
    const {
      collapsedHeight,
      children,
      className,
      collapsedHeightUnits = 'px',
      id,
      speed = DefaultSpeed,
      containerCSS,
    } = this.props;

    if (!children) {
      return null;
    }

    const { contentHeight, expanded } = this.state;

    let statusClassName = '';
    if (!contentHeight) {
      statusClassName = 'contentHeightNotSet';
    } else if (contentHeight > collapsedHeight) {
      if (expanded) {
        statusClassName = 'expanded';
      } else {
        statusClassName = 'collapsed';
      }
    }

    return (
      <ExpandableArea
        id={id}
        speed={speed}
        className={[className, statusClassName].join(' ')}
        collapsedHeight={collapsedHeight}
        collapsedHeightUnits={collapsedHeightUnits || 'px'}
        contentHeight={contentHeight}
        onClick={this.onClickHandler}
        data-test-id="expandable-container"
      >
        <Container containerCSS={containerCSS} innerRef={this.containerMounted}>
          {children}
        </Container>
      </ExpandableArea>
    );
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
});

export default connect(mapStateToProps)(ExpandableContainer);
