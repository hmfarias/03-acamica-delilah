const { Roles } = require('../models/index');

// Validate fields for a role registration
const validateFields = async (req, res, next) => {
	const { name } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (name.length === 0) error.message += 'Name required |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

//Check if a role already exists
const chekRoleExist = async (req, res, next) => {
	const { name } = req.body;
	const nameLow = name.toLowerCase();
	try {
		const roleExists = await Roles.findOne({
			where: { name: nameLow },
			paranoid: false,
		});
		if (roleExists)
			return res
				.status(401)
				.json({ ok: false, data: {}, message: `Role ${nameLow}, already exists` });
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ ok: false, data: error, message: 'Internal error - Try again later...' });
	}
};

module.exports = {
	validateFields,
	chekRoleExist,
};
