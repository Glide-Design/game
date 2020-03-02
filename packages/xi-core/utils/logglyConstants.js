import { getEndPointUrl } from '../app/selectors';

export const LogglyDictionary = state => [
  {
    url: getEndPointUrl(state)('fetchPlatformId'),
    whitelistedErrorCodes: [404],
  },
];

export const RUNTIME_ERR_LABEL = 'runtime';
export const API_ERR_LABEL = 'api';
export const VIDEO_PLAYER_ERR_LABEL = 'videoPlayer';
