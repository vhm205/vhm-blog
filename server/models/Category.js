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
	getCategories(skip, limit) {
		return this.find({}).skip(skip).limit(limit).sort({ createdAt: 1 });
	},
	getAllCategories() {
		return this.find({}, { name: 1 }).sort({ createdAt: 1 });
	},
	getTotalCategories() {
		return this.countDocuments({});
	},
	deleteCategories(listId) {
		return this.deleteMany({ _id: { $in: listId } });
	},
};

module.exports = mongoose.model('Category', CategorySchema);
