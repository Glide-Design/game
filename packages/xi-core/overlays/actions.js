import { first } from 'lodash/fp';
import { openComments } from 'xi-core/comments/actions';
// import { showPurchaseWizard } from 'xi-core/purchases/actions';
import { showAuthWizard } from 'xi-core/signup/actions';
import { PUSH_OVERLAY_QUEUE, SHIFT_OVERLAY_QUEUE } from './constants';

export const pushOverlayQueue = overlayDetails => async dispatch =>
  await dispatch({ type: PUSH_OVERLAY_QUEUE, overlayDetails });

export const shiftOverlayQueue = history => (dispatch, getState) => {
  const queue = getState().overlayQueue;
  const action = first(queue);
  if (action) {
    dispatch({ type: SHIFT_OVERLAY_QUEUE });
    if (action.type === 'signup') {
      dispatch(showAuthWizard({ history }));
      // } else if (action.type === 'purchases') {
      //   dispatch(showPurchaseWizard({ history }));
    } else if (action.type === 'comments') {
      dispatch(openComments(action.contentId, history));
    }
  }
};
