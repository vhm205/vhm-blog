import React, { useRef, useState, ChangeEvent } from 'react';
import { useUser } from '../../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
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
import {
	TextBox,
	RadioGroupWithLabel,
	Alert,
} from '../../components/CustomField';
import { showPreviewAvatar, validImage, checkSocialAccount } from '../../utils';
import { config } from '../../config/app';
import { useParams } from 'react-router-dom';
import cookie from 'react-cookies';
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
	const { token, refreshToken } = useParams();
	const thumb = useRef<HTMLImageElement>(null);
	const [notify, setNotify] = useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});

	// Handle when login with social account
	if (token && refreshToken && !profile.user) {
		cookie.save('token', token, { path: '/' });
		cookie.save('refreshToken', refreshToken, { path: '/' });

		(async () => {
			const user = new UserAPI();
			const result: responseUser = await user.profile();

			if (profile.setUser) {
				profile.setUser(result);
			}
		})();
	}

	if (!profile?.user) {
		return <div>Loading...</div>;
	}
	initValues = { ...profile.user };
	const { user } = profile;

	const isSocialAccount = checkSocialAccount(user);

	const handleClose = (): void =>
		setNotify((prevValue: NotificationType) => ({ ...prevValue, open: false }));

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				validateOnChange={false}
				validationSchema={profileSchema.default}
				onSubmit={async (values, { setErrors }) => {
					if (isSocialAccount) {
						setNotify({
							open: true,
							type: 'warning',
							message: "You can't update profile with social account",
						});
						return;
					}

					try {
						const userApi = new UserAPI();
						const frmData = new FormData();
						const { username, phone, gender, avatar } = values;

						if (typeof avatar !== 'string') {
							const { status, message } = validImage(avatar);
							if (status === 'error') {
								setNotify({
									open: true,
									type: status,
									message: message,
								});
								return;
							}

							frmData.append('avatar', avatar);
						}

						frmData.append('username', username);
						frmData.append('phone', phone);
						frmData.append('gender', gender);

						const result: responseWithMessage = await userApi.updateProfile(
							frmData
						);

						setNotify({
							open: true,
							type: 'success',
							message: result.message,
						});
					} catch (error) {
						console.error(error, error.response, error.message);
						setNotify({
							open: true,
							type: 'error',
							message: error.response.data[0],
						});
					}
				}}
			>
				{({ handleSubmit, isSubmitting, setFieldValue }) => (
					<Grid container justify="center">
						<Grid item xs={12} sm={4} container alignItems="flex-start">
							<Card className={classes.card}>
								<CardActionArea>
									<img
										src={
											isSocialAccount
												? (initValues.avatar as string)
												: `${config.API_URL}/images/${initValues.avatar}`
										}
										className={classes.avatar}
										alt="Avatar Profile"
										ref={thumb}
									/>
								</CardActionArea>
								<CardActions>
									<Button
										variant="outlined"
										component="label"
										disabled={isSocialAccount}
										fullWidth
									>
										Upload File
										<input
											type="file"
											name="avatar"
											accept="image/*"
											style={{ display: 'none' }}
											disabled={isSocialAccount}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												if (e.currentTarget.files) {
													const file = e.currentTarget.files[0];
													if (file !== undefined) {
														setFieldValue('avatar', file);
														showPreviewAvatar(file, thumb);
													}
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
								<TextBox
									name={
										user?.google
											? 'google.email'
											: user?.facebook
											? 'facebook.email'
											: 'local.email'
									}
									placeholder="Email..."
									disabled
								/>
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
									disabled={isSubmitting || isSocialAccount}
									className={classes.btnSubmit}
									color="primary"
									variant="contained"
									fullWidth
								>
									Update Profile
								</Button>
								<Snackbar
									open={notify.open}
									autoHideDuration={5000}
									onClose={handleClose}
									anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								>
									<Alert onClose={handleClose} severity={notify.type}>
										{notify.message}
									</Alert>
								</Snackbar>
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
		flexGrow: 1,
		padding: theme.spacing(8),
		paddingLeft: theme.spacing(10),
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
