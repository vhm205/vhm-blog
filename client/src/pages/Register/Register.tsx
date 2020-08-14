import React from 'react';
import {
	Container,
	Typography,
	Button,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextBox } from '../../components/CustomField';
import * as registerSchema from '../../validations/auth/register';

const initValues: RegisterField = {
	username: '',
	email: '',
	password: '',
	repass: '',
};

const Register: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className={classes.root} maxWidth="xs">
			<CssBaseline />
			<Formik
				initialValues={initValues}
				validationSchema={registerSchema.default}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					console.log(values);

					resetForm();
					setSubmitting(false);
				}}
			>
				{({ values, isSubmitting, handleSubmit }) => (
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
						<pre>{JSON.stringify(values, null, 2)}</pre>
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
