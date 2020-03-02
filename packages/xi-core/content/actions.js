import { get, flow, flatMap } from 'lodash/fp';
import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { getContentUrl } from './selectors';

export const FETCH_CONTENT_ITEM_REQUEST = 'FETCH_CONTENT_ITEM_REQUEST';
export const FETCH_CONTENT_ITEM_SUCCESS = 'FETCH_CONTENT_ITEM_SUCCESS';

export const OPEN_JOIN_DIALOG_REQUEST = 'OPEN_JOIN_DIALOG_REQUEST';
export const CLOSE_JOIN_DIALOG_REQUEST = 'CLOSE_JOIN_DIALOG_REQUEST';

export const CONTENT_CONTRIBUTORS = 'CONTENT_CONTRIBUTORS';

export const fetchContentItem = (id, passedinQueryParams = {}) => async (dispatch, getState) => {
  dispatch({ type: FETCH_CONTENT_ITEM_REQUEST });

  const state = getState();

  const queryParams = Object.keys(passedinQueryParams)
    .map(k => `${k}=${passedinQueryParams[k]}`)
    .join('&');

  const endPoint = ep(state)('fetchContentItem', { id });
  const { data: contentItem } = await dispatch(fetch(`${endPoint}?${queryParams}`));

  dispatch({ type: FETCH_CONTENT_ITEM_SUCCESS, contentItem });

  const contributors = get('contentContributors', contentItem);
  dispatch({ type: CONTENT_CONTRIBUTORS, contributors });
};

export const FETCH_CONTENT_ENTITLEMENT_REQUEST = 'FETCH_CONTENT_ENTITLEMENT_REQUEST';
export const FETCH_CONTENT_ENTITLEMENT_SUCCESS = 'FETCH_CONTENT_ENTITLEMENT_SUCCESS';

export const fetchContentEntitlement = (contentId, fromGuestPass = false) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_CONTENT_ENTITLEMENT_REQUEST });

  const state = getState();

  try {
    const { data: entitlement } = await dispatch(
      fetch(ep(state)('fetchContentEntitlement', { contentId }), {
        temporaryTokenFallback: fromGuestPass,
      })
    );

    const media = get('media', entitlement);
    const advertisingUrl = get('advertisingUrl', entitlement);
    const inventoryType = get('inventoryType', entitlement);
    const isFree = get('free', entitlement);
    const giftAllowed = get('giftAllowed', entitlement);
    const additionalTracks = get('additionalTracks', entitlement);

    if (!media) {
      throw new Error('called get streams but no stream returned');
    }

    dispatch({
      type: FETCH_CONTENT_ENTITLEMENT_SUCCESS,
      contentId,
      media,
      advertisingUrl,
      inventoryType,
      giftAllowed,
      isFree,
      additionalTracks,
    });
  } catch (e) {
    console.error(e);
  }
};

const FETCH_ARTICLE_DATA_REQUEST = 'FETCH_ARTICLE_DATA_REQUEST';
export const FETCH_ARTICLE_DATA_SUCCESS = 'FETCH_ARTICLE_DATA_SUCCESS';

export const fetchArticleData = contentId => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_ARTICLE_DATA_REQUEST,
      contentId,
    });

    const articleUrl = getContentUrl(getState())(contentId);
    const { data: articleData } = await dispatch(fetch(articleUrl));

    dispatch({
      type: FETCH_ARTICLE_DATA_SUCCESS,
      contentId,
      article: articleData.data,
    });
  } catch (e) {
    console.error(e);
  }
};

export const FETCH_TEMPLATE_SECTIONS_REQUEST = 'FETCH_TEMPLATE_SECTIONS_REQUEST';
export const FETCH_TEMPLATE_SECTIONS_SUCCESS = 'FETCH_TEMPLATE_SECTIONS_SUCCESS';
export const FETCH_TEMPLATE_SECTIONS_FAILURE = 'FETCH_TEMPLATE_SECTIONS_FAILURE';

export const fetchTemplateSections = templateId => async (dispatch, getState) => {
  dispatch({ type: FETCH_TEMPLATE_SECTIONS_REQUEST, templateId });

  const state = getState();

  try {
    const { data: response } = await dispatch(
      fetch(
        ep(state)('fetchTemplateSections', {
          templateId,
        })
      )
    );

    dispatch({ type: FETCH_TEMPLATE_SECTIONS_SUCCESS, templateId, response });
  } catch (e) {
    dispatch({ type: FETCH_TEMPLATE_SECTIONS_FAILURE, templateId });
  }
};

export const FETCH_SECTION_SECTIONS_REQUEST = 'FETCH_SECTION_SECTIONS_REQUEST';
export const FETCH_SECTION_SECTIONS_SUCCESS = 'FETCH_SECTION_SECTIONS_SUCCESS';
export const FETCH_SECTION_SECTIONS_FAILURE = 'FETCH_SECTION_SECTIONS_FAILURE';

export const fetchSectionSections = sectionId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_SECTION_SECTIONS_REQUEST, sectionId });

  try {
    const { data: response } = await dispatch(
      fetch(ep(state)('fetchSectionSections', { sectionId }))
    );

    dispatch({
      type: FETCH_SECTION_SECTIONS_SUCCESS,
      sectionId,
      response,
    });
  } catch (e) {
    dispatch({ type: FETCH_SECTION_SECTIONS_FAILURE, sectionId });
  }
};

export const FETCH_SECTION_REQUEST = 'FETCH_SECTION_REQUEST';
export const FETCH_SECTION_SUCCESS = 'FETCH_SECTION_SUCCESS';
export const FETCH_SECTION_FAILURE = 'FETCH_SECTION_FAILURE';

export const fetchSection = sectionId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_SECTION_REQUEST, sectionId });

  try {
    const { data: section } = await dispatch(fetch(ep(state)('fetchSection', { sectionId })));

    dispatch({ type: FETCH_SECTION_SUCCESS, section, sectionId });
  } catch (e) {
    dispatch({ type: FETCH_SECTION_FAILURE, sectionId });
  }
};

export const FETCH_SECTION_ITEMS_REQUEST = 'FETCH_SECTION_ITEMS_REQUEST';
export const FETCH_SECTION_ITEMS_SUCCESS = 'FETCH_SECTION_ITEMS_SUCCESS';
export const FETCH_SECTION_ITEMS_FAILURE = 'FETCH_SECTION_ITEMS_FAILURE';

export const fetchSectionItems = (
  sectionId,
  passedinQueryParams = {},
  replaceOldData = false
) => async (dispatch, getState) => {
  dispatch({ type: FETCH_SECTION_ITEMS_REQUEST, sectionId });

  if (replaceOldData && passedinQueryParams.page) {
    console.warn('fetchSectionItems passedinQueryParams.page is incompatible with replaceOldData');
  }

  const state = getState();

  const queryParams = Object.keys(passedinQueryParams)
    .map(k => `${k}=${passedinQueryParams[k]}`)
    .join('&');

  try {
    const endPoint = ep(state)('fetchSectionItems', { sectionId });
    const { data: section } = await dispatch(fetch(`${endPoint}?${queryParams}`));

    dispatch({
      type: FETCH_SECTION_ITEMS_SUCCESS,
      section,
      sectionId,
      totalElements: section.totalElements,
      page: section.number,
      replaceOldData,
    });

    const contributors = flow(
      get('content'),
      flatMap('contentContributors')
    )(section);
    dispatch({ type: CONTENT_CONTRIBUTORS, contributors });
  } catch (e) {
    dispatch({ type: FETCH_SECTION_ITEMS_FAILURE, sectionId });
  }
};

export const FETCH_RELATED_CONTENT_REQUEST = 'FETCH_RELATED_CONTENT_REQUEST';
export const FETCH_RELATED_CONTENT_SUCCESS = 'FETCH_RELATED_CONTENT_SUCCESS';
export const FETCH_RELATED_CONTENT_FAILURE = 'FETCH_RELATED_CONTENT_FAILURE';

export const fetchRelatedContentSection = (contentId, passedinQueryParams = {}) => async (
  dispatch,
  getState
) => {
  const state = getState();

  const queryParams = Object.keys(passedinQueryParams)
    .map(k => `${k}=${passedinQueryParams[k]}`)
    .join('&');

  dispatch({ type: FETCH_RELATED_CONTENT_REQUEST, contentId });

  try {
    const endPoint = ep(state)('fetchRelatedContentSection', { contentId });
    const { data: response } = await dispatch(fetch(`${endPoint}?${queryParams}`));

    dispatch({ type: FETCH_RELATED_CONTENT_SUCCESS, response, contentId });
  } catch (e) {
    dispatch({ type: FETCH_RELATED_CONTENT_FAILURE, contentId });
  }
};

export const FETCH_SERIES_SEASON_EPISODES_REQUEST = 'FETCH_SERIES_SEASON_EPISODES_REQUEST';
export const FETCH_SERIES_SEASON_EPISODES_SUCCESS = 'FETCH_SERIES_SEASON_EPISODES_SUCCESS';
export const FETCH_SERIES_SEASON_EPISODES_FAILURE = 'FETCH_SERIES_SEASON_EPISODES_FAILURE';

export const fetchSeriesSeasonEpisodes = (seriesId, seasonId) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_SERIES_SEASON_EPISODES_REQUEST, seriesId, seasonId });

  try {
    const { data: response } = await dispatch(
      fetch(ep(state)('seriesSeasonEpisodes', { seriesId, seasonId }))
    );

    dispatch({ type: FETCH_SERIES_SEASON_EPISODES_SUCCESS, response, seriesId, seasonId });

    const contributors = flow(
      get('content'),
      flatMap('contentContributors')
    )(response);

    dispatch({ type: CONTENT_CONTRIBUTORS, contributors });
  } catch (e) {
    dispatch({ type: FETCH_SERIES_SEASON_EPISODES_FAILURE, seriesId, seasonId });
  }
};

export const DISCOVERY_ACTION = 'DISCOVERY_ACTION';

export const discoveryPageInteraction = ctaKey => dispatch => {
  dispatch({ type: DISCOVERY_ACTION, [ctaKey]: true });
};

export const CONTENT_DETAIL_ACTION = 'CONTENT_DETAIL_ACTION';

export const contentDetailPageInteraction = (data = {}) => dispatch => {
  dispatch({ type: CONTENT_DETAIL_ACTION, ...data });
};
