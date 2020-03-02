import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { PURCHASE_STEPS } from 'xi-core/products/constants';
import { getProductName, isFreeProduct } from 'xi-core/products/selectors';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { productPageInteraction } from 'xi-core/products/actions';
import styled from 'styled-components';
import { SolidGreenButton } from '../../common/buttons';
import { CoreDevices } from '../../common/dimensions';
import { Body1, Body10 } from '../../common/typography';
import Price from '../components/Price';

const ProductDescription = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 40px;
    ${Body10};
  }
  @media ${CoreDevices.large} {
    margin-bottom: 40px;
  }
`;

const StyledGreenButton = styled(SolidGreenButton)`
  margin-top: 20px;
  @media ${CoreDevices.small} {
    width: 329px;
  }
`;

const smallWhiteSquareUtf8 = '\u25ab';

const ProductButton = ({ product, selectProduct, changeStep, bottom, productPageInteraction }) => {
  const isFreeTrial = isFreeProduct(product);
  // const freePeriod = get('enablement.freePeriod', product);
  // const freePeriodType = get('enablement.freePeriodType', product);

  if (isFreeTrial) {
    return (
      <React.Fragment>
        {!bottom ? (
          <ProductDescription>
            <FormattedMessage
              id="purchase.freeTrialConditions"
              defaultMessage="One month free trial {smallWhiteSquareUtf8} Then {price}/month{lineBreak}Cancel anytime"
              values={{
                smallWhiteSquareUtf8: smallWhiteSquareUtf8,
                price: <Price price={product.prices[0]} />,
                lineBreak: <br />,
              }}
            />
            {/* <FormattedMessage
        id="purchase.freeTrialConditions"
        defaultMessage={`Free for {quantity} {period} ${smallWhiteSquareUtf8} Then only {price} a {singlePeriod}`}
        values={{
          quantity: freePeriod,
          period: (
            <OfferValidityPeriod
              validityPeriod={freePeriod}
              validityPeriodType={freePeriodType}
            />
          ),
          price: <Price price={product.prices[0]} />,
          singlePeriod: (
            <OfferValidityPeriod validityPeriod={1} validityPeriodType={freePeriodType} />
          ),
        }}
      /> */}
          </ProductDescription>
        ) : null}

        <StyledGreenButton
          key={product.externalId}
          onClick={() => {
            selectProduct(product);
            productPageInteraction(
              PropertyKeys.PRODUCT_INTERACTIONS.BUY_CTA_CLICKED,
              bottom ? 'bottom' : 'top'
            );
            changeStep(PURCHASE_STEPS.ProductPayment);
          }}
          data-test-id="freetrial-purchase"
          bottom={bottom}
        >
          <FormattedMessage
            id="purchase.startFreeTrial"
            defaultMessage="START ONE MONTH FREE TRIAL"
          />
        </StyledGreenButton>
      </React.Fragment>
    );
  }

  return (
    <StyledGreenButton
      key={product.externalId}
      onClick={() => {
        selectProduct(product);
        changeStep(PURCHASE_STEPS.ProductPayment);
      }}
      data-test-id={`freetrial-purchase-${product.name.toLowerCase()}`}
    >
      {getProductName(product.name)} {<Price price={product.prices[0]} />}
    </StyledGreenButton>
    // <FormattedMessage
    //   id="chooseProducts.moreExpensiveOffereBenefit"
    //   defaultMessage="(12 months for the price of 10)"
    // />
  );
};

export default connect(
  null,
  { productPageInteraction }
)(ProductButton);
