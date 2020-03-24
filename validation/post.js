const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.imagepost = !isEmpty(data.imagepost) ? data.imagepost : '';

  // if (!Validator.isLength(data.imagepost, { min: 10, max: 300 })) {
  //   errors.imagepost = 'Post must be between 10 and 300 characters';
  // }

  // if (Validator.isEmpty(data.imagepost)) {
  //   errors.imagepost = 'Text field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};