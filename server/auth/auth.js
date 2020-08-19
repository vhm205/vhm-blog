const UserModel = require('../models/User');
const passport = require('passport');
const passportJWT = require('passport-jwt');

passport.use(
	new passportJWT.Strategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest:
				passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken() ||
				passportJWT.ExtractJwt.fromUrlQueryParameter('access_token'),
		},
		async (token, done) => {
			try {
				const user = await UserModel.findUserSafeById(token.id);
				if (!user) return done(new Error('Cannot to find user'), null);

				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

// module.exports.authToken = async (req, res, next) => {
// 	let token = req.header('authorization') || req.params.access_token;
// 	if (!token) return res.status(400).json({ message: 'Token is required' });

// 	if (token.startsWith('Bearer ')) {
// 		token = token.split(' ')[1];
// 	}

// 	try {
// 		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
// 		const user = await UserModel.findUserSafeById(decoded.id);
// 		if (!user) return res.status(404).json({ message: 'Cannot to find user' });

// 		res.locals.info = {
// 			user: user,
// 			token: token,
// 		};
// 		next();
// 	} catch (error) {
// 		return res
// 			.status(401)
// 			.json({ msg: 'Not authorized to access this resource' });
// 	}
// };
