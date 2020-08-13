const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: { type: String, trim: true, required: true },
	content: { type: String, required: true },
	category: { type: String, required: true },
	author: { type: String, default: 'Admin' },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

module.exports = mongoose.model('Post', PostSchema);
