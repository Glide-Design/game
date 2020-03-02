import { flow, merge, set, get } from 'lodash/fp';
import { APP_LOADED } from '../app/actions';
import { CONFIG_SUCCESS } from './actions';

export const config = (state = { loaded: false }, action) => {
  switch (action.type) {
    case APP_LOADED:
      return { ...state, externalLinks: action.externalLinks };
    case CONFIG_SUCCESS:
      return flow(
        get('config'),
        merge(state),
        set('loaded', true)
      )(action);
    default:
      return state;
  }
};
