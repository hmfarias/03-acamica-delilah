const { Roles } = require('../models/index');

// Validate fields for a role registration
const validateFields = async (req, res, next) => {
	const { name } = req.body;

	const error = { ok: false, data: '' }; //object to record possible errors

	if (name.length === 0) error.data += 'Name required |';

	if (error.data.length !== 0) return res.status(400).json(error);

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
			return res.status(401).json({ ok: false, data: `Role ${nameLow}, already exists` });
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ ok: false, message: 'Internal error - Try again later...' });
	}
};

module.exports = {
	validateFields,
	chekRoleExist,
};
