import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get, map, flow, find, filter, negate } from 'lodash/fp';
import { offerNames } from 'xi-core/products/locale';

export const isFreeProduct = product => get('enablement.freePeriod', product) > 0;

export const getProducts = state => get('products', state);

export const getFreeProducts = flow(
  getProducts,
  filter(isFreeProduct)
);

export const getPaidProducts = flow(
  getProducts,
  filter(negate(isFreeProduct))
);

export const getProductIds = flow(
  getProducts,
  map('externalReference')
);

export const getFeaturesForProduct = state => id =>
  flow(
    getProducts,
    find({ externalReference: id }),
    get('offerFeatures')
  )(state);

export const getProduct = state => id =>
  flow(
    getProducts,
    find({ externalReference: id })
  )(state);

export const getProductName = name => {
  const productName = offerNames[name.toLowerCase()] || name;

  return typeof productName === 'string' ? productName : <FormattedMessage {...productName} />;
};
