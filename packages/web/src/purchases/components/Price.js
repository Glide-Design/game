import React from 'react';
import { IntlProvider, FormattedNumber } from 'react-intl';

const Price = ({ price = {} }) => {
  return (
    <IntlProvider locale="en">
      <FormattedNumber
        value={price.price}
        currency={price.iso4127CurrencyCode}
        style="currency" // eslint-disable-line react/style-prop-object
      />
    </IntlProvider>
  );
};

export default Price;
