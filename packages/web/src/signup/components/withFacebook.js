import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import scriptjs from 'scriptjs';
import { getFacebookAppId } from 'xi-core/config/selectors';

const SDKUrl = facebookAppId =>
  `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=${facebookAppId}`;

const facebookResponseStatus = {
  CONNECTED: 'connected',
  NOT_AUTHORIZED: 'not_authorized',
  UNKNOWN: 'unknown',
};

const getDeclinedPermissions = async () => {
  return new Promise(resolve =>
    window.FB.api('/me/permissions', response => {
      const declined = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].status === 'declined') {
          declined.push(response.data[i].permission);
        }
      }
      resolve(declined);
    })
  );
};

const parseFacebookAuthResponse = async response => {
  switch (response.status) {
    case facebookResponseStatus.CONNECTED:
      const declinedPermissions = await getDeclinedPermissions();
      if (declinedPermissions.length) {
        return { declinedPermissions };
      }
      const { accessToken: socialAccessToken, userID: socialUserId } = response.authResponse;
      return { socialAccessToken, socialUserId };
    case facebookResponseStatus.NOT_AUTHORIZED:
    case facebookResponseStatus.UNKNOWN:
    default:
      return {};
  }
};

const getFacebookAccessToken = async () => {
  const loginStatus = await new Promise(resolve => window.FB.getLoginStatus(resolve));

  let declinedPermissions;

  if (get('status', loginStatus) === 'connected') {
    const response = await parseFacebookAuthResponse(loginStatus);
    if (!response.declinedPermissions) {
      return response;
    } else {
      declinedPermissions = response.declinedPermissions;
    }
  }

  const loginResponse = await new Promise(resolve =>
    window.FB.login(resolve, {
      scope: 'public_profile,email',
      auth_type: declinedPermissions ? 'rerequest' : null,
    })
  );
  return await parseFacebookAuthResponse(loginResponse);
};

const initFacebookSDK = facebookAppId =>
  window.FB.init({
    facebookAppId,
    autoLogAppEvents: false,
    xfbml: false,
    version: 'v2.12',
  });

let SDK_LOADED = false;

export default WrappedComponent => {
  class withFacebook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sdkLoaded: SDK_LOADED,
      };

      if (!SDK_LOADED) {
        // FB SDK requires the global function `fbAsyncInit` be available.
        window.fbAsyncInit = () => {
          initFacebookSDK(props.facebookAppId);
          SDK_LOADED = true;
          this.setState({
            sdkLoaded: true,
          });
        };
        scriptjs(SDKUrl(props.facebookAppId));
      }
    }

    login = async () => {
      if (!window.FB) {
        console.error('FacebookSDK: `login` called before SDK initialized.');
      }
      const response = await getFacebookAccessToken();
      if (response && response.declinedPermissions) {
        if (response.declinedPermissions.indexOf('email') > -1) {
          this.setState({ emailDeclined: true });
        }
      }
      return response;
    };

    render() {
      const { facebookAppId, ...passedProps } = this.props;
      const { emailDeclined } = this.state;

      const injectedProps = {
        facebookSDKReady: this.state.sdkLoaded,
        facebookLogin: this.login,
        emailDeclined,
      };

      return <WrappedComponent {...passedProps} {...injectedProps} />;
    }
  }

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withFacebook.displayName = `withFacebook(${componentName})`;

  const mapStateToProps = state => ({
    facebookAppId: getFacebookAppId(state),
  });

  return connect(mapStateToProps)(withFacebook);
};
