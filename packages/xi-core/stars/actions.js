import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { getMemberId } from '../member/selectors';
import { isFollowingStar } from './selectors';

export const FETCH_STARS_REQUEST = 'FETCH_STARS_REQUEST';
export const FETCH_STARS_SUCCESS = 'FETCH_STARS_SUCCESS';
export const FETCH_STARS_FAILURE = 'FETCH_STARS_FAILURE';

export const START_TIMELINE = 'START_TIMELINE';

export const fetchStars = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_STARS_REQUEST });

  const state = getState();

  try {
    const { data: response } = await dispatch(fetch(ep(state)('fetchStars')));

    dispatch({
      type: FETCH_STARS_SUCCESS,
      stars: response,
    });
  } catch (error) {
    dispatch({ type: FETCH_STARS_FAILURE, error, message: error.message });
  }
};

export const FETCH_MEMBER_FOLLOWING_REQUEST = 'FETCH_MEMBER_FOLLOWING_REQUEST';
export const FETCH_MEMBER_FOLLOWING_SUCCESS = 'FETCH_MEMBER_FOLLOWING_SUCCESS';
export const FETCH_MEMBER_FOLLOWING_FAILURE = 'FETCH_MEMBER_FOLLOWING_FAILURE';

export const fetchMemberFollowing = () => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_MEMBER_FOLLOWING_REQUEST });
  const memberId = getMemberId(state);

  try {
    if (!memberId) {
      throw new Error('member id not found');
    }

    const { data: response } = await dispatch(fetch(ep(state)('memberFollowing', { memberId })));

    dispatch({ type: FETCH_MEMBER_FOLLOWING_SUCCESS, response });
  } catch (error) {
    dispatch({ type: FETCH_MEMBER_FOLLOWING_FAILURE, error, message: error.message });
  }
};

export const FOLLOW_STAR_REQUEST = 'FOLLOW_STAR_REQUEST';
export const FOLLOW_STAR_SUCCESS = 'FOLLOW_STAR_SUCCESS';
export const FOLLOW_STAR_FAILURE = 'FOLLOW_STAR_FAILURE';

export const setFollowingStatus = (starId, newFollowingStatus, sourcePageLabel) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const isFollowing = isFollowingStar(state)(starId);

  if (isFollowing === newFollowingStatus) {
    return;
  }

  dispatch({ type: FOLLOW_STAR_REQUEST, starId, status: newFollowingStatus });

  try {
    if (newFollowingStatus) {
      await dispatch(
        fetch(ep(state)('followStar', { starId }), {
          method: 'put',
        })
      );
    } else {
      await dispatch(
        fetch(ep(state)('unfollowStar', { starId }), {
          method: 'delete',
        })
      );
    }

    dispatch({ type: FOLLOW_STAR_SUCCESS, starId, sourcePageLabel });
  } catch (e) {
    dispatch({ type: FOLLOW_STAR_FAILURE, starId, status: !newFollowingStatus });
  }
};

export const FETCH_STAR_REQUEST = 'FETCH_STAR_REQUEST';
export const FETCH_STAR_SUCCESS = 'FETCH_STAR_SUCCESS';
export const FETCH_STAR_FAILURE = 'FETCH_STAR_FAILURE';
export const MAP_STAR = 'MAP_STAR';

export const fetchStar = starId => async (dispatch, getState) => {
  dispatch({ type: FETCH_STAR_REQUEST, starId });

  const state = getState();

  try {
    const { data: response } = await dispatch(fetch(ep(state)('fetchStar', { starId })));

    dispatch({ type: FETCH_STAR_SUCCESS, response });
    dispatch({ type: MAP_STAR, starId, externalId: response.externalId });
  } catch (error) {
    dispatch({ type: FETCH_STAR_FAILURE, starId, error, message: error.message });
  }
};

export const PLAYER_INDEX_ACTION = 'PLAYER_INDEX_ACTION';
export const playerIndexInteraction = data => async dispatch =>
  dispatch({ type: PLAYER_INDEX_ACTION, data });
