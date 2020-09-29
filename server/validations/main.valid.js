const Joi = require('@hapi/joi');

const commentSchema = Joi.object({
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
	content: Joi.string().min(5).max(500).required(),
	postId: Joi.string().required(),
	createdAt: Joi.number().optional(),
	reply: Joi.array().optional(),
	status: Joi.string().allow('parent', 'children').default('parent'),
});

module.exports = {
	commentSchema,
};
