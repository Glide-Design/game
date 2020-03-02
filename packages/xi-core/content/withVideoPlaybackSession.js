import * as React from 'react';
import { connect } from 'react-redux';
import VideoPlaybackSession from '../video/VideoPlaybackSession';

export default WrappedComponent => {
  class WithVideoPlaybackSession extends React.Component {
    playbackSession = null;

    onPlayOverride = (e, onPlay) => {
      const { contentForSession, dispatch, customProgressHandler } = this.props;

      if (!this.playbackSession) {
        this.playbackSession = new VideoPlaybackSession(
          dispatch,
          contentForSession.externalId,
          customProgressHandler
        );
      }

      this.playbackSession.play(e.currentTime);

      if (onPlay) {
        onPlay(e);
      }
    };

    onPauseOverride = (e, onPause) => {
      this.playbackSession && this.playbackSession.pause(e.currentTime);

      if (onPause) {
        onPause(e);
      }
    };

    onProgressOverride = (e, onProgress) => {
      this.playbackSession && this.playbackSession.progress(e);

      if (onProgress) {
        onProgress(e);
      }
    };

    onEndedOverride = (e, onEnded) => {
      this.playbackSession && this.playbackSession.end();
      this.playbackSession = null;
      if (onEnded) {
        onEnded(e);
      }
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const {
        forwardedRef,
        onPlay,
        onPause,
        onProgress,
        onEnded,
        ...passThroughProps
      } = this.props;

      const injectedProps = {
        onPlay: e => this.onPlayOverride(e, onPlay),
        onPause: e => this.onPauseOverride(e, onPause),
        onProgress: e => this.onProgressOverride(e, onProgress),
        onEnded: e => this.onEndedOverride(e, onEnded),
      };

      return <WrappedComponent ref={forwardedRef} {...injectedProps} {...passThroughProps} />;
    }
  }

  const mapDispatchToProps = dispatch => ({ dispatch });

  const ConnectedWithVideoPlaybackSession = connect(
    null,
    mapDispatchToProps
  )(WithVideoPlaybackSession);

  function forwardRef(props, ref) {
    return <ConnectedWithVideoPlaybackSession {...props} forwardedRef={ref} />;
  }

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `WithVideoPlaybackSession(${name})`;

  return React.forwardRef(forwardRef);
};
