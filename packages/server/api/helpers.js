import {
  flow,
  map,
  tail,
  zipObject,
  camelCase,
  reduce,
  filter,
  get,
  split,
  nth,
  mapKeys,
} from 'lodash/fp';
import parse from 'csv-parse/lib/sync';
import axios from 'axios';

export const localFieldsWithSuffix = language => map(v => camelCase(`${v} ${language}`));

export const removeLanguageCodeFromKeys = itemLocalFields =>
  mapKeys(k => (itemLocalFields.indexOf(k) !== -1 ? k.slice(0, -2) : k));

export const mergeArrayOfObjects = objects =>
  reduce((result, v) => Object.assign(result, v), {})(objects);

export const downloadAndParseCsv = async response =>
  await axios.get(response.resources[0].url).then(response =>
    parse(response.data, {
      skip_empty_lines: true,
      skip_lines_with_empty_values: true,
    })
  );

const prepareCsvData = csvData => {
  const columnHeaders = flow(
    map(camelCase),
    filter(v => v)
  )(csvData[0]);
  const rowsToObjects = rows => map(zipObject(columnHeaders))(rows);

  return flow(
    tail,
    rowsToObjects
  )(csvData);
};

export const transformCsvResponse = async response =>
  prepareCsvData(await downloadAndParseCsv(response));

export const getFolderNameFromResource = position =>
  flow(
    get('folder'),
    split('/'),
    nth(position)
  );
