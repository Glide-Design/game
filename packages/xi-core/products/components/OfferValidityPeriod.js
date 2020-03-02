import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VALIDITY_PERIOD_TYPES } from '../constants';

class OfferValidityPeriod extends React.Component {
  render() {
    const { validityPeriod, validityPeriodType } = this.props;

    switch (validityPeriodType) {
      case VALIDITY_PERIOD_TYPES.YEARS:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodYears"
            defaultMessage="{validityPeriod, plural,
              one {year}
              other {# years}
            }"
            values={{ validityPeriod }}
          />
        );

      case VALIDITY_PERIOD_TYPES.MONTHS:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodMonths"
            defaultMessage="{validityPeriod, plural,
              one {month}
              other {# months}
            }"
            values={{ validityPeriod }}
          />
        );

      case VALIDITY_PERIOD_TYPES.WEEKS:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodWeeks"
            defaultMessage="{validityPeriod, plural,
              one {week}
              other {# weeks}
            }"
            values={{ validityPeriod }}
          />
        );

      case VALIDITY_PERIOD_TYPES.DAYS:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodDays"
            defaultMessage="{validityPeriod, plural,
              one {day}
              other {# days}
            }"
            values={{ validityPeriod }}
          />
        );

      case VALIDITY_PERIOD_TYPES.HOURS:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodHours"
            defaultMessage="{validityPeriod, plural,
              one {hour}
              other {# hours}
            }"
            values={{ validityPeriod }}
          />
        );

      case VALIDITY_PERIOD_TYPES.MINUTES:
        return (
          <FormattedMessage
            id="productPayment.validityPeriodMinutes"
            defaultMessage="{validityPeriod, plural,
              one {minute}
              other {# minutes}
            }"
            values={{ validityPeriod }}
          />
        );

      default:
        return null;
    }
  }
}

export default OfferValidityPeriod;
