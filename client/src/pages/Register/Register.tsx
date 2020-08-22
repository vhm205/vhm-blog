import React from 'react';
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
import { TextBox } from '../../components/CustomField';
import * as registerSchema from '../../validations/auth/register';
import UserAPI from '../../services/userService';

const initValues: RegisterField = {
	username: '',
	email: '',
	password: '',
	repass: '',
};

const Register: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Container className={classes.root} maxWidth="xs">
			<CssBaseline />
			<Formik
				initialValues={initValues}
				validationSchema={registerSchema.default}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					try {
						const { username, email, password, repass } = values;
						const result: responseWithMessage = await UserAPI.register({
							username,
							email,
							password,
							repass,
						});
						resetForm();

						Swal.fire({
							position: 'center',
							icon: 'success',
							title: result.message,
							backdrop: 'rgba(85,85,85, .4)',
							allowOutsideClick: false,
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							history.push('/login');
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
						<Typography variant="h5">Sign Up</Typography>
						<TextBox name="username" placeholder="Username" />
						<TextBox name="email" placeholder="Email" />
						<TextBox type="password" name="password" placeholder="Password" />
						<TextBox type="password" name="repass" placeholder="Re-Password" />
						<Button
							type="submit"
							disabled={isSubmitting}
							className={classes.btnSubmit}
							color="primary"
							variant="contained"
							fullWidth
						>
							Sign Up
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

export default Register;
