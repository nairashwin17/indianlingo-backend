const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({'any.only': 'Passwords do not match'}, {'any.required': 'Confirm password is required'}),
    });
    const { error } = schema.validate(req.body,{ abortEarly: true });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};