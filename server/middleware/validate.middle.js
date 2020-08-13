module.exports = (schema) => {
	return async (req, res, next) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			let { details } = error;
			let errorsDetail = [];
			if (details[0].path[0] === 'repass') {
				errorsDetail.push('Re-Password must match with Password');
			} else {
				errorsDetail = details.map((err) => err.message);
			}
			return res.status(422).json({ errors: errorsDetail });
		}
	};
};
