import { partition } from 'lodash/fp';

import {
  dispatchVideoPlaybackStarted,
  dispatchVideoPlaybackEnded,
  dispatchVideoPlaybackProgress,
  dispatchVideoPlaybackPaused,
  dispatchVideoPlaybackResumed,
} from './actions';

const progressPercentagesOfInterest = [0.25, 0.5, 0.75, 0.95];
const PlayerStates = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
};

export default class VideoPlaybackSession {
  state = null;
  pauseStartTime = null;
  unrecordedPercentages = progressPercentagesOfInterest.slice();
  totalTimeSpentPausedInMs = 0;

  constructor(dispatch, contentId, customProgressHandler) {
    this.dispatch = dispatch;
    this.contentId = contentId;
    this.customProgressHandler = customProgressHandler;
  }

  play(playheadTime) {
    if (!this.hasRecordedPlaybackStarted) {
      this.dispatch(dispatchVideoPlaybackStarted(this.contentId));
      this.hasRecordedPlaybackStarted = true;
    }

    if (this.state === PlayerStates.PAUSED) {
      const pauseDurationInMs = Date.now() - this.pauseStartTime;
      this.totalTimeSpentPausedInMs += pauseDurationInMs;
      this.pauseStartTime = 0;
      this.dispatch(
        dispatchVideoPlaybackResumed(this.contentId, playheadTime, pauseDurationInMs / 1000)
      );
    }

    this.state = PlayerStates.PLAYING;
  }

  pause(playheadTime) {
    if (!this.pauseStartTime) {
      this.pauseStartTime = Date.now();
    }

    this.dispatch(dispatchVideoPlaybackPaused(this.contentId, playheadTime));

    this.state = PlayerStates.PAUSED;
  }

  progress({ isAdvert, currentTime, duration }) {
    if (isAdvert) {
      return;
    }

    const { customProgressHandler } = this;

    const currentPercentage = currentTime / duration;

    const [percentagesToRecord, percentagesToRetainForLater] = partition(
      percentageOfInterest => currentPercentage >= percentageOfInterest,
      this.unrecordedPercentages
    );

    if (!percentagesToRecord) {
      return;
    }

    percentagesToRecord.forEach(percentage => {
      this.dispatch(dispatchVideoPlaybackProgress(this.contentId, percentage));
      if(customProgressHandler) {
        customProgressHandler(percentage);
      }
    });

    this.unrecordedPercentages = percentagesToRetainForLater;
  }

  end() {
    this.dispatch(dispatchVideoPlaybackEnded(this.contentId, this.totalTimeSpentPausedInMs / 1000));
  }
}
