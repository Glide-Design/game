import {
  flow,
  get,
  keyBy,
  mapValues,
  merge,
  pick,
  set,
  unset,
  map,
  filter,
  first,
  getOr,
  lowerCase,
  identity,
} from 'lodash/fp';
import { LOGOUT_SUCCESS } from '../member/actions';
// import { CONTENT_CONTRIBUTORS } from '../content/actions';
import { FETCH_SEARCH_SUCCESS } from '../search/actions';
import { CONFIG_SUCCESS } from '../config/actions';
import {
  FETCH_MEMBER_FOLLOWING_SUCCESS,
  FETCH_STARS_SUCCESS,
  FOLLOW_STAR_FAILURE,
  FOLLOW_STAR_REQUEST,
  FETCH_STAR_SUCCESS,
  MAP_STAR,
} from './actions';

const pickAttributes = pick([
  'starId',
  'avatar',
  'forename',
  'surname',
  'starType',
  'creatives',
  'headlineCreatives',
  'displayName',
  'bio',
  'order',
  'seoCode',
]);

const mapValuesWithKey = map.convert({ cap: false });
const addIndex = (item, i) => ({ ...item, order: i });

const getCreativesGroupFromStar = usage =>
  flow(
    get('mediaGroup'),
    filter({ usage }),
    first,
    get('creatives')
  );

const normalizeStar = flow(
  mapValues(star => set('starId', star.externalId, star)),
  mapValues(star => set('avatar', star.avatarUrl, star)),
  mapValues(star =>
    set('bio', { blurb: star.bio, creatives: getCreativesGroupFromStar('BIO')(star) }, star)
  ),
  mapValues(star => set('headlineCreatives', getCreativesGroupFromStar('PROFILE')(star), star))
);

// const getContentContributors = contributors =>
//   flow(
//     keyBy('starExternalId'),
//     mapValues(star => set('starId', star.starExternalId, star)),
//     mapValues(pickAttributes)
//   )(contributors);

export const stars = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEMBER_FOLLOWING_SUCCESS:
      return flow(
        keyBy(externalId => externalId),
        mapValues(() => ({ following: true })),
        merge(state)
      )(get('response', action));

    case FETCH_SEARCH_SUCCESS:
    case FETCH_STARS_SUCCESS:
      return flow(
        action.type === FETCH_STARS_SUCCESS ? mapValuesWithKey(addIndex) : identity,
        keyBy('externalId'),
        normalizeStar,
        mapValues(pickAttributes),
        merge(state)
      )(get('stars', action));

    case FOLLOW_STAR_REQUEST:
    case FOLLOW_STAR_FAILURE:
      return merge(state, { [action.starId]: { following: action.status } });

    // case CONTENT_CONTRIBUTORS:
    //   return flow(
    //     get('contributors'),
    //     getContentContributors,
    //     merge(state)
    //   )(action);

    case CONFIG_SUCCESS:
      return {};

    case FETCH_STAR_SUCCESS:
      const sectionIds = flow(
        get('starSections'),
        map('externalId')
      )(get('response', action));

      return flow(
        keyBy('externalId'),
        normalizeStar,
        mapValues(pickAttributes),
        mapValues(star => set('sections', sectionIds, star)),
        merge(state)
      )([get('response', action)]);

    case LOGOUT_SUCCESS:
      return mapValues(unset('following'), state);

    case MAP_STAR:
      let { externalId, starId } = action;

      let currentMap = getOr({}, 'starsmap', state);
      return set('starsmap', { ...currentMap, [lowerCase(starId)]: externalId }, state);

    default:
      return state;
  }
};
