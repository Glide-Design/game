import { concat } from 'lodash/fp';
import { NAVIGATION_CHANGE } from 'xi-core/app/actions';
import { VIEWPORT_RESIZED } from 'xi-core/app/actions';
import { PUSH_OVERLAY_QUEUE, SHIFT_OVERLAY_QUEUE } from 'xi-core/overlays/constants';
import { getViewportDetails } from '../../common/dimensions';

export const viewport = (state = getViewportDetails(), action) => {
  switch (action.type) {
    case VIEWPORT_RESIZED:
      return getViewportDetails();
    default:
      return state;
  }
};

export const overlayQueue = (state = [], action) => {
  switch (action.type) {
    case PUSH_OVERLAY_QUEUE:
      return concat(state, action.overlayDetails);
    case SHIFT_OVERLAY_QUEUE:
      return state.slice(1);
    default:
      return state;
  }
};

export const locationInfo = (state, action) => {
  state = state || {
    pristine: true,
    entryPoint: document.referrer || window.location.href,
    referrerPath: document.referrer || window.location.href,
    // document.location is avoided for cross-browser compatibility
    actualPath: window.location.href,
  };

  switch (action.type) {
    case NAVIGATION_CHANGE:
      const prevPathname = action.prevLocation.pathname;
      const { pathname } = action.nextLocation;
      const { origin } = window.location;

      return {
        ...state,
        pristine: false,
        referrerPath: origin + prevPathname,
        actualPath: origin + pathname,
      };
    default:
      return state;
  }
};
