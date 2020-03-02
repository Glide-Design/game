import { compact } from 'lodash/fp';

export default (url, paramPairs = []) =>
  `${url}${url.includes('?') ? '&' : '?'}${compact(paramPairs).join('&')}`;
