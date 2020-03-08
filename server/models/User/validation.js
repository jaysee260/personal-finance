var Joi = require("@hapi/joi");

var userValidation = {};

userValidation.registrationSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

userValidation.loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    // password: Joi.string().min(6).required()
});

module.exports = userValidation;