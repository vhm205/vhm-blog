const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	slug: { type: String },
	parentId: { type: String, default: null },
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

CategorySchema.statics = {
	createCategory(items) {
		return this.create(items);
	},
	getCategoryByName(name) {
		return this.findOne({ name });
	},
	getAllCategories(skip, limit) {
		return this.find({}).sort({ createdAt: -1 });
		// return this.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });
	},
	getTotalCategories() {
		return this.countDocuments({});
	},
};

module.exports = mongoose.model('Category', CategorySchema);
