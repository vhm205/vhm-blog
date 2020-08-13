import * as Yup from 'yup';

export default Yup.object({
	username: Yup.string().min(3).required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(6).required(),
	repass: Yup.string()
		.min(6)
		.oneOf([Yup.ref('password')], 'Repass must match with password'),
});
