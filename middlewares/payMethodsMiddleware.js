const { PaymentMethods } = require('../models/index');

// Validate fields for a role registration
const validateFields = async (req, res, next) => {
	const { name } = req.body;

	const error = { ok: false, data: '' }; //object to record possible errors

	if (!name)
		return res.status(400).json({
			ok: false,
			data: {},
			message: 'No data was sent - Payment method could not be updated',
		});

	if (name.length === 0) error.data += 'Name required |';

	if (error.data.length !== 0)
		return res.status(400).json({ ok: false, data: {}, message: error });

	next();
};

//Check if a role already exists
const chekPayMethodExist = async (req, res, next) => {
	try {
		const { id, name } = req.body;
		const nameLow = name.toLowerCase();
		console.log('nameLow -------');
		console.log(nameLow);

		const methodExists = await PaymentMethods.findOne({
			where: { name: nameLow },
			paranoid: false,
		});

		if (methodExists)
			return res.status(401).json({
				ok: false,
				data: { id: methodExists.id, name: methodExists.name },
				message: `Role ${nameLow}, already exists`,
			});
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
	chekPayMethodExist,
};
