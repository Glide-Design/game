import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { CheckboxReduxForm } from '../../common/Checkbox';

export default () => (
  <Field
    label={
      <FormattedMessage
        id="signup_send_email.agree_join"
        defaultMessage="I want to hear from OTRO and the world's greatest footballers."
      />
    }
    name="marketingEmailConsent"
    component={CheckboxReduxForm}
  />
);
