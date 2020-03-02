import axios from 'axios';
import nock from 'nock';
import { mockStore as createMockStore } from '../../testHelpers';
import { paymentMethodResponse, paymentMethodAfterAddResponse } from './fixtures/paymentMethods';
import {
  inactivePaymentMethod,
  activePaymentMethod,
  newPaymentMethod,
} from './fixtures/paymentMethods';
import { fetchPaymentMethodsForMember, addPaymentMethod } from './actions';
import {
  getPaymentMethodErrorForMember,
  getPaymentMethodFetchingForMember,
  getPaymentMethodsForMember,
} from './selectors';

jest.mock('xi-core/member/selectors', () => ({
  ...require.requireActual('xi-core/member/selectors'),
  getMemberId: () => 'testmemberid',
}));

axios.defaults.adapter = require('axios/lib/adapters/http');
const memberId = 'testmemberid';
const dummyAPI = 'https://api.osc.com';

describe('payment methods redux state', () => {
  it('allows fetching of payment methods', async () => {
    const { store: mockStore } = createMockStore({ dummyAPI: dummyAPI });
    nock(dummyAPI)
      .get(`/member/${memberId}/payment?language=en`)
      .reply(200, paymentMethodResponse);

    const fetchPromise = mockStore.dispatch(fetchPaymentMethodsForMember(memberId));
    const isFetching = getPaymentMethodFetchingForMember(memberId, mockStore.getState());
    expect(isFetching).toBe(true);

    await fetchPromise;

    const error = getPaymentMethodErrorForMember(memberId, mockStore.getState());
    expect(error).toBe(null);

    const results = getPaymentMethodsForMember(memberId, mockStore.getState());
    expect(results).toEqual({
      [inactivePaymentMethod.externalId]: inactivePaymentMethod,
      [activePaymentMethod.externalId]: activePaymentMethod,
    });
  });

  it('allows adding of a payment method', async () => {
    const { store: mockStore } = createMockStore({ dummyAPI: dummyAPI });
    nock(dummyAPI)
      .post('/member/payment?language=en')
      .reply(200);

    nock(dummyAPI)
      .get(`/member/${memberId}/payment?language=en`)
      .reply(200, paymentMethodAfterAddResponse);

    const addPromise = mockStore.dispatch(addPaymentMethod(newPaymentMethod));
    const isFetching = getPaymentMethodFetchingForMember(memberId, mockStore.getState());
    expect(isFetching).toBe(true);

    await addPromise;

    const error = getPaymentMethodErrorForMember(memberId, mockStore.getState());
    expect(error).toBe(null);

    const results = getPaymentMethodsForMember(memberId, mockStore.getState());
    expect(results).toEqual({
      [inactivePaymentMethod.externalId]: inactivePaymentMethod,
      [newPaymentMethod.externalId]: newPaymentMethod,
    });
  });
});
