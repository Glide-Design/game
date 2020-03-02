import {
  flow,
  map,
  set,
  pick,
  reduce,
  filter,
  split,
  first,
  get,
  omit,
  round,
  uniq,
  trim,
  flatten,
  has,
} from 'lodash/fp';
import { getUrl } from '../../cloudinary/cloudinary';
import { localFieldsWithSuffix, removeLanguageCodeFromKeys } from '../../helpers';
import { buildStarsResponse } from '../stars/response';

export const localFields = ['description', 'descriptionBrief', 'title', 'titleBrief'];
export const fallbackLanguage = 'en';
export const imageCreativesFormats = ['jpg', 'png'];
export const videoFormats = ['mp4', 'mov'];
export const articleFormats = ['html'];

const creativeTransformUrl = (public_id, width) => getUrl(public_id, { width, crop: 'scale' });

export const getContentType = resources => {
  const types = reduce((formats, resource) => {
    formats.push(get('context.type')(resource));
    return formats;
  }, [])(resources);

  if (types.indexOf('video') !== -1) {
    return 'Video';
  } else if (types.indexOf('article') !== -1) {
    return 'Article';
  } else if (types.indexOf('sectionItemOnly') !== -1) {
    return 'SectionItemOnly';
  } else {
    return 'Unknown';
  }
};

export const getIsAvailable = resources => {
  if (resources.length === 0) {
    return false;
  }

  const entitlements = reduce((formats, resource) => {
    formats.push(get('context.entitlement')(resource));
    return formats;
  }, [])(resources);

  if (entitlements.indexOf('premium') !== -1) {
    return false;
  }

  return true;
};

export const getIsFree = resources => {
  const entitlements = reduce((formats, resource) => {
    formats.push(get('context.entitlement')(resource));
    return formats;
  }, [])(resources);

  if (entitlements.indexOf('archive-free') !== -1) {
    return true;
  }

  return false;
};

const createSrcSets = image => {
  // Cloudinary will not load a dynamic transform via signed url if the
  // width in the transform is not different from the original asset width
  const cloudinaryBugInitialFraction = (image.width - 1) / image.width;

  // Cloudinary will not load a dynamic transform if the width has too many
  // decimal places hence the liberal use of 'round'
  return reduce(srcSet => {
    let lastWidth = srcSet[srcSet.length - 1].width;
    if (lastWidth > 50) {
      let lastHeight = srcSet[srcSet.length - 1].height;
      srcSet.push({
        width: round(lastWidth / 2),
        height: round(lastHeight / 2),
        url: creativeTransformUrl(image.public_id, round(lastWidth / 2)),
      });
    }
    return srcSet;
  }, [
    {
      width: round(image.width * cloudinaryBugInitialFraction),
      height: round(image.height * cloudinaryBugInitialFraction),
      url: creativeTransformUrl(image.public_id, round(image.width * cloudinaryBugInitialFraction)),
    },
  ])(image);
};

export const getImageCreatives = resources =>
  flow(
    filter(resource => imageCreativesFormats.indexOf(resource.format) !== -1),
    map(pick(['width', 'height', 'mediaUsageType', 'format', 'url', 'public_id'])),
    map(resource => ({ mediaUsageType: 'Artwork', ...resource })),
    map(creative => set('media', createSrcSets(creative))(creative))
  )(resources);

export const getItemResponse = async (itemId, resources, language) => {
  const isAvailable = getIsAvailable(resources);
  if (!isAvailable) {
    return {};
  }

  const type = getContentType(resources);
  const itemLocalFields = localFieldsWithSuffix(language)(localFields);
  const fallbackLocalFields = localFieldsWithSuffix(fallbackLanguage)(localFields);

  const getLocaleFields = fields => {
    return flow(
      filter(
        resource =>
          (videoFormats.indexOf(resource.format) !== -1 && type === 'Video') ||
          ((videoFormats.indexOf(resource.format) !== -1 ||
            imageCreativesFormats.indexOf(resource.format) !== -1) &&
            type === 'Article' &&
            resource.context.type) ||
          (get('context.type')(resource) && type === 'SectionItemOnly')
      ),
      first,
      get('context'),
      pick([...fields, 'language']),
      removeLanguageCodeFromKeys(fields)
    )(resources);
  };

  const getTags = () =>
    flow(
      map(get('context.tags')),
      filter(v => v),
      map(trim),
      map(split(',')),
      flatten,
      tags => ({ tags })
    )(resources);

  const getContributors = async () =>
    flow(
      filter(
        star =>
          flow(
            map(get('context.contributors')),
            filter(c => c),
            uniq,
            trim,
            split(',')
          )(resources).indexOf(star.seoCode) !== -1
      ),
      map(star => set('avatar', star.avatarUrl)(star)),
      map(star => set('starExternalId', star.externalId)(star)),
      map(omit(['creatives', 'avatarUrl']))
    )(await buildStarsResponse({ language }));

  const getDuration = () =>
    type !== 'Video'
      ? null
      : flow(
          filter(resource => videoFormats.indexOf(resource.format) !== -1),
          first,
          pick(['duration'])
        )(resources);

  let localFieldValues = getLocaleFields(itemLocalFields);
  if (language !== fallbackLanguage && !has(localFields, localFieldValues)) {
    localFieldValues = { ...getLocaleFields(fallbackLocalFields), ...localFieldValues };
  }

  return {
    externalId: itemId,
    contentContributors: await getContributors(),
    ...localFieldValues,
    ...getTags(),
    creatives: getImageCreatives(resources),
    contentTypeName: type,
    ...getDuration(),
  };
};
