const { Roles } = require('../models/index');

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
				.status(409)
				.json({ ok: false, data: {}, message: `Role ${nameLow}, already exists` });
		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validate fields for a role registration
const validateFields = async (req, res, next) => {
	const { name } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (!name || name.length === 0) error.message += 'Name field is required |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

// Validate fields for update role
const validateFieldsUpdate = async (req, res, next) => {
	const { name } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible error

	if (!name || name.trim().length === 0) error.message += 'Name field is required';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

module.exports = {
	chekRoleExist,
	validateFields,
	validateFieldsUpdate,
};
