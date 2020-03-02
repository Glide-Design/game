import React from 'react';
import { withProps } from 'recompose';
import { compose } from 'lodash/fp';

export default (extraProps = {}) => WrappedComponent => {
  class withLoadOneByOne extends React.Component {
    componentDidMount() {
      this.checkIsLoadingComplete();
    }

    state = { itemsLoaded: 0, oneByOneLoadingComplete: false };

    itemLoadedHandler = () => {
      this.setState(
        prevState => ({ itemsLoaded: prevState.itemsLoaded + 1 }),
        this.checkIsLoadingComplete
      );
    };

    getItems = () => {
      const { itemsLabel } = this.props;
      const syncItems = this.props[itemsLabel];
      return syncItems.slice(0, Math.min(this.state.itemsLoaded + 1, syncItems.length));
    };

    isComplete = () => {
      const { itemsLabel, itemsCount } = this.props;
      const { itemsLoaded } = this.state;
      if (itemsCount) {
        if (itemsLoaded < itemsCount) {
          return false;
        }
      } else if (itemsLoaded !== this.props[itemsLabel].length) {
        return false;
      }
      return true;
    };

    checkIsLoadingComplete = () => {
      if (!this.state.oneByOneLoadingComplete) {
        if (this.isComplete()) {
          const { loaded } = this.props;
          this.setState({ oneByOneLoadingComplete: true }, () => loaded && loaded());
        }
      }
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through

      const { itemsLabel, ...passThroughProps } = this.props;
      const { oneByOneLoadingComplete } = this.state;

      const injectedProps = {
        oneByOneLoadingComplete,
      };

      if (itemsLabel) {
        if (!Array.isArray(this.props[itemsLabel])) {
          console.warn('syncLoad item not array');
        } else {
          injectedProps[itemsLabel] = this.getItems();
          injectedProps.oneItemLoaded = this.itemLoadedHandler;
        }
      } else {
        console.warn('syncLoad itemsLabel missing');
      }

      return <WrappedComponent {...passThroughProps} {...injectedProps} />;
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withLoadOneByOne.displayName = `withLoadOneByOne(${componentName})`;

  return compose(withProps(p => extraProps))(withLoadOneByOne);
};
