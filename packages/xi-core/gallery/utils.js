import { flow, get, map, find, curry } from 'lodash/fp';
import { getSourcesByRatio } from 'xi-core/creatives/chooseCreativeByRatio';
import { CONTENT_TYPES } from './constants';

const getPathFromMedia = media => {
  if (!media) {
    return;
  }

  const clientPlaybackUrl = media.clientPlaybackUrl;
  const relativeUrl = media.url;

  if (clientPlaybackUrl.includes(relativeUrl)) {
    return clientPlaybackUrl;
  }
  return clientPlaybackUrl + relativeUrl;
};

const getSrcsetFromContent = curry((targetRatio, content) => {
  const { src, srcSet } = flow(
    get('creatives'),
    creatives =>
      getSourcesByRatio({
        creatives,
        targetRatio,
      })
  )(content);

  const srcSetString = srcSet
    .map(imgDetails => imgDetails.url + ' ' + imgDetails.width + 'w')
    .join(', ');

  return {
    srcset: srcSetString,
    src,
  };
});

const getVideoSrcsFromContent = content => {
  const videoCreative = flow(
    get('media'),
    find({ mediaUsageType: 'Gallery' })
  )(content);

  const sources = flow(
    get('media'),
    map(media => ({
      src: getPathFromMedia(media),
      type: videoCreative.mimeType,
    }))
  )(videoCreative);

  return sources;
};

const getContentTypeFromContent = content => {
  if (get(['media', 'length'], content) > 0) {
    return CONTENT_TYPES.VIDEO;
  }

  return CONTENT_TYPES.IMAGE;
};

export { getContentTypeFromContent, getSrcsetFromContent, getVideoSrcsFromContent };
