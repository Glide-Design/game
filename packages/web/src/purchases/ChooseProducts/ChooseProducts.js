import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose, isEmpty } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropertyKeyValues } from 'xi-core/analytics/analyticEvents';
import { productPageInteraction } from 'xi-core/products/actions';
import {
  isAuthenticated,
  getFetchProductsError,
  getEligibleForTrial,
} from 'xi-core/member/selectors';
import { getFreeProducts, getPaidProducts } from 'xi-core/products/selectors';
import withProductInteractions from 'xi-core/products/withProductInteractions';
import { Grey85, ValidationRed } from 'xi-core/colours';
import { pushOverlayQueue } from 'xi-core/overlays/actions';
import { isAppFocused } from 'xi-core/app/selectors';
import { getIsDuringCreation } from 'xi-core/purchases/selectors';
import { SolidGreenButton } from '../../common/buttons';
import LoaderSpinner from '../../common/LoaderSpinner';
import Progress from '../../common/Progress';
import { CoreDevices, ContainerPaddingCss } from '../../common/dimensions';
import LogoIcon from '../../common/icons/Logo';
import { Body1, Body10, FontFamily } from '../../common/typography';
import ProductTermsConditions from './ProductTermsConditions';
import ProductHelp from './ProductHelp';
import ProductButton from './ProductButton';

const ScrollWrapper = styled.div`
  height: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  background: ${Grey85};
  color: #fff;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 40px;
`;

const GreySection = styled(Section)`
  background: ${Grey85};
  color: #fff;
  padding-bottom: 48px;
`;

const StyledLogoIcon = styled(LogoIcon)`
  margin-top: 40px;
  height: 17px;
  flex-shrink: 0;
  margin-bottom: 40px;
  @media ${CoreDevices.small} {
    margin-top: 30px;
  }
  @media ${CoreDevices.medium} {
    height: 38px;
    margin-top: 50px;
  }
  @media ${CoreDevices.large} {
    height: 78px;
    margin-top: 100px;
  }
`;

const Heading = styled.div`
  ${FontFamily.bold};
  flex-shrink: 0;
  text-align: center;
  display: flex;
  align-items: center;
  max-width: 75%;
  margin-bottom: 48px;
  font-size: 20px;

  @media ${CoreDevices.small} {
    font-size: 24px;
  }
  @media ${CoreDevices.medium} {
    font-size: 40px;
  }
  @media ${CoreDevices.large} {
    font-size: 48px;
    max-width: 45%;
  }
`;

const StyledProductHeading = styled(Heading)`
  margin-bottom: 0px;
  font-size: 32px;
  @media ${CoreDevices.medium} {
    font-size: 40px;
  }
  @media ${CoreDevices.large} {
    font-size: 48px;
    max-width: 45%;
  }
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: ${ValidationRed};
  ${ContainerPaddingCss};
  position: relative;
  left: -21px;
  ${Body1}

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
`;

const StyledGreenButton = styled(SolidGreenButton)`
  margin-top: 20px;
`;

const StyledLoaderSpinner = styled(LoaderSpinner)`
  text-align: center;
  & svg {
    fill: ${Grey85};
  }
`;

const MarketingImage = styled.div`
  width: 263px;
  height: 134px;
  background-image: url(${props => props.tinyUrl});
  background-size: cover;
  margin-bottom: 15px;

  @media ${CoreDevices.small} {
    width: 329px;
    height: 185px;
    background-image: url(${props => props.smallUrl});
  }
  @media ${CoreDevices.medium} {
    width: 683px;
    height: 349px;
    background-image: url(${props => props.mediumUrl});
  }
  @media ${CoreDevices.large} {
    width: 1115px;
    height: 569px;
    background-image: url(${props => props.largeUrl});
  }
`;

export const checkAppLostFocus = (prevAppState, props) => {
  const { appFocused, appStateEvent } = props;
  if (prevAppState !== appFocused && appFocused === false) {
    appStateEvent(PropertyKeyValues.PRODUCT_INTERACTIONS.APP_STATE.LOST_FOCUS);
  }
};

class ChooseProducts extends React.Component {
  componentDidUpdate(prevProps) {
    checkAppLostFocus(prevProps.appFocused, this.props);
  }

  handleScroll = ({ target }) => {
    const scrollOffset = target.scrollTop + target.offsetHeight;
    const contentHeight = target.scrollHeight;
    this.props.handleScroll(scrollOffset, contentHeight);
  };

  renderProducts = ({ bottom = false }) => {
    const {
      isAuthenticated,
      pushOverlayQueue,
      closeWizard,
      selectProduct,
      changeStep,
      products = [],
    } = this.props;

    if (isAuthenticated) {
      return products.map(product => (
        <ProductButton
          product={product}
          selectProduct={selectProduct}
          changeStep={changeStep}
          bottom={bottom}
        />
      ));
    }
    return (
      <StyledGreenButton
        onClick={() => {
          pushOverlayQueue({ type: 'signup' });
          pushOverlayQueue({ type: 'purchases' });
          closeWizard();
        }}
        data-test-id="premium-sign-in"
      >
        <FormattedMessage
          id="payment.signin_to_go_premium"
          defaultMessage="Sign in to go Unlimited"
        />
      </StyledGreenButton>
    );
  };

  render() {
    const {
      products = [],
      backButton,
      fetchProductsError,
      isEligibleForTrial,
      isDuringCreation,
    } = this.props;

    return (
      <ScrollWrapper onScroll={this.handleScroll}>
        {isDuringCreation ? <Progress steps={4} currentStep={4} position="relative" /> : null}
        <GreySection>
          {backButton}
          <StyledLogoIcon />
          <StyledProductHeading>
            {isEligibleForTrial ? (
              <FormattedMessage
                id="chooseProducts.freeTrialSubtitle"
                defaultMessage="GET FULL ACCESS"
              />
            ) : (
              <FormattedMessage id="chooseProducts.subtitle" defaultMessage="GET FULL ACCESS" />
            )}
          </StyledProductHeading>
          <ProductsWrapper>
            {fetchProductsError ? (
              <ErrorMessage>
                <FormattedMessage
                  id="purchase.no_products"
                  defaultMessage="There was a problem with loading the products. Please try again."
                />
              </ErrorMessage>
            ) : isEmpty(products) ? (
              <StyledLoaderSpinner />
            ) : null}
            {this.renderProducts({ bottom: false })}
          </ProductsWrapper>
        </GreySection>
        <Section>
          <MarketingImage
            tinyUrl="/images/marketing1_tiny.jpg"
            smallUrl="/images/marketing1_small.jpg"
            mediumUrl="/images/marketing1_medium.jpg"
            largeUrl="/images/marketing1_large.jpg"
          />
          <Heading>
            <FormattedMessage
              id="chooseProducts.content.1"
              defaultMessage="GET CLOSER THAN EVER TO THE WORLD'S GREATEST FOOTBALLERS"
            />
          </Heading>
          <MarketingImage
            tinyUrl="/images/marketing2_tiny.jpg"
            smallUrl="/images/marketing2_small.jpg"
            mediumUrl="/images/marketing2_medium.jpg"
            largeUrl="/images/marketing2_large.jpg"
          />
          <Heading>
            <FormattedMessage
              id="chooseProducts.content.2"
              defaultMessage="WATCH ORIGINAL CONTENT, CREATED BY THE PLAYERS"
            />
          </Heading>
          <MarketingImage
            tinyUrl="/images/marketing3_tiny.jpg"
            smallUrl="/images/marketing3_small.jpg"
            mediumUrl="/images/marketing3_medium.jpg"
            largeUrl="/images/marketing3_large.jpg"
          />
          <Heading>
            <FormattedMessage
              id="chooseProducts.content.3"
              defaultMessage="ASK, COMMENT AND CHAT DIRECTLY WITH THE PLAYERS"
            />
          </Heading>
          <MarketingImage
            tinyUrl="/images/marketing4_tiny.jpg"
            smallUrl="/images/marketing4_small.jpg"
            mediumUrl="/images/marketing4_medium.jpg"
            largeUrl="/images/marketing4_large.jpg"
          />
          <Heading>
            <FormattedMessage
              id="chooseProducts.content.4"
              defaultMessage="WIN EXCLUSIVE 1-1 EXPERIENCES WITH THE PLAYERS"
            />
          </Heading>
          {this.renderProducts({ bottom: true })}
          <ProductTermsConditions isFreeTrialProduct={isEligibleForTrial} />
          <ProductHelp />
        </Section>
      </ScrollWrapper>
    );
  }
}

const mapStateToProps = state => {
  const isEligibleForTrial = getEligibleForTrial(state);

  return {
    products: isEligibleForTrial ? getFreeProducts(state) : getPaidProducts(state),
    fetchProductsError: getFetchProductsError(state),
    isAuthenticated: isAuthenticated(state),
    isEligibleForTrial,
    isDuringCreation: getIsDuringCreation(state),
    appFocused: isAppFocused(state),
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      pushOverlayQueue,
      productPageInteraction,
    }
  ),
  withProductInteractions({ productDescriptor: 'name' })
)(ChooseProducts);
