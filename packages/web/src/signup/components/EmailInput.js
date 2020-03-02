import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import SignInTextField from './SignInTextField';

export const emailAddressPlaceholder = children => (
  <FormattedMessage id="signInEmail.emailAddress" defaultMessage="Email address...">
    {placeholder => children(placeholder)}
  </FormattedMessage>
);

const enterYourEmailPlaceHolder = children => (
  <FormattedMessage id="signInEmail.enterYourEmail" defaultMessage="Enter your email">
    {placeholder => children(placeholder)}
  </FormattedMessage>
);

export default ({ getPlaceholder = enterYourEmailPlaceHolder, disabled = false }) =>
  getPlaceholder(placeholder => (
    <Field
      disabled={disabled}
      name="email"
      type="email"
      placeholder={placeholder}
      component={SignInTextField}
      normalize={v => v.toLowerCase()}
    />
  ));
