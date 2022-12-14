const isEmpty = require('is-empty');
const validator = require('validator');

module.exports.loginValidator = (data) => {
    const errors = {};

    data.email = !(isEmpty(data.email)) ? data.email : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';

    let emailError = validator.isEmpty(data.email) ? 'Email field is required' : (!validator.isEmail(data.email) ? 'Email is invalid' : '');
    let passwordError = validator.isEmpty(data.password) ? 'Password field is required' : '';

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports.registerValidator = (data) => {
    const errors = {};

    data.firstName = !(isEmpty(data.firstName)) ? data.firstName : '';
    data.lastName = !(isEmpty(data.lastName)) ? data.lastName : '';
    data.email = !(isEmpty(data.email)) ? data.email : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';

    let emailError = validator.isEmpty(data.email) ? 'Email field is required' : (!validator.isEmail(data.email) ? 'Email is invalid' : '');
    let passwordError = validator.isEmpty(data.password) ? 'Password field is required' : '';
    let firstNameError = validator.isEmpty(data.firstName) ? 'First name field is required' : '';
    let lastNameError = validator.isEmpty(data.lastName) ? 'Last name field is required' : '';
    
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (firstNameError || lastNameError) errors.firstName = 'First name and last name are required';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}