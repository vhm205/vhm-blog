const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { commentSchema } = require('../validations/main.valid');
const {
	addComment,
	getComments,
	getAllComments,
} = require('../controllers/main.controller');

router.post(
	'/add-comment',
	auth.authToken,
	validate(commentSchema),
	addComment
);

router.get(
	'/get-comments/:post_id/:per_page/:page',
	auth.authToken,
	getComments
);
router.get('/get-all-comments/:post_id', auth.authToken, getAllComments);

module.exports = router;
