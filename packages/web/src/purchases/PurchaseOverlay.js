import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, isEmpty } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { getFetchProductsError } from 'xi-core/member/selectors';
import { PURCHASE_STEPS } from 'xi-core/products/constants';
import { getProducts } from 'xi-core/products/selectors';
import { isOpen } from 'xi-core/purchases/selectors';
import { closePurchaseWizard } from 'xi-core/purchases/actions';
import Overlay from '../common/overlay';
import OverlayCloseButton from '../common/OverlayCloseButton';
import PurchaseWizard from './PurchaseWizard';

class PurchaseOverlay extends React.Component {
  componentDidMount(prevProps) {
    const { products, fetchProducts, open } = this.props;
    if (open && isEmpty(products)) {
      fetchProducts();
    }
  }

  componentDidUpdate(prevProps) {
    const { products, fetchProducts, fetchProductsError } = this.props;

    if (this.justOpened(prevProps.open) && (isEmpty(products) || fetchProductsError)) {
      fetchProducts();
    }
  }

  justOpened = prevOpen => !prevOpen && this.props.open;

  getBackButton = () => {
    const { step, closePurchaseWizard, changePurchaseWizardStep, getPreviousStep } = this.props;
    return (
      <OverlayCloseButton
        onClick={() => {
          return step === PURCHASE_STEPS.ChooseProducts
            ? closePurchaseWizard()
            : changePurchaseWizardStep(getPreviousStep(step));
        }}
      />
    );
  };

  render() {
    const { open, step, getCurrentStep } = this.props;

    return (
      <Overlay open={open} memory={step} fullScreen>
        {({ memory: step }) => {
          return <Fragment>{getCurrentStep(step, this.getBackButton())}</Fragment>;
        }}
      </Overlay>
    );
  }
}

const mapStateToProps = state => ({
  open: isOpen(state),
  products: getProducts(state),
  fetchProductsError: getFetchProductsError(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  closePurchaseWizard: () => dispatch(closePurchaseWizard(history)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  PurchaseWizard
)(PurchaseOverlay);
