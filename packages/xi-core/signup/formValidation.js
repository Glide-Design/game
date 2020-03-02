import moment from 'moment';
import { SIGNIN_CODE_LENGTH } from './actions';
import { validationMessages } from '../locale/signup';

// 'values' object and returned 'errors' object specifically structured for redux-form
export default {
  birthday: (key, values, minAge = 0, customDateFormat) => {
    const errors = {};
    let momentBirthday;

    if (!values[key]) {
      errors[key] = validationMessages.no_date_of_birth;
    }

    if (customDateFormat) {
      momentBirthday = moment(values[key], customDateFormat);
    } else if (key === 'birthday') {
      momentBirthday = moment(values.birthday);
    } else if (key === 'day') {
      momentBirthday = moment(
        `${Number(values.day)}-${Number(values.month) + 1}-${Number(values.year)}`,
        'D-M-YYYY',
        true
      );
    } else {
      console.warn('Invalid birthday validator');
      return;
    }

    if (!momentBirthday.isValid()) {
      errors[key] = validationMessages.date_of_birth_invalid;
      return errors;
    }

    if (moment().diff(momentBirthday, 'years') < minAge) {
      errors[key] = validationMessages.date_of_birth_too_young;
    }

    return errors;
  },
  firstname: (key, values) => {
    const errors = {};
    const val = values[key] || '';
    if (!val.trim()) {
      errors[key] = validationMessages.invalid_firstname;
    }
    return errors;
  },
  lastname: (key, values) => {
    const errors = {};
    const val = values[key] || '';
    if (!val.trim()) {
      errors[key] = validationMessages.invalid_lastname;
    }
    return errors;
  },
  emailCode: (key, values, validated) => {
    const errors = {};
    const val = values[key] || '';
    if (val.length !== SIGNIN_CODE_LENGTH && val.length > 0 && validated) {
      errors[key] = validationMessages.invalid_emailcode;
    }
    return errors;
  },
};
