const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	email: { type: String, required: true },
	content: { type: String, required: true },
	postId: { type: String, required: true },
	reply: { type: String, default: null },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

CommentSchema.statics = {
	createComment(items) {
		return this.create(items);
	},
	getCommentsByPostId(postId, skip, limit) {
		return this.find({ postId })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });
	},
	getAllComments(postId) {
		return this.find({ postId }).sort({ createdAt: -1 });
	},
	getTotalComments(postId) {
		return this.countDocuments({ postId });
	},
};

module.exports = mongoose.model('Comment', CommentSchema);
