import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { CheckboxReduxForm } from '../../common/Checkbox';

export default () => (
  <Field
    label={
      <FormattedMessage
        id="signup_send_email.agree_partner_marketing12"
        defaultMessage="I'd like to hear from OTRO's carefully selected partners too."
      />
    }
    name="allowPartnerConsent"
    component={CheckboxReduxForm}
  />
);
