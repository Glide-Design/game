import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { fetchPaymentMethodsForMember } from 'xi-core/member/paymentMethods/actions';
import { getCurrentPaymentMethod } from 'xi-core/member/paymentMethods/selectors';
import { getMemberId } from 'xi-core/member/selectors';
import withRequest from 'xi-core/withRequest';

const CurrentPaymentMethod = ({ paymentMethod = {} }) => <div>{paymentMethod.name}</div>;

const ConnectedCurrentPaymentMethod = compose(
  connect(state => ({
    memberId: getMemberId(state),
  })),
  withRequest({
    requestIdAlias: 'memberId',
    requestAction: fetchPaymentMethodsForMember,
  }),
  connect(state => ({
    paymentMethod: getCurrentPaymentMethod(state),
  }))
)(CurrentPaymentMethod);

export default ConnectedCurrentPaymentMethod;
