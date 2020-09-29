import * as Yup from 'yup';

export const commentSchema = Yup.object({
	email: Yup.string().email().required(),
	content: Yup.string().min(5).max(500).required(),
	postId: Yup.string().optional(),
	createdAt: Yup.number().optional(),
	reply: Yup.array().optional(),
	status: Yup.string().oneOf(['parent', 'children']).default('parent'),
});
