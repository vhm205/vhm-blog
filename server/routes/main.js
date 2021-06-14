const router = require('express').Router();
const { validate } = require('../middleware');
const { commentSchema } = require('../validations/main.valid');
const {
	addComment,
	getComments,
	getAllComments,
	getCommentsByReply,
	getMoreCommentReply,
	updateComment,
} = require('../controllers/main.controller');

router.post('/add-comment', validate(commentSchema), addComment);
router.get('/get-comments/:post_id/:per_page/:page', getComments);
router.get('/get-all-comments/:post_id', getAllComments);
router.post('/get-more-comments-reply', getMoreCommentReply);
router.post('/get-comments-by-reply', getCommentsByReply);
router.patch('/update-comment', updateComment);

module.exports = router;
