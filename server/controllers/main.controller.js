const CommentModel = require('../models/Comment');

const addComment = async (req, res) => {
	try {
		await CommentModel.createComment(req.body);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	addComment,
};
