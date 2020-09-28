const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { categorySchema, postSchema } = require('../validations/cms.valid');
const {
	addPost,
	getPosts,
	getPostsByCategory,
	getPostsRelated,
	getPostById,
	updatePost,
	updateRating,
	deletePosts,
	addCategory,
	getCategories,
	getAllCategories,
	updateCategory,
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
router.patch('/update-category', auth.authToken, updateCategory);
router.delete('/delete-categories', auth.authToken, deleteCategories);

router.post('/add-post', auth.authToken, validate(postSchema), addPost);
router.get('/get-posts/:page', auth.authToken, getPosts);
router.get(
	'/get-posts-by-category/:category/:page',
	auth.authToken,
	getPostsByCategory
);
router.get('/get-posts-related/:category', auth.authToken, getPostsRelated);
router.get('/get-post/:post_id', auth.authToken, getPostById);
router.patch('/update-post', auth.authToken, updatePost);
router.put('/update-rating', updateRating);
router.delete('/delete-posts', auth.authToken, deletePosts);

module.exports = router;
