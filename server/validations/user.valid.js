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

module.exports = {
	registerSchema,
	loginSchema,
};
