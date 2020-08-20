import React, { useRef, ChangeEvent } from 'react';
import { useUser } from '../../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import { Formik, Form } from 'formik';
import { TextBox, RadioGroupWithLabel } from '../../components/CustomField';
import { showPreviewAvatar } from '../../utils';
import { config } from '../../config/app';
import * as profileSchema from '../../validations/profile';
import UserAPI from '../../services/userService';

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
	const thumb = useRef<HTMLImageElement>(null);

	if (!profile?.user) {
		return <div>Loading...</div>;
	}
	initValues = { ...profile.user, phone: '' };

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				validationSchema={profileSchema.default}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						// const user = new UserAPI();
						// const { username, phone, gender, avatar } = values;
						// const result = await user.updateProfile({
						// 	username, phone, gender, avatar
						// })
						console.log(values);
					} catch (error) {
						console.error(error, error.response);
						setErrors(error.response.data);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => (
					<Grid container justify="center">
						<Grid item xs={12} sm={4} container alignItems="flex-start">
							<Card className={classes.card}>
								<CardActionArea>
									<img
										src={`${config.API_URL}/images/${initValues.avatar}`}
										className={classes.avatar}
										alt="Avatar Profile"
										ref={thumb}
									/>
								</CardActionArea>
								<CardActions>
									<Button variant="outlined" component="label" fullWidth>
										Upload File
										<input
											type="file"
											name="avatar"
											accept="image/*"
											style={{ display: 'none' }}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												if (e.currentTarget.files) {
													const file = e.currentTarget.files[0];
													setFieldValue('avatar', file);
													showPreviewAvatar(file, thumb);
												}
											}}
										/>
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Form onSubmit={handleSubmit}>
								<Typography variant="h5" style={{ marginTop: 30 }}>
									Your Profile
								</Typography>
								<TextBox name="local.email" placeholder="Email..." disabled />
								<TextBox name="username" placeholder="Username..." />
								<TextBox name="phone" placeholder="Phone..." pattern="[0-9]*" />
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
		marginRight: 20,
	},
	btnSubmit: {
		marginTop: 10,
	},
}));

export default Profile;
