import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';

export const FETCH_GALLERY_REQUEST = 'FETCH_GALLERY_REQUEST';
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = 'FETCH_GALLERY_FAILURE';

export const fetchGallery = (galleryId, paging) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_GALLERY_REQUEST, galleryId });

  try {
    const { data: response } = await dispatch(
      fetch(ep(state)('gallery', { galleryId }), { params: paging })
    );

    dispatch({
      type: FETCH_GALLERY_SUCCESS,
      galleryItems: response.content,
      galleryId,
      totalElements: response.totalElements,
      page: response.number,
    });
  } catch (error) {
    dispatch({ type: FETCH_GALLERY_FAILURE, galleryId, error, message: error.message });
  }
};
