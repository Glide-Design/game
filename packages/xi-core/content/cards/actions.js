import axios from 'axios';
import { getAssetBaseUrlPrefix } from '../../config/selectors';
import { getSourcesByRatio } from '../../creatives/chooseCreativeByRatio';
import { getContentItemById } from '../selectors';

export const CARD_IN_VIEW = 'CARD_IN_VIEW';
export const CARD_NOT_IN_VIEW = 'CARD_NOT_IN_VIEW';
export const CARD_PLAY = 'CARD_PLAY';
export const CARD_FINISHED = 'CARD_FINISHED';
export const CARD_DATA_RECEIVED = 'CARD_DATA_RECEIVED';
const CARD_DATA_REQUEST = 'CARD_DATA_REQUEST';

export const cardInView = externalId => async dispatch =>
  dispatch({ type: CARD_IN_VIEW, externalId });

export const cardNotInView = externalId => async dispatch =>
  dispatch({ type: CARD_NOT_IN_VIEW, externalId });

export const cardPlay = externalId => async dispatch => dispatch({ type: CARD_PLAY, externalId });

export const cardFinished = externalId => async dispatch =>
  dispatch({ type: CARD_FINISHED, externalId });

export const fetchAnimationData = contentId => async (dispatch, getState) => {
  dispatch({ type: CARD_DATA_REQUEST, contentId });

  const state = getState();
  const { src = '' } = getSourcesByRatio({
    baseUrlPrefix: getAssetBaseUrlPrefix(state),
    creatives: getContentItemById(state)(contentId).creatives,
    acceptFormats: ['json'],
    transparentIfEmpty: false,
  });

  if (src) {
    try {
      const { data: animationData } = await axios(src);
      dispatch({ type: CARD_DATA_RECEIVED, animationData, contentId });
    } catch (e) {
      console.error(e);
    }
  }
};
