import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { get, compose, omit, map } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { withProps } from 'recompose';
import styled from 'styled-components';
import withVideoPlaybackSession from 'xi-core/content/withVideoPlaybackSession';
import { fetchContentEntitlement, contentDetailPageInteraction } from 'xi-core/content/actions';
import withContentScrollInteractions from 'xi-core/content/withContentScrollInteractions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import {
  getPublisherIdForContent,
  getSeasonIdByContentId,
  getSeriesIdByContentId,
  getContentMedia,
  getContentUrl,
  getMimeType,
  getAdvertisingUrl,
  getSubtitles,
  isFree,
  getPartner,
  getLanguage,
  getTagType,
} from 'xi-core/content/selectors';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import {
  isAuthenticatedAndProfileReceived,
  getLanguage as getMemberLanguage,
  isAuthenticated,
} from 'xi-core/member/selectors';
import { setVideoEllapsedTime as setEllapsedTime } from 'xi-core/video/actions';
import withRequest from 'xi-core/withRequest';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import { addToViewCount } from 'xi-core/member/actions';
import { currentOpenComments as isCommentsOpen } from 'xi-core/comments/selectors';
import { Grey5, Grey85 } from 'xi-core/colours';
import { isOpen as isPurchasesOpen } from 'xi-core/purchases/selectors';
import { isOpen as isAuthOpen } from 'xi-core/signup/selectors';
import withVideoResume from 'xi-core/video/withVideoResume';
import { showAuthWizard } from 'xi-core/signup/actions';
import getSourcesByRatio from '../../../common/getSourcesByRatio';
import LoaderCircularSpinner from '../../../common/LoaderCircularSpinner';

import {
  CoreDevices,
  HelperDevices,
  ROW_HEIGHT_PX,
  posFixedZIndex,
  NAVBAR_HEIGHT_PX,
} from '../../../common/dimensions';
import { Body10, Body1 } from '../../../common/typography';
import FixedToolbarOnScroll from '../../../common/FixedToolbarOnScroll';
import AvatarGroup from '../../../common/AvatarGroup';
import ExpandableText from '../../../common/ExpandableText';
// import SimpleDivider from '../../../common/SimpleDivider';
import CommentsSpline from '../../../comments/CommentsSpline';
import LanguageLineHeights from '../../../common/LanguageLineHeights';
import { getTargetDevice, getOrientation } from '../../../state/app/selectors';
import Title, { LINE_HEIGHTS } from '../../components/Title';
import VideoJS from '../../components/VideoJSComponent';
import DiscussionHighlights from '../DiscussionHighlights';
import MoreLikeThis from '../MoreLikeThis';
import PageContentInfo from '../PageContentInfo';
// import GuestPass from '../GuestPass';
import Tag from '../../components/Tag';
import MoreInSeries from './MoreInSeries';
import SecondaryCta from './SecondaryCta';
import UpNext from './upNext';

const SHOW_UP_NEXT_DURATION = 10;

const VideoPlayer = withVideoPlaybackSession(VideoJS);

const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  color: ${Grey85};
  background: white;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
  }
  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
  }
  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
  }
  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
  }

  @media ${HelperDevices.belowMediumPortrait} {
    padding-top: calc(100vw / (16 / 9) - 0.5px); /* The 0.5 is a precaution against rounding */
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  z-index: 1;
  background: #fff;
  max-height: calc(1000px / 16 * 9);
  overflow: hidden;

  @media ${HelperDevices.belowMediumPortrait} {
    position: fixed;
    top: 0;
    z-index: ${posFixedZIndex.videoContainer};
  }

  /* START Limit VideoJs width & height on large displays */

  .video-js:not(.vjs-fullscreen) .vjs-tech {
    max-width: 1000px;
    right: 0;
    margin: auto;
  }
  /* END Limit VideoJs width & height on large displays */

  .vjs-paused .SplineContainer,
  .vjs-user-active .SplineContainer {
    opacity: 1;
  }
  .vjs-user-inactive .SplineContainer {
    opacity: 0;
  }

  video {
    opacity: 1;
  }
`;

// These width and height styles are ignored when the VideoJs is
// using fluid=true however they must be set during the player
// initilialization regardless of the fluid property or else the player breaks
// if they are added after initilialization.
const StyledVideoJs = styled(VideoPlayer)`
  width: 100vw;
  height: 100vh;
  background: none;
`;

const VideoLoadingFiller = styled.div`
  background: #fff;
  position: relative;
  padding-top: 46.25%; /* Stops the video area dissappearing if the video fails to load */
  @media ${HelperDevices.belowMediumLandscape} {
    padding-top: unset;
  }
`;

const FixedToolbarOnScrollWrapper = styled.div`
  transition: visibility 0.5s, opacity 0.5s linear;
  visibility: visible;
  opacity: 1;

  &.hide {
    visibility: hidden;
    opacity: 0;
  }
`;

const StyledFixedToolbarOnScroll = styled(FixedToolbarOnScroll)`
  @media ${HelperDevices.belowMedium} {
    background: none;
  }
`;

const Sections = styled.div`
  & > * {
    position: relative;
    padding-top: ${ROW_HEIGHT_PX * 3}px;
    @media ${CoreDevices.medium} {
      padding-top: 22px;
    }

    @media ${CoreDevices.large} {
      padding-top: 42px;
    }

    &:not(:first-child) {
      :before {
        content: ' ';
        display: block;
        height: 10px;
        background: ${Grey5};
        margin-bottom: 24px;
        @media ${CoreDevices.medium} {
          height: 13px;
        }
      }
    }
  }
`;

const StyledExpandableText = styled(ExpandableText)`
  ${Body1};
  margin: 10px 0 14px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
    margin: 15px 0 20px;
  }
`;

const StyledTag = styled(Tag)`
  margin-top: 14px;
  align-self: flex-start;
`;

const StyledTitle = styled(Title)`
  margin-top: 14px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LHS = styled.div`
  flex: 1;
`;

const RHS = styled.div`
  flex: 0 0 25%;
  background: white;
  height: calc(100vh - 72px);
  border-left: 1px solid gray;
`;

const SplineContainer = styled.div`
  position: absolute;
  height: 120px;
  bottom: 0;
  width: 100%;
  z-index: 0;
  padding: 0 42px;
  transition: opacity 1s;
`;

class Video extends React.Component {
  constructor(props) {
    super(props);

    const queryString = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    this.queryStringNoAutoPlay = get('autoplay', queryString) === 'no' ? true : false;

    this.state = {
      mouseOverTopIcons: false,
      showTopIcons: true,
      playerEndedReloadFlag: 0,
      showUpNext: false,
    };
  }

  componentDidMount = () => {
    const { setVideoResumePoint } = this.props;

    window.addEventListener('scroll', this.listenToScroll);
    this.checkForServiceWorkerFlags();
    setVideoResumePoint();
  };

  componentDidUpdate = prevProps => {
    const { contentId, isAuthenticated } = this.props;
    const { contentId: prevContentId, isAuthenticated: prevIsAuthenticated } = prevProps;

    if (
      this.player &&
      (!this.overlayOpen(prevProps) || this.player.isPlaying()) &&
      this.overlayOpen(this.props)
    ) {
      this.player.pause();
    }

    if (contentId !== prevContentId) {
      this.setState({ showUpNext: false });
    }

    if (isAuthenticated !== prevIsAuthenticated && isAuthenticated) {
      this.props.getStreamsRequest();
    }

    navPresenter.setCurrentStar(this.props.starId);
  };

  checkForServiceWorkerFlags = () => {
    const { history, location } = this.props;

    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (queryString.swautoplay) {
      history.replace(location.pathname, {
        search: qs.stringify(omit(['swautoplay', 'autoplay'], queryString)),
      });
    }
  };

  overlayOpen = props => {
    const { authOpen, purchasesOpen, commentsOpen } = props;
    return authOpen || purchasesOpen || commentsOpen;
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.listenToScroll);
  };

  listenToScroll = () => {
    this.checkDisplayTopIcons();

    this.handleScroll();
  };

  handleScroll = () => {
    const scrollOffset =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const contentHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    this.props.handleScroll(scrollOffset, contentHeight);
  };

  checkDisplayTopIcons = () => {
    if (this.player) {
      let scrollTop = 0;

      // Player is pinned on small devices in potrait mode so assume scrollTop zero
      if (!(this.props.targetDevice === 'small' && this.props.orientation === 'portrait')) {
        scrollTop =
          window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }

      this.setState({
        showTopIcons:
          this.player.isUiVisible() ||
          !this.player.isPlaying() ||
          scrollTop > 0 ||
          this.state.mouseOverTopIcons,
      });
    }
  };

  reloadPlayer = () =>
    this.setState(state => ({
      playerEndedReloadFlag: state.playerEndedReloadFlag + 1,
    }));

  onEndedHandler = () => {
    const { reloadVideoResume } = this.props;

    this.reloadPlayer();
    reloadVideoResume();
  };

  handleProgress = e => {
    if (e.isAdvert) {
      return;
    }
    const { handleProgress, upNextWindowLaunched, setEllapsedTime, contentId } = this.props;
    handleProgress(e);

    setEllapsedTime(contentId, Math.abs(e.currentTime));

    const upNextWindowIsAlreadyVisible = this.state.showUpNext;
    if (e.currentTime && !upNextWindowIsAlreadyVisible) {
      const showUpNext = SHOW_UP_NEXT_DURATION >= e.duration - e.currentTime;
      this.setState({ showUpNext: showUpNext });
      showUpNext && upNextWindowLaunched();
    }
  };

  checkEntitlementAndContentStatus = () => {
    const { isAuthenticated, history, showAuthWizard, isFree } = this.props;
    if (!isFree && !isAuthenticated) {
      showAuthWizard({ history });
      this.reloadPlayer();
    }
  };

  render() {
    const {
      contentId,
      content,
      seriesId,
      seasonId,
      contentMedia,
      contentUrl,
      advertisingUrl,
      accessToken,
      subtitles,
      addToViewCount,
      noAutoPlay,
      isFree,
      authenticatedAndProfileReceived,
      partner,
      loaded,
      loadingComplete,
      contentLanguage,
      memberLanguage,
      startTime,
      tagType,
      mimeType,
      playerAvatarClicked,
      isAuthenticated,
    } = this.props;

    const { playerEndedReloadFlag, showUpNext } = this.state;

    if (!content) {
      return null;
    }

    const shouldAutoPlay =
      !this.overlayOpen(this.props) &&
      !noAutoPlay &&
      !this.queryStringNoAutoPlay &&
      !playerEndedReloadFlag &&
      (isFree || isAuthenticated);

    return (
      <Container>
        <VideoContainer data-test-id="video-player-container">
          {contentUrl ? (
            <StyledVideoJs
              customProgressHandler={progress => {
                if (progress !== 0.25) {
                  return;
                }
                addToViewCount(contentId);
              }}
              key={`${contentId} - ${
                content.inventoryType
              }-${authenticatedAndProfileReceived}-${playerEndedReloadFlag}`}
              innerRef={ref => {
                if (ref) {
                  const player = this.player;
                  this.player = ref.getWrappedInstance();
                  if (!player) {
                    this.forceUpdate();
                  }
                }
              }}
              contentForSession={content}
              fluid={!window.matchMedia(HelperDevices.belowMediumLandscape).matches}
              source={{
                sources: [{ src: contentUrl, type: mimeType }],
                ads: playerEndedReloadFlag || !advertisingUrl ? [] : [{ src: advertisingUrl }],
                poster: getSourcesByRatio(content.creatives, 1.77).src,
                textTracks: map(
                  object => ({
                    ...object,
                    default:
                      object.srclang === memberLanguage && memberLanguage !== contentLanguage,
                  }),
                  subtitles
                ),
              }}
              onUiVisibilityChanged={() => this.checkDisplayTopIcons()}
              onEnded={this.onEndedHandler}
              autoPlay={shouldAutoPlay}
              startTime={startTime}
              onProgress={this.handleProgress}
              contentMedia={contentMedia}
              accessToken={accessToken}
              playerLoaded={loaded}
              contentId={contentId}
              subtitles={subtitles}
              onPlay={this.checkEntitlementAndContentStatus}
              spline={
                <SplineContainer className="SplineContainer">
                  <CommentsSpline height={120} videoLength={58000} />
                </SplineContainer>
              }
            />
          ) : (
            <VideoLoadingFiller>
              <LoaderCircularSpinner />
            </VideoLoadingFiller>
          )}
        </VideoContainer>
        <FixedToolbarOnScrollWrapper
          className={this.state.showTopIcons ? '' : 'hide'}
          onMouseEnter={() => this.setState({ mouseOverTopIcons: true }, this.checkDisplayTopIcons)}
          onMouseLeave={() =>
            this.setState({ mouseOverTopIcons: false }, this.checkDisplayTopIcons)
          }
          onFocus={() => null}
        >
          <StyledFixedToolbarOnScroll />
        </FixedToolbarOnScrollWrapper>

        {showUpNext && <UpNext contentId={contentId} />}
        <PageContentInfo
          tag={<StyledTag whiteBackground tagType={tagType} />}
          icon={
            <AvatarGroup
              starIds={content.contributors}
              showName={true}
              onClick={playerAvatarClicked}
            />
          }
          title={
            <LanguageLineHeights lineHeights={LINE_HEIGHTS}>
              {({ lineHeight }) => (
                <StyledTitle lineHeight={lineHeight}>Sample Video</StyledTitle>
                // <StyledTitle lineHeight={lineHeight}>{content.title}</StyledTitle>
              )}
            </LanguageLineHeights>
          }
          description={
            <StyledExpandableText
              linesToShow={5}
              text={
                content.description ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
                  ' dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              }
            />
          }
          // description={<StyledExpandableText linesToShow={5} text={content.description || ' '} />}
          contentId={contentId}
          partner={partner}
          isFree={isFree}
          shareClicked={() => {
            if (this.player) {
              this.player.pause();
            }
          }}
        />
        {loadingComplete ? (
          <Fragment>
            {/* {contentUrl ? (
              <Fragment>
                <SimpleDivider color={Grey5} withoutMargin />
                <GuestPass contentId={contentId} />
              </Fragment>
            ) : null} */}
            <DiscussionHighlights contentId={contentId} />
            <SecondaryCta contentId={contentId} />
            <Sections>
              <MoreInSeries seriesId={seriesId} seasonId={seasonId} contentId={contentId} />
              <MoreLikeThis contentId={contentId} />
            </Sections>
          </Fragment>
        ) : null}
      </Container>
    );
  }
}

const fromGuestPass = location => (get('state.fromGuestPass', location) ? 1 : -1);

const mapStateToProps = (state, { contentId, location, contentTypeName }) => {
  return {
    starId: getPublisherIdForContent(state)(contentId),
    targetDevice: getTargetDevice(state),
    orientation: getOrientation(state),
    authOpen: isAuthOpen(state),
    purchasesOpen: isPurchasesOpen(state),
    authenticatedAndProfileReceived: isAuthenticatedAndProfileReceived(state),
    commentsOpen: isCommentsOpen(state),
    isFree: isFree(state)(contentId),
    seriesId: getSeriesIdByContentId(state)(contentId),
    seasonId: getSeasonIdByContentId(state)(contentId),
    contentMedia: getContentMedia(state)(contentId),
    contentUrl: '/video/ronaldo.mp4', //getContentUrl(state)(contentId),
    mimeType: getMimeType(state)(contentId),
    advertisingUrl: getAdvertisingUrl(state)(contentId, fromGuestPass(location) > 0),
    accessToken: get('user.accessToken', state),
    subtitles: getSubtitles(state)(contentId),
    partner: getPartner(state)(contentId),
    contentLanguage: getLanguage(state)(contentId),
    memberLanguage: getMemberLanguage(state),
    tagType: getTagType(state)(contentTypeName, contentId),
    isAuthenticated: true, //isAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addToViewCount: contentId => dispatch(addToViewCount(contentId)),
  showAuthWizard: data => dispatch(showAuthWizard(data)),
  setEllapsedTime: (contentId, currentTime) => dispatch(setEllapsedTime(contentId, currentTime)),
  playerAvatarClicked: playerName =>
    dispatch(
      contentDetailPageInteraction({
        [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_AVATAR_CLICKED]: true,
        [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_NAME]: playerName,
      })
    ),
  upNextWindowLaunched: () =>
    dispatch(
      contentDetailPageInteraction({
        [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.UP_NEXT_WINDOW_LAUNCHED]: true,
      })
    ),
});

export default compose(
  withRouter,
  withProps(props => ({ fromGuestPass: fromGuestPass(props.location) })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRequest({
    requestIdAlias: ['contentId', 'fromGuestPass'],
    requestAction: (contentId, fromGuestPass) =>
      fetchContentEntitlement(contentId, fromGuestPass > 0),
    makeRequestAlias: 'getStreamsRequest',
  }),
  withLoadedFlag(),
  withVideoResume,
  withContentScrollInteractions()
)(Video);
