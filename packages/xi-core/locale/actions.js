import { loadLanguageData } from './middlewareTypes';

export const SET_LOCALE = 'locale/SET_LOCALE';

export const setLocale = locale => async dispatch => {
  const [language] = locale.split('-');
  const messages = await dispatch(loadLanguageData(language));
  dispatch({ type: SET_LOCALE, locale, messages });
};
