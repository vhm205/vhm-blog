import * as Yup from 'yup';

export const commentSchema = Yup.object({
	email: Yup.string().email().required(),
	content: Yup.string().min(5).max(100).required(),
	postId: Yup.string().optional(),
});
