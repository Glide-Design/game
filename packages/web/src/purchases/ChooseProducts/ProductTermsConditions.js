import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getExternalLink } from 'xi-core/config/selectors';
import { DarkerGreen } from 'xi-core/colours';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { productPageInteraction } from 'xi-core/products/actions';
import { CoreDevices } from '../../common/dimensions';

const Terms = styled.div`
  margin-top: 48px;
  text-align: center;
  max-width: 75%;
  color: #ccc;
  @media ${CoreDevices.small} {
    font-size: 12px;
  }
  @media ${CoreDevices.tiny} {
    font-size: 11px;
  }
  @media ${CoreDevices.large} {
    max-width: 45%;
  }
  a {
    color: ${DarkerGreen};
  }
`;

const ProductTermsConditions = ({
  isFreeTrialProduct = false,
  termsLink,
  productPageInteraction,
}) => (
  <Terms>
    <p>
      <FormattedMessage
        id="product.termsPWA"
        defaultMessage="Payment is charged upon confirmation of purchase or at the end of the free trial (if applicable). Your membership will renew automatically unless you cancel your subscription. Your account will be charged for renewal within 24 hours prior to the end of the current period."
      />
    </p>
    <FormattedMessage
      id="product.termlinks"
      defaultMessage="See the full {termsLink}."
      values={{
        termsLink: (
          <a
            target="_blank"
            href={termsLink}
            rel="noopener noreferrer"
            onClick={() => productPageInteraction(PropertyKeys.PRODUCT_INTERACTIONS.TERMS_USE)}
          >
            <FormattedMessage id="productPayment.terms" defaultMessage="terms" />
          </a>
        ),
      }}
    />
  </Terms>
);

const ConnectedProductTermsConditions = connect(
  state => ({
    termsLink: getExternalLink('termsConditions')(state),
  }),
  { productPageInteraction }
)(ProductTermsConditions);

export default ConnectedProductTermsConditions;
