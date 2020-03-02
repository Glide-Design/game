import { get } from 'lodash/fp';

const getGalleryById = state => galleryId => get(['galleries', galleryId], state);

export { getGalleryById };
