import { includes, get } from 'lodash/fp';
import Boom from 'boom';
import { endPoints } from 'xi-core/app/endPoints';
import { buildTemplateResponse } from './services/template/template';
import {
  buildStarsResponse,
  buildStarResponse,
  buildGalleryResponse,
} from './services/stars/response';
import {
  buildSectionItemsResponse,
  buildItemResponse,
  buildEntitlementResponse,
  buildRelatedContentResponse,
  buildArticleHtmlResponse,
  buildBookmarkedContentResponse,
} from './services/content/response';
import { buildSearchResponse } from './services/search/search';

const config = { cors: true };

export const defaultLanguage = 'en';
export const setValidLanguageParam = language =>
  includes(language, ['en', 'pt', 'es']) ? language : defaultLanguage;

const ApiCacheHeader = 'max-age=600, public';

const setCache = getData => async (response, h) =>
  h.response(await getData(response)).header('Cache-Control', ApiCacheHeader);

export default server => {
  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchTemplateSections({ templateId: '{templateId*}' })}`,
    handler: setCache(
      async response =>
        await buildTemplateResponse({
          templateId: response.params.templateId,
          language: setValidLanguageParam(response.query.language),
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchSectionItems({ sectionId: '{sectionId*}' })}`,
    handler: setCache(
      async response =>
        await buildSectionItemsResponse({
          sectionId: response.params.sectionId,
          language: setValidLanguageParam(response.query.language),
          ...response.query,
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchContentItem({ id: '{contentId}' })}`,
    handler: async function(response, h) {
      const item = await buildItemResponse({
        itemId: response.params.contentId,
        language: setValidLanguageParam(response.query.language),
      });

      return item === null
        ? Boom.notFound('The content you are trying to access is not available')
        : h.response(item).header('Cache-Control', ApiCacheHeader);
    },
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchContentEntitlement({ contentId: '{contentId}' })}`,
    handler: async response => {
      const token = get('authorization', response.headers);
      return await buildEntitlementResponse({
        itemId: response.params.contentId,
        ip: response.info.remoteAddress,
        token,
      });
    },
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchRelatedContentSection({ contentId: '{contentId}' })}`,
    handler: setCache(
      async response =>
        await buildRelatedContentResponse({
          itemId: response.params.contentId,
          language: setValidLanguageParam(response.query.language),
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: '/api/article/html/{contentId}',
    handler: setCache(
      async response =>
        await buildArticleHtmlResponse({
          itemId: response.params.contentId,
          language: setValidLanguageParam(response.query.language),
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.gallery({ galleryId: '{galleryId}' })}`,
    handler: setCache(
      async response =>
        await buildGalleryResponse({
          galleryId: response.params.galleryId,
          language: setValidLanguageParam(response.query.language),
          ...response.query,
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchStars()}`,
    handler: setCache(
      async response =>
        await buildStarsResponse({ language: setValidLanguageParam(response.query.language) })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.fetchStar({ starId: '{starId}' })}`,
    handler: setCache(
      async response =>
        await buildStarResponse({
          starId: response.params.starId,
          language: setValidLanguageParam(response.query.language),
        })
    ),
    config,
  });

  server.route({
    method: 'GET',
    path: `/api${endPoints.search()}`,
    handler: setCache(
      async response =>
        await buildSearchResponse({
          language: setValidLanguageParam(response.query.language),
          ...response.query,
        })
    ),
    config,
  });

  server.route({
    method: 'POST',
    path: `/api${endPoints.bookmarks()}`,
    handler: setCache(
      async response =>
        await buildBookmarkedContentResponse({
          bookmarkedContentIds: response.payload.bookmarkedContentIds,
          language: setValidLanguageParam(response.query.language),
        })
    ),
    config,
  });
};
