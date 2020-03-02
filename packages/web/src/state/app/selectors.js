import { get } from 'lodash/fp';

export const getTargetDevice = state => get('viewport.targetDevice', state);

export const getOrientation = state => get('viewport.orientation', state);

export const getViewportWidth = state => get('viewport.width', state);

export const getViewportHeight = state => get('viewport.height', state);
