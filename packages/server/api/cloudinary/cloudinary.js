import _cloudinary from 'cloudinary';
import { map, join, isString, flow, trim, lowerCase, split, filter } from 'lodash/fp';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';
import { localFields as itemLocalFields } from '../services/content/content';
import { localFieldsWithSuffix } from '../helpers';

let cloudinaryInstance;

const envVars = sanitizeEnvVars(process.env);

export const getUrl = (public_id, params = {}) =>
  cloudinary(true).url(public_id, {
    secure: true,
    sign_url: true,
    type: 'authenticated',
    ...params,
  });

export const getVideoUrl = (public_id, params = {}, ip, disableCloudinaryAuthToken = false) =>
  getUrl(
    public_id,
    Object.assign(
      params,
      envVars.cloudinaryAuthToken && !disableCloudinaryAuthToken
        ? {
            auth_token: {
              key: envVars.cloudinaryAuthToken,
              duration: 60 * 60,
              // ip,
            },
          }
        : {}
    )
  );

export const getSearchResults = async (q, language) => {
  const localFields = localFieldsWithSuffix(language)(itemLocalFields);

  const getResults = async type => {
    const AND = ['folder:app/content/*', `context.type=${type}`, 'context.usage=broadcast'];
    const OR1 = [
      ...map(field => `context.${field}:${q}*`)(localFields),
      `context.contributors:${q}*`,
      `context.keywords:${q}*`,
    ];
    const OR2 = ['context.entitlement=archive-free', 'context.entitlement=library'];
    const expression = `${join(' AND ')(AND)} AND (${join(' OR ')(OR1)}) AND (${join(' OR ')(
      OR2
    )})`;

    return new Promise((resolve, reject) =>
      cloudinary(true)
        .search.expression(expression)
        .max_results(12)
        .execute()
        .then(result => resolve(result))
        .catch(e => reject(e))
    );
  };

  const video = await getResults('video');
  const article = await getResults('article');
  return { video: video.resources, article: article.resources };
};

export const getRelatedContent = async (contributor, titleBrief, language) => {
  const localFields = localFieldsWithSuffix(language)(itemLocalFields);

  const searchTerms = flow(
    trim,
    split(' '),
    map(lowerCase),
    filter(s => s.length)
  )(titleBrief);

  const getResults = async type => {
    const AND = [
      'folder:app/content/*',
      `context.type=${type}`,
      'context.usage=broadcast',
      `context.contributors=${contributor}`,
    ];

    const OR1 = [
      `context.contributors:${contributor}*`,
      ...map(searchTerm => `context.keywords:${searchTerm}`)(searchTerms),
      ...[].concat(
        ...map(field => map(searchTerm => `context.${field}:${searchTerm}*`)(searchTerms))(
          localFields
        )
      ),
    ];

    const OR2 = ['context.entitlement=archive-free', 'context.entitlement=library'];

    const expression = `${join(' AND ')(AND)} AND (${join(' OR ')(OR1)}) AND (${join(' OR ')(
      OR2
    )})`;

    console.log('Search related content on cloudinary => ', expression);

    return new Promise((resolve, reject) =>
      cloudinary(true)
        .search.expression(expression)
        .max_results(12)
        .execute()
        .then(result => resolve(result))
        .catch(e => reject(e))
    );
  };

  const videos = await getResults('video');
  return { videos: videos.resources };
};

export const getAllFreeContent = async () => {
  const getResults = async type => {
    const AND = ['folder:app/content/*', `context.type=${type}`, 'context.usage=broadcast'];
    const OR = ['context.entitlement=archive-free', 'context.entitlement=library'];
    const expression = `(${join(' AND ')(AND)}) AND (${join(' OR ')(OR)})`;

    return new Promise((resolve, reject) =>
      cloudinary(true)
        .search.expression(expression)
        .max_results(500)
        .execute()
        .then(result => resolve(result))
        .catch(e => reject(e))
    );
  };

  const video = await getResults('video');
  const article = await getResults('article');
  return { video: video.resources, article: article.resources };
};

export const getGalleryList = async starId =>
  new Promise((resolve, reject) =>
    cloudinary()
      .search.expression(`folder:app/stars/${starId}/gallery AND format:csv`)
      .max_results(1)
      .execute()
      .then(result => resolve(result))
      .catch(e => reject(e))
  );

export const getStarsCreatives = async starIds => {
  const OR = [
    ...flow(map(id => `folder:app/stars/${id}/profile-header`))(starIds),
    ...flow(map(id => `folder:app/stars/${id}/player-index`))(starIds),
    ...flow(map(id => `folder:app/stars/${id}/bio-background`))(starIds),
    ...flow(map(id => `folder:app/stars/${id}/bio-signature`))(starIds),
    ...flow(map(id => `folder:app/stars/${id}/avatar`))(starIds),
  ];

  return new Promise((resolve, reject) =>
    cloudinary()
      .search.expression(join(' OR ')(OR))
      .max_results(500)
      .execute()
      .then(result => resolve(result))
      .catch(e => reject(e))
  );
};

export const getStarsList = async () =>
  new Promise((resolve, reject) =>
    cloudinary()
      .search.expression('folder:app/stars AND format:csv')
      .max_results(1)
      .execute()
      .then(result => resolve(result))
      .catch(e => reject(e))
  );

const getFolderResources = (fn, itemPath) =>
  new Promise((resolve, reject) =>
    fn.search
      .expression(`folder:${itemPath}`)
      .with_field('context')
      .with_field('tags')
      .max_results(500)
      .execute()
      .then(result => resolve(result))
      .catch(e => reject(e))
  );

export const getContentFolderResources = itemPath => getFolderResources(cloudinary(true), itemPath);

export const getStarFolderResources = itemPath => getFolderResources(cloudinary(), itemPath);

export const gettTemplateResource = async templateId =>
  new Promise((resolve, reject) =>
    cloudinary()
      .search.expression(`folder:app/templates/${templateId} AND format:csv`)
      .max_results(1)
      .execute()
      .then(result => resolve(result))
      .catch(e => reject(e))
  );

const cloudinary = (content = false) => {
  const cname = envVars.cloudinaryAssetCname;

  _cloudinary.v2.config(
    Object.assign(
      {
        cloud_name:
          envVars[content ? 'cloudinaryCloudNameContent' : 'cloudinaryCloudNameNonContent'],
        api_key: envVars[content ? 'cloudinaryApiKeyContent' : 'cloudinaryApiKeyNonContent'],
        api_secret:
          envVars[content ? 'cloudinaryApiSecretContent' : 'cloudinaryApiSecretNonContent'],
      },
      isString(cname) && cname.length
        ? {
            private_cdn: true,
            secure_distribution: cname,
          }
        : {}
    )
  );

  if (cloudinaryInstance) {
    return cloudinaryInstance;
  }

  cloudinaryInstance = _cloudinary.v2;
  return cloudinaryInstance;
};

export default cloudinary;
