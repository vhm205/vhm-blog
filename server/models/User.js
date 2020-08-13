const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: { type: String, maxlength: 30, trim: true, required: true },
	phone: { type: String, minlength: 10, maxlength: 11, default: null },
	gender: { type: String, default: 'Male' },
	avatar: { type: String, default: 'default-avatar.png' },
	role: { type: String, default: 'user' },
	local: {
		email: { type: String, trim: true, unique: true },
		password: { type: String, minlength: 6 },
		isActive: { type: Boolean, default: false },
		verifyToken: String,
	},
	facebook: {
		uid: String,
		token: String,
		email: { type: String, trim: true },
	},
	google: {
		uid: String,
		token: String,
		email: { type: String, trim: true },
	},
	createdAt: { type: Number, default: Date.now },
	updatedAt: { type: Number, default: null },
});

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
	}
	next();
});

UserSchema.methods = {
	comparePassword(password) {
		return bcrypt.compare(password, this.local.password);
	},
};

UserSchema.statics = {
	createUser(items) {
		return this.create(items);
	},
	checkUserByEmail(email) {
		return this.findOne({ 'local.email': email });
	},
};

module.exports = mongoose.model('User', UserSchema);
