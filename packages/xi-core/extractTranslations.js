const fs = require('fs');
const path = require('path');
const glob = require('glob');
const tempdir = require('tempdir');
const { transform } = require('babel-core');
const { omit, difference } = require('lodash');

// Required for react app preset. Must be production to work 🤷‍♂️
process.env.NODE_ENV = 'production';

const generateEnglishJson = () => {
  const messagesDir = tempdir.sync();
  const files = [].concat(
    glob.sync('./**/*.{js,jsx}', { ignore: ['node_modules', 'translations'] }),
    glob.sync('../app/src/**/*.{js,jsx}'),
    glob.sync('../web/src/**/*.{js,jsx}')
  );

  files.forEach(filename => {
    try {
      transform(fs.readFileSync(filename, 'utf8'), {
        filename,
        babelrc: false,
        presets: [require.resolve('babel-preset-react-app')],
        plugins: [[require.resolve('babel-plugin-react-intl'), { messagesDir }]],
      });
    } catch (e) {
      console.error(`Failed to extract ${filename}`);
      throw e;
    }
  });

  const idDuplicatedInCodeWithDifferentMsg = (accum, id, defaultMessage) =>
    accum[id] != null && accum[id] !== defaultMessage;

  const addTranslations = (existingTranslations, translations) =>
    translations.reduce((accum, { id, defaultMessage }) => {
      if (idDuplicatedInCodeWithDifferentMsg(accum, id, defaultMessage)) {
        throw new Error(`Duplicated message id (${id}). Use react-intl's defineMessages function.`);
      }
      accum[id] = defaultMessage;
      return accum;
    }, existingTranslations);

  const translations = glob
    .sync(path.join(messagesDir, '**/*.json'))
    .reduce((accum, jsonFilename) => {
      const translations = require(jsonFilename);
      return addTranslations(accum, translations);
    }, {});

  fs.writeFileSync(
    path.join(__dirname, 'translations/en.json'),
    JSON.stringify(translations, Object.keys(translations).sort(), 2)
  );
};

const updateNonEnglishJson = () => {
  const englishFile = path.join(__dirname, 'translations/en.json');

  const englishTranslations = JSON.parse(fs.readFileSync(englishFile, 'utf8'));

  const nonEnglishFiles = glob.sync(path.join(__dirname, 'translations/*.json'), {
    ignore: englishFile,
  });

  const mergeNewText = languageFile => {
    const translations = JSON.parse(fs.readFileSync(languageFile, 'utf8'));
    return Object.assign({}, englishTranslations, translations);
  };

  const removeRedundantTranslations = translations => {
    const keyDifference = difference(Object.keys(translations), Object.keys(englishTranslations));
    return omit(translations, keyDifference);
  };

  nonEnglishFiles.forEach(languageFile => {
    try {
      const updatedTranslations = removeRedundantTranslations(mergeNewText(languageFile));
      fs.writeFileSync(
        languageFile,
        JSON.stringify(updatedTranslations, Object.keys(updatedTranslations).sort(), 2)
      );
    } catch (e) {
      console.error(`Failed to extract ${languageFile}`);
      throw e;
    }
  });
};

generateEnglishJson();
updateNonEnglishJson();
