import React from 'react';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { compose, map } from 'lodash/fp';
import { PropertyKeys } from '../analytics/analyticEvents';
import { isUnloaded } from '../app/selectors';
import { productPageInteraction } from './actions';

export default (extraProps = {}) => WrappedComponent => {
  class withProductInteractions extends React.Component {
    componentDidMount() {
      this.checkIfProductJustLoaded();
    }

    componentDidUpdate(prevProps) {
      this.checkIfProductJustLoaded(prevProps.products);
      this.checkIfAppUnloaded(prevProps.appUnloaded);
    }

    appStateEvent = newState =>
      this.sendEvent(PropertyKeys.PRODUCT_INTERACTIONS.APP_STATE, newState);

    checkIfAppUnloaded = prevAppUnloaded => {
      const { appUnloaded } = this.props;
      if (appUnloaded && !prevAppUnloaded) {
        this.sendEvent(PropertyKeys.PRODUCT_INTERACTIONS.APP_STATE, 'App closed');
      }
    };

    checkIfProductJustLoaded = (prevProducts = []) => {
      const { ignoreProductsLoadedEvent, products, productDescriptor } = this.props;
      if (!ignoreProductsLoadedEvent) {
        if (products && products.length && !prevProducts.length) {
          this.sendEvent(
            PropertyKeys.PRODUCT_INTERACTIONS.PRODUCTS_LOADED,
            map(productDescriptor)(products)
          );
        }
      }
    };

    scrollEventsLogged = [];
    checkScroll = (scrollPercentage, check) => {
      if (scrollPercentage >= check && this.scrollEventsLogged.indexOf(check) === -1) {
        this.sendEvent(PropertyKeys.PRODUCT_INTERACTIONS.SCROLLED, check);
        this.scrollEventsLogged.push(check);
        return true;
      }
    };

    handleScroll = (scrollOffset, contentHeight) => {
      const scrollPercentage = scrollOffset / contentHeight;
      if (this.checkScroll(scrollPercentage, 0.9)) {
      } else if (this.checkScroll(scrollPercentage, 0.75)) {
      } else if (this.checkScroll(scrollPercentage, 0.5)) {
      }
    };

    sendEvent = (key, val = true) => {
      let page;
      if (this.props[PropertyKeys.PRODUCT_INTERACTIONS.PAGE]) {
        page = this.props[PropertyKeys.PRODUCT_INTERACTIONS.PAGE];
      }
      this.props.productPageInteraction(key, val, page);
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through

      const { productDescriptor, ...passThroughProps } = this.props;

      const injectedProps = {
        appStateEvent: this.appStateEvent,
        handleScroll: this.handleScroll,
      };

      return <WrappedComponent {...passThroughProps} {...injectedProps} />;
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withProductInteractions.displayName = `withProductInteractions(${componentName})`;

  return compose(
    withProps(p => extraProps),
    connect(
      state => ({ appUnloaded: isUnloaded(state) }),
      { productPageInteraction }
    )
  )(withProductInteractions);
};
