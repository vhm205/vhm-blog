const router = require('express').Router();
const { validate, authLocal, authToken } = require('../middleware');
const { registerSchema, loginSchema } = require('../validations/user.valid');
const {
	registerPost,
	loginPost,
	getRefreshToken,
} = require('../controllers/user.controller');

require('../auth/auth');
require('../auth/local.passport');

router.post('/register', validate(registerSchema), registerPost);
router.post('/login', validate(loginSchema), authLocal, loginPost);
router.get('/refresh-token', authToken, getRefreshToken);

module.exports = router;
