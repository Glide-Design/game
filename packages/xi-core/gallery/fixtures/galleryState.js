import galleryResponse from './full-gallery';

export const galleryId = '63838b84-ad2a-11e8-a599-42010a840014';

export const gallery = {
  content: galleryResponse.content,
  totalElements: galleryResponse.totalElements,
};

const galleryState = {
  [galleryId]: gallery,
};

export default galleryState;
