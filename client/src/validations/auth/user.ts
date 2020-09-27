import * as Yup from 'yup';

export default Yup.object({
	username: Yup.string().min(3).max(30).required(),
	gender: Yup.string().oneOf(['Male', 'Female']),
	avatar: Yup.string().optional(),
	phone: Yup.string().min(10).max(11).required(),
});
