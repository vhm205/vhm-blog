const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { categorySchema, postSchema } = require('../validations/cms.valid');
const {
	addCategory,
	addPost,
	getAllCategories,
} = require('../controllers/cms.controller');

router.post('/add-post', auth.authToken, validate(postSchema), addPost);
router.post(
	'/add-category',
	auth.authToken,
	validate(categorySchema),
	addCategory
);
router.get('/all-categories/:page', auth.authToken, getAllCategories);

module.exports = router;
