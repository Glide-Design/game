import { flatMap } from 'lodash/fp';
import { fetch } from '../fetchMiddleware';
import { getEndPointUrl as ep } from '../app/selectors';
import { PropertyKeys, PropertyKeyValues } from '../analytics/analyticEvents';
import { fetchMemberProfile } from '../member/actions';
import { getMemberId, getCountry } from '../member/selectors';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const PRODUCTS_ACTION = 'PRODUCTS_ACTION';

export const fetchProducts = ({ provider, contentId } = {}) => async (dispatch, getState) => {
  try {
    const state = getState();

    dispatch({ type: FETCH_PRODUCTS_REQUEST, contentId, provider });

    const productsUrl = contentId
      ? ep(state)('contentProducts', { contentId })
      : ep(state)('products');

    const { data: products } = await dispatch(
      fetch(`${productsUrl}?techProviderCode=${provider}&country=${getCountry(state)}`)
    );

    const offers = flatMap('offers', products);

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, products, offers });

    return offers;
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_ERROR, error, message: error.message });
  }
};

const SAVE_PURCHASES_REQUEST = 'SAVE_PURCHASES_REQUEST';
export const SAVE_PURCHASES_SUCCESS = 'SAVE_PURCHASES_SUCCESS';
const SAVE_PURCHASES_ERROR = 'SAVE_PURCHASES_ERROR';

export const savePurchases = ({
  provider,
  token,
  offerExternalId,
  offerExternalReference,
  paymentMethodName,
  last4Digits,
  expirationMonth,
  expirationYear,
  cardHolderName,
  currency,
  netPricePaid,
  grossPricePaid,
}) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: SAVE_PURCHASES_REQUEST, token });
  try {
    const { data: result } = await dispatch(
      fetch(ep(state)('purchase'), {
        method: 'post',
        data: {
          techProvider: provider,
          token,
          offerExternalId,
          offerExternalReference,
          savePaymentMethod: true,
          paymentMethodName,
          last4Digits,
          expirationMonth,
          expirationYear,
          cardHolderName,
          currency,
          netPricePaid,
          grossPricePaid,
        },
        retry: {
          active: true,
        },
      })
    );
    dispatch({ type: SAVE_PURCHASES_SUCCESS, result, offerExternalId, offerExternalReference });

    await dispatch(fetchMemberProfile());
    return true;
  } catch (error) {
    console.warn(error);
    dispatch({ type: SAVE_PURCHASES_ERROR, error });
    return false;
  }
};

export const productPageInteraction = (
  ctaKey,
  value = true,
  page = PropertyKeyValues.PRODUCT_INTERACTIONS.PAGE.PRODUCTS
) => dispatch => {
  dispatch({
    type: PRODUCTS_ACTION,
    [ctaKey]: value,
    [PropertyKeys.PRODUCT_INTERACTIONS.PAGE]: page,
  });
};
