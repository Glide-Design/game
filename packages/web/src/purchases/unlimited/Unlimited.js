import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withProps } from 'recompose';
import styled from 'styled-components';
import { compose } from 'lodash/fp';
import { isAuthenticated } from 'xi-core/member/selectors';
import { isOpen } from 'xi-core/purchases/selectors';
import { isOpen as isAuthWizardOpen } from 'xi-core/signup/selectors';
import { showPurchaseWizard } from 'xi-core/purchases/actions';
import { isPremium } from 'xi-core/member/selectors';
import { showAuthWizard } from 'xi-core/signup/actions';
import { PURCHASE_STEPS } from 'xi-core/products/constants';
import { NAVBAR_HEIGHT_PX, CoreDevices } from '../../common/dimensions';
import OverlayBackButton from '../../common/OverlayBackButton';
import { routes } from '../../App';
import { getTargetDevice } from '../../state/app/selectors';
import PurchaseWizard from '../PurchaseWizard';

const Container = styled.div`
  @media ${CoreDevices.tiny}, ${CoreDevices.small} {
    height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
  }
  @media ${CoreDevices.medium} {
    height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
  }
  @media ${CoreDevices.large} {
    height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
  }
`;

class Unlimited extends React.Component {
  componentDidMount() {
    const { isPremium, closePurchaseWizard, fetchProducts } = this.props;
    if (isPremium) {
      closePurchaseWizard();
    } else {
      fetchProducts();
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      showAuthWizard,
      closePurchaseWizard,
      isAuthenticated,
      showPurchaseWizard,
      isPremium,
      open,
      authWizardOpen,
    } = this.props;

    const authWizardJustClosed = this.authWizardJustClosed(prevProps.authWizardOpen);
    if (!authWizardJustClosed && !isAuthenticated) {
      showAuthWizard();
    } else if (authWizardJustClosed && !isAuthenticated) {
      closePurchaseWizard();
    } else if (authWizardJustClosed) {
      if (isPremium) {
        closePurchaseWizard();
      } else {
        showPurchaseWizard();
      }
    } else if (!open && !authWizardOpen) {
      showPurchaseWizard();
    }
  }

  authWizardJustClosed = prevAuthOpen => prevAuthOpen && !this.props.authWizardOpen;

  getBackButton = () => {
    const {
      step,
      getPreviousStep,
      closePurchaseWizard,
      changePurchaseWizardStep,
      targetDevice,
    } = this.props;
    return targetDevice === 'large' && step === PURCHASE_STEPS.ChooseProducts ? null : (
      <OverlayBackButton
        onClick={() =>
          step === PURCHASE_STEPS.ChooseProducts
            ? closePurchaseWizard()
            : changePurchaseWizardStep(getPreviousStep(step))
        }
      />
    );
  };

  render = () => {
    const { step, getCurrentStep } = this.props;
    return (
      <Fragment>
        <Container>{getCurrentStep(step, this.getBackButton())}</Container>
      </Fragment>
    );
  };
}

export default compose(
  withProps(({ history }) => ({
    closePurchaseWizard: () => history.replace(routes.discovery.path),
  })),
  PurchaseWizard,
  connect(
    state => ({
      isAuthenticated: isAuthenticated(state),
      open: isOpen(state),
      isPremium: isPremium(state),
      authWizardOpen: isAuthWizardOpen(state),
      targetDevice: getTargetDevice(state),
    }),
    (dispatch, { history }) => ({
      showPurchaseWizard: () => dispatch(showPurchaseWizard({ history, historyAction: 'replace' })),
      showAuthWizard: () => dispatch(showAuthWizard({ history })),
    })
  )
)(Unlimited);
