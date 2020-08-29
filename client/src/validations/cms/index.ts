import * as Yup from 'yup';

export const categorySchema = Yup.object({
	name: Yup.string().min(3).max(30).required(),
});

export const postSchema = Yup.object({
	title: Yup.string().min(3).max(100).required(),
	content: Yup.string().min(50).required(),
	category: Yup.string().required(),
	author: Yup.string().oneOf(['Admin', 'User']).default('Admin'),
});
