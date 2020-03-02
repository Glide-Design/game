import { compose } from 'recompose';
import { connect } from 'react-redux';
import withRequest from 'xi-core/withRequest';
import { fetchGallery } from 'xi-core/gallery/actions';
import { getGalleryById } from 'xi-core/gallery/selectors';
import { fetchStar } from 'xi-core/stars/actions';
import { getStarName } from 'xi-core/stars/selectors';

const itemsPerPage = 40;

const ConnectedTimelineHoC = compose(
  withRequest({
    requestIdAlias: 'starId',
    requestAction: fetchStar,
  }),
  withRequest({
    requestIdAlias: 'galleryId',
    requestAction: fetchGallery,
    responseSelector: getGalleryById,
    responseAlias: 'gallery',
    pageable: true,
    itemsPerPage,
  }),
  connect((state, { starId }) => ({
    title: getStarName(state)(starId),
    itemsPerPage, // not passed through by withRequest
  }))
);

export default ConnectedTimelineHoC;
