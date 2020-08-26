const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;
const UserModel = require('../models/User');

passport.use(
	new googleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/users/auth/google/callback',
		},
		async (_, __, profile, done) => {
			try {
				const { id, displayName, picture, email } = profile;
				let user = await UserModel.checkUserByGoogleEmail(email);
				if (user) {
					return done(null, user);
				}

				const items = {
					google: { uid: id, email: email },
					username: displayName,
					avatar: picture,
					local: {
						isActive: true,
					},
				};
				user = await UserModel.createUser(items);
				done(null, user);
			} catch (error) {
				done(error, null);
			}
		}
	)
);
