import { set } from 'lodash/fp';
import {
    SET_VIDEO_RESUME_POINTS,
    REMOVE_RESUME_POINTS,
} from './actions';

const defaultState = {
    resumePoints: {},
};

export const videos = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VIDEO_RESUME_POINTS:
            return set('resumePoints', action.resumePoints, state);
        case REMOVE_RESUME_POINTS:
            return set('resumePoints', {}, state);
        default:
            return state;
    }
};
