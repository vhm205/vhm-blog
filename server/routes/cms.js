const router = require('express').Router();
const { validate, auth } = require('../middleware');
const { categorySchema, postSchema } = require('../validations/cms.valid');
const { addCategory, addPost } = require('../controllers/cms.controller');

router.post('/add-post', auth.authToken, validate(postSchema), addPost);
router.post(
	'/add-category',
	auth.authToken,
	validate(categorySchema),
	addCategory
);

module.exports = router;
