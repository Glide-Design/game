import {
  flow,
  map,
  set,
  pick,
  filter,
  split,
  first,
  lowerCase,
  clone,
  concat,
  get,
  slice,
  last,
  uniq,
  camelCase,
  isEmpty,
} from 'lodash/fp';
import axios from 'axios';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';
import { defaultLanguage } from '../../endPoints';
import { getVideoUrl } from '../../cloudinary/cloudinary';
import {
  getContentResources,
  getArticleHtml,
  getRelatedContentForItem,
} from '../../cloudinary/cache';
import { isTokenValid } from '../../services/auth/auth';
import { mergeArrayOfObjects } from '../../helpers';
import { getTemplateSectionItems } from '../template/template';
import {
  getItemResponse,
  videoFormats,
  getContentType,
  articleFormats,
  getIsFree,
  getIsAvailable,
} from './content';

const envVars = sanitizeEnvVars(process.env);

export const getItemsResponse = async (itemIds, language) => {
  const itemsResponse = [];
  for (let i = 0; i < itemIds.length; i++) {
    const itemId = itemIds[i].trim();
    const resources = await getContentResources(itemId);
    let itemResponse = await getItemResponse(itemId, resources, language);
    if (!isEmpty(itemResponse)) {
      itemsResponse.push(itemResponse);
    }
  }
  return itemsResponse;
};

export const buildBookmarkedContentResponse = async ({ bookmarkedContentIds, language }) => {
  try {
    return {
      content: await getItemsResponse(bookmarkedContentIds, language),
    };
  } catch (e) {
    return e;
  }
};

export const buildRelatedContentResponse = async ({ itemId, language }) => {
  try {
    const resources = await getContentResources(itemId);
    const contributors = flow(
      filter(resource => videoFormats.indexOf(resource.format) !== -1),
      map(resource => pick(['contributors'])(resource.context)),
      mergeArrayOfObjects,
      obj => split(',')(obj.contributors),
      map(s => s.trim()),
      filter(s => s)
    )(resources);

    const titleField = `${camelCase(`title brief ${language}`)}`;
    const titleBrief = flow(
      filter(resource => videoFormats.indexOf(resource.format) !== -1),
      map(resource => pick([`${titleField}`])(resource.context)),
      mergeArrayOfObjects,
      obj => get(`${titleField}`)(obj)
    )(resources);

    const getItemIds = flow(
      map(r => r.folder),
      map(folder => last(split('/')(folder))),
      uniq
    );

    const relatedContent = await getRelatedContentForItem(
      itemId,
      first(contributors),
      titleBrief,
      language
    );

    const itemIds = filter(externalId => externalId !== itemId)(getItemIds(relatedContent.videos));

    return {
      content: await getItemsResponse(itemIds, language),
    };
  } catch (e) {
    return e;
  }
};

export const buildEntitlementResponse = async ({ itemId, ip, token }) => {
  const videoUrl = (format, mimeType) => resource =>
    flow(
      set('mimeType', mimeType),
      set(
        'url',
        getVideoUrl(
          resource.public_id,
          {
            format,
            resource_type: 'video',
            streaming_profile: 'full_hd',
          },
          ip
        )
      )
    )(resource);

  try {
    const accessTokenIsValid = async () => await isTokenValid(token);
    const resources = await getContentResources(itemId);
    const isAvailable = getIsAvailable(resources);
    if (!isAvailable) {
      throw Error('Unavailable');
    }
    const type = getContentType(resources);
    const free = getIsFree(resources);
    let media, additionalTracks, inventoryType;

    switch (type) {
      case 'Video':
        if (free || (await accessTokenIsValid())) {
          additionalTracks = flow(
            filter(
              resource =>
                resource.format === 'vtt' &&
                lowerCase(get('context.usage')(resource)) === 'broadcast'
            ),
            map(resource => {
              const language = flow(
                get('context.language'),
                lowerCase
              )(resource);
              return set('language', language)(resource);
            }),
            map(t => ({ url: t.secure_url, language: t.language }))
          )(resources);
          media = flow(
            filter(
              resource =>
                videoFormats.indexOf(resource.format) !== -1 &&
                lowerCase(get('context.usage')(resource)) === 'broadcast'
            ),
            map(videoUrl('m3u8', 'application/x-mpegURL')),
            arr => concat(arr, map(videoUrl('mpd', 'application/dash+xml'))(clone(arr))),
            map(pick(['url', 'mimeType']))
          )(resources);
          inventoryType = 'broadcast';
        } else {
          additionalTracks = [];
          media = [
            {
              url: getVideoUrl(
                'app/content/no-entitlement.mp4',
                {
                  resource_type: 'video',
                },
                ip,
                true
              ),
              mimeType: 'video/mp4',
            },
          ];
          inventoryType = 'preview';
        }
        break;
      case 'Article':
        media = [{ url: `${envVars.apiDomainRoot}/article/html/${itemId}` }];
        break;
      default:
        throw Error('Unknown type');
    }
    return { media, additionalTracks, free, inventoryType };
  } catch (e) {
    return e;
  }
};

export const buildArticleHtmlResponse = async ({ itemId, language }) => {
  try {
    const resources = await getContentResources(itemId);
    const remoteUrl = flow(
      filter(
        resource =>
          articleFormats.indexOf(resource.format) !== -1 &&
          get('context.language')(resource) === language
      ),
      _resources =>
        _resources.length
          ? _resources
          : filter(resource => articleFormats.indexOf(resource.format) !== -1)(resources),
      map(pick(['url'])),
      mergeArrayOfObjects,
      obj => obj.url
    )(resources);

    const data = await getArticleHtml(
      itemId,
      async () => await axios.get(remoteUrl).then(response => response.data)
    );
    return { data };
  } catch (e) {
    return e;
  }
};

export const buildItemResponse = async ({ itemId, language }) => {
  try {
    const resources = await getContentResources(itemId);
    const isAvailable = getIsAvailable(resources);
    if (!isAvailable) {
      return null;
    }
    const counters = await axios
      .post(`${envVars.apiBeRoot}/social/content/counters`, [itemId])
      .then(response => response.data);
    const incrementViewCount = () =>
      axios.get(`${envVars.apiBeRoot}/social/content/${itemId}/view`).catch(e => console.log(e));
    incrementViewCount();
    return { ...(await getItemResponse(itemId, resources, language)), ...first(counters) };
  } catch (e) {
    return e;
  }
};

export const buildSectionItemsResponse = async ({
  sectionId,
  language = defaultLanguage,
  page = 0,
  size = 0,
  pageInt = Number(page),
  sizeInt = Number(size),
}) => {
  try {
    const [templateId, sectionIndex] = sectionId.split('_');
    const sectionItems = await getTemplateSectionItems(templateId, sectionIndex);

    let sectionItemsPage;

    if (sizeInt) {
      sectionItemsPage = slice(pageInt * sizeInt, pageInt * sizeInt + sizeInt)(sectionItems);
    } else {
      sectionItemsPage = sectionItems;
    }

    return {
      content: await getItemsResponse(sectionItemsPage, language),
      totalElements: sectionItems.length,
      number: pageInt,
    };
  } catch (e) {
    return e;
  }
};
