const Joi = require('@hapi/joi');

const commentSchema = Joi.object({
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
	content: Joi.string().min(5).max(100).required(),
	postId: Joi.string().required(),
});

module.exports = {
	commentSchema,
};
