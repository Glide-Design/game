import React from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { authenticationSteps } from 'xi-core/signup/constants';
import {
  mapConfirmationEmailDecodedPropsFromJWT,
  decodeAccessToken,
} from 'xi-core/signup/jwtValidator';
import { saveReferrerInfo } from 'xi-core/app/actions';
import { ReferralType } from 'xi-core/app/utm';
import { isAuthenticated } from 'xi-core/member/selectors';
import { loginWithGuestPass, setCollectedDetails, authCtaAction } from 'xi-core/signup/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { routes } from '../App';

export const handleActivateFlow = ({
  token,
  setCollectedDetails,
  alreadyAuthenticated = false,
  redirect = true,
  returnUrl = '/',
  saveStarReferrerInfo,
  authCtaAction,
}) => {
  if (alreadyAuthenticated && redirect) {
    return (
      <Redirect
        to={{
          pathname: routes.profile.path,
        }}
      />
    );
  }

  const locationState = {};

  if (token) {
    const decodedAccessToken = decodeAccessToken(token);

    Object.assign(locationState, decodedAccessToken, {
      fromActivation: true,
      signUpWizard: authenticationSteps.CollectNames,
    });

    setCollectedDetails({
      ...mapConfirmationEmailDecodedPropsFromJWT(locationState),
      temporaryRegistrationToken: token,
    });

    authCtaAction && authCtaAction(PropertyKeys.SIGN_UP_REGISTRATION.MAGIC_LINK_CLICKED);

    // Assume this is a star
    if (decodedAccessToken.referrerExternalId) {
      saveStarReferrerInfo(decodedAccessToken.referrerExternalId);
    }
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: returnUrl,
          state: locationState,
        }}
      />
    );
  }

  return null;
};

const handleInviteFlow = (token, contentId, setCollectedDetails) => {
  loginWithGuestPass(token, setCollectedDetails);

  return (
    <Redirect
      to={{
        pathname: routes.content.path.replace(':contentId', contentId) || '/',
        state: { fromGuestPass: true },
      }}
    />
  );
};

const AuthRedirect = ({
  location: { search: queryString, pathname },
  setCollectedDetails,
  isAuthenticated: alreadyAuthenticated,
  saveStarReferrerInfo,
  authCtaAction,
}) => {
  let filteredQueryString = queryString;
  if (queryString.length && queryString[0] === '?') {
    filteredQueryString = queryString.substring(1);
  }

  const parsedQueryString = qs.parse(filteredQueryString);

  const { token } = parsedQueryString;
  const { returnUrl, content: contentId } = parsedQueryString;

  if (matchPath(pathname, routes.activate)) {
    return handleActivateFlow({
      token,
      returnUrl,
      setCollectedDetails,
      alreadyAuthenticated,
      saveStarReferrerInfo,
      authCtaAction,
    });
  } else if (matchPath(pathname, routes.invite)) {
    return handleInviteFlow(token, contentId, setCollectedDetails);
  } else {
    return <Redirect to="/" />;
  }
};

export default connect(
  state => ({ isAuthenticated: isAuthenticated(state) }),
  dispatch => ({
    setCollectedDetails: details => dispatch(setCollectedDetails(details)),
    saveStarReferrerInfo: starReferrerId => {
      const mockParsedQueryString = {
        utm_campaign: ReferralType.PLAYER,
        utm_content: starReferrerId,
      };
      saveReferrerInfo(dispatch, mockParsedQueryString);
    },
    authCtaAction: key => dispatch(authCtaAction(key)),
  })
)(AuthRedirect);
