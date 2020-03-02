import { get, getOr } from 'lodash/fp';
import { endPoints, endPointHostGrouping } from './endPoints';

export const getTotalElements = id => getOr(null, `lists.${id}.totalElements`);
export const getFetching = id => getOr(false, `lists.${id}._fetching`);
export const getScrollOffset = id => getOr(null, `lists.${id}.scrollOffset`);
export const getUserContentStatus = id => getOr(null, 'lists.contentStatusForUser');
export const getPage = id => {
  return getOr(0, `lists.${id}.page`);
};
export const getEndPointUrl = state => (endPointLabel, params = {}) => {
  const pathname = endPoints[endPointLabel]({ ...params });
  if (!pathname) {
    return console.error('End point not found: ' + endPointLabel);
  }
  let hostLabel;
  for (let key in endPointHostGrouping) {
    if (endPointHostGrouping[key].indexOf(endPointLabel) > -1) {
      hostLabel = key;
      break;
    }
  }
  if (!hostLabel) {
    return console.error('Host label not found for: ' + endPointLabel);
  }
  const host = get(`config.api${hostLabel}Root`, state);
  return `${host}${pathname}`;
};

export const getAppPlatform = state => {
  return get('app.platform', state);
};

export const isBootstrapped = state => {
  return getOr(false, 'app.bootstrapped', state);
};

export const hasBootstrapFailure = state => {
  return get('app.bootstrapFailure', state);
};

export const isAppFocused = get('app.focused');

export const isUnloaded = get('app.unloaded');
