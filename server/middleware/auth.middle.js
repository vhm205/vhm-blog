const passport = require('passport');

module.exports.authLocal = (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err) return res.status(400).json({ message: err.message });
		req.user = user;
		next();
	})(req, res, next);
};

module.exports.authToken = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if (err) return res.status(400).json(err);
		req.user = user;
		next();
	})(req, res, next);
};

module.exports.authGoogle = (req, res, next) => {};
