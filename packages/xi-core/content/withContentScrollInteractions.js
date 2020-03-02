import React from 'react';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { PropertyKeys } from '../analytics/analyticEvents';
import { isUnloaded } from '../app/selectors';
import { contentDetailPageInteraction } from './actions';

export default (extraProps = {}) => WrappedComponent => {
  class withContentScrollInteractions extends React.Component {
    scrollEventsLogged = [];
    checkScroll = (scrollPercentage, check) => {
      if (scrollPercentage >= check && this.scrollEventsLogged.indexOf(check) === -1) {
        this.sendEvent(PropertyKeys.CONTENT_DETAIL_INTERACTIONS.SCROLL_DEPTH, check);
        this.scrollEventsLogged.push(check);
        return true;
      }
    };

    handleScroll = (scrollOffset, contentHeight) => {
      const scrollPercentage = scrollOffset / contentHeight;
      if (this.checkScroll(scrollPercentage, 0.9)) {
      } else if (this.checkScroll(scrollPercentage, 0.75)) {
      } else if (this.checkScroll(scrollPercentage, 0.5)) {
      } else if (this.checkScroll(scrollPercentage, 0.25)) {
      }
    };

    sendEvent = (key, val) => {
      this.props.contentDetailPageInteraction({ [key]: val });
    };

    render() {
      const { ...passThroughProps } = this.props;

      const injectedProps = {
        handleScroll: this.handleScroll,
      };

      return <WrappedComponent {...passThroughProps} {...injectedProps} />;
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withContentScrollInteractions.displayName = `withContentScrollInteractions(${componentName})`;

  return compose(
    withProps(p => extraProps),
    connect(
      state => ({ appUnloaded: isUnloaded(state) }),
      { contentDetailPageInteraction }
    )
  )(withContentScrollInteractions);
};
