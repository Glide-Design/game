import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

export const DifferenceInSeconds = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / 1000);
};

export const DifferenceInMinutes = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / (1000 * 60));
};

export const DifferenceInHours = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / (1000 * 60 * 60));
};

export const DifferenceInDays = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
};

export const DifferenceInWeeks = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24 * 7));
};

export const DifferenceInYears = (firstDate, secondDate) => {
  return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24 * 365));
};

export const GetFormattedRelativeTimeValue = ({ timestamp }) => {
  const now = Date.now();

  let timestampUnit = <FormattedMessage id="howLongAgo.yearsShorthand" defaultMessage="y" />;
  let value = DifferenceInYears(timestamp, now);
  if (DifferenceInWeeks(timestamp, now) !== 0) {
    timestampUnit = <FormattedMessage id="howLongAgo.weeksShorthand" defaultMessage="w" />;
    value = DifferenceInWeeks(timestamp, now);
  } else if (DifferenceInDays(timestamp, now) !== 0) {
    timestampUnit = <FormattedMessage id="howLongAgo.daysShorthand" defaultMessage="d" />;
    value = DifferenceInDays(timestamp, now);
  } else if (DifferenceInHours(timestamp, now) !== 0) {
    timestampUnit = <FormattedMessage id="howLongAgo.hoursShorthand" defaultMessage="h" />;
    value = DifferenceInHours(timestamp, now);
  } else if (DifferenceInMinutes(timestamp, now) !== 0) {
    timestampUnit = <FormattedMessage id="howLongAgo.minutesShorthand" defaultMessage="m" />;
    value = DifferenceInMinutes(timestamp, now);
  } else {
    timestampUnit = <FormattedMessage id="howLongAgo.secondsShorthand" defaultMessage="s" />;
    value = DifferenceInSeconds(timestamp, now);
  }

  return (
    <Fragment>
      {value} {timestampUnit}
    </Fragment>
  );
};

export default GetFormattedRelativeTimeValue;
