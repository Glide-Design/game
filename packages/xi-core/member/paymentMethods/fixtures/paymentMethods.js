const inactivePaymentMethod = {
  externalId: '31b7b834-9204-41bb-81ec-ca3286d79e2e',
  externalReference: 'tok_1DOOy0AXhuR8Dg5HdNGn5PXz',
  paymentProcessor: 'STRIPE',
  name: 'Visa *** 4242',
  last4Digits: 4242,
  expirationMonth: 1,
  expirationYear: 2027,
  cardHolderName: 'Andrew Hickey',
};

const activePaymentMethod = {
  default: true,
  externalId: 'externalId2',
  externalReference: 'tok_1DOOy0AXhuR8Dg5HdNGn5PXy',
  paymentProcessor: 'STRIPE',
  name: 'Visa *** 4242',
  last4Digits: 4242,
  expirationMonth: 1,
  expirationYear: 2027,
  cardHolderName: 'Andrew Hickey',
};

const newPaymentMethod = {
  default: true,
  externalId: 'externalId3',
  externalReference: 'tok_1DOOy0AXhuR8Dg5HdNGn5PXj',
  paymentProcessor: 'STRIPE',
  name: 'Visa *** 4242',
  last4Digits: 4242,
  expirationMonth: 1,
  expirationYear: 2027,
  cardHolderName: 'Andrew Hickey',
};

const paymentMethodResponse = [inactivePaymentMethod, activePaymentMethod];
const paymentMethodAfterAddResponse = [inactivePaymentMethod, newPaymentMethod];

export {
  inactivePaymentMethod,
  activePaymentMethod,
  newPaymentMethod,
  paymentMethodResponse,
  paymentMethodAfterAddResponse,
};
