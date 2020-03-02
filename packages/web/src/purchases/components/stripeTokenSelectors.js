import { getOr, get, toNumber } from 'lodash/fp';

export const getLast4Digits = stripeToken => toNumber(get('card.last4', stripeToken));
export const getExpMonth = stripeToken => get('card.exp_month', stripeToken);
export const getExpYear = stripeToken => get('card.exp_year', stripeToken);
export const getCardName = stripeToken => get('card.name', stripeToken);
export const getExternalReference = stripeToken => get('id', stripeToken);
export const getPaymentMethodName = stripeToken =>
  [getOr('', 'card.brand', stripeToken), '***', getLast4Digits(stripeToken)].join(' ');
