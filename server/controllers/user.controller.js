const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

const registerPost = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		const user = await UserModel.checkUserByEmail(email);
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

const loginPost = async (req, res) => {
	const user = req.user;
	req.login(user, { session: false }, async (err) => {
		if (err) return res.status(500).json(err);

		const dataToken = { id: user._id };
		const refreshToken = await user.generateRefreshToken(dataToken);
		const token = await user.generateToken(dataToken);

		return res.status(200).json({
			message: 'Login Successfully',
			token: token,
			refreshToken: refreshToken,
		});
	});
};

const getRefreshToken = async (req, res) => {
	try {
		let token = req.header('authorization') || req.query.access_token;
		token.startsWith('Bearer ') && (token = token.split(' ')[1]);

		const user = await UserModel.checkTokenExists(token);
		if (!user)
			return res.status(400).json({ message: 'Refresh token is not exists' });

		const refreshToken = await user.generateToken({ id: user._id });
		return res.status(200).json({ token: refreshToken });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getProfile = async (req, res) => {
	try {
		console.log(req.user);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	registerPost,
	loginPost,
	getProfile,
	getRefreshToken,
};
