export const transformation = {
  DEFAULT: 'DEFAULT',
  PROFILE: 'PROFILE',
};

const avatarTransformations = {
  [transformation.DEFAULT]: 'w_200,h_200,c_fill',
  [transformation.PROFILE]: 'w_200,h_200,dpr_2.0,c_fill',
};

const domainsToTransform = ['cloudinary.com', 'avatar.otro.com'];

export const transformAvatarUrl = (url, transType = transformation.DEFAULT) =>
  (url &&
    domainsToTransform.some(domain => url.indexOf(domain) !== -1) &&
    url.replace('/image/upload/', `/image/upload/${avatarTransformations[transType]}/`)) ||
  url;
