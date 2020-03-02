import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { isEqual, get, first, find, flow, set } from 'lodash/fp';
import { videoButtons } from 'xi-core/locale/app';
import { languages } from 'xi-core/locale/languages';
import { VIDEO_PLAYER_ERR_LABEL } from 'xi-core/utils/logglyConstants';
import { getLanguage as getMemberLanguage } from 'xi-core/member/selectors';
import withIntlAndRef from 'xi-core/translations/components/withIntlAndRef';
import { logglyRuntimeError } from 'xi-core/app/actions';
import { Implementation } from 'xi-core/content/drmSupport';
import { getTargetDevice } from '../../state/app/selectors';
import { HelperDevices } from '../../common/dimensions';
import { detectSupportedTag, supportedImplemention } from './DRMStreamTag';
import DRMWidevine from './DRMWidevine';
import DRMFairPlay from './DRMFairPlay';
import DRMPlayready from './DRMPlayready';
import VideoJS from './VideoJS';
import RegisterCustomEvents from './VideoJsCustomEvents';

const UserAgent = navigator.userAgent || navigator.vendor || window.opera;

const ErrorMessages = defineMessages({
  GENERIC: {
    id: 'videoJSPlayer.errorMessage',
    defaultMessage: 'We have encountered a temporary video playback issue. Please try again later.',
  },
  DRM: {
    id: 'videoJSPlayer.drmNotSupported',
    defaultMessage:
      'Sorry, this video is not supported in {platform}. Open your favourite browser. Go to <span class="appLink">app.otro.com</span>',
  },
  DRM_CHROME_IOS: {
    id: 'videoJSPlayer.drmNotSupportedChromeIos',
    defaultMessage:
      'Sorry, this video is not supported in Chrome on iOS. Please open Safari and go to <span class="appLink">app.otro.com</span>',
  },
  DRM_SAMSUNG: {
    id: 'videoJSPlayer.drmNotSupportedSamsung',
    defaultMessage:
      'Sorry, this video is not supported in the Samsung browser. Please open Chrome and go to <span class="appLink">app.otro.com</span>',
  },
});

const ErrorMessageTypes = {
  GENERIC: 'GENERIC',
  DRM: 'DRM',
  DRM_CHROME_IOS: 'DRM_CHROME_IOS',
  DRM_SAMSUNG: 'DRM_SAMSUNG',
};

const StyledVideoPlayer = styled(VideoJS)`
  .vjs-error-display.vjs-modal-dialog:not(.vjs-custom-error) .vjs-modal-dialog-content {
    visibility: hidden;
    height: 150px;
    font-size: 20px;
  }
  .vjs-error-display.vjs-modal-dialog:not(.vjs-custom-error) .vjs-modal-dialog-content:after {
    visibility: visible;
    content: '${({ genericErrorMsg }) => genericErrorMsg}';
  }
  .vjs-error-display.vjs-modal-dialog.vjs-custom-error .vjs-modal-dialog-content span.appLink {
      font-weight: bold;
  }
`;

class VideoApp extends Component {
  player = {};
  playing = false;
  initialized = false;
  playerInstance = {};
  state = {
    video: {
      src: null,
      poster: null,
    },
  };
  uiVisible = true;

  static propTypes = {
    source: PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        })
      ),
      ads: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          timeOffset: PropTypes.string,
          skipOffset: PropTypes.string,
        })
      ),
      textTracks: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          srcLang: PropTypes.string.isRequired,
          default: PropTypes.boolean,
          kind: PropTypes.oneOf(['subtitles', 'captions', 'descriptions', 'chapters', 'metadata']),
          label: PropTypes.string,
        })
      ),
      poster: PropTypes.string,
    }),
    autoPlay: PropTypes.bool,
    allowNativeFullscreen: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    fluid: PropTypes.bool,
    bigPlayButton: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    startTime: PropTypes.number,
  };

  static defaultProps = {
    allowNativeFullscreen: true,
    playerRef: () => {},
  };

  componentDidMount = () => {
    this.setPlayerSource();

    // Experimental APIs
    try {
      window.screen.orientation.onchange = this.orientationChanged;
    } catch (err) {
      console.log('window.screen.orientation.onchange: issue');
    }

    document.addEventListener('fullscreenchange', this.fullScreenChanged);
    document.addEventListener('webkitfullscreenchange', this.fullScreenChanged);
    document.addEventListener('mozfullscreenchange', this.fullScreenChanged);
    document.addEventListener('MSFullscreenChange', this.fullScreenChanged);
  };

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.fullScreenChanged);
    document.removeEventListener('webkitfullscreenchange', this.fullScreenChanged);
    document.removeEventListener('mozfullscreenchange', this.fullScreenChanged);
    document.removeEventListener('MSFullscreenChange', this.fullScreenChanged);
  }

  componentDidUpdate(prevProps) {
    const { startTime: prevStartTime } = prevProps;
    const { startTime } = this.props;

    if (!isEqual(prevProps.source, this.props.source)) {
      this.setPlayerSource();
    }

    if (!prevStartTime && startTime && this.player) {
      this.playerInstance.currentTime(startTime);
    }
  }

  setPlayerSource(
    { source: { sources, ads, textTracks, poster }, accessToken, contentMedia } = this.props
  ) {
    if (this.player == null) {
      return;
    }

    const source = {};

    if (ads != null) {
      source.ads = ads.map(({ src, timeOffset, skipOffset }) => {
        const ad = { sources: src };
        if (timeOffset != null) {
          ad.timeOffset = timeOffset;
        }
        if (skipOffset != null) {
          ad.skipOffset = skipOffset;
        }
        return ad;
      });
    }

    if (textTracks && textTracks.length) {
      source.textTracks = this.setSubtitleLabels(textTracks).map(
        ({ src, srcLang, default: isDefault, kind, label }) => {
          const textTrack = { src, srclang: srcLang };
          if (isDefault != null) {
            textTrack.default = isDefault;
          }
          if (kind != null) {
            textTrack.kind = kind;
          }
          if (label != null) {
            textTrack.label = label;
          }
          return textTrack;
        }
      );
    }

    if (poster != null) {
      source.poster = poster;
    }

    const forceErrorDisplay = (type, values) => {
      const videoJsElement = document.getElementsByClassName('video-js');
      const videoJsErrorElement = document.getElementsByClassName('vjs-error-display');
      const videoJsErrorTextElement = document.getElementsByClassName('vjs-modal-dialog-content');
      if (
        videoJsElement &&
        videoJsElement.length &&
        videoJsErrorElement &&
        videoJsErrorElement.length &&
        videoJsErrorTextElement &&
        videoJsErrorTextElement.length
      ) {
        videoJsElement[0].classList.add('vjs-error');
        videoJsErrorElement[0].classList.remove('vjs-hidden');
        videoJsErrorElement[0].classList.add('vjs-custom-error');
        const msg = this.props.intl.formatMessage(ErrorMessages[type], values);
        videoJsErrorTextElement[0].innerHTML = `<span>${msg}</span>`;
      }
    };

    const contentIsEncrypted = flow(
      first,
      get('drmId')
    )(contentMedia);

    if (!contentIsEncrypted) {
      source.sources = sources.map(s => ({ src: s.src, type: s.type }));
      this.player.source = source;
    } else {
      const unsupportedPlatform = this.isUnsupportedDrmPlatform();
      if (unsupportedPlatform) {
        forceErrorDisplay(ErrorMessageTypes.DRM, { platform: unsupportedPlatform });
      } else if (this.isChromeForIOS()) {
        forceErrorDisplay(ErrorMessageTypes.DRM_CHROME_IOS);
      } else if (this.isSamsungBrowser()) {
        forceErrorDisplay(ErrorMessageTypes.DRM_SAMSUNG);
      } else {
        try {
          const supportedCodec = detectSupportedTag();
          if (!supportedCodec) {
            throw Error('No supported codec found');
          } else {
            const drmType = supportedImplemention();
            const media =
              find(c => c.codec === supportedCodec && c.drmType === drmType, contentMedia) || {};
            const { url: contentUrl, mimeType: type, drmId } = media;
            if (contentUrl && type && drmId && drmType) {
              source.sources = sources.map(s => ({ src: contentUrl, type }));
              let implementation;
              if (drmType === Implementation.FAIRPLAY) {
                implementation = DRMFairPlay;
              } else if (drmType === Implementation.WIDEVINE) {
                implementation = DRMWidevine;
              } else {
                implementation = DRMPlayready;
              }
              console.log(type, drmType, contentUrl, drmId);
              implementation({ player: this.player, source, drmId, accessToken });
            } else {
              throw Error('Missing DRM properties');
            }
          }
        } catch (e) {
          console.error(e);
          forceErrorDisplay(ErrorMessageTypes.GENERIC);
        }
      }
    }
  }

  isUiVisible = () => this.uiVisible;

  pause = () => {
    if (this.playerInstance && this.isPlaying()) {
      this.playerInstance.pause();
    }
  };

  initializeVideoJsPlayer = (videoEl, playerInstance) => {
    this.props.playerLoaded && this.props.playerLoaded();
    if (videoEl != null) {
      const { autoPlay, premiumCTA, signupCTA, logglyRuntimeError, contentId } = this.props;

      this.playerInstance = playerInstance;

      playerInstance.on('readystatechange', () => {
        if (!this.fullScreenButtonDOM) {
          this.fullScreenButtonDOM = document.getElementsByClassName('vjs-fullscreen-control')[0];
        }
      });

      playerInstance.on('error', errorEvent => {
        logglyRuntimeError({
          status: errorEvent.type,
          message: `${errorEvent.error} Error for contentId: ${contentId}.`,
          type: [VIDEO_PLAYER_ERR_LABEL],
        });
      });

      this.player.autoplay = autoPlay;

      this.player.abr = {};

      if (this.props.targetDevice === 'large') {
        this.player.abr.strategy = 'bandwidth';
      } else {
        this.player.abr.strategy = 'performance';
        // this.player.abr.targetBuffer = 2;
      }

      RegisterCustomEvents();
      window.registerVideoJsEvents(playerInstance, this.player, this.handleEvent);

      if (premiumCTA) {
        window.addPremiumCTA(this.player, premiumCTA);
        const goUnlimitedBtn = document.getElementsByClassName('otro-go-premium unlock');
        if (goUnlimitedBtn && goUnlimitedBtn.length) {
          goUnlimitedBtn[0].innerHTML = this.props.intl.formatMessage(
            videoButtons.go_unlimited_CTA
          );
        }
        const watchTrailerBtn = document.getElementsByClassName('otro-go-premium play');
        if (watchTrailerBtn && watchTrailerBtn.length) {
          watchTrailerBtn[0].innerHTML = this.props.intl.formatMessage(
            videoButtons.watch_trailer_CTA
          );
        }
      } else if (signupCTA) {
        window.addSignupCTA(this.player, signupCTA);
        const joinNowBtn = document.getElementsByClassName('otro-join-now-cta');
        if (joinNowBtn && joinNowBtn.length) {
          joinNowBtn[0].innerHTML = this.props.intl.formatMessage(videoButtons.join_now_CTA);
        }
      }

      this.setPlayerSource();
      playerInstance.currentTime(this.props.startTime);
    } else {
      this.props.playerRef(null);
    }
  };

  handleEvent = (handlerName, eventData) => {
    const trigger = () => {
      if (typeof this.props[handlerName] === 'function') {
        this.props[handlerName](eventData);
      }
    };

    switch (handlerName) {
      case 'onUiVisibilityChanged':
        this.uiVisible = eventData.visible;
        trigger();
        break;
      case 'onPlay':
      case 'onPlaying':
        this.playing = true;
        trigger();
        break;
      case 'onPause':
      case 'onEnded':
        this.playing = false;
        trigger();
        break;
      default:
        trigger();
        break;
    }
  };

  isUnsupportedDrmPlatform = () => {
    const isInstagram = UserAgent.indexOf('Instagram') > -1 ? true : false;
    if (isInstagram) {
      return 'Instagram';
    }
    const isFacebook = UserAgent.indexOf('FBAN') > -1 || UserAgent.indexOf('FBAV') > -1;
    if (isFacebook) {
      return 'Facebook';
    }
    return false;
  };

  isChromeForIOS = () => {
    if (UserAgent.indexOf('CriOS') > -1) {
      return true;
    }
    return false;
  };

  isSamsungBrowser = () => {
    if (UserAgent.indexOf('SamsungBrowser') > -1) {
      return true;
    }
    return false;
  };

  setSubtitleLabels = subtitles =>
    subtitles && subtitles.length
      ? subtitles.map(s =>
          set(
            'label',
            languages[s.srclang] ? this.props.intl.formatMessage(languages[s.srclang]) : s.srclang,
            s
          )
        )
      : null;

  fullScreenChanged = e => {
    try {
      if (this.isFullScreen() && this.isPlaying()) {
        if (this.getOrientationType().startsWith('portrait')) {
          console.log('LANDSCAPE LOCK');
          window.screen.orientation.lock('landscape').catch(err => console.log(err));
        }
      } else {
        console.log('NO LOCK');
        window.screen.orientation.lock('any').catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  goFullScreenIfLandscape() {
    if (
      window.matchMedia(HelperDevices.belowMedium).matches &&
      this.getOrientationType().startsWith('landscape') &&
      !this.isFullScreen() &&
      this.isPlaying() &&
      this.fullScreenButtonDOM
    ) {
      this.fullScreenButtonDOM.dispatchEvent(this.getSimulatedClickEvent());
    }
  }

  exitFullScreenIfPortrait() {
    if (
      window.matchMedia(HelperDevices.belowMedium).matches &&
      this.getOrientationType().startsWith('portrait')
    ) {
      this.exitFullScreen();
    }
  }

  exitFullScreen = () => {
    if (this.isFullScreen() && this.fullScreenButtonDOM) {
      this.fullScreenButtonDOM.dispatchEvent(this.getSimulatedClickEvent());
    }
  };

  getSimulatedClickEvent() {
    var event = document.createEvent('MouseEvents');
    var args = ['click', true, true, window, 1, 0, 0];
    event.simulated = true;
    event.initMouseEvent.apply(event, args);
    return event;
  }

  orientationChanged = e => {
    this.goFullScreenIfLandscape();
    this.exitFullScreenIfPortrait();
  };

  isFullScreen() {
    return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;
  }

  isPlaying = () => this.playing;

  getOrientationType() {
    try {
      return (
        window.screen.msOrientation ||
        (window.screen.orientation || window.screen.mozOrientation || {}).type
      );
    } catch (err) {
      console.log(err);
      return '';
    }
  }

  getTextTracks = () => {
    const { source: { textTracks } = {} } = this.props;

    if (textTracks && textTracks.length) {
      return this.setSubtitleLabels(textTracks).map(
        ({ src, srcLang, default: isDefault, kind, label }) => {
          const textTrack = { src, srclang: srcLang };
          if (isDefault != null) {
            textTrack.default = isDefault;
          }
          if (kind != null) {
            textTrack.kind = kind;
          }
          if (label != null) {
            textTrack.label = label;
          }
          return textTrack;
        }
      );
    }
  };

  render() {
    const {
      fluid = false,
      width,
      height,
      autoPlay,
      memberLanguage,
      onProgress,
      source,
    } = this.props;

    const videoJsOptions = {
      autoplay: autoPlay,
      preload: 'auto',
      controls: true,
      sources: source.sources,
      poster: source.poster,
      fluid,
      width,
      height,
      language: memberLanguage,
      textTracks: this.getTextTracks(),
      // playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 2],
      onInit: (el, playerInstance) => this.initializeVideoJsPlayer(el, playerInstance),
      onTimeUpdate: duration => onProgress(duration),
    };

    return (
      <Fragment>
        <FormattedMessage {...ErrorMessages.GENERIC}>
          {genericErrorMsg => (
            <StyledVideoPlayer genericErrorMsg={genericErrorMsg} {...videoJsOptions} />
          )}
        </FormattedMessage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  memberLanguage: getMemberLanguage(state),
  targetDevice: getTargetDevice(state),
});

const mapDispatchToProps = dispatch => ({
  logglyRuntimeError: error => dispatch(logglyRuntimeError(error)),
});

export default withIntlAndRef(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
  )(VideoApp)
);
