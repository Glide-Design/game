import React from 'react';
import styled, { css } from 'styled-components';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { get, compose } from 'lodash/fp';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import purchasesFormValidation from 'xi-core/purchases/formValidation';
import { Grey85, Grey20 } from 'xi-core/colours';
import { logglyRuntimeError } from 'xi-core/app/actions';
import { requestStripeToken } from 'xi-core/purchases/actions';
import appMessages from 'xi-core/locale/app';
import LoaderCircularSpinner from '../../common/LoaderCircularSpinner';
import { TextFieldReduxForm, ErrorMsg } from '../../common/TextField';
import { Button1 } from '../../common/buttons';
import { Body1, Input } from '../../common/typography';
import StripeProvider from './StripeProvider';
import {
  getPaymentMethodName,
  getLast4Digits,
  getExpMonth,
  getExpYear,
  getCardName,
  getExternalReference,
} from './stripeTokenSelectors';
import mastercard from './mastercard.png';
import visa from './visa.png';
import amex from './amex.png';

const Form = styled.form`
  input {
    width: 100%;
    ${Input};
  }
  color: ${Grey85};
  ${Body1};
`;

const StyledTextField = styled(TextFieldReduxForm)`
  border-bottom: 1px solid ${Grey20};
  ${Body1};
  color: ${Grey85};
  &:-webkit-autofill {
    -webkit-text-fill-color: ${Grey85} !important;
  }
`;

const StyledPrimaryButton = styled(Button1)`
  margin: 30px 0 0;
  width: 100%;
`;

const StripeElementCss = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Grey20};
  height: 47px;
  > div {
    flex: 1;
  }
`;

const StripeRow = styled.div`
  ${StripeElementCss};
`;

const StripeCell1 = styled.div`
  ${StripeElementCss};
  float: left;
  width: 50%;
`;

const StripeCell2 = styled.div`
  ${StripeElementCss};
  float: left;
  width: calc(50% - 15px);
  border-left: 1px solid ${Grey20};
  padding-left: 14px;
`;

const ClearFix = styled.div`
  :after {
    content: '';
    clear: both;
    display: table;
  }
`;

const CardsContainer = styled.div`
  border: 1px solid ${Grey20};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 47px;
`;

const CardImg = styled.img`
  margin-left: 5px;
  margin-right: 5px;
`;

const StripeElementStyle = {
  base: { fontSize: '14px', color: Grey85 },
  empty: { fontSize: '14px' },
};

const validate = values => purchasesFormValidation.nameOnCard('name', values);

class PaymentForm extends React.Component {
  state = {
    stripeCardValid: false,
    stripeExpiryValid: false,
    stripeCVCValid: false,
  };

  stripeElementsValid = () => {
    const { stripeCardValid, stripeExpiryValid, stripeCVCValid } = this.state;
    return stripeCardValid && stripeExpiryValid && stripeCVCValid;
  };

  render() {
    const {
      valid: nonStripeElementsValid,
      fetchingStripeToken,
      submitLabel,
      handleSubmit,
      submitting,
      error,
    } = this.props;

    const payDisabled =
      !nonStripeElementsValid || !this.stripeElementsValid() || fetchingStripeToken || submitting;

    return (
      <Form onSubmit={handleSubmit}>
        <CardsContainer>
          <CardImg src={mastercard} alt="Mastercard" />
          <CardImg src={visa} alt="Visa" />
          <CardImg src={amex} alt="American Express" />
        </CardsContainer>
        <FormattedMessage id="paymentForm.nameOnCard" defaultMessage="Name on card">
          {placeholder => (
            <Field
              name="name"
              type="text"
              placeholder={placeholder}
              component={StyledTextField}
              data-test-id="card-name"
            />
          )}
        </FormattedMessage>
        <StripeRow data-test-id="card-number">
          <FormattedMessage id="paymentForm.cardNumber" defaultMessage="Card number">
            {placeholder => (
              <CardNumberElement
                style={StripeElementStyle}
                onChange={e => this.setState({ stripeCardValid: !e.error })}
                placeholder={placeholder}
              />
            )}
          </FormattedMessage>
        </StripeRow>
        <StripeCell1 data-test-id="mm-yy">
          <CardExpiryElement
            style={StripeElementStyle}
            onChange={e => this.setState({ stripeExpiryValid: !e.error })}
          />
        </StripeCell1>
        <StripeCell2 data-test-id="cvc">
          <CardCVCElement
            style={StripeElementStyle}
            onChange={e => this.setState({ stripeCVCValid: !e.error })}
          />
        </StripeCell2>
        <ClearFix />
        <StyledPrimaryButton disabled={payDisabled} data-test-id="pay">
          {submitLabel}
        </StyledPrimaryButton>
        {error && (
          <ErrorMsg>
            <FormattedMessage {...error} />
          </ErrorMsg>
        )}
        {submitting && <LoaderCircularSpinner />}
      </Form>
    );
  }
}

export default compose(
  StripeProvider,
  connect(
    state => ({
      nonStripeElementValues: get('form.paymentForm.values', state),
      fetchingStripeToken: get('purchases.fetchingStripeToken', state),
    }),
    {
      requestStripeToken,
    }
  ),
  reduxForm({
    form: 'paymentForm',
    validate,
    onSubmit: async (nonStripeElementValues, dispatch, props) => {
      const { requestStripeToken, stripe, onSubmitPaymentMethod } = props;
      try {
        const stripeToken = await requestStripeToken(stripe, nonStripeElementValues);

        const paymentMethod = {
          paymentProcessor: 'STRIPE',
          cardHolderName: getCardName(stripeToken),
          externalReference: getExternalReference(stripeToken),
          expirationYear: getExpYear(stripeToken),
          expirationMonth: getExpMonth(stripeToken),
          name: getPaymentMethodName(stripeToken),
          last4Digits: getLast4Digits(stripeToken),
        };

        await onSubmitPaymentMethod(paymentMethod);
      } catch (err) {
        console.error(err);
        dispatch(
          logglyRuntimeError({
            message: err.message,
          })
        );
        throw new SubmissionError({
          _error: appMessages.submit_error,
        });
      }
    },
  })
)(PaymentForm);
