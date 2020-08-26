const router = require('express').Router();
const passport = require('passport');
const { validate, auth, upload } = require('../middleware');
const {
	registerSchema,
	loginSchema,
	profileSchema,
} = require('../validations/user.valid');
const {
	registerPost,
	loginPost,
	getProfile,
	getRefreshToken,
	updateProfile,
	logOut,
} = require('../controllers/user.controller');

require('../auth/auth');
require('../auth/local.passport');
require('../auth/google.passport');

router.post('/register', validate(registerSchema), registerPost);
router.post('/login', validate(loginSchema), auth.authLocal, loginPost);
router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);
router.get(
	'/auth/google/callback',
	passport.authenticate('google', { session: false }),
	async (req, res) => {
		const { user } = req;
		const dataToken = { id: user._id };
		const refreshToken = await user.generateRefreshToken(dataToken);
		const token = await user.generateToken(dataToken);

		res.redirect(`${process.env.BASE_URL}/profile/${token}/${refreshToken}`);
	}
);

router.patch(
	'/update-profile',
	auth.authToken,
	upload.uploadAvatar,
	updateProfile(profileSchema)
);
router.get('/profile', auth.authToken, getProfile);
router.get('/refresh-token', auth.authToken, getRefreshToken);
router.delete('/logout', auth.authToken, logOut);

module.exports = router;
