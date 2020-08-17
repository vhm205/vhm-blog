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
					return done(new Error('Email or password is wrong'), false);
				}

				const comparePassword = await user.comparePassword(password);
				if (!comparePassword) {
					return done(new Error('Wrong password'), false);
				}

				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);
