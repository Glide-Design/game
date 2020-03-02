import { getMemberId } from 'xi-core/member/selectors';
import { get, curry, find } from 'lodash/fp';

const getPaymentMethodsForMember = curry((memberId, state) =>
  get(['paymentMethods', memberId, 'result'], state)
);

const getPaymentMethodFetchingForMember = curry((memberId, state) =>
  get(['paymentMethods', memberId, 'isLoading'], state)
);

const getPaymentMethodErrorForMember = curry((memberId, state) =>
  get(['paymentMethods', memberId, 'error'], state)
);

const getCurrentPaymentMethod = state => {
  const memberId = getMemberId(state);
  const paymentMethods = getPaymentMethodsForMember(memberId, state) || {};
  const currentPaymentMethod = find(paymentMethod => paymentMethod.default, paymentMethods);

  if (currentPaymentMethod) {
    return currentPaymentMethod;
  } else {
    const firstPaymentMethod = Object.values(paymentMethods)[0];
    return firstPaymentMethod;
  }
};

export {
  getPaymentMethodsForMember,
  getPaymentMethodFetchingForMember,
  getPaymentMethodErrorForMember,
  getCurrentPaymentMethod,
};
