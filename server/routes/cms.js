const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { categorySchema, postSchema } = require('../validations/cms.valid');
const {
	addPost,
	getPosts,
	getPostById,
	updatePost,
	deletePosts,
	addCategory,
	getCategories,
	getAllCategories,
	deleteCategories,
} = require('../controllers/cms.controller');

router.post(
	'/add-category',
	auth.authToken,
	validate(categorySchema),
	addCategory
);
router.get('/get-categories/:page', auth.authToken, getCategories);
router.get('/all-categories', auth.authToken, getAllCategories);
router.delete('/delete-categories', auth.authToken, deleteCategories);

router.post('/add-post', auth.authToken, validate(postSchema), addPost);
router.get('/get-posts/:page', auth.authToken, getPosts);
router.get('/get-post/:post_id', auth.authToken, getPostById);
router.patch('/update-post', auth.authToken, updatePost);
router.delete('/delete-posts', auth.authToken, deletePosts);

module.exports = router;
