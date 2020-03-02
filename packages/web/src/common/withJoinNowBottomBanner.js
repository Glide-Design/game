import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import {
  isPremium,
  isAuthenticated,
  isJoinNowBannerVisible,
  isMemberEnablementReceived,
} from 'xi-core/member/selectors';
import JoinNowBottomBanner from './JoinNowBottomBanner';

export default WrappedComponent => {
  class withJoinNowBottomBanner extends React.Component {
    render() {
      const {
        isPremium,
        isAuthenticated,
        isJoinNowBannerVisible,
        isMemberEnablementReceived,
      } = this.props;
      return (
        <div>
          <WrappedComponent {...this.props} />
          {!isPremium && isAuthenticated && isMemberEnablementReceived && isJoinNowBannerVisible ? (
            <JoinNowBottomBanner />
          ) : null}
        </div>
      );
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withJoinNowBottomBanner.displayName = `withJoinNowBottomBanner(${componentName})`;

  return compose(
    connect(state => {
      return {
        isPremium: isPremium(state),
        isAuthenticated: isAuthenticated(state),
        isJoinNowBannerVisible: isJoinNowBannerVisible(state),
        isMemberEnablementReceived: isMemberEnablementReceived(state),
      };
    })
  )(withJoinNowBottomBanner);
};
