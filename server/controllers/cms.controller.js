const CategoryModel = require('../models/Category');
const PostModel = require('../models/Post');

const LIMIT_CATEGORIES = 5;
const LIMIT_POSTS = 5;

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

const getCategories = async (req, res) => {
	try {
		const currentPage = +req.params.page;
		const skip = currentPage * LIMIT_CATEGORIES - LIMIT_CATEGORIES;

		const totalCategories = await CategoryModel.getTotalCategories();
		const getCategories = await CategoryModel.getCategories(
			skip,
			LIMIT_CATEGORIES
		);

		return res.status(200).json({
			categories: getCategories,
			total: totalCategories,
			page: currentPage,
			perPage: LIMIT_CATEGORIES,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getAllCategories = async (_, res) => {
	try {
		const allCategories = await CategoryModel.getAllCategories();
		return res.status(200).json({ categories: allCategories });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const deleteCategories = async (req, res) => {
	try {
		await CategoryModel.deleteCategories(req.body);
		return res.sendStatus(204);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const addPost = async (req, res) => {
	try {
		const checkPostExist = await PostModel.checkPostExists(
			req.body.title,
			req.body.content
		);
		if (checkPostExist)
			return res.status(400).json({ message: 'This post existed' });

		await PostModel.createPost(req.body);
		return res.sendStatus(201);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getPosts = async (req, res) => {
	try {
		const currentPage = +req.params.page;
		const skip = currentPage * LIMIT_POSTS - LIMIT_POSTS;

		const totalPosts = await PostModel.getTotalPosts();
		const getPosts = await PostModel.getPosts(skip, LIMIT_POSTS);

		return res.status(200).json({
			posts: getPosts,
			total: totalPosts,
			page: currentPage,
			perPage: LIMIT_POSTS,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	addPost,
	getPosts,
	addCategory,
	getCategories,
	getAllCategories,
	deleteCategories,
};
