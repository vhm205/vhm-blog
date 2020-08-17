import React from 'react';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import {
	Container,
	Typography,
	Button,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextBox, CheckBoxWithLabel } from '../../components/CustomField';
import * as loginSchema from '../../validations/auth/login';
import UserAPI from '../../services/userService';

const initValues: LoginField = {
	email: '',
	password: '',
	remember: false,
};

const Login: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	const user = window.localStorage.getItem('user');
	if (user) {
		const { email, password, remember } = JSON.parse(user);
		initValues.email = email;
		initValues.password = password;
		initValues.remember = remember;
	}

	return (
		<Container className={classes.root} maxWidth="xs">
			<CssBaseline />
			<Formik
				initialValues={initValues}
				validationSchema={loginSchema.default}
				onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
					try {
						const { email, password, remember } = values;
						const result: responseLogin = await UserAPI.login({
							email,
							password,
						});
						cookie.save('token', result.token, {});
						cookie.save('refreshToken', result.refreshToken, {});

						if (remember) {
							window.localStorage.setItem('user', JSON.stringify(values));
						} else {
							window.localStorage.removeItem('user');
						}
						resetForm();

						Swal.fire({
							position: 'center',
							icon: 'success',
							title: result.message,
							backdrop: 'rgba(85,85,85, .4)',
							allowOutsideClick: false,
							showConfirmButton: false,
							timer: 2000,
						}).then(() => {
							history.push('/profile');
						});
					} catch (error) {
						setErrors(error.response.data);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ errors, isSubmitting, handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Typography variant="h5">Sign In</Typography>
						<TextBox name="email" placeholder="Email" />
						<TextBox type="password" name="password" placeholder="Password" />
						<CheckBoxWithLabel
							type="checkbox"
							name="remember"
							label="Remember me"
						/>
						<Button
							type="submit"
							disabled={isSubmitting}
							className={classes.btnSubmit}
							color="primary"
							variant="contained"
							fullWidth
						>
							Sign In
						</Button>
						{errors.message && <Alert severity="error">{errors.message}</Alert>}
					</Form>
				)}
			</Formik>
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(8),
		display: 'flex',
		justifyContent: 'center',
	},
	btnSubmit: {
		marginTop: 10,
	},
}));

export default Login;
