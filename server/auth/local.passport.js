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
					return done(null, false, { message: 'User not found' });
				}

				const comparePassword = await user.comparePassword(password);
				if (!comparePassword) {
					return done(null, false, { message: 'Wrong password' });
				}

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error);
			}
		}
	)
);
