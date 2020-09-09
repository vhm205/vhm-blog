const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: { type: String, trim: true, required: true },
	content: { type: String, required: true },
	category: { type: String, required: true },
	author: { type: String, default: 'Admin' },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

PostSchema.statics = {
	createPost(items) {
		return this.create(items);
	},
	checkPostExists(title, content) {
		return this.findOne({ $or: [{ title }, { content }] });
	},
};

module.exports = mongoose.model('Post', PostSchema);
