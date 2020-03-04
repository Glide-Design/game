import { flow, set } from 'lodash/fp';
import { setItem, getItem, removeItem } from '../storageMiddleware';

export const VIDEO_PLAYBACK_STARTED = 'VIDEO_PLAYBACK_STARTED';
export const VIDEO_PLAYBACK_PAUSED = 'VIDEO_PLAYBACK_PAUSED';

export const VIDEO_PLAYBACK_RESUMED = 'VIDEO_PLAYBACK_RESUMED';
export const VIDEO_PLAYBACK_ENDED = 'VIDEO_PLAYBACK_ENDED';
export const VIDEO_PLAYBACK_PROGRESS = 'VIDEO_PLAYBACK_PROGRESS';

export const SET_VIDEO_RESUME_POINTS = 'SET_VIDEO_RESUME_POINTS';
export const REMOVE_RESUME_POINTS = 'REMOVE_VIDEO_RESUME_POINTS';

export const SET_VIDEO_ELLAPSED_TIME = 'SET_VIDEO_ELLAPSED_TIME';
export const REMOVE_VIDEO_ELLAPSED_TIME = 'REMOVE_VIDEO_ELLAPSED_TIME';

const VIDEOS_RESUME_POINT_KEYS = 'videos-resume-point';

export const dispatchVideoPlaybackStarted = contentId => ({
  type: VIDEO_PLAYBACK_STARTED,
  contentId,
});

export const dispatchVideoPlaybackPaused = (contentId, currentTime) => ({
  type: VIDEO_PLAYBACK_PAUSED,
  contentId,
  currentTime,
});

export const dispatchVideoPlaybackResumed = (contentId, currentTime, pauseDuration) => ({
  type: VIDEO_PLAYBACK_RESUMED,
  contentId,
  currentTime,
  pauseDuration,
});

export const dispatchVideoPlaybackEnded = (contentId, totalTimeSpentPaused) => ({
  type: VIDEO_PLAYBACK_ENDED,
  contentId,
  totalTimeSpentPaused,
});

export const dispatchVideoPlaybackProgress = (contentId, progress) => ({
  type: VIDEO_PLAYBACK_PROGRESS,
  contentId,
  progress,
});

const getVideosResumePoints = () => async dispatch => {
  try {
    const json = await dispatch(getItem(VIDEOS_RESUME_POINT_KEYS));
    return json != null && json.length > 0 ? JSON.parse(json) : {};
  } catch (e) {
    return {};
  }
};

export const loadResumePoints = () => async dispatch => {
  const resumePoints = await dispatch(getVideosResumePoints());
  dispatch({ type: SET_VIDEO_RESUME_POINTS, resumePoints });
};

export const setResumePointToStorage = (contentId, progress, duration) => async dispatch => {
  const resumePointsFromStorage = await dispatch(getVideosResumePoints());

  const resumePoints = flow(set(contentId, { duration, progress, watched: false }))(
    resumePointsFromStorage
  );

  await dispatch(setItem(VIDEOS_RESUME_POINT_KEYS, JSON.stringify(resumePoints)));
  dispatch({ type: SET_VIDEO_RESUME_POINTS, resumePoints });
};

export const removeAllResumePoints = () => async dispatch => {
  await dispatch(removeItem(VIDEOS_RESUME_POINT_KEYS));
  dispatch({ type: REMOVE_RESUME_POINTS });
};

export const removeResumePoint = contentId => async dispatch => {
  const resumePointsFromStorage = await dispatch(getVideosResumePoints());

  const resumePoints = flow(set(contentId, { watched: true }))(resumePointsFromStorage);

  await dispatch(setItem(VIDEOS_RESUME_POINT_KEYS, JSON.stringify(resumePoints)));
  dispatch({ type: SET_VIDEO_RESUME_POINTS, resumePoints });
};

export const setVideoEllapsedTime = (contentId, ellapsedTime) => async dispatch => {
  dispatch({ type: SET_VIDEO_ELLAPSED_TIME, ellapsedTime, contentId });
};
