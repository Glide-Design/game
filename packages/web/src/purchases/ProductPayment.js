import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getOr, get, compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { PURCHASE_STEPS } from 'xi-core/products/constants';
import { OfferValidityPeriod } from 'xi-core/products/components';
import { isAppFocused } from 'xi-core/app/selectors';
import withProductInteractions from 'xi-core/products/withProductInteractions';
import { savePurchases, productPageInteraction } from 'xi-core/products/actions';
import { getProductName, isFreeProduct } from 'xi-core/products/selectors';
import { Grey5, Grey85 } from 'xi-core/colours';
import { PropertyKeys, PropertyKeyValues } from 'xi-core/analytics/analyticEvents';
import { getPwaPaymentProvider, getExternalLink } from 'xi-core/config/selectors';
import { Body1, H3 } from '../common/typography';
import { CoreDevices, NAVBAR_HEIGHT_PX, ContainerPaddingCss } from '../common/dimensions';
import PaymentForm from './components/PaymentForm';
import PaymentRequestButton from './components/PaymentRequestButton';
import Price from './components/Price';
import { checkAppLostFocus } from './ChooseProducts/ChooseProducts';

const Custom_Large_Media = '(min-width: 1025px) AND (max-width: 1400px)';

const OutterWrapper = styled.div`
  height: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  background: ${Grey5};
  background-image: url(/images/backgrounds/white/small/bg-image.png);
  color: ${Grey5};
  position: relative;
  ${ContainerPaddingCss}
  padding-top: ${NAVBAR_HEIGHT_PX.small}px;
  box-sizing: border-box;

  @media ${CoreDevices.medium} {
    padding-top: 36px;
    color: ${Grey85};
    background-image: url(/images/backgrounds/white/medium/bg-image.png);
  }
  @media ${CoreDevices.large} {
    padding-top: 36px;
    color: ${Grey85};
    background-image: url(/images/backgrounds/white/large/bg-image.png);
  }
`;

const StyledPaymentRequestButton = styled(PaymentRequestButton)`
  margin-top: 24px;
`;

const InnerWrapper = styled.div`
  margin: auto;
  color: ${Grey85};
  display: flex;
  flex-direction: column;
  max-width: 460px;

  @media ${CoreDevices.large} {
    max-width: 900px;
  }
  @media ${Custom_Large_Media} {
    max-width: 600px;
  }
`;

const HeaderBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${Grey85};
  height: 60px;
  width: 100%;
  text-align: center;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    display: none;
  }
`;

const Title = styled.div`
  ${H3};
  margin-top: 24px;
`;

const Description = styled.div`
  ${Body1};
  margin-top: 15px;
  margin-bottom: 24px;
`;

const TermText = styled.p`
  ${Body1};
`;

const PaymentFormWrapper = styled.div`
  margin: 24px 0 35px;
  box-sizing: border-box;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.4);
  background: white;
  padding: 27px;
  color: white;
`;

const Terms = styled.div`
  padding: 0 10px;
  margin-bottom: 24px;
  a {
    text-decoration: underline;
  }

  @media ${CoreDevices.large} {
    margin-top: 30px;
    margin-bottom: 0;
    padding: 0;
  }
`;

const smallWhiteSquareUtf8 = '\u25ab';

class ProductPayment extends React.Component {
  constructor(props) {
    super(props);

    if (!props.product) {
      this.props.changeStep(PURCHASE_STEPS.ChooseProducts);
    }
  }

  componentDidUpdate(prevProps) {
    checkAppLostFocus(prevProps.appFocused, this.props);
  }

  handleSubmitPaymentMethod = async purchaseMethod => {
    const { closeWizard, product, savePurchases, paymentProvider } = this.props;
    await savePurchases({
      provider: paymentProvider,
      token: purchaseMethod.externalReference,
      offerExternalId: product.externalId,
      paymentMethodName: purchaseMethod.name,
      last4Digits: purchaseMethod.last4Digits,
      expirationMonth: purchaseMethod.expirationMonth,
      expirationYear: purchaseMethod.expirationYear,
      cardHolderName: purchaseMethod.cardHolderName,
      retry: {
        active: true,
      },
    });
    closeWizard();
  };

  termsClick = () =>
    this.props.productPageInteraction(
      PropertyKeys.PRODUCT_INTERACTIONS.TERMS_USE,
      true,
      PropertyKeyValues.PRODUCT_INTERACTIONS.PAGE.PAYMENT
    );

  render() {
    const { product: offer, backButton, termsLink } = this.props;
    if (!offer) {
      return null;
    }

    const price = getOr({}, 'prices[0]', offer);

    const isFreeTrial = isFreeProduct(offer);
    // const freePeriod = get('enablement.freePeriod', offer);
    // const freePeriodType = get('enablement.freePeriodType', offer);

    return (
      <OutterWrapper>
        <HeaderBar />
        {backButton}
        <InnerWrapper>
          <Title>
            {isFreeTrial ? (
              <FormattedMessage
                id="productPayment.freeTrialProductName"
                defaultMessage="Monthly Membership"
              />
            ) : (
              <React.Fragment>
                {getProductName(offer.name)} {<Price price={price} />}
              </React.Fragment>
            )}
          </Title>
          <Description>
            {isFreeTrial ? (
              <FormattedMessage
                id="purchase.freeTrialConditions"
                defaultMessage="One month free trial {smallWhiteSquareUtf8} Then {price}/month{lineBreak}Cancel anytime"
                values={{
                  smallWhiteSquareUtf8: smallWhiteSquareUtf8,
                  price: <Price price={price} />,
                  lineBreak: <br />,
                }}
              />
            ) : // // TODO bring back once below is consistent accross products/offers
            // <FormattedMessage
            //   id="purchase.freeTrialConditions"
            //   defaultMessage={`Free for {quantity} {period} ${smallWhiteSquareUtf8} Then only {price} a {singlePeriod}`}
            //   values={{
            //     quantity: freePeriod,
            //     period: (
            //       <OfferValidityPeriod
            //         validityPeriod={freePeriod}
            //         validityPeriodType={freePeriodType}
            //       />
            //     ),
            //     price: <Price price={price} />,
            //     singlePeriod: (
            //       <OfferValidityPeriod validityPeriod={1} validityPeriodType={freePeriodType} />
            //     ),
            //   }}
            // />
            // TODO there's no translated offer descriptions so don't display them for now
            // offer.description
            null}
          </Description>

          <StyledPaymentRequestButton
            label={offer.description}
            price={price.price}
            currency={price.iso4127CurrencyCode}
            productId={offer.externalId}
            finished={() => this.props.closeWizard()}
          />

          <PaymentFormWrapper>
            <PaymentForm
              productId={offer.externalId}
              submitLabel={
                isFreeTrial ? (
                  <FormattedMessage
                    id="productPayment.activateFreeTrial"
                    defaultMessage="Activate free trial"
                  />
                ) : (
                  <FormattedMessage
                    id="productPayment.pay"
                    defaultMessage="Pay {price}"
                    values={{ price: <Price price={price} /> }}
                  />
                )
              }
              onSubmitPaymentMethod={this.handleSubmitPaymentMethod}
            />
          </PaymentFormWrapper>

          <Terms>
            <TermText>
              {isFreeTrial ? (
                <FormattedMessage
                  id="productPayment.authoriseFreeTrialTerms"
                  defaultMessage="By clicking Activate free trial you confirm you have permission from the registered card holder. We'll charge you every month unless you cancel your subscription. See the full terms {link}."
                  values={{
                    link: (
                      <a
                        target="_blank"
                        href={termsLink}
                        rel="noopener noreferrer"
                        onClick={this.termsClick}
                      >
                        <FormattedMessage id="productPayment.here" defaultMessage="here" />
                      </a>
                    ),
                  }}
                />
              ) : (
                <FormattedMessage
                  id="productPayment.authoriseTerms"
                  defaultMessage="By clicking Pay you confirm you have permission from the registered card holder. We'll charge you every {validityPeriod} unless you cancel your subscription. See the full terms {link}."
                  values={{
                    validityPeriod: (
                      <OfferValidityPeriod
                        validityPeriod={get(('enablement.validityPeriod', offer))}
                        validityPeriodType={get(('enablement.validityPeriodType', offer))}
                      />
                    ),
                    link: (
                      <a
                        target="_blank"
                        href={termsLink}
                        rel="noopener noreferrer"
                        onClick={this.termsClick}
                      >
                        <FormattedMessage id="productPayment.here" defaultMessage="here" />
                      </a>
                    ),
                  }}
                />
              )}
            </TermText>
          </Terms>
        </InnerWrapper>
      </OutterWrapper>
    );
  }
}

export default compose(
  connect(
    state => ({
      termsLink: getExternalLink('termsConditions')(state),
      paymentProvider: getPwaPaymentProvider(state),
      appFocused: isAppFocused(state),
    }),
    { productPageInteraction, savePurchases }
  ),
  withProductInteractions({
    ignoreProductsLoadedEvent: true,
    [PropertyKeys.PRODUCT_INTERACTIONS.PAGE]: PropertyKeyValues.PRODUCT_INTERACTIONS.PAGE.PAYMENT,
  })
)(ProductPayment);
