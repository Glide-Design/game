import { keyBy } from 'lodash/fp';
import { activePaymentMethod, inactivePaymentMethod, newPaymentMethod } from './paymentMethods';

const paymentMethodsWithActiveState = {
  paymentMethods: {
    testMemberId: {
      isLoading: false,
      error: false,
      result: keyBy('externalId', [inactivePaymentMethod, activePaymentMethod]),
    },
  },
};

const paymentMethodsWithoutActiveState = {
  paymentMethods: {
    testMemberId: {
      isLoading: false,
      error: false,
      result: keyBy('externalId', [inactivePaymentMethod]),
    },
  },
};

const paymentMethodsAfterAddState = {
  paymentMethods: {
    testMemberId: {
      isLoading: false,
      error: false,
      result: keyBy('externalId', [inactivePaymentMethod, newPaymentMethod]),
    },
  },
};

export {
  paymentMethodsWithActiveState,
  paymentMethodsWithoutActiveState,
  paymentMethodsAfterAddState,
};
