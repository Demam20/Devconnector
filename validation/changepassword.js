const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePwd(data) {
  let errors = {};

  data.currentPwd = !isEmpty(data.currentPwd) ? data.currentPwd : '';
  data.newpwd = !isEmpty(data.newpwd) ? data.newpwd : '';
  data.newpwd2 = !isEmpty(data.newpwd2) ? data.newpwd2 : '';

  if (Validator.isEmpty(data.currentPwd)) {
    errors.currentPwd = 'Current password is required';
  }

  if (Validator.isEmpty(data.newpwd)) {
    errors.newpwd = 'New Password is required';
  }
  
  if (Validator.isEmpty(data.newpwd2)) {
    errors.newpwd2 = 'Confirm New Password is required';
  }


  if (!Validator.equals(data.newpwd, data.newpwd2)){
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};