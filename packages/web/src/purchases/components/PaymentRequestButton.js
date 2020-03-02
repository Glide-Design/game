import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { PaymentRequestButtonElement } from 'react-stripe-elements';
import { savePurchases } from 'xi-core/products/actions';
import { getCurrency } from 'xi-core/member/selectors';
import { getPwaPaymentProvider } from 'xi-core/config/selectors';
import { getStripePaymentsCountry } from '../../state/config/selectors';
import StripeProvider from './StripeProvider';
import {
  getPaymentMethodName,
  getLast4Digits,
  getExpMonth,
  getExpYear,
  getCardName,
} from './stripeTokenSelectors';

class PaymentRequestButton extends React.Component {
  constructor(props) {
    super(props);

    let paymentRequest;

    if (props.currency && props.stripePaymentsCountry && props.price) {
      // For full documentation of the available paymentRequest options, see:
      // https://stripe.com/docs/stripe.js#the-payment-request-object
      paymentRequest = props.stripe.paymentRequest({
        country: props.stripePaymentsCountry,
        currency: props.currency.toLowerCase(),
        total: {
          label: props.label,
          amount: Math.round(props.price * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
    } else {
      console.error('Payment request button - missing product details');
    }

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { paymentRequest } = this.state;
    const { savePurchases, finished } = this.props;

    if (paymentRequest) {
      paymentRequest.on(
        'token',
        ({ complete, token: stripeToken, payerName: googlePayPayerName, ...data }) => {
          savePurchases({
            token: stripeToken.id,
            paymentMethodName: getPaymentMethodName(stripeToken),
            last4Digits: getLast4Digits(stripeToken),
            expirationMonth: getExpMonth(stripeToken),
            expirationYear: getExpYear(stripeToken),
            cardHolderName: getCardName(stripeToken) || googlePayPayerName,
            retry: {
              active: true,
            },
          });
          complete('success');
          finished();
        }
      );

      paymentRequest.canMakePayment().then(result => {
        if (this._isMounted) {
          this.setState({ canMakePayment: !!result });
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { className } = this.props;
    const { canMakePayment, paymentRequest } = this.state;

    return canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={paymentRequest}
        className={`PaymentRequestButton ${className}`}
        style={{
          paymentRequestButton: {
            height: '64px',
          },
        }}
      />
    ) : null;
  }
}

export default compose(
  StripeProvider,
  connect(state => ({ paymentProvider: getPwaPaymentProvider(state) })),
  connect(
    state => ({
      currency: getCurrency(state),
      stripePaymentsCountry: getStripePaymentsCountry(state),
    }),
    (dispatch, { productId, paymentProvider }) => ({
      savePurchases: ({ ...saveProps }) =>
        dispatch(
          savePurchases({
            ...saveProps,
            provider: paymentProvider,
            offerExternalId: productId,
            retry: {
              active: true,
            },
          })
        ),
    })
  )
)(PaymentRequestButton);
