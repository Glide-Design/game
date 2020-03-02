/*
  Given an array of objects (creatives), analyse their width & height
  properties and return the creative (single object) with closest ratio
  to the targetRatio
 */
import {
  get,
  first,
  flow,
  map,
  set,
  sortBy,
  indexOf,
  getOr,
  isEmpty,
  startsWith,
  filter,
  difference,
} from 'lodash/fp';

// This base64 1x1 pixel transparent gif is used to allow the image element to render without a 'real' src so we can measure it's dimensions
export const TRANSPARENT_IMG_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const getCreativeClosestToTargetRatio = (targetRatio, acceptFormats, usageTypes) =>
  flow(
    filter(creative => indexOf(creative.format, acceptFormats) > -1),
    filter(creative =>
      usageTypes.length ? indexOf(creative.mediaUsageType, usageTypes) > -1 : true
    ),
    map(creative =>
      set('targetRatioOffset', Math.abs(targetRatio - creative.width / creative.height), creative)
    ),
    sortBy(['targetRatioOffset']),
    first
  );

export const getMiddleItem = arr => get(`[${Math.floor(arr.length / 2)}]`, arr);

// prettier-ignore
const getMidRangeImageUrl = (targetImages, transparentIfEmpty) => flow(
  getMiddleItem,
  getOr(transparentIfEmpty ? TRANSPARENT_IMG_PLACEHOLDER : '', 'url')
)(targetImages);

export const fixRelativePath = (baseUrlPrefix, url, fallbackPrefix) =>
  startsWith('http', url)
    ? url
    : `${isEmpty(baseUrlPrefix) ? fallbackPrefix : baseUrlPrefix}${url}`;

const updateUrl = baseUrlPrefix => creativeMedia =>
  set(
    'url',
    fixRelativePath(baseUrlPrefix, creativeMedia.url, creativeMedia.clientPlaybackUrl),
    creativeMedia
  );

const removeLessThan100PixelsIfMoreThan1 = collection =>
  filter(o => collection.length <= 1 || o.width >= 100)(collection);

export const getSourcesByRatio = ({
  baseUrlPrefix,
  creatives = [],
  targetRatio = 1,
  defaultImg = TRANSPARENT_IMG_PLACEHOLDER,
  rejectFormats = ['mp4'],
  acceptFormats = ['png', 'jpg'],
  usageTypes = [],
  transparentIfEmpty = true,
}) => {
  rejectFormats = difference(rejectFormats, acceptFormats);
  acceptFormats = difference(acceptFormats, rejectFormats);

  const targetImages = flow(
    getCreativeClosestToTargetRatio(targetRatio, acceptFormats, usageTypes),
    get('media'),
    sortBy(['width']),
    removeLessThan100PixelsIfMoreThan1,
    map(updateUrl(baseUrlPrefix))
  )(creatives);

  return {
    srcSet: targetImages,
    src: getMidRangeImageUrl(targetImages, transparentIfEmpty), // Set the fallback to middle sized image
  };
};
