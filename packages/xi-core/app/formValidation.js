import validationMessages from '../locale/app';

// 'values' object and returned 'errors' object specifically structured for redux-form
export default {
  email: (key, values) => {
    const errors = {};

    if (!values[key]) {
      errors[key] = validationMessages.required;
    } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(values[key]).toLowerCase())) {
        errors[key] = validationMessages.invalid_email;
      }
    }

    return errors;
  },
  // This is only currently used in the aboutMe section, and `message` isn't displayed
  // This will need updating if we use this validation anywhere else
  maxChars: (key, values, numChars, message = '.') => {
    const errors = {};
    if (values[key] != null && values[key].length > numChars) {
      errors[key] = message;
    }
    return errors;
  },
};
