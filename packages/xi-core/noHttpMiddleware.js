import { filter, flatMap, uniq, without, forEach, flow } from 'lodash/fp';

const deepValues = x => (x != null && typeof x === 'object' ? uniq(flatMap(deepValues, x)) : x);

const isHttp = x => /^http:\/\//.test(x);

let warnedValues = [];

export default ({ warn = console.warn } = {}) => ({ getState }) => next => action => {
  const res = next(action);

  if (action.url != null && isHttp(action.url)) {
    warn(`Attempted to fetch http url: ${action.url}`);
  }

  const newHttpValues = flow(
    deepValues,
    filter(isHttp),
    without(warnedValues)
  )(getState());
  forEach(url => warn(`Attempted to load http url: ${url}`), newHttpValues);
  warnedValues = warnedValues.concat(newHttpValues);

  return res;
};
