const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { commentSchema } = require('../validations/main.valid');
const { addComment } = require('../controllers/main.controller');

router.post(
	'/add-comment',
	auth.authToken,
	validate(commentSchema),
	addComment
);

module.exports = router;
