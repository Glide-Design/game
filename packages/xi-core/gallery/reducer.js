import { set, getOr } from 'lodash/fp';
import { FETCH_GALLERY_SUCCESS } from './actions';

export const galleries = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GALLERY_SUCCESS:
      const { galleryId, galleryItems, totalElements } = action;

      const existingGalleryItems = getOr([], [galleryId, 'content'], state);

      const newGallery = {
        content: [...existingGalleryItems, ...galleryItems],
        totalElements,
      };

      return set(galleryId, newGallery, state);

    default:
      return state;
  }
};
