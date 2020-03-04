import React from 'react';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { NAVIGATION_CHANGE, NAVIGATION_LOADED } from 'xi-core/app/actions';
import { getCookiesStatus, isAuthenticated, isBlocked } from 'xi-core/member/selectors';
import { acceptCookies } from 'xi-core/member/actions';
import { showAuthWizard, showBlockedUser } from 'xi-core/signup/actions';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import { getExternalLink } from 'xi-core/config/selectors';
import CardAnimationsController from 'xi-core/content/cards/CardAnimationsController';
import OverlaysQueueController from 'xi-core/overlays/components/OverlaysQueueController';
import hasNotch from 'xi-core/hasNotch';
import { getVideoEllapsedTime as getVideoEllapsedTimeByContentId } from 'xi-core/video/selectors';
import {
  ContainerPaddingCss,
  CoreDevices,
  HelperDevices,
  MediaQueries,
  NAVBAR_HEIGHT_PX,
  posFixedZIndex,
  SIDE_MARGIN_PX,
} from '../common/dimensions';
import { Button1 } from '../common/buttons/Buttons';
import NavBar from '../navBar';
import { routes, redirectToJoinRoutes, skipCookieBarRoutes } from '../App';
import AuthenticationOverlay from '../signup/AuthenticationOverlay';
import { getTargetDevice } from '../state/app/selectors';
import Comments from '../comments/Comments';
import BlockedUser from '../signup/BlockedUser';
import SnackBar from './SnackBar';

const smallDeviceMinWidthContentDetail = '320px';

const StyledNavBar = styled(NavBar)`
  position: fixed;
  top: 0;
  left: 0;
  right: 25%;
  z-index: ${posFixedZIndex.navBar};

  @media ${HelperDevices.belowMedium}, ${CoreDevices.medium} {
    top: auto;
    bottom: 0;
  }

  @media ${HelperDevices.belowMediumLandscape} {
    ${({ noNavBarLandscape }) => (noNavBarLandscape === 'small' ? 'display:none;' : '')};
  }
`;

// Allow space for the navbar
const Wrapper = styled.div`
  @media ${CoreDevices.large} {
    padding-top: ${NAVBAR_HEIGHT_PX.large}px;
  }

  @media ${HelperDevices.belowMedium}, ${CoreDevices.medium} {
    padding-top: 0;
  }

  @media ${CoreDevices.medium} {
    ${({ isMenuHidden }) =>
      isMenuHidden ? 'padding-bottom: 0;' : `padding-bottom: ${NAVBAR_HEIGHT_PX.medium}px;`};
  }

  @media ${HelperDevices.belowMedium} {
    ${({ isMenuHidden, isNotchedDevice }) =>
      isMenuHidden
        ? 'padding-bottom: 0;'
        : isNotchedDevice
        ? `padding-bottom: ${NAVBAR_HEIGHT_PX.small + 15}px;`
        : `padding-bottom: ${NAVBAR_HEIGHT_PX.small}px;`};
  }

  @media ${HelperDevices.belowMedium}, ${CoreDevices.medium} {
    ${({ smallDeviceMinWidth }) =>
      smallDeviceMinWidth ? 'min-width:' + smallDeviceMinWidth + ';' : ''};
  }

  @media ${HelperDevices.belowMediumLandscape}, ${MediaQueries.mediumLandscape} {
    ${({ noNavBarLandscape }) => (noNavBarLandscape === 'small' ? 'padding-top: 0;' : '')};
  }
`;

const CookieBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  ${({ device }) => 'width: calc(100% - ' + SIDE_MARGIN_PX[device] * 2 + 'px);'};
  background-color: #fff;
  display: flex;
  z-index: ${posFixedZIndex.cookie};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${ContainerPaddingCss};
  @media ${CoreDevices.large} {
    top: 72px;
  }
`;

const ButtonContainer = styled.div`
  text-align: right;
`;
const TextContainer = styled.div`
  flex: 1;
  padding: 23px 23px 23px 0px;
  overflow: hidden;
  color: #232323;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 20px;
  }

  a {
    color: #232323;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const routeBlacklist = ['/index.html'];

const checkRouteBlacklist = history => {
  let path = history.location.pathname;
  let match = false;
  routeBlacklist.forEach(route => {
    if (route === path) {
      match = true;
    }
  });
  if (match) {
    history.replace('/');
  }
};

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
`;

const ChatContent = styled.div`
  flex: 0 0 25%;
  background: white;
  height: 100vh;
  border-left: 1px solid gray;
`;

class AppLayout extends React.Component {
  componentDidMount() {
    const {
      historyLoaded,
      isWaitingOnLoginCode,
      showAuthWizard,
      history,
      isAuthenticated,
      location: { pathname },
    } = this.props;
    historyLoaded();

    if (!isAuthenticated && this.shouldRedirectToJoin()) {
      history.replace(routes.join.path);
    } else if (
      isWaitingOnLoginCode &&
      !matchPath(pathname, routes.activate.path) &&
      !matchPath(pathname, routes.invite.path) &&
      !matchPath(pathname, routes.login.path)
    ) {
      showAuthWizard();
    }
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps;
    const { location, historyUpdated, isBlocked, showBlockedUser } = this.props;

    historyUpdated(prevLocation, location);

    if (isBlocked) {
      showBlockedUser();
    }
  }

  shouldRedirectToJoin = () =>
    redirectToJoinRoutes.some(route => matchPath(window.location.pathname, route));

  shouldSkipCookieBarRoute = () =>
    skipCookieBarRoutes.some(route => matchPath(window.location.pathname, route));

  shouldShowCookieBar = () => {
    const { cookieStatus } = this.props;

    return !(this.shouldSkipCookieBarRoute() || cookieStatus);
  };

  render() {
    const { children, location, acceptCookies, targetDevice, privacyLink } = this.props;
    const config = {};

    navPresenter.selectCorrectSectionFromLocation(location);
    const isMenuHidden = navPresenter.isMenuHidden();

    if (matchPath(location.pathname, routes.content.path)) {
      config.smallDeviceMinWidth = smallDeviceMinWidthContentDetail;
    }

    const shouldShowCookieBar = this.shouldShowCookieBar();

    return (
      <React.Fragment>
        <Container>
          <MainContent>
            <Wrapper
              noNavBarLandscape={config.noNavBarLandscape}
              smallDeviceMinWidth={config.smallDeviceMinWidth}
              isMenuHidden={isMenuHidden}
              isNotchedDevice={hasNotch()}
            >
              {shouldShowCookieBar ? (
                <CookieBar device={targetDevice}>
                  <TextContainer>
                    <FormattedHTMLMessage
                      id="layout.cookies"
                      defaultMessage={
                        'We store data locally to personalise your experience. Find out more <a href="{privacyLink}">here</a>.'
                      }
                      values={{ privacyLink }}
                    />
                  </TextContainer>
                  <ButtonContainer>
                    <Button1 onClick={() => acceptCookies()} data-test-id="accept_cookies">
                      <FormattedMessage defaultMessage="Accept" id="layout.cookiesAccept" />
                    </Button1>
                  </ButtonContainer>
                </CookieBar>
              ) : null}
              {children}
              {!isMenuHidden ? (
                <StyledNavBar
                  noNavBarLandscape={config.noNavBarLandscape}
                  isNotchedDevice={hasNotch()}
                />
              ) : null}
              <OverlaysQueueController />
              <CardAnimationsController />
              <SnackBar />
            </Wrapper>
          </MainContent>
          <ChatContent>
            <Comments
              contentId="test-content-id"
              time={Math.floor(this.props.videoCurrentTime) * 1000}
            />
          </ChatContent>
        </Container>
        <BlockedUser />
        <AuthenticationOverlay key={'authoverlay'} />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => {
      return {
        cookieStatus: getCookiesStatus(state),
        targetDevice: getTargetDevice(state),
        isWaitingOnLoginCode: state.user.waitingOnLoginCode,
        isAuthenticated: isAuthenticated(state),
        privacyLink: getExternalLink('privacyPolicy')(state),
        isBlocked: isBlocked(state),
        videoCurrentTime: getVideoEllapsedTimeByContentId(state)('test-content-id'),
      };
    },
    (dispatch, { history }) => {
      const historyState = history.location.state;
      return {
        showAuthWizard: () => dispatch(showAuthWizard({ history })),
        showBlockedUser: () => dispatch(showBlockedUser()),
        acceptCookies: () => dispatch(acceptCookies()),
        historyLoaded: () => {
          checkRouteBlacklist(history);
          dispatch({ type: NAVIGATION_LOADED, historyState });
        },
        historyUpdated: (prevLocation, nextLocation) => {
          checkRouteBlacklist(history);

          dispatch({
            type: NAVIGATION_CHANGE,
            historyState,
            prevLocation,
            nextLocation,
          });
        },
      };
    }
  )(AppLayout)
);
