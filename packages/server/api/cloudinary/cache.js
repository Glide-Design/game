import { get, lowerCase, trim } from 'lodash/fp';
import {
  getContentFolderResources,
  getStarFolderResources,
  gettTemplateResource,
  getStarsList as getCloudinaryStarsList,
  getStarsCreatives as getCloudinaryStarsCreatives,
  getSearchResults as getCloudinarySearchResults,
  getGalleryList as getCloudinaryGalleryList,
  getAllFreeContent as getAllFreeCloudinaryContentForSitemap,
  getRelatedContent as getCloudinaryRelatedContent,
} from './cloudinary';

const cacheLabels = {
  TEMPLATE: 'TEMPLATE',
  CONTENT: 'CONTENT',
  STARS: 'STARS',
  SITEMAP: 'SITEMAP',
  RELATED_CONTENT: 'RELATED_CONTENT',
};

const cacheExpiryMilliseconds = {
  [cacheLabels.TEMPLATE]: 1000 * 60 * 30, // 30 mins
  [cacheLabels.CONTENT]: 1000 * 60 * 60 * 2, // 2 hours
  [cacheLabels.RELATED_CONTENT]: 1000 * 60 * 60 * 2, // 2 hours
  [cacheLabels.STARS]: 1000 * 60 * 60 * 24, // 24 hours
  [cacheLabels.SITEMAP]: 1000 * 60 * 60 * 4, // 4 hours
};

const cacheHasExpired = (timestamp, label = cacheLabels.TEMPLATE) =>
  timestamp < Date.now() - cacheExpiryMilliseconds[label];

const itemsResourcesCache = {};

export const getContentResources = async (itemId, path = 'app/content/') => {
  const itemPath = `${path}${itemId}`;
  if (
    !itemsResourcesCache[itemPath] ||
    cacheHasExpired(itemsResourcesCache[itemPath].timestamp, cacheLabels.CONTENT)
  ) {
    const fetch = async () => {
      const { resources = [] } = await getContentFolderResources(itemPath);
      itemsResourcesCache[itemPath] = { timestamp: Date.now(), cache: resources };
    };
    if (itemsResourcesCache[itemPath]) {
      fetch();
    } else {
      await fetch();
    }
  }
  return itemsResourcesCache[itemPath].cache;
};

export const getStarResources = async itemPath => {
  if (
    !itemsResourcesCache[itemPath] ||
    cacheHasExpired(itemsResourcesCache[itemPath].timestamp, cacheLabels.CONTENT)
  ) {
    const fetch = async () => {
      const { resources = [] } = await getStarFolderResources(itemPath);
      itemsResourcesCache[itemPath] = { timestamp: Date.now(), cache: resources };
    };
    if (itemsResourcesCache[itemPath]) {
      fetch();
    } else {
      await fetch();
    }
  }
  return itemsResourcesCache[itemPath].cache;
};

const templateResponseCache = {};

export const getTemplateSections = async (templateId, transform) => {
  if (
    !templateResponseCache[templateId] ||
    cacheHasExpired(templateResponseCache[templateId].timestamp, cacheLabels.TEMPLATE)
  ) {
    const fetch = async () => {
      const response = await gettTemplateResource(templateId);
      const preparedResponse = await transform(response);
      templateResponseCache[templateId] = { timestamp: Date.now(), cache: preparedResponse };
    };
    if (templateResponseCache[templateId]) {
      fetch();
    } else {
      await fetch();
    }
  }

  return templateResponseCache[templateId].cache;
};

const articleHtmlCache = {};

export const getArticleHtml = async (itemId, cb) => {
  if (
    !articleHtmlCache[itemId] ||
    cacheHasExpired(articleHtmlCache[itemId].timestamp, cacheLabels.CONTENT)
  ) {
    const fetch = async () => {
      articleHtmlCache[itemId] = { timestamp: Date.now(), cache: await cb() };
    };
    if (articleHtmlCache[itemId]) {
      fetch();
    } else {
      await fetch();
    }
  }
  return articleHtmlCache[itemId].cache;
};

let starsCache;

export const getStarsList = async transform => {
  if (!starsCache || cacheHasExpired(starsCache.timestamp, cacheLabels.STARS)) {
    const fetch = async () => {
      const response = await getCloudinaryStarsList();
      const stars = await transform(response, getCloudinaryStarsCreatives);
      starsCache = { timestamp: Date.now(), cache: stars };
    };
    if (starsCache) {
      fetch();
    } else {
      await fetch();
    }
  }
  return starsCache.cache;
};

let galleryLists = {};

export const getGalleryList = async (starId, transform) => {
  if (!galleryLists[starId] || cacheHasExpired(galleryLists[starId].timestamp, cacheLabels.STARS)) {
    const fetch = async () => {
      const response = await getCloudinaryGalleryList(starId);
      galleryLists[starId] = { timestamp: Date.now(), cache: await transform(response) };
    };
    if (galleryLists[starId]) {
      fetch();
    } else {
      await fetch();
    }
  }
  return galleryLists[starId].cache;
};

let searchResults = {};

export const getSearchResults = async (q, language) => {
  const normalizedQ = trim(lowerCase(q));

  const cachEntry = get(`${normalizedQ}.${language}`)(searchResults);

  if (!cachEntry || cacheHasExpired(cachEntry.timestamp, cacheLabels.CONTENT)) {
    const fetch = async () => {
      const results = await getCloudinarySearchResults(normalizedQ, language);
      searchResults[normalizedQ] = {
        ...searchResults[normalizedQ],
        [language]: { timestamp: Date.now(), cache: results },
      };
    };
    if (cachEntry) {
      fetch();
    } else {
      await fetch();
    }
  }
  return searchResults[normalizedQ][language].cache;
};

let relatedContent = {};

export const getRelatedContentForItem = async (itemId, contributor, titleBrief, language) => {
  const cacheKey = `${itemId}.${language}`;
  const cachEntry = get(`${cacheKey}`)(relatedContent);

  if (!cachEntry || cacheHasExpired(cachEntry.timestamp, cacheLabels.RELATED_CONTENT)) {
    const fetch = async () => {
      const results = await getCloudinaryRelatedContent(contributor, titleBrief, language);
      relatedContent[cacheKey] = {
        ...relatedContent[cacheKey],
        [language]: { timestamp: Date.now(), cache: results },
      };
    };
    if (cachEntry) {
      fetch();
    } else {
      await fetch();
    }
  }
  return relatedContent[cacheKey][language].cache;
};

let sitemapCache;
export const searchContentForSitemap = async () => {
  if (!sitemapCache || cacheHasExpired(sitemapCache.timestamp, cacheLabels.SITEMAP)) {
    const fetch = async () => {
      const response = await getAllFreeCloudinaryContentForSitemap();
      sitemapCache = { timestamp: Date.now(), cache: response };
    };
    if (sitemapCache) {
      fetch();
    } else {
      await fetch();
    }
  }
  return sitemapCache.cache;
};
