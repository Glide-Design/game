const fs = require('fs');
const util = require('util');
const IntlMessageFormat = require('intl-messageformat');

const readFile = util.promisify(fs.readFile);
const glob = util.promisify(require('glob'));

const localeFilePath = filename => `locale/${filename}.json`;

let intlFiles = null;

const getTranslations = async (lng = 'en') => {
  if (!intlFiles) {
    intlFiles = await glob(localeFilePath('*'));
  }

  let translations;

  try {
    if (intlFiles.indexOf(localeFilePath(lng)) !== -1) {
      translations = JSON.parse(await readFile(localeFilePath(lng), 'utf8'));
    } else {
      translations = JSON.parse(await readFile(localeFilePath('en'), 'utf8'));
    }
  } catch (e) {
    translations = JSON.parse(await readFile(localeFilePath('en'), 'utf8'));
  }

  return translations;
};

// translation helper
module.exports = async (lng = 'en', key, opts) => {
  const translations = await getTranslations(lng);
  opts = opts || {};
  var m = new IntlMessageFormat(translations[key], lng);
  return m.format(opts);
};
