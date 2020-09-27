const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	email: { type: String, required: true },
	content: { type: String, required: true },
	postId: { type: String, required: true },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

CommentSchema.statics = {
	createComment(items) {
		return this.create(items);
	},
};

module.exports = mongoose.model('Comment', CommentSchema);
