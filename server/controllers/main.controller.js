const CommentModel = require('../models/Comment');

const LIMIT_COMMENTS = 5;

const addComment = async (req, res) => {
	try {
		const newComment = await CommentModel.createComment(req.body);
		return res.status(200).json({ comment: newComment });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getComments = async (req, res) => {
	try {
		const currentPage = +req.params.page;
		const postId = req.params.post_id;
		const limit = +req.params.per_page || LIMIT_COMMENTS;
		const skip = currentPage * limit - limit;

		const totalComments = await CommentModel.getTotalComments(postId);
		const getComments = await CommentModel.getCommentsByPostId(
			postId,
			skip,
			limit
		);

		return res.status(200).json({
			comments: getComments,
			total: totalComments,
			page: currentPage,
			perPage: limit,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getCommentsByReply = async (req, res) => {
	try {
		const { postId, listId, commentId, page } = req.body;
		const skip = page * LIMIT_COMMENTS - LIMIT_COMMENTS;

		const totalComments = await CommentModel.getTotalReplyByComment(
			commentId,
			postId
		);
		const getCommentsByReply = await CommentModel.getCommentsByReply(
			postId,
			listId,
			skip,
			LIMIT_COMMENTS
		);

		return res.status(200).json({
			comments: getCommentsByReply,
			total: totalComments.reply.length,
			page: page,
			perPage: LIMIT_COMMENTS,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getAllComments = async (req, res) => {
	try {
		const postId = req.params.post_id;
		const totalComments = await CommentModel.getTotalComments(postId);
		const getAllComments = await CommentModel.getAllComments(postId);

		return res.status(200).json({
			comments: getAllComments,
			total: totalComments,
			page: 1,
			perPage: -1,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getMoreCommentReply = async (req, res) => {
	try {
		console.log(req.body);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const updateComment = async (req, res) => {
	try {
		const { commentId, listId } = req.body;
		await CommentModel.updateComment(commentId, listId);

		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	addComment,
	getComments,
	getAllComments,
	getCommentsByReply,
	getMoreCommentReply,
	updateComment,
};
