import { addLocaleData } from 'react-intl';
import allLocaleData from 'react-intl/locale-data';
import en from '../translations/en.json';
// import fr from '../translations/fr.json';
import es from '../translations/es.json';
// import de from '../translations/de.json';
// import it from '../translations/it.json';
// import ar from '../translations/ar.json';
import id from '../translations/id.json';
import pt from '../translations/pt.json';
import tr from '../translations/pt.json';
import { LOAD_LANGUAGE_DATA } from './middlewareTypes';

addLocaleData(allLocaleData);

const messages = { en, es, id, pt, tr };

export default () => next => action => {
  if (action.type === LOAD_LANGUAGE_DATA) {
    return messages[action.language];
  } else {
    return next(action);
  }
};
