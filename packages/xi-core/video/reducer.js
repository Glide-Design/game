import { set } from 'lodash/fp';
import { SET_VIDEO_RESUME_POINTS, REMOVE_RESUME_POINTS, SET_VIDEO_ELLAPSED_TIME } from './actions';

const defaultState = {
  resumePoints: {},
  ellapsedTimes: {},
};

export const videos = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VIDEO_RESUME_POINTS:
      return set('resumePoints', action.resumePoints, state);
    case REMOVE_RESUME_POINTS:
      return set('resumePoints', {}, state);
    case SET_VIDEO_ELLAPSED_TIME:
      return set(`ellapsedTimes.${action.contentId}`, { ellapsed: action.ellapsedTime }, state);
    default:
      return state;
  }
};
