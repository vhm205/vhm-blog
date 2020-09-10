const Joi = require('@hapi/joi');

const categorySchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	slug: Joi.string().required(),
});

const postSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	content: Joi.string().min(50).required(),
	category: Joi.string().required(),
	slug: Joi.string().required(),
	author: Joi.string().allow('Admin', 'User').default('Admin'),
});

module.exports = {
	categorySchema,
	postSchema,
};
