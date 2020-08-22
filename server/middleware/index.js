module.exports = {
	validate: require('./validate.middle'),
	authLocal: require('./auth.middle').authLocal,
	authToken: require('./auth.middle').authToken,
	upload: require('./upload.middle'),
};
