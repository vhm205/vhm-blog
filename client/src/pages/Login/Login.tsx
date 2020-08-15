import React from 'react';
import cookie from 'react-cookies';
import {
	Container,
	Typography,
	Button,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
	return (
		<Container className={classes.root} maxWidth="xs">
			<CssBaseline />
			<Formik
				initialValues={initValues}
				validationSchema={loginSchema.default}
				onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
					try {
						const user = new UserAPI();
						const result: responseLogin = await user.login({
							email: values.email,
							password: values.password,
						});
						cookie.save('token', result.token, {});
						cookie.save('refreshToken', result.refreshToken, {});
						console.log('This is the result: ', result);
						resetForm();
					} catch (error) {
						setErrors(error.response.data);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, errors, isSubmitting, handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Typography variant="h5">Sign In</Typography>
						<TextBox name="email" placeholder="Email" />
						<TextBox type="password" name="password" placeholder="Password" />
						<CheckBoxWithLabel name="remember" label="Remember me" />
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
						<pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
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
