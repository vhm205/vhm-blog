const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
	password: Joi.string().min(6).required(),
	repass: Joi.ref('password'),
});

const loginSchema = Joi.object({
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
	password: Joi.string().min(6).required(),
});

const profileSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	gender: Joi.string().allow('Male', 'Female'),
	avatar: Joi.string().optional(),
	phone: Joi.string().min(10).max(11).optional(),
});

module.exports = {
	registerSchema,
	loginSchema,
	profileSchema,
};
