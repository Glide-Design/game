import { languages } from '../locale/languages';
import { includes } from 'lodash/fp';

const isSystemLanguage = languageRecord => languageRecord.systemLanguage;
const excludedUntilFurtherNotice = language => !includes(language, ['ar', 'it', 'fr', 'de']);

export const appLanguagesList = () => {
  let optionValues = [];
  for (var language in languages) {
    if (excludedUntilFurtherNotice(language) && isSystemLanguage(languages[language])) {
      if (languages.hasOwnProperty(language)) {
        optionValues.push({
          value: language.toLowerCase(),
          display: languages[language].defaultMessage,
        });
      }
    }
  }
  return optionValues;
};
