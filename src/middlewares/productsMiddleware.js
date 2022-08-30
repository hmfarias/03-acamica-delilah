const { Products } = require('../models/index');

// Validate fields for a product registration
const validateFields = async (req, res, next) => {
	const { name, price, image } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (!name || name.trim().length === 0) error.message += 'Name is required |';
	if (!price || price == 0) error.message += 'Price is required |';
	if (!image || image.trim().length === 0) error.message += 'Image is required |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

// Validate fields for update product
const validateFieldsUpdate = async (req, res, next) => {
	const { name, price, image, available } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible error

	if (
		(!name || name.trim().length === 0) &&
		(!price || price == 0) &&
		(!image || image.trim().length === 0) &&
		!available
	)
		error.message += 'At least one field is required to update';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

//Check if a product already exists
const chekProductExist = async (req, res, next) => {
	const { name } = req.body;
	try {
		const productExists = await Products.findOne({
			where: { name },
			paranoid: false,
		});
		if (productExists)
			return res
				.status(409)
				.json({ ok: false, data: {}, message: 'Product already exists' });
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

module.exports = {
	validateFields,
	validateFieldsUpdate,
	chekProductExist,
};
