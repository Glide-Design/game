import { getMemberId } from 'xi-core/member/selectors';
import { fetch } from '../../fetchMiddleware';
import { getEndPointUrl as ep } from '../../app/selectors';
import {
  FETCH_PAYMENT_METHODS_REQUEST,
  FETCH_PAYMENT_METHODS_SUCCESS,
  FETCH_PAYMENT_METHODS_FAILURE,
  ADD_PAYMENT_METHOD_REQUEST,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_FAILURE,
} from './constants';

export const fetchPaymentMethodsForMember = memberId => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: FETCH_PAYMENT_METHODS_REQUEST, memberId });

  try {
    const { data } = await dispatch(fetch(ep(state)('memberPayment', { memberId })));
    dispatch({ type: FETCH_PAYMENT_METHODS_SUCCESS, memberId, result: data });
  } catch (error) {
    dispatch({ type: FETCH_PAYMENT_METHODS_FAILURE, memberId, error: error.toString() });
  }
};

// Doesn't require a member id, API gets it from the access token
// sending a new payment method will make it the active method for a user's subscription
export const addPaymentMethod = paymentMethod => async (dispatch, getState) => {
  const state = getState();

  const memberId = getMemberId(state);

  dispatch({ type: ADD_PAYMENT_METHOD_REQUEST, memberId });

  try {
    await dispatch(
      fetch(ep(state)('addMemberPayment'), {
        method: 'post',
        data: paymentMethod,
      })
    );
    dispatch({ type: ADD_PAYMENT_METHOD_SUCCESS, memberId });

    // doesn't return the updated model so a fetch is required after this completes
    await dispatch(fetchPaymentMethodsForMember(memberId));
  } catch (error) {
    dispatch({ type: ADD_PAYMENT_METHOD_FAILURE, memberId, error: error.toString() });
  }
};
