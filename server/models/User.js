const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
		verifyToken: { type: String, default: null },
	},
	facebook: {
		uid: String,
		email: { type: String, trim: true },
	},
	google: {
		uid: String,
		email: { type: String, trim: true },
	},
	tokens: [{ _id: false, token: { type: String, required: true } }],
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
	async generateRefreshToken(data) {
		const token = await jwt.sign(data, process.env.JWT_SECRET);
		this.tokens = [...this.tokens, { token }];
		await this.save();
		return token;
	},
	generateToken(data) {
		return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '10m' });
	},
};

UserSchema.statics = {
	createUser(items) {
		return this.create(items);
	},
	findUserSafeById(id) {
		return this.findOne({ _id: id }, { 'local.password': 0, tokens: 0 });
	},
	checkUserByEmail(email) {
		return this.findOne({ 'local.email': email });
	},
	checkTokenExists(token) {
		return this.findOne({ 'tokens.token': token }, { 'local.password': 0 });
	},
	removeAllToken(id, email) {
		return this.updateOne(
			{ _id: id, 'local.email': email },
			{ $set: { tokens: [] } }
		);
	},
};

module.exports = mongoose.model('User', UserSchema);
