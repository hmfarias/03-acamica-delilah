const { Products } = require('../models/index');

// Validate fields for a product registration
const validateFields = async (req, res, next) => {
	const { name, price, image } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (name.length === 0) error.message += 'Name required |';
	if (!price) error.message += 'Price is required |';
	if (image.length === 0) error.message += 'Image required |';

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
				.status(401)
				.json({ ok: false, data: {}, message: 'Product already exists' });
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
	chekProductExist,
};
