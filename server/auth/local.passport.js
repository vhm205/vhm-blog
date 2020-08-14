const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');

passport.use(
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await UserModel.checkUserByEmail(email);
				if (!user) {
					return done(new Error('User not found'), false);
				}
				console.log('Something...');
				const comparePassword = await user.comparePassword(password);
				if (!comparePassword) {
					return done(new Error('Wrong password'), false);
				}

				done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				done(error, null);
			}
		}
	)
);
