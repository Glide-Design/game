import { PURCHASE_STEPS } from '../products/constants';
import { PropertyKeys, PropertyKeyValues } from '../analytics/analyticEvents';
import { productPageInteraction } from '../products/actions';
import {
  FETCH_STRIPE_TOKEN_REQUEST,
  FETCH_STRIPE_TOKEN_SUCCESS,
  FETCH_STRIPE_TOKEN_FAILURE,
} from './constants';
import { isOpen } from './selectors';

const START_PURCHASE_WIZARD = 'START_PURCHASE_WIZARD';
const CLOSED_PURCHASE_WIZARD = 'CLOSED_PURCHASE_WIZARD';
const CHANGE_PURCHASE_WIZARD_STEP = 'CHANGE_PURCHASE_WIZARD_STEP';
export const TOGGLE_JOIN_NOW_BANNER = 'TOGGLE_JOIN_NOW_BANNER';

export const showPurchaseWizard = ({ history, historyAction = 'push', duringCreation }) => (
  dispatch,
  getState
) => {
  history[historyAction](history.location.pathname, {
    purchaseWizardStep: PURCHASE_STEPS.ChooseProducts,
    duringCreation,
  });
  dispatch({ type: START_PURCHASE_WIZARD });
  dispatch({ type: TOGGLE_JOIN_NOW_BANNER, visible: false });
};

export const closePurchaseWizard = history => (dispatch, getState) => {
  if (isOpen(getState())) {
    dispatch(productPageInteraction(PropertyKeys.PRODUCT_INTERACTIONS.CLOSED_PAGE));
    const location = history.location;
    history.replace(location.pathname);
    dispatch({ type: CLOSED_PURCHASE_WIZARD });
    dispatch({ type: TOGGLE_JOIN_NOW_BANNER, visible: true });
  }
};

export const changePurchaseWizardStep = ({ history, nextStep, custom }) => dispatch => {
  if (nextStep === PURCHASE_STEPS.ChooseProducts) {
    dispatch(
      productPageInteraction(
        PropertyKeys.PRODUCT_INTERACTIONS.CLOSED_PAGE,
        true,
        PropertyKeyValues.PRODUCT_INTERACTIONS.PAGE.PAYMENT
      )
    );
  }
  history.replace(history.location.pathname, { purchaseWizardStep: nextStep, ...custom });
  dispatch({ type: CHANGE_PURCHASE_WIZARD_STEP });
};

export const requestStripeToken = (stripe, nonStripeElementValues = {}) => async dispatch => {
  dispatch({ type: FETCH_STRIPE_TOKEN_REQUEST });

  try {
    const { error = {}, token } = await stripe.createToken(nonStripeElementValues);

    if (error.message) {
      throw Error(error.message);
    }

    dispatch({ type: FETCH_STRIPE_TOKEN_SUCCESS, token });
    return token;
  } catch (err) {
    dispatch({ type: FETCH_STRIPE_TOKEN_FAILURE, message: err.message });
    throw err;
  }
};
