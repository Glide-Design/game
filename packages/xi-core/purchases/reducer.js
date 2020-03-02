import { unset, flow, set, get } from 'lodash/fp';
import { SAVE_PURCHASES_SUCCESS } from 'xi-core/products/actions';
import { NAVIGATION_CHANGE, NAVIGATION_LOADED } from 'xi-core/app/actions';
import { TOGGLE_JOIN_NOW_BANNER } from './actions';
import {
  FETCH_STRIPE_TOKEN_REQUEST,
  FETCH_STRIPE_TOKEN_SUCCESS,
  FETCH_STRIPE_TOKEN_FAILURE,
} from './constants';

export const purchases = (state = { step: null, isJoinNowBannerVisible: true }, action) => {
  const step = get('purchaseWizardStep', action.historyState);
  const duringCreation = get('duringCreation', action.historyState);

  switch (action.type) {
    case SAVE_PURCHASES_SUCCESS:
      return unset('stripeToken', state);
    case TOGGLE_JOIN_NOW_BANNER:
      return { ...state, isJoinNowBannerVisible: action.visible };
    case FETCH_STRIPE_TOKEN_REQUEST:
      return flow(
        unset('stripeError'),
        set('fetchingStripeToken', true)
      )(state);
    case FETCH_STRIPE_TOKEN_FAILURE:
      return flow(
        unset('fetchingStripeToken'),
        unset('stripeToken'),
        set('stripeError', action.message)
      )(state);
    case FETCH_STRIPE_TOKEN_SUCCESS:
      return flow(
        unset('fetchingStripeToken'),
        set('stripeToken', action.token)
      )(state);
    case NAVIGATION_LOADED:
      if (step) {
        return { ...state, step, duringCreation };
      }
      return state;
    case NAVIGATION_CHANGE:
      return { ...state, step, duringCreation };
    default:
      return state;
  }
};
