import axios from 'axios';
import nock from 'nock';
import { isPremium } from '../member/selectors';
import { mockStore } from '../testHelpers';
import { endPoints } from '../app/endPoints';
import { fetchProducts, savePurchases } from './actions';
import productsApiResponse from './fixtures/api-genericProducts';
import memberApiResponse from './fixtures/api-member';
import genericProducts from './fixtures/genericProducts';
import { getFeaturesForProduct, getProducts } from './selectors';

axios.defaults.adapter = require('axios/lib/adapters/http');

const memberId = 'a2fc768d-0355-4a6e-baf6-6586e1906360';

describe.skip('Products state', () => {
  afterAll(() => nock.cleanAll());

  let store;
  const dummyAPI = 'https://api.osc.com';

  beforeEach(() => {
    store = mockStore({ dummyAPI, authenticateAsMemberId: memberId }).store;
  });

  it('fetches generic products', async () => {
    nock(dummyAPI)
      .get(endPoints.products())
      .query(true)
      .reply(200, productsApiResponse);
    await store.dispatch(fetchProducts({ provider: 'apple' }));

    expect(getProducts(store.getState())).toEqual(genericProducts);
  });

  it('fetches products for a piece of content', async () => {
    const contentId = '00000000-0000-0000-0000-000000000000';
    nock(dummyAPI)
      .get(endPoints.contentProducts({ contentId }))
      .query(true)
      .reply(200, productsApiResponse);

    await store.dispatch(fetchProducts({ provider: 'CRM', contentId }));

    expect(getProducts(store.getState())).toEqual(genericProducts);
  });

  it('fetches product features', async () => {
    nock(dummyAPI)
      .get(endPoints.products())
      .query(true)
      .reply(200, productsApiResponse);
    await store.dispatch(fetchProducts({ provider: 'apple' }));

    const productId = 'ELEVENMONTHLY';
    expect(getFeaturesForProduct(store.getState())(productId)).toEqual([
      { description: 'HD quality', name: 'HD' },
    ]);
  });

  it('saves a purchase', async () => {
    expect(isPremium(store.getState())).toEqual(false);
    nock(dummyAPI)
      .get(endPoints.memberProfile())
      .query(true)
      .reply(200, memberApiResponse);

    nock(dummyAPI)
      .post(endPoints.purchase())
      .query(true)
      .reply(200);

    const now = new Date().getTime();

    const entitlementApiResponse = {
      purchaseDate: now,
      nextPayment: now + 30000, // 30 seconds
      cancelInProgress: false,
      eligibleForTrial: false,
      enablementExternalId: 'E075D2E0619E4FB69057996377B3428A',
      freeTrial: false,
      pendingCancel: false,
      premium: true,
      techProvider: 'CRM',
      temporary: false,
    };

    nock(dummyAPI)
      .get(endPoints.fetchMemberEnablement())
      .query(true)
      .reply(200, entitlementApiResponse);

    await store.dispatch(savePurchases('CRM', 'tok_1D2dw3JuJYRG97EsH0KYxymn'));
    expect(isPremium(store.getState())).toEqual(true);
  });
});
