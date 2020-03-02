import PropTypes from 'prop-types';

const mediaShape = PropTypes.shape({}); // TODO

const creativeShape = PropTypes.shape({
  mediaUsageType: PropTypes.string,
  parentId: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  format: PropTypes.string,
  externalId: PropTypes.string,
  media: PropTypes.arrayOf(mediaShape),
});

const contentShape = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  creatives: PropTypes.arrayOf(creativeShape),
  media: PropTypes.arrayOf(mediaShape),
});

const sortShape = PropTypes.shape({
  unsorted: PropTypes.bool,
  sorted: PropTypes.bool,
});

const pageableShape = PropTypes.shape({
  sort: sortShape,
  offset: PropTypes.number,
  pageSize: PropTypes.number,
  pageNumber: PropTypes.number,
  paged: PropTypes.bool,
  unpaged: PropTypes.bool,
});

const galleryShape = PropTypes.shape({
  content: PropTypes.arrayOf(contentShape),
  sort: sortShape,
  pageable: pageableShape,
  last: PropTypes.bool,
  first: PropTypes.bool,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  size: PropTypes.number,
  numberOfElements: PropTypes.number,
  number: PropTypes.number,
});

const CONTENT_TYPES = {
  VIDEO: 'GALLERY_VIDEO_CONTENT',
  IMAGE: 'GALLERY_IMAGE_CONTENT',
};

export {
  mediaShape,
  creativeShape,
  contentShape,
  sortShape,
  pageableShape,
  galleryShape,
  CONTENT_TYPES,
};
