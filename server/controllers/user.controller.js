const UserModel = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../auth/local.passport');

const registerPost = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		const user = await UserModel.checkUserByEmail(req.body.email);
		if (user) return res.status(400).json({ message: 'User already exists' });

		const items = {
			username: username,
			local: {
				email: email,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			},
		};
		await UserModel.createUser(items);
		return res.status(201).json({ message: 'Register successfully' });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const loginPost = async (req, res, next) => {
	passport.authenticate('local', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('An Error occurred');
				return next(error);
			}

			req.login(user, { session: false }, async (err) => {
				if (err) return next(err);

				const dataToken = {
					id: user._id,
					email: user.local.email,
				};
				const token = await jwt.sign(dataToken, process.env.JWT_SECRET);
				return res.status(200).json({
					message: info.message,
					token: token,
				});
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

module.exports = {
	registerPost,
	loginPost,
};
