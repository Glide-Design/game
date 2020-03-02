import {
  flow,
  set,
  unset,
  merge,
  map,
  keyBy,
  get,
  getOr,
  pick,
  mapValues,
  uniq,
  concat,
  keys,
  omit,
  first,
  filter,
  reject,
  compact,
  flatten,
  values,
  union,
  includes,
} from 'lodash/fp';
import { FETCH_SEARCH_SUCCESS } from 'xi-core/search/actions';
import { FETCH_STAR_SUCCESS } from '../stars/actions';
import { CONFIG_SUCCESS } from '../config/actions';
import {
  CONTENT_LIKE_REQUEST,
  CONTENT_LIKE_FAILURE,
  CONTENT_UNLIKE_REQUEST,
  CONTENT_UNLIKE_FAILURE,
} from '../member/actions';
import { CONTENT_COMMENT_SUCCESS, REPLY_TO_COMMENT_SUCCESS } from '../comments/actions';
import { CARD_DATA_RECEIVED } from './cards/actions';
import {
  FETCH_CONTENT_ITEM_SUCCESS,
  FETCH_SECTION_REQUEST,
  FETCH_SECTION_SUCCESS,
  FETCH_TEMPLATE_SECTIONS_REQUEST,
  FETCH_TEMPLATE_SECTIONS_SUCCESS,
  FETCH_SECTION_SECTIONS_SUCCESS,
  FETCH_RELATED_CONTENT_SUCCESS,
  FETCH_SERIES_SEASON_EPISODES_SUCCESS,
  FETCH_CONTENT_ENTITLEMENT_SUCCESS,
  FETCH_ARTICLE_DATA_SUCCESS,
  FETCH_SECTION_ITEMS_SUCCESS,
} from './actions';

const ALLOWED_LANGUAGES = ['en', 'pt', 'es'];

const getContributors = flow(
  get('contentContributors'),
  map('starExternalId')
);

const getPublisherId = flow(
  get('contentContributors'),
  filter('publisher'),
  map('starExternalId'),
  first
);

export const transformAPIContentItemResponse = contentItem =>
  flow(
    set('publisherId', getPublisherId(contentItem)),
    set('contributors', getContributors(contentItem)),
    omit('contentContributors')
  )(contentItem);

const wrapInArray = x => [x];

const getSubtitlesForVideoPlayer = additionalTracks =>
  flow(
    map(pick(['url', 'language'])),
    map(t => ({
      src: t.url,
      srclang: t.language,
      kind: 'subtitles',
      label: t.language,
    })),
    filter(track => includes(track.srclang, ALLOWED_LANGUAGES))
  )(additionalTracks);

export const byId = (state = {}, action) => {
  let contentItem;
  let newContentItem;
  switch (action.type) {
    case FETCH_ARTICLE_DATA_SUCCESS:
      return set(`${action.contentId}.article`, action.article, state);
    case CARD_DATA_RECEIVED:
      return set(`${action.contentId}.animationData`, action.animationData, state);
    case FETCH_CONTENT_ITEM_SUCCESS:
      return flow(
        get('contentItem'),
        wrapInArray,
        keyBy('externalId'),
        mapValues(transformAPIContentItemResponse),
        merge(state)
      )(action);

    case FETCH_CONTENT_ENTITLEMENT_SUCCESS:
      return flow(
        set(`${action.contentId}.media`, action.media),
        set(`${action.contentId}.advertisingUrl`, 'https://placeholderurl.otro'), //Setting placeholder value here to keep videojsPlayer happy. Will be removed when videojs is used
        set(`${action.contentId}.inventoryType`, action.inventoryType),
        set(`${action.contentId}.isFree`, action.isFree),
        set(`${action.contentId}.giftAllowed`, action.giftAllowed),
        set(`${action.contentId}.subtitles`, getSubtitlesForVideoPlayer(action.additionalTracks))
      )(state);

    case FETCH_RELATED_CONTENT_SUCCESS:
    case FETCH_SERIES_SEASON_EPISODES_SUCCESS:
      return flow(
        get('response.content'),
        keyBy('externalId'),
        mapValues(transformAPIContentItemResponse),
        merge(state)
      )(action);

    case CONFIG_SUCCESS:
      return {};

    case FETCH_SECTION_ITEMS_SUCCESS:
      return flow(
        get('section.content'),
        keyBy('externalId'),
        mapValues(transformAPIContentItemResponse),
        merge(state)
      )(action);

    case FETCH_SEARCH_SUCCESS:
      return flow(
        get('searchResults'),
        pick(['socialList', 'videoList', 'articleList', 'competitionList', 'q&aList']),
        values,
        flatten,
        keyBy('externalId'),
        mapValues(transformAPIContentItemResponse),
        merge(state)
      )(action);

    case CONTENT_LIKE_REQUEST:
    case CONTENT_UNLIKE_FAILURE:
      contentItem = get(`${action.contentId}`, state);
      newContentItem = { ...contentItem, likes: (contentItem.likes || 0) + 1 };
      return set(`${action.contentId}`, newContentItem, state);

    case CONTENT_LIKE_FAILURE:
    case CONTENT_UNLIKE_REQUEST:
      contentItem = get(`${action.contentId}`, state);
      newContentItem = { ...contentItem, likes: contentItem.likes - 1 };
      return set(`${action.contentId}`, newContentItem, state);

    case CONTENT_COMMENT_SUCCESS:
    case REPLY_TO_COMMENT_SUCCESS:
      contentItem = get(`${action.contentId}`, state);
      return set(`${action.contentId}.comments`, contentItem.comments + 1, state);

    default:
      return state;
  }
};

const transformAPISectionResponse = section =>
  flow(
    pick([
      'name',
      'description',
      'hasChildren',
      'theme',
      'externalId',
      'creatives',
      'default',
      'galleries',
      'ctaText',
      'contentExternalId',
      'indexPageExternalId',
    ])
  )(section);

const getSectionsFromAPIResponse = flow(
  get('response.content'),
  keyBy('externalId'),
  mapValues(transformAPISectionResponse)
);

export const sections = (state = { _fetching: {} }, action) => {
  switch (action.type) {
    case FETCH_SECTION_REQUEST:
      return set(['_fetching', action.sectionId], true, state);

    case FETCH_SECTION_SUCCESS: {
      const section = transformAPISectionResponse(action.section);
      return flow(
        unset(['_fetching', action.sectionId]),
        set(action.sectionId, section)
      )(state);
    }

    case CONFIG_SUCCESS:
      return [];

    case FETCH_TEMPLATE_SECTIONS_SUCCESS: {
      const newSections = getSectionsFromAPIResponse(action);
      let newState = merge(state, newSections);
      return newState;
    }

    case FETCH_SECTION_SECTIONS_SUCCESS: {
      const newSections = getSectionsFromAPIResponse(action);

      return flow(
        set(`${action.sectionId}.sections`, keys(newSections)),
        merge(newSections)
      )(state);
    }

    case FETCH_STAR_SUCCESS: {
      return flow(
        get('starSections'),
        keyBy('externalId'),
        mapValues(s => transformAPISectionResponse(s)),
        merge(state)
      )(get('response', action));
    }

    case FETCH_SECTION_ITEMS_SUCCESS:
      const oldData = action.replaceOldData ? [] : get(`${action.sectionId}.content`, state);
      const content = flow(
        get('section.content'),
        map('externalId'),
        concat(oldData),
        compact,
        uniq
      )(action);

      return set(`${action.sectionId}.content`, content, state);

    default:
      return state;
  }
};

export const pages = (state = { _fetching: {} }, action) => {
  switch (action.type) {
    case FETCH_TEMPLATE_SECTIONS_REQUEST:
      return set(['_fetching', action.templateId], true, state);

    case FETCH_TEMPLATE_SECTIONS_SUCCESS: {
      const sections = flow(
        get('response.content'),
        map('externalId')
      )(action);

      return set(action.templateId, { sections }, state);
    }

    default:
      return state;
  }
};

export const related = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RELATED_CONTENT_SUCCESS: {
      const currentIds = get(`${action.contentId}`)(state);

      const newIds = flow(
        get('response.content'),
        map('externalId')
      )(action);

      return set(action.contentId, union(newIds, currentIds), state);
    }

    default:
      return state;
  }
};

export const series = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTENT_ITEM_SUCCESS:
      return flow(
        get('contentItem.episodic'),
        wrapInArray,
        reject(item => !item),
        keyBy('seriesExternalId'),
        mapValues(item => [get('seasonExternalId', item)]),
        merge(state)
      )(action);
    case FETCH_SERIES_SEASON_EPISODES_SUCCESS: {
      return set(action.seriesId, merge(state[action.seriesId], [action.seasonId]), state);
    }

    default:
      return state;
  }
};

export const seasons = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTENT_ITEM_SUCCESS:
      const seasonId = get('contentItem.episodic.seasonExternalId', action);
      if (!seasonId) {
        return state;
      }
      const contentIds = flow(
        get('contentItem.externalId'),
        concat(getOr([], seasonId, state)),
        uniq
      )(action);
      return merge(state, { [seasonId]: contentIds });

    case FETCH_SERIES_SEASON_EPISODES_SUCCESS: {
      let contentArrayIds = flow(
        get('response.content'),
        map('externalId')
      )(action);

      return set(action.seasonId, contentArrayIds, state);
    }

    default:
      return state;
  }
};
