import React from 'react';
import createElementResizeDetector from 'element-resize-detector';

class Measure extends React.Component {
  measureRef = React.createRef();
  state = {
    width: null,
    height: null,
  };

  constructor(props) {
    super(props);
    this.elementResizeDetector = createElementResizeDetector({
      strategy: 'scroll',
    });
  }

  componentDidMount() {
    const element = this.measureRef.current;
    if (element) {
      this.elementResizeDetector.listenTo(element, this.onMeasure);
    }
  }

  componentWillUnmount() {
    this.elementResizeDetector.uninstall();
  }

  onMeasure = element => {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    this.setState({ width, height });
  };

  render() {
    const { children } = this.props;
    const { width, height } = this.state;

    return children({ ref: this.measureRef, width, height });
  }
}

export default Measure;
