import { get } from 'lodash/fp';

export const getStripeAPIKey = state => get('config.stripeApiKey', state);
export const getStripePaymentsCountry = state => get('config.stripePaymentsCountry', state);
