import axios from 'axios';
import nock from 'nock';
import { setConfig } from 'xi-core/config/actions';
import { mockStore } from 'xi-core/testHelpers';
import { endPoints } from '../app/endPoints';
import galleryApiResponse from './fixtures/full-gallery';
import { fetchGallery } from './actions';
import { getGalleryById } from './selectors';
import galleryState, { gallery, galleryId } from './fixtures/galleryState';

axios.defaults.adapter = require('axios/lib/adapters/http');

const dummyAPI = 'https://api.osc.com';

const memberId = '044341a4-937c-419c-b314-84042f36f09a';

describe.skip('Stars state', () => {
  afterAll(() => nock.cleanAll());

  let store;

  beforeEach(() => {
    store = mockStore({ dummyAPI, authenticateAsMemberId: memberId }).store;
    store.dispatch(setConfig({ apiRoot: dummyAPI }));
  });

  it('fetches a gallery', async () => {
    nock(dummyAPI)
      .get(endPoints.gallery({ galleryId }))
      .reply(200, galleryApiResponse);

    await store.dispatch(fetchGallery(galleryId));

    const state = store.getState();
    expect(state.galleries).toEqual(galleryState);
    expect(getGalleryById(state)(galleryId)).toEqual(gallery);
  });
});
