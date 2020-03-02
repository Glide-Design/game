import { defineMessages } from 'react-intl';

export const validationMessages = defineMessages({
  invalid_firstname: {
    id: 'signup.invalid_firstname',
    defaultMessage: 'Please complete',
  },
  invalid_lastname: {
    id: 'signup.invalid_lastname',
    defaultMessage: 'Please complete',
  },
  no_date_of_birth: {
    id: 'no_date_of_birth',
    defaultMessage: 'Please complete',
  },
  date_of_birth_too_young: {
    id: 'date_of_birth_too_young',
    defaultMessage: "Sorry not this time. You're not old enough to join OTRO yet.",
  },
  date_of_birth_invalid: {
    id: 'date_of_birth_invalid',
    defaultMessage: 'Incorrect date. Please complete',
  },
  code_submit_failed: {
    id: 'code_submit_failed',
    defaultMessage:
      "This code doesn't seem right. Please check the numbers again and make sure it has not expired.",
  },
  invalid_email: {
    id: 'invalid_email',
    defaultMessage: 'E-mail address is not registered.',
  },
  invalid_email_login_code: {
    id: 'invalid_email_login_code',
    defaultMessage: 'Login code is invalid.',
  },
  login_code_expired: {
    id: 'login_code_expired',
    defaultMessage: 'Login code expired.',
  },
  invalid_emailcode: {
    id: 'invalid_emailcode',
    defaultMessage: 'Code must be 6 digits long.',
  },
});
