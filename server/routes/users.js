const router = require('express').Router();
const passport = require('passport');
const validate = require('../middleware/validate.middle');
const { registerSchema, loginSchema } = require('../validations/user.valid');
const {
	registerPost,
	loginPost,
	getRefreshToken,
} = require('../controllers/user.controller');

require('../auth/auth');
require('../auth/local.passport');

router.post('/register', validate(registerSchema), registerPost);
router.post(
	'/login',
	validate(loginSchema),
	passport.authenticate('local', { session: false }),
	loginPost
);
router.get(
	'/refresh-token',
	passport.authenticate('jwt', { session: false }),
	getRefreshToken
);

module.exports = router;
