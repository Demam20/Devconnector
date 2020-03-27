const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  
  let errors = {};

  data.imagepost = !isEmpty(data.imagepost) ? data.imagepost : '';

  if (Validator.isEmpty(data.imagepost)) {
    errors.imagepost = 'imagepost field is required';
  }

  if (!isEmpty(data.imagepost)) {
    if (!Validator.isURL(data.imagepost)) {
      errors.imagepost = 'Not a valid image URL';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};