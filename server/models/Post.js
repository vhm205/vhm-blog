const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: { type: String, trim: true, required: true },
	content: { type: String, required: true },
	category: { type: String, required: true },
	slug: { type: String, required: true },
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
	getPosts(skip, limit) {
		return this.find({}).skip(skip).limit(limit).sort({ createdAt: 1 });
	},
	getTotalPosts() {
		return this.countDocuments({});
	},
	getPostById(id) {
		return this.findOne({ _id: id });
	},
	updatePost(id, data) {
		return this.updateOne({ _id: id }, { $set: data });
	},
	deletePosts(listId) {
		return this.deleteMany({ _id: { $in: listId } });
	},
};

module.exports = mongoose.model('Post', PostSchema);
