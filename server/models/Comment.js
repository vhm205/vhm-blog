const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	email: { type: String, required: true },
	content: { type: String, required: true },
	postId: { type: String, required: true },
	reply: [{ _id: false, type: String, default: null }],
	status: { type: String, default: 'parent' },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

CommentSchema.statics = {
	createComment(items) {
		return this.create(items);
	},
	getCommentsByPostId(postId, skip, limit) {
		return this.find({ postId, status: 'parent' })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });
	},
	getCommentsByReply(postId, listId, skip, limit) {
		return this.find({ _id: { $in: listId }, postId })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: 1 });
	},
	getAllComments(postId) {
		return this.find({ postId, status: 'parent' }).sort({ createdAt: -1 });
	},
	getTotalComments(postId) {
		return this.countDocuments({ postId, status: 'parent' });
	},
	getTotalReplyByComment(commentId, postId) {
		return this.findOne({ _id: commentId, postId }, { reply: 1 });
	},
	updateComment(commentId, listId) {
		return this.findOneAndUpdate(
			{ _id: commentId, status: 'parent' },
			{ $set: { reply: listId } },
			{
				new: true,
				upsert: true,
				projection: { _id: 0, __v: 0 },
			}
		);
	},
	getMoreCommentReply() {},
};

module.exports = mongoose.model('Comment', CommentSchema);
