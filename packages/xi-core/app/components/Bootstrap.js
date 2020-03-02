import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  dispatchAppLoaded,
  appBootstrapComplete,
  bootstrapRedux,
  saveReferrerInfo,
} from 'xi-core/app/actions';
import { isBootstrapped } from 'xi-core/app/selectors';
import { getKinesisStream, getMetricsEndPoint } from 'xi-core/config/selectors';
import { logglyRuntimeError } from 'xi-core/app/actions';
import { fetchStars } from 'xi-core/stars/actions';

class Bootstrap extends React.Component {
  state = { criticalBootstrapError: false };

  static propTypes = {
    // from hoc
    isBootstrapped: PropTypes.bool.isRequired,
    bootstrapRedux: PropTypes.func.isRequired, // action
    saveReferrerInfo: PropTypes.func.isRequired, // action
    appLoaded: PropTypes.func.isRequired, // action

    // from consumer
    bootstrapAnalytics: PropTypes.func.isRequired,
    defaultLocale: PropTypes.string,
    queryString: PropTypes.object,
    starRouteId: PropTypes.string,
    platformDuringBootstrap: PropTypes.string,
    errorPage: PropTypes.node.isRequired,
  };

  async componentDidMount() {
    const {
      bootstrapRedux,
      saveReferrerInfo,
      bootstrapAnalytics,
      appLoaded,
      appBootstrapComplete,
      defaultLocale,
      queryString,
      starRouteId,
      lastStep,
      logglyRuntimeError,
      platformDuringBootstrap,
      fetchStars,
      kinesisStream,
      metricsEndPoint,
    } = this.props;

    try {
      // ANALYTICS
      await bootstrapAnalytics(kinesisStream, metricsEndPoint);

      // CORE
      await bootstrapRedux(defaultLocale);
      await saveReferrerInfo(queryString, starRouteId);

      await fetchStars();

      await lastStep();

      appLoaded();
      appBootstrapComplete();
    } catch (e) {
      logglyRuntimeError({
        message: e.message,
        platformOverride: platformDuringBootstrap,
      });
      this.setState({ criticalBootstrapError: true });
      console.error(e);
      return;
    }
  }

  render() {
    const { errorPage, isBootstrapped } = this.props;
    const { criticalBootstrapError } = this.state;

    if (criticalBootstrapError) {
      return errorPage;
    }

    return isBootstrapped ? this.props.children : null;
  }
}

const ConnectedBootstrap = connect(
  state => ({
    isBootstrapped: isBootstrapped(state),
    kinesisStream: getKinesisStream(state),
    metricsEndPoint: getMetricsEndPoint(state),
  }),
  {
    bootstrapRedux,
    saveReferrerInfo,
    appLoaded: dispatchAppLoaded,
    appBootstrapComplete,
    logglyRuntimeError,
    fetchStars,
  }
)(Bootstrap);

export default ConnectedBootstrap;
