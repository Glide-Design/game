import { SET_LOCALE } from './actions';

const defaultState = {
  locale: 'en-GB',
  messages: {},
};

export const locale = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
        messages: action.messages,
      };

    default:
      return state;
  }
};
