import axios from 'axios';
import nock from 'nock';
import { setConfig } from '../config/actions';
import { endPoints } from '../app/endPoints';
import { mockStore } from '../testHelpers';
import { fetchMemberFollowing, fetchStars, setFollowingStatus, fetchStar } from './actions';
import starsApiResponse from './fixtures/api-stars';
import starsFollowingApiResponse from './fixtures/api-starsFollowing';
import followableStars from './fixtures/followableStars';
import followableStarsWithTwoFollowed from './fixtures/followableStarsWithTwoFollowed';
import beckhamApiResponse from './fixtures/api-beckham';
import { getFollowableStars, isFollowingStar } from './selectors';

axios.defaults.adapter = require('axios/lib/adapters/http');

const dummyAPI = 'https://api.osc.com';

const memberId = '044341a4-937c-419c-b314-84042f36f09a';
const beckhamId = 'baccd039-5a7c-11e8-a68b-c87b0dd0ed31';

describe('Stars state', () => {
  afterAll(() => nock.cleanAll());

  let store;

  beforeEach(() => {
    store = mockStore({ dummyAPI, authenticateAsMemberId: memberId }).store;
    store.dispatch(setConfig({ apiRoot: dummyAPI }));

    nock(dummyAPI)
      .get(endPoints.fetchStars())
      .query(true)
      .reply(200, starsApiResponse);
  });

  // it('fetches stars', async () => {
  //   await store.dispatch(fetchStars());

  //   expect(getFollowableStars(store.getState())).toEqual(followableStars);
  // });

  // it('fetches star following status', async () => {
  //   await store.dispatch(fetchStars());

  //   nock(dummyAPI)
  //     .get(`/social/member/${memberId}/stars?language=en`)
  //     .reply(200, starsFollowingApiResponse);

  //   await store.dispatch(fetchMemberFollowing());

  //   expect(getFollowableStars(store.getState())).toEqual(followableStarsWithTwoFollowed);
  // });

  // it('fails to fetch following state for amonymous user', async () => {
  //   const anonymousStore = mockStore({ dummyAPI }).store;
  //   await anonymousStore.dispatch(fetchStars());
  //   await anonymousStore.dispatch(fetchMemberFollowing());

  //   expect(getFollowableStars(anonymousStore.getState())).toEqual(followableStars);
  // });

  it('follows and unfollows a star', async () => {
    const stateBefore = store.getState();
    expect(isFollowingStar(stateBefore)(beckhamId)).toBeFalsy();

    nock(dummyAPI)
      .put(endPoints.followStar({ starId: beckhamId }))
      .query(true)
      .reply(200);

    await store.dispatch(setFollowingStatus(beckhamId, true));

    const followingState = store.getState();
    expect(isFollowingStar(followingState)(beckhamId)).toEqual(true);

    nock(dummyAPI)
      .delete(endPoints.unfollowStar({ starId: beckhamId }))
      .query(true)
      .reply(200);
    await store.dispatch(setFollowingStatus(beckhamId, false));
    await store.dispatch(setFollowingStatus(beckhamId, false));

    const notFollowingState = store.getState();
    expect(isFollowingStar(notFollowingState)(beckhamId)).toBeFalsy();
  });

  it('fails to unfollow a player', async () => {
    nock(dummyAPI)
      .put(endPoints.followStar({ starId: beckhamId }))
      .query(true)
      .reply(200);

    await store.dispatch(setFollowingStatus(beckhamId, true));

    expect(isFollowingStar(store.getState())(beckhamId)).toEqual(true);

    nock(dummyAPI)
      .delete(endPoints.unfollowStar({ starId: beckhamId }))
      .reply(400, { errorCode: 'BAD_REQUEST', errorDescription: 'Can not process JWT token' });

    await store.dispatch(setFollowingStatus(beckhamId, false));

    expect(isFollowingStar(store.getState())(beckhamId)).toEqual(true);
  });

  // it('fetches a star with their primary feed', async () => {
  //   nock(dummyAPI)
  //     .get(`/stars/${beckhamId}?language=en`)
  //     .reply(200, beckhamApiResponse);

  //   await store.dispatch(fetchStar(beckhamId));
  //   expect(getPrimaryFeedForStarId(store.getState())(beckhamId)).toEqual(
  //     '58f46356-6cea-11e8-9be5-98afa222c05d'
  //   );
  // });
});
