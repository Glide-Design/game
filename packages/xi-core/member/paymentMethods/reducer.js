import { flow, set, keyBy } from 'lodash/fp';
import {
  FETCH_PAYMENT_METHODS_REQUEST,
  FETCH_PAYMENT_METHODS_SUCCESS,
  FETCH_PAYMENT_METHODS_FAILURE,
  ADD_PAYMENT_METHOD_REQUEST,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_FAILURE,
} from './constants';

const paymentMethods = (state = {}, action) => {
  const { type, memberId, result, error } = action;

  switch (type) {
    case FETCH_PAYMENT_METHODS_REQUEST:
      return set([memberId, 'isLoading'], true, state);

    case FETCH_PAYMENT_METHODS_SUCCESS:
      return flow(
        set([memberId, 'isLoading'], false),
        set([memberId, 'error'], null),
        set([memberId, 'result'], keyBy('externalId', result))
      )(state);

    case FETCH_PAYMENT_METHODS_FAILURE:
      return flow(
        set([memberId, 'isLoading'], false),
        set([memberId, 'error'], error),
        set([memberId, 'result'], {})
      )(state);

    case ADD_PAYMENT_METHOD_REQUEST:
      return set([memberId, 'isLoading'], true, state);

    case ADD_PAYMENT_METHOD_SUCCESS:
      return flow(
        set([memberId, 'isLoading'], false),
        set([memberId, 'error'], null)
      )(state);

    case ADD_PAYMENT_METHOD_FAILURE:
      return flow(
        set([memberId, 'isLoading'], false),
        set([memberId, 'error'], error)
      )(state);

    default:
      return state;
  }
};

export { paymentMethods };
