import { map, flow, filter, get, first, set } from 'lodash/fp';
import { getUrl } from '../../cloudinary/cloudinary';
import { getStarsList } from '../../cloudinary/cache';
import { getImageCreatives, imageCreativesFormats } from '../content/content';
import { getFolderNameFromResource, transformCsvResponse } from '../../helpers';

const getCloudinaryUrl = flow(
  get('public_id'),
  public_id => getUrl(public_id)
);

export default async () =>
  await getStarsList(async (starsResponse, getCloudinaryStarsCreatives) => {
    const starList = await transformCsvResponse(starsResponse);

    const stars = [];

    const starIds = map(star => star.seoCode)(starList);

    const { resources: allStarCreatives } = await getCloudinaryStarsCreatives(starIds);

    for (let i = 0; i < starList.length; i++) {
      const creatives = filter(
        resource => getFolderNameFromResource(-2)(resource) === starList[i].seoCode
      )(allStarCreatives);
      stars.push(await getStarResponse(starList[i], creatives));
    }

    return stars;
  });

const getStarResponse = async (star, creatives) => {
  const avatarUrl = flow(
    filter(resource => getFolderNameFromResource(-1)(resource) === 'avatar'),
    first,
    getCloudinaryUrl
  )(creatives);

  const profileIndexCreatives = flow(
    filter(resource => getFolderNameFromResource(-1)(resource) === 'player-index'),
    filter(resource => imageCreativesFormats.indexOf(resource.format) !== -1),
    getImageCreatives
  )(creatives);

  const profileHeaderCreatives = flow(
    filter(resource => getFolderNameFromResource(-1)(resource) === 'profile-header'),
    filter(resource => imageCreativesFormats.indexOf(resource.format) !== -1),
    getImageCreatives
  )(creatives);

  const bioBackgroundCreatives = flow(
    filter(resource => getFolderNameFromResource(-1)(resource) === 'bio-background'),
    filter(resource => imageCreativesFormats.indexOf(resource.format) !== -1),
    getImageCreatives
  )(creatives);

  const bioSignatureCreatives = flow(
    filter(resource => getFolderNameFromResource(-1)(resource) === 'bio-signature'),
    filter({ format: 'png' }),
    getImageCreatives,
    map(set('mediaUsageType', 'Signature'))
  )(creatives);

  return {
    ...star,
    avatarUrl,
    creatives: profileHeaderCreatives,
    mediaGroup: [
      { usage: 'PROFILE', creatives: profileIndexCreatives },
      { usage: 'BIO', creatives: [...bioBackgroundCreatives, ...bioSignatureCreatives] },
    ],
    starType: 'Footballer',
    externalId: star.seoCode,
  };
};

export const galleryLocalFields = ['title', 'description'];
