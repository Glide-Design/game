import { addLocaleData } from 'react-intl';
import { includes } from 'lodash/fp';
import { LOAD_LANGUAGE_DATA } from './middlewareTypes';

const defaultLanguage = 'en';

async function loadLocaleData(language) {
  try {
    return await import(`react-intl/locale-data/${language}`);
  } catch (error) {
    if (errorIsModuleNotFound(error)) {
      return await import(`react-intl/locale-data/${defaultLanguage}`);
    } else {
      throw error;
    }
  }
}

async function loadTranslations(language) {
  try {
    return await import(`../translations/${language}.json`);
  } catch (error) {
    if (errorIsModuleNotFound(error)) {
      return await import(`../translations/${defaultLanguage}.json`);
    } else {
      throw error;
    }
  }
}

function errorIsModuleNotFound(error) {
  return includes('Cannot find module', error.message);
}

export default () => next => action => {
  if (action.type === LOAD_LANGUAGE_DATA) {
    const { language } = action;
    return Promise.all([loadLocaleData(language), loadTranslations(language)]).then(
      ([localeData, messages]) => {
        addLocaleData(localeData);

        return messages;
      }
    );
  } else {
    return next(action);
  }
};
