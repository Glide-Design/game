import { SNACKBAR_OPEN, SNACKBAR_CLOSE } from './actions';

const defaultState = {
  visible: false,
  title: '',
  message: '',
  leftIconType: null,
};

export const snackBar = (state = defaultState, action) => {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {
        visible: true,
        message: action.message,
        title: action.title,
        leftIconType: action.leftIconType,
      };
    case SNACKBAR_CLOSE:
      return defaultState;
    default:
      return state;
  }
};
