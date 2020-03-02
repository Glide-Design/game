import { get, getOr, flow, values, filter, orderBy, map, find, compact } from 'lodash/fp';
import { getSectionById } from '../content/selectors';
import starTypes from './starTypes';

const getAllStars = state => values(get('stars', state));

export const TRANSPARENT_IMG_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export const getFollowableStars = state =>
  flow(
    getAllStars,
    values,
    filter({ starType: starTypes.Footballer }),
    orderBy('order', 'ASC')
  )(state);

export const getFollowedStarIds = state => map('starId', getFollowedStars(state));

const getFollowedStars = state =>
  flow(
    getFollowableStars,
    filter(s => s.following)
  )(state);

export const getStarByAlias = state => starId => {
  let map = getOr({}, 'stars.starsmap', state);
  if (map[starId]) {
    starId = map[starId];
  }
  return starId;
};

export const getStarById = state => starId => {
  starId = getStarByAlias(state)(starId);
  return get(`stars.${starId}`, state);
};

export const getStarAvatarUrl = state => starId => get(`stars.${starId}.avatar`, state);

export const getStarName = state => _starId => {
  const starId = getStarByAlias(state)(_starId) || _starId;
  const { displayName, forename, surname } = getOr({}, `stars.${starId}`, state);
  if (displayName || (forename && surname)) {
    return displayName || `${forename} ${surname}`;
  }
  return '';
};

export const getStarNames = state => starIds => {
  const getStarNameById = getStarName(state);
  const starNames = starIds.map(getStarNameById);
  return compact(starNames);
};

export const getSectionIdsForStarId = state => starId => get(`stars.${starId}.sections`, state);

export const getDefaultSectionIdForStarId = state => starId =>
  flow(
    getSectionIdsForStarId(state),
    find(sectionId => get('default', getSectionById(state)(sectionId)))
  )(starId);

export const isFollowingStar = state =>
  flow(
    getStarById(state),
    get('following')
  );
