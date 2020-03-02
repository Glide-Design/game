import { SET_LOCALE } from '../locale/actions';
import { FETCH_PRODUCTS_SUCCESS } from './actions';

const defaultState = [];

export const products = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return [...action.offers];
    // removed because logging in and trying to show products at the same time caused a race
    // case SET_LOCALE:
    //   return defaultState;
    default:
      return state;
  }
};
