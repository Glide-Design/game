import { uniq } from 'lodash/fp';
import { CARD_IN_VIEW, CARD_NOT_IN_VIEW, CARD_PLAY, CARD_FINISHED } from './actions';

const defaultState = {
  inView: [],
  cardPlaying: null,
  finished: false,
  played: [],
};

export const cards = (state = defaultState, action) => {
  const inView = state.inView.slice();
  switch (action.type) {
    case CARD_IN_VIEW:
      inView.push(action.externalId);
      return { ...state, inView: uniq(inView) };
    case CARD_NOT_IN_VIEW:
      const idIndex = inView.indexOf(action.externalId);
      if (idIndex > -1) {
        inView.splice(idIndex, 1);
        return { ...state, inView };
      }
      return state;
    case CARD_PLAY:
      return { ...state, cardPlaying: action.externalId, finished: false };
    case CARD_FINISHED:
      const played = state.played.slice();
      played.push(action.externalId);
      return { ...state, played, finished: true };
    default:
      return state;
  }
};
