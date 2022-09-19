const { PaymentMethods } = require('../models/index');

//Check if a role already exists
const chekPayMethodExist = async (req, res, next) => {
	try {
		const { name } = req.body;
		const nameLow = name.toLowerCase();

		const methodExists = await PaymentMethods.findOne({
			where: { name: nameLow },
			paranoid: false,
		});

		if (methodExists)
			return res.status(409).json({
				ok: false,
				data: {},
				message: `Role ${nameLow}, already exists`,
			});
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
	const { name, available } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (!name || name.length === 0) error.message += 'Name field is required |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

// Validate fields for update payment method
const validateFieldsUpdate = async (req, res, next) => {
	const { name, available } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible error

	if ((!name || name.trim().length === 0) && available !== true && available !== false)
		error.message += 'Name or available field is required';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

module.exports = {
	chekPayMethodExist,
	validateFields,
	validateFieldsUpdate,
};
