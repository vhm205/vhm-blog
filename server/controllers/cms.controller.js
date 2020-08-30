const CategoryModel = require('../models/Category');
const PostModel = require('../models/Post');

const LIMIT_CATEGORIES = 5;

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
		return res.sendStatus(201);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getAllCategories = async (req, res) => {
	try {
		const currentPage = +req.params.page;
		const skip = currentPage * LIMIT_CATEGORIES - LIMIT_CATEGORIES;

		const totalCategories = await CategoryModel.getTotalCategories();
		const allCategories = await CategoryModel.getAllCategories(
			skip,
			LIMIT_CATEGORIES
		);

		return res.status(200).json({
			categories: allCategories,
			total: totalCategories,
			page: currentPage,
			perPage: LIMIT_CATEGORIES,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	addCategory,
	addPost,
	getAllCategories,
};
