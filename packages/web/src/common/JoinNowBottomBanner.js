import React, { Component } from 'react';
import styled from 'styled-components';
import raf from 'raf';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { getEligibleForTrial } from 'xi-core/member/selectors';
import { showPurchaseWizard } from 'xi-core/purchases/actions';
import { CoreDevices, HelperDevices, posFixedZIndex, NAVBAR_HEIGHT_PX } from '../common/dimensions';
import { SolidGreenButton } from '../common/buttons';

const SignupBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 36px;
  box-sizing: border-box;
  z-index: ${posFixedZIndex.signupBanner};
  transition: all 0.4s ease;

  @media ${CoreDevices.medium} {
    bottom: ${NAVBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.small} {
    bottom: ${NAVBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.tiny} {
    bottom: ${NAVBAR_HEIGHT_PX.tiny}px;
  }

  @media ${HelperDevices.belowMedium}, ${HelperDevices.belowMediumLandscape} {
    padding: 24px;
  }

  &.hide {
    transform: translateY(200%);
  }

  &.show {
    transform: translateY(0);
  }
`;

const StyledSolidGreenButton = styled(SolidGreenButton)`
  flex-basis: auto;
  padding: 12px 0;
  width: 50%;

  @media ${CoreDevices.large} {
    font-size: 20px;
  }

  @media ${HelperDevices.belowMedium}, ${HelperDevices.belowMediumLandscape} {
    width: 100%;
  }
`;

class JoinNowBottomBanner extends Component {
  state = {
    hidden: true,
    lastScrollY: 0,
  };

  handlingScrollUpdate = false;

  getScrollY() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    } else if (window.scrollTop !== undefined) {
      return window.scrollTop;
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
  }

  handleScroll = () => {
    if (!this.handlingScrollUpdate) {
      this.handlingScrollUpdate = true;
      raf(this.updateScroll);
    }
  };

  updateScroll = () => {
    let currentScrollY = this.getScrollY();

    this.setState({
      hidden: currentScrollY <= this.state.lastScrollY,
      lastScrollY: currentScrollY,
    });

    this.handlingScrollUpdate = false;
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { showPurchaseWizard, hasHadFreeTrial } = this.props;
    const { hidden } = this.state;

    return (
      <SignupBanner className={hidden ? 'hide' : 'show'} >
        <StyledSolidGreenButton
          onClick={() => showPurchaseWizard()}
          data-test-id={!hasHadFreeTrial ? 'start-free-banner' : 'subscribe-banner'}
        >
          {!hasHadFreeTrial ? (
            <FormattedMessage id="stickyBanner.freeTrialCta" defaultMessage="Get full access – Start free trial" />
          ) : (
            <FormattedMessage id="stickyBanner.cta" defaultMessage="Get full access – Subscribe now" />
          )}
        </StyledSolidGreenButton>
      </SignupBanner>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  showPurchaseWizard: () => dispatch(showPurchaseWizard({ history: history })),
});

const mapStateToProps = state => ({
  hasHadFreeTrial: !getEligibleForTrial(state),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(JoinNowBottomBanner);
