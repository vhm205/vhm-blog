const multer = require('multer');
const { avatar_directory, avatar_type, avatar_size } = require('../config/app');

const storageAvatar = multer.diskStorage({
	destination: function (_, _, cb) {
		cb(null, avatar_directory);
	},
	filename: function (_, file, cb) {
		if (!avatar_type.includes(file.mimetype)) {
			return cb({ message: 'The file is not in the correct format' }, null);
		}

		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const handleUploadAvatar = multer({
	storage: storageAvatar,
	limits: { fileSize: avatar_size },
}).single('avatar');

module.exports.uploadAvatar = (req, res, next) => {
	handleUploadAvatar(req, res, async (err) => {
		if (err) {
			if (err instanceof multer.MulterError) {
				return res.status(400).json({ message: 'File not larger than 1 MB' });
			}
			return res.status(400).json({ errors: err });
		}
		req.avatar = req.file;
	});
	next();
};
