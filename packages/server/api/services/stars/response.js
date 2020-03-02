import {
  map,
  flow,
  filter,
  split,
  get,
  first,
  set,
  last,
  groupBy,
  pick,
  sortBy,
  omit,
  slice,
} from 'lodash/fp';
import { reduce as _reduce } from 'lodash';
import { defaultLanguage } from '../../endPoints';
import { getStarResources, getGalleryList } from '../../cloudinary/cache';
import {
  downloadAndParseCsv,
  localFieldsWithSuffix,
  getFolderNameFromResource,
  removeLanguageCodeFromKeys,
} from '../../helpers';
import { buildTemplateResponse } from '../template/template';
import { getImageCreatives } from '../content/content';
import stars, { galleryLocalFields } from './stars';

export const buildGalleryResponse = async ({
  galleryId,
  language = defaultLanguage,
  page = 0,
  size = 0,
  pageInt = Number(page),
  sizeInt = Number(size),
}) => {
  try {
    const starId = flow(
      split('-'),
      last
    )(galleryId);

    const galleryList = await getGalleryList(starId, async r =>
      first(await downloadAndParseCsv(r))
    );

    const galleryItemResources = await getStarResources(`app/stars/${starId}/gallery/*`);

    const itemLocalFields = localFieldsWithSuffix(language)(galleryLocalFields);
    const getLocaleFields = resources =>
      flow(
        filter(get('context.titleEn')),
        first,
        get('context'),
        pick([...itemLocalFields, 'date']),
        removeLanguageCodeFromKeys(itemLocalFields)
      )(resources);

    return flow(
      filter(resource => galleryList.indexOf(getFolderNameFromResource(-1)(resource)) !== -1),
      filter({ format: 'jpg' }),
      groupBy(resource => getFolderNameFromResource(-1)(resource)),
      obj =>
        _reduce(
          obj,
          (acc, resources, key) => {
            return {
              ...acc,
              [key]: {
                ...getLocaleFields(resources),
                creatives: getImageCreatives(resources),
                key: galleryList.indexOf(key),
              },
            };
          },
          {}
        ),
      map(v => v),
      sortBy(v => v.key),
      map(omit(['key'])),
      content => {
        let galleryItemsPage;
        if (sizeInt) {
          galleryItemsPage = slice(pageInt * sizeInt, pageInt * sizeInt + sizeInt)(content);
        } else {
          galleryItemsPage = content;
        }
        return { content: galleryItemsPage, totalElements: content.length, number: pageInt };
      }
    )(galleryItemResources);
  } catch (e) {
    return e;
  }
};

const getLocaleStarFields = language => star => {
  const itemLocalFields = localFieldsWithSuffix(language)(['bio']);
  return flow(
    pick([...itemLocalFields]),
    removeLanguageCodeFromKeys(itemLocalFields)
  )(star);
};

const baseFields = [
  'forename',
  'seoCode',
  'surname',
  'avatarUrl',
  'creatives',
  'mediaGroup',
  'starType',
  'externalId',
  'bio',
];

export const buildStarsResponse = async ({ language }) => {
  const starList = await stars();
  return flow(
    map(star => ({ ...getLocaleStarFields(language)(star), ...star })),
    map(pick(baseFields))
  )(starList);
};

export const buildStarResponse = async ({ starId, language }) => {
  try {
    const starList = await stars();

    const starResponse = flow(
      filter(star => star.seoCode === starId),
      first,
      star => ({ ...getLocaleStarFields(language)(star), ...star }),
      pick(baseFields)
    )(starList);

    const gallerySectionItemResources = await getStarResources(
      `app/templates/stars/${starId}/gallery`
    );
    const gallerySectionItemCreatives = await getImageCreatives(gallerySectionItemResources);

    const starWhatsNewSections = await buildTemplateResponse({
      templateId: `stars/${starId}/whats-new`,
      language,
    });
    const starAboutMeSections = await buildTemplateResponse({
      templateId: `stars/${starId}/about-me`,
      language,
    });
    starResponse.starSections = [
      flow(
        get('content'),
        first,
        set('default', true)
      )(starWhatsNewSections),
      {
        creatives: gallerySectionItemCreatives,
        galleries: [`profile-${starId}`],
        theme: { displayFormat: 'GALLERY' },
      },
      ...(get('content')(starAboutMeSections) || []),
    ];

    return starResponse;
  } catch (e) {
    return e;
  }
};
