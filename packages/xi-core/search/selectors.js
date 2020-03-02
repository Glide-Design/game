import { flow, get, map, isEmpty, compact } from 'lodash/fp';
import { getFormValues } from 'redux-form';
import { getContentItemById } from '../content/selectors';
import { getStarById } from '../stars/selectors';

export const getSearchTerm = flow(
  getFormValues('search'),
  get('searchTerm')
);

export const isSearchTermEmpty = flow(
  getSearchTerm,
  isEmpty
);

export const getIsLoading = state => get('search.isLoading', state);

export const hasSearchTermChangedFromLastResult = state =>
  getSearchTerm(state) !== get('search.prevSearchTerm', state);

const getSearchResultsByContentType = contentType => state =>
  flow(
    get(`search.results.${contentType}`),
    map(getContentItemById(state)),
    compact
  )(state);

export const getVideoSearchResults = getSearchResultsByContentType('video');
export const getSocialSearchResults = getSearchResultsByContentType('social');
export const getArticleSearchResults = getSearchResultsByContentType('article');
export const getCompetitionSearchResults = getSearchResultsByContentType('competition');
export const getQAndASearchResults = getSearchResultsByContentType('q&a');

export const getStarsSearchResults = state =>
  flow(
    get('search.results.star'),
    map(getStarById(state)),
    compact
  )(state);

export const getRecentSearches = state => get('search.recentSearches', state);
