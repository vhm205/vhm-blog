import React from 'react';
import { useUser } from '../../context/UserContext';
import {
	Paper,
	makeStyles,
	Grid,
	Button,
	Radio,
	FormControlLabel,
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextBox, RadioGroupWithLabel } from '../../components/CustomField';
import { config } from '../../config/app';

let initValues: Omit<User, 'id' | 'role'> = {
	username: '',
	gender: 'Male',
	phone: '',
	avatar: '',
	local: {
		email: '',
	},
};

const Profile: React.FC = () => {
	const classes = useStyles();
	const profile = useUser();

	if (!profile?.user) {
		return <div>Loading...</div>;
	}

	initValues = { ...profile.user, phone: '' };

	const handleChangeFile = (e: any) => {};

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);
				}}
			>
				{({ values, errors, handleSubmit, isSubmitting }) => (
					<Grid container justify="center" alignItems="center">
						<Grid item xs={4}>
							<Card className={classes.card}>
								<CardMedia
									image={`${config.API_URL}/images/${initValues.avatar}`}
									title="Avatar Profile"
								/>
								<CardActionArea>
									<img
										src={`${config.API_URL}/images/${initValues.avatar}`}
										alt="Avatar Profile"
										className={classes.avatar}
									/>
								</CardActionArea>
								<CardActions>
									<input
										type="file"
										name="avatar"
										onChange={handleChangeFile}
									/>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={8}>
							<Form onSubmit={handleSubmit}>
								<TextBox name="username" placeholder="Username..." />
								<TextBox name="local.email" placeholder="Email..." />
								<TextBox type="number" name="phone" placeholder="Phone..." />
								<RadioGroupWithLabel name="gender" label="Gender">
									<FormControlLabel
										value="Male"
										label="Male"
										control={<Radio color="primary" />}
									/>
									<FormControlLabel
										value="Female"
										label="Female"
										control={<Radio color="primary" />}
									/>
								</RadioGroupWithLabel>
								<Button
									type="submit"
									disabled={isSubmitting}
									className={classes.btnSubmit}
									color="primary"
									variant="contained"
									fullWidth
								>
									Update Profile
								</Button>
								<pre>{JSON.stringify(values, null, 2)}</pre>
								<pre>{JSON.stringify(errors, null, 2)}</pre>
							</Form>
						</Grid>
					</Grid>
				)}
			</Formik>
		</Paper>
	);
};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(8),
	},
	avatar: {
		objectFit: 'cover',
		width: '100%',
		height: '100%',
	},
	card: {
		maxWidth: 345,
	},
	btnSubmit: {
		marginTop: 10,
	},
}));

export default Profile;
