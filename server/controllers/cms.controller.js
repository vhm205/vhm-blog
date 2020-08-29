const CategoryModel = require('../models/Category');
const PostModel = require('../models/Post');

const addCategory = async (req, res) => {
	try {
		const checkExists = await CategoryModel.getCategoryByName(req.body.name);
		if (checkExists)
			return res.status(400).json({ message: 'Category already exists' });

		await CategoryModel.createCategory(req.body);

		return res.status(201).json({ message: 'Category created' });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addPost = async (req, res) => {
	try {
		console.log(req.body);
		return res.status(201);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	addCategory,
	addPost,
};
