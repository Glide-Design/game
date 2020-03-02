import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { setResumePointToStorage, removeResumePoint } from 'xi-core/video/actions';
import { getVideoProgressByContentId } from 'xi-core/video/selectors';

const SAVE_CURRENT_TIME_INTERVAL = 4;

export default WrappedComponent => {
  class withVideoResume extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startTime: 0.0,
      };
    }

    lastSavedTimeInstance = 0.0;
    videoResumePoint = 0.0;

    componentDidUpdate = prevProps => {
      const { contentId: prevContentId } = prevProps;
      const { contentId } = this.props;

      if (!prevContentId || contentId !== prevContentId) {
        this.lastSavedTimeInstance = 0.0;
        this.setState({ startTime: 0.0 });
        this.setVideoResumePoint();
      }
    };

    setVideoResumePoint = () => {
      this.videoResumePoint = this.props.videoResumePoint;
    };

    reloadVideoResume = () => {
      const { removeResumePoint, contentId } = this.props;
      removeResumePoint(contentId);
      this.setState({ startTime: 0.0 });
      this.lastSavedTimeInstance = 0.0;
      this.videoResumePoint = 0.0;
    };

    handleProgress = e => {
      const { setResumePoint, contentId } = this.props;
      const { startTime } = this.state;

      if (e.isAdvert) {
        return;
      }

      if (Math.abs(e.currentTime - this.lastSavedTimeInstance) >= SAVE_CURRENT_TIME_INTERVAL) {
        this.lastSavedTimeInstance = e.currentTime;
        setResumePoint(contentId, this.lastSavedTimeInstance, e.duration);
      }

      if (!startTime && this.videoResumePoint) {
        this.setState({ startTime: this.videoResumePoint });
      }
    };

    render() {
      const { startTime } = this.state;
      const { ...passThroughProps } = this.props;
      const injectedProps = {
        reloadVideoResume: this.reloadVideoResume,
        handleProgress: this.handleProgress,
        setVideoResumePoint: this.setVideoResumePoint,
        startTime,
      };

      return <WrappedComponent {...injectedProps} {...passThroughProps} />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      contentId: ownProps.contentId,
      videoResumePoint: getVideoProgressByContentId(state)(ownProps.contentId),
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setResumePoint: (contentId, currentTime, videoDuration) =>
        dispatch(setResumePointToStorage(contentId, currentTime, videoDuration)),
      removeResumePoint: contentId => dispatch(removeResumePoint(contentId)),
    };
  };

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withVideoResume);
};
