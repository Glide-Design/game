import React from 'react';
import { withProps } from 'recompose';
import { compose } from 'lodash/fp';

export default (extraProps = {}) => WrappedComponent => {
  class withLoadedFlag extends React.Component {
    state = { loadingComplete: false };

    componentDidMount() {
      if (this.props.onMount) {
        this.setState({ loadingComplete: true }, this.loadingComplete);
      }
    }

    loadedHandler = () => {
      if (!this.props.onMount && !this.state.loadingComplete) {
        this.setState({ loadingComplete: true }, this.loadingComplete);
      }
    };

    loadingComplete = () => {
      const { loaded } = this.props;
      loaded && loaded();
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through

      const { onMount, ...passThroughProps } = this.props;
      const { loadingComplete } = this.state;

      const injectedProps = {
        loadingComplete,
        loaded: this.loadedHandler,
      };

      return <WrappedComponent {...passThroughProps} {...injectedProps} />;
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withLoadedFlag.displayName = `withLoadedFlag(${componentName})`;

  return compose(withProps(p => extraProps))(withLoadedFlag);
};
