import React, { Fragment } from 'react';
import getBrowserLocale from 'browser-locale';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import qs from 'qs';
import Analytics from 'xi-core/analytics/Analytics';
import Bootstrap from 'xi-core/app/components/Bootstrap';
import {
  viewportResized,
  dispatchAppLoaded,
  dispatchAppUnloaded,
  registerDeviceForPush,
  dispatchAppBlur,
  dispatchAppFocus,
  updatePlatformType,
} from 'xi-core/app/actions';
import { isAuthenticated, getLanguage } from 'xi-core/member/selectors';
import { restoreLogin } from 'xi-core/signup/actions';

import { routes } from '../App';
import ErrorPage from '../errors/ErrorPage';
import ServiceWorkerUpdated from './ServiceWorkerUpdated';
import './aws-sdk-2.483.0.min';

const bootstrapAnalytics = (streamName, endPoint) => {
  if (streamName && endPoint) {
    Analytics.registerReceiver({
      streamName,
      endPoint,
      bufferLibrary: Buffer,
    });
  }
};

export const shouldRegisterDeviceForPush = registerDeviceForPush => {
  // if (window.appboy.isPushPermissionGranted()) {
  //   window.appboy.registerAppboyPushMessages(() => sendDeviceId(registerDeviceForPush));
  // }
};

export const sendDeviceId = registerDeviceForPush => {
  // if (window.appboy.isPushPermissionGranted()) {
  //   window.appboy.getDeviceId(deviceId => {
  //     registerDeviceForPush(deviceId);
  //   });
  // }
};

class WebBootstrap extends React.PureComponent {
  lastStep = async () => {
    const {
      isAuthenticated,
      viewportResized: updateViewportState,
      updatePlatformType,
    } = this.props;

    window.addEventListener('resize', updateViewportState);
    window.addEventListener('orientationchange', updateViewportState);
    updateViewportState();

    window.addEventListener('unload', this.onAppUnloadHandler);
    window.addEventListener('focus', this.windowFocusedHandler);
    window.addEventListener('blur', this.windowBlurHandler);

    updatePlatformType('web');

    if (isAuthenticated) {
      this.enablePushNotifications();
    }
  };

  componentWillUnmount() {
    const { viewportResized: updateViewportState } = this.props;
    window.removeEventListener('resize', updateViewportState);
    window.removeEventListener('orientationchange', updateViewportState);
    window.removeEventListener('unload', this.onAppUnloadHandler);
    window.removeEventListener('focus', this.windowFocusedHandler);
    window.removeEventListener('blur', this.windowBlurHandler);
  }

  onAppUnloadHandler = () => this.props.dispatchAppUnloaded();

  windowBlurHandler = () => this.props.dispatchAppBlur();

  windowFocusedHandler = () => {
    const { isAuthenticated, restoreLogin, dispatchAppFocus } = this.props;
    dispatchAppFocus();

    if (!isAuthenticated) {
      restoreLogin();
    }
  };

  enablePushNotifications = () => {
    const { registerDeviceForPush } = this.props;
    shouldRegisterDeviceForPush(registerDeviceForPush);
  };

  render() {
    const browserLocale = getBrowserLocale();
    const defaultLocale =
      typeof browserLocale === 'string' && browserLocale.length
        ? browserLocale.substring(0, 2)
        : null;

    const { location } = window;
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });

    const starRouteMatch = matchPath(location.pathname, routes.playerProfile.path);
    const starRouteId = starRouteMatch ? starRouteMatch.params.starId : null;

    return (
      <Fragment>
        <ServiceWorkerUpdated key="swu" />
        <Bootstrap
          bootstrapAnalytics={bootstrapAnalytics}
          defaultLocale={defaultLocale}
          queryString={queryString}
          starRouteId={starRouteId}
          errorPage={<ErrorPage />}
          lastStep={this.lastStep}
          platformDuringBootstrap="web"
        >
          {this.props.children}
        </Bootstrap>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  memberLanguage: getLanguage(state),
});

const mapDispatchToProps = {
  dispatchAppLoaded,
  dispatchAppUnloaded,
  viewportResized,
  restoreLogin,
  registerDeviceForPush,
  dispatchAppFocus,
  dispatchAppBlur,
  updatePlatformType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebBootstrap);
