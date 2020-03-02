import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { PURCHASE_STEPS } from 'xi-core/products/constants';
import { fetchProducts } from 'xi-core/products/actions';
import { changePurchaseWizardStep } from 'xi-core/purchases/actions';
import { getPwaPaymentProvider } from 'xi-core/config/selectors';
import { getStep } from 'xi-core/purchases/selectors';
import ChooseProducts from './ChooseProducts';
import ProductPayment from './ProductPayment';

const getKeyFromStep = step =>
  Object.keys(PURCHASE_STEPS).find(key => PURCHASE_STEPS[key] === step);

export default WrappedComponent => {
  class PurchaseWizard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedProduct: null,
      };
    }

    stepComponents = backButton => {
      const { changePurchaseWizardStep, closePurchaseWizard } = this.props;
      const { selectedProduct } = this.state;

      const standardProps = {
        changeStep: changePurchaseWizardStep,
        closeWizard: closePurchaseWizard,
        product: selectedProduct,
        backButton,
      };

      return {
        ChooseProducts: (
          <ChooseProducts {...standardProps} selectProduct={this.setSelectedProduct} />
        ),
        ProductPayment: <ProductPayment {...standardProps} />,
      };
    };

    setSelectedProduct = selectedProduct => this.setState({ selectedProduct });

    getCurrentStep = (step, backButton) => {
      return this.stepComponents(backButton)[getKeyFromStep(step)];
    };

    getPreviousStep = currentStep => {
      switch (currentStep) {
        default:
          return PURCHASE_STEPS[getKeyFromStep(currentStep - 1)];
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getCurrentStep={this.getCurrentStep}
          getPreviousStep={this.getPreviousStep}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    step: getStep(state),
  });

  const mapDispatchToProps = (dispatch, { history, paymentProvider }) => ({
    changePurchaseWizardStep: (nextStep, custom = {}) =>
      dispatch(changePurchaseWizardStep({ history, nextStep, custom })),
    fetchProducts: () => dispatch(fetchProducts({ provider: paymentProvider })),
  });

  return compose(
    withRouter,
    connect(state => ({ paymentProvider: getPwaPaymentProvider(state) })),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(PurchaseWizard);
};
