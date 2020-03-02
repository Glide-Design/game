import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getExternalLink } from 'xi-core/config/selectors';
import { DarkerGreen } from 'xi-core/colours';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { productPageInteraction } from 'xi-core/products/actions';
import { CoreDevices } from '../../common/dimensions';

const Help = styled.div`
  margin-top: 66px;
  text-align: center;
  max-width: 75%;

  @media ${CoreDevices.large} {
    max-width: 45%;
  }

  a {
    color: ${DarkerGreen};
  }
`;

const ProductHelp = ({ helpLink, productPageInteraction }) => (
  <Help>
    <p>
      <FormattedMessage
        id="marketing.have_questions"
        defaultMessage="Need help? Take a look at our {faqsLink}."
        values={{
          faqsLink: (
            <a
              target="_blank"
              href={helpLink}
              onClick={() => productPageInteraction(PropertyKeys.PRODUCT_INTERACTIONS.HELP)}
            >
              <FormattedMessage id="marketing.help_link" defaultMessage="FAQs" />
            </a>
          ),
        }}
      />
    </p>
  </Help>
);

const ConnectedProductHelp = connect(
  state => ({
    helpLink: getExternalLink('help')(state),
  }),
  { productPageInteraction }
)(ProductHelp);

export default ConnectedProductHelp;
