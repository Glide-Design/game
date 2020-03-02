import {
  flow,
  concat,
  slice,
  uniqWith,
  compact,
  filter,
  omit,
  flatten,
  flatMap,
  map,
} from 'lodash/fp';
import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { setItem, getItem, removeItem } from '../storageMiddleware';
import { CONTENT_CONTRIBUTORS } from '../content/actions';

export const FETCH_SEARCH_REQUEST = 'search/FETCH_SEARCH_REQUEST';
export const FETCH_SEARCH_SUCCESS = 'search/FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'search/FETCH_SEARCH_FAILURE';

export const SAVE_RECENT_SEARCH = 'search/SAVE_RECENT_SEARCH';
export const SET_RECENT_SEARCHES = 'search/SET_RECENT_SEARCHES';
export const CLEAR_RECENT_SEARCHES = 'search/CLEAR_RECENT_SEARCHES';
export const REMOVE_RECENT_SEARCH = 'search/REMOVE_RECENT_SEARCH';

const RECENT_SEARCHES_KEY = 'recent-searches';
const MAX_NUMBER_OF_RECENT_SEARCHES = 8;

const getRecentSearches = () => async dispatch => {
  try {
    const json = await dispatch(getItem(RECENT_SEARCHES_KEY));
    return json != null && json.length > 0 ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const loadFromStorage = () => async dispatch => {
  const recentSearches = await dispatch(getRecentSearches());
  dispatch({ type: SET_RECENT_SEARCHES, recentSearches });
};

export const resultClicked = result => async dispatch => {
  const recentSearchesFromStorage = await dispatch(getRecentSearches());

  const recentSearches = flow(
    concat(result),
    compact,
    uniqWith((arrVal, othVal) =>
      arrVal.starId ? arrVal.starId === othVal.starId : arrVal.externalId === othVal.externalId
    ),
    slice(0, MAX_NUMBER_OF_RECENT_SEARCHES)
  )(recentSearchesFromStorage);

  await dispatch(setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches)));
  dispatch({ type: SET_RECENT_SEARCHES, recentSearches });
};

export const clearRecent = () => async dispatch => {
  await dispatch(removeItem(RECENT_SEARCHES_KEY));
  dispatch({ type: CLEAR_RECENT_SEARCHES });
};

export const removeRecent = result => async dispatch => {
  dispatch({ type: REMOVE_RECENT_SEARCH, result });

  const recentSearchesFromStorage = await dispatch(getRecentSearches());
  const resultExternalId = result.externalId || result.starId;
  const recentSearches = filter(
    r => r.externalId !== resultExternalId && r.starId !== resultExternalId
  )(recentSearchesFromStorage);

  await dispatch(setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches)));
  dispatch({ type: SET_RECENT_SEARCHES, recentSearches });
};

export const search = searchTerm => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_SEARCH_REQUEST, searchTerm });
  try {
    const { data: { results: searchResults = {} } = {} } = await dispatch(
      fetch(`${ep(state)('search')}?q=${searchTerm}`)
    );

    dispatch({
      type: FETCH_SEARCH_SUCCESS,
      searchResults,
      stars: searchResults.starList,
      searchTerm,
    });

    // Search results are coming through with unpredicatable contentContributor data
    // so ignore it until better understood
    // const contributors = flow(
    //   omit('starList'),
    //   map(v => v),
    //   flatten,
    //   flatMap('contentContributors'),
    // )(searchResults);
    // dispatch({ type: CONTENT_CONTRIBUTORS, contributors });
  } catch (error) {
    dispatch({ type: FETCH_SEARCH_FAILURE, error });
  }
};
