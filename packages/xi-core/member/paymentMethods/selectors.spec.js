import { getCurrentPaymentMethod } from './selectors';
import {
  paymentMethodsWithActiveState,
  paymentMethodsWithoutActiveState,
} from './fixtures/paymentMethodsState';
import { activePaymentMethod, inactivePaymentMethod } from './fixtures/paymentMethods';

jest.mock('xi-core/member/selectors', () => ({
  getMemberId: () => 'testMemberId',
}));

describe('getCurrentPaymentMethod', () => {
  it('returns the current payment method for the logged in member', () => {
    const paymentMethod = getCurrentPaymentMethod(paymentMethodsWithActiveState);
    expect(paymentMethod).toEqual(activePaymentMethod);
  });

  it("returns any payment method if an active one isn't available", () => {
    const paymentMethod = getCurrentPaymentMethod(paymentMethodsWithoutActiveState);
    expect(paymentMethod).toEqual(inactivePaymentMethod);
  });
});
