import { getAssetBaseUrlPrefix } from 'xi-core/config/selectors';
import { getSourcesByRatio } from 'xi-core/creatives/chooseCreativeByRatio';
import store from '../state/store';

export default (
  creatives,
  targetRatio,
  defaultImg,
  rejectFormats,
  acceptFormats,
  usageTypes,
  transparentIfEmpty
) => {
  let normalizedProps = { baseUrlPrefix: getAssetBaseUrlPrefix(store.getState()) };
  if (Array.isArray(creatives)) {
    normalizedProps = {
      ...normalizedProps,
      creatives,
      targetRatio,
      defaultImg,
      rejectFormats,
      acceptFormats,
      usageTypes,
      transparentIfEmpty,
    };
  } else {
    normalizedProps = { ...normalizedProps, ...creatives };
  }

  let sources = getSourcesByRatio(normalizedProps);

  // Format the srcSet array as a string
  if (sources.srcSet && sources.srcSet.length) {
    sources.srcSet = sources.srcSet
      .map(imgDetails => imgDetails.url + ' ' + imgDetails.width + 'w')
      .join(', ');
  }
  return sources;
};
