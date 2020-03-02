import { set, map, flow, get, filter } from 'lodash/fp';
import {
  SET_RECENT_SEARCHES,
  CLEAR_RECENT_SEARCHES,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_SUCCESS,
} from './actions';

const defaultState = {
  isLoading: false,
  prevSearchTerm: '',
  results: {
    video: [],
    social: [],
    article: [],
    star: [],
  },
  recentSearches: [],
};

const extractIdsFromAction = key =>
  flow(
    get(`searchResults.${key}List`),
    filter(item => item.externalId),
    map('externalId')
  );

export const search = (state = defaultState, action) => {
  switch (action.type) {
    case SET_RECENT_SEARCHES:
      return set('recentSearches', action.recentSearches, state);
    case CLEAR_RECENT_SEARCHES:
      return set('recentSearches', [], state);
    case FETCH_SEARCH_REQUEST:
      return flow(
        set('isLoading', true),
        set('prevSearchTerm', action.searchTerm)
      )(state);
    case FETCH_SEARCH_FAILURE:
      return flow(
        set('isLoading', false),
        set('prevSearchTerm', '')
      )(state);
    case FETCH_SEARCH_SUCCESS:
      return flow(
        set('isLoading', false),
        set('results.article', extractIdsFromAction('article')(action)),
        set('results.video', extractIdsFromAction('video')(action)),
        set('results.star', extractIdsFromAction('star')(action)),
        set('results.social', extractIdsFromAction('social')(action)),
        set('results.competition', extractIdsFromAction('competition')(action)),
        set('results.q&a', extractIdsFromAction('q&a')(action))
      )(state);
    default:
      return state;
  }
};
