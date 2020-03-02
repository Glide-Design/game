import React from 'react';

class ScrollLock extends React.PureComponent {
  ref = React.createRef();
  state = {
    hasReachedEnd: false,
  };

  cancelScrollEvent = event => {
    const { active = true } = this.props;

    if (active) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  };

  preventOnScroll = event => {
    const { current: element } = this.ref;
    const { clientHeight: height, scrollHeight, scrollTop } = element;
    const { deltaY } = event;
    const isDeltaPositive = deltaY > 0;

    if (isDeltaPositive && deltaY > scrollHeight - height - scrollTop) {
      element.scrollTop = scrollHeight;
      this.cancelScrollEvent(event);
    } else if (!isDeltaPositive && -deltaY > scrollTop) {
      element.scrollTop = 0;
      this.cancelScrollEvent(event);
    }
  };

  handleScroll = () => {
    const bottom = (this.ref.current.scrollHeight - this.ref.current.scrollTop) * 0.9 <= this.ref.current.clientHeight;

    if (bottom) {
      this.setState({ hasReachedEnd: true });
    } else {
      if (this.state.hasReachedEnd) {
        this.setState({ hasReachedEnd: false });
      }
    }
  }

  componentDidMount() {
    const { current: element } = this.ref;

    element.addEventListener('wheel', this.preventOnScroll, false);
    element.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    const { current: element } = this.ref;

    element.removeEventListener('wheel', this.preventOnScroll, false);
    element.addEventListener('scroll', this.handleScroll, false);
  }

  render() {
    const { children } = this.props;
    const { hasReachedEnd } = this.state;

    return <React.Fragment>{children(this.ref, hasReachedEnd)}</React.Fragment>;
  }
}

export default ScrollLock;
