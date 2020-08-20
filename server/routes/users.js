const router = require('express').Router();
const { validate, authLocal, authToken } = require('../middleware');
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

router.post('/register', validate(registerSchema), registerPost);
router.post('/login', validate(loginSchema), authLocal, loginPost);
router.patch(
	'/update-profile',
	authToken,
	validate(profileSchema),
	updateProfile
);
router.get('/profile', authToken, getProfile);
router.get('/refresh-token', authToken, getRefreshToken);
router.delete('/logout', authToken, logOut);

module.exports = router;
