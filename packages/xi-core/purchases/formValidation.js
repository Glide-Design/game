import { validationMessages } from '../locale/purchases';

// 'values' object and returned 'errors' object specifically structured for redux-form
export default {
  nameOnCard: (key, values) => {
    const errors = {};
    if (!values[key]) {
      errors[key] = validationMessages.invalid_nameOnCard;
    }
    return errors;
  },
};
