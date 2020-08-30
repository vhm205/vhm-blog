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
		const currentPage = req.params.page;
		console.log(currentPage, typeof currentPage);

		const getTotalCategories = await CategoryModel.getTotalCategories();
		const getAllCategories = await CategoryModel.getAllCategories(
			0,
			LIMIT_CATEGORIES
		);

		return res.status(200).json({
			categories: getAllCategories,
			perPage: LIMIT_CATEGORIES,
			total: getTotalCategories,
			page: +currentPage,
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
