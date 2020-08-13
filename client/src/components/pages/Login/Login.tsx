import React from 'react';
import {
	Container,
	Typography,
	Button,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextBox, CheckBoxWithLabel } from '../../CustomField';
import * as loginSchema from '../../../validations/auth/login';

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
				onSubmit={(values, { setSubmitting, resetForm }) => {
					console.log(values);

					resetForm();
					setSubmitting(false);
				}}
			>
				{({ values, isSubmitting, handleSubmit }) => (
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

export default Login;
