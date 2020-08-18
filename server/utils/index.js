const UserModel = require('../models/User');

module.exports.checkRefreshToken = async (token) => {
	token.startsWith('Bearer ') && (token = token.split(' ')[1]);
	return await UserModel.checkTokenExists(token);
};
