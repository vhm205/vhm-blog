const router = require('express').Router();
const { registerPost, loginPost } = require('../controllers/user.controller');
const { registerSchema, loginSchema } = require('../validations/user.valid');
const validate = require('../middleware/validate.middle');

router.post('/register', validate(registerSchema), registerPost);
router.post('/login', validate(loginSchema), loginPost);

module.exports = router;
