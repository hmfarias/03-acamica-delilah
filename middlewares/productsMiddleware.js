const { Products } = require('../models/index');

// Validate fields for a product registration
const validateFields = async (req, res, next) => {
	const { name, price, image } = req.body;

	const error = { ok: false, data: '' }; //object to record possible errors

	if (name.length === 0) error.data += 'Name required |';
	if (!price) error.data += 'Price is required |';
	if (image.length === 0) error.data += 'Image required |';

	if (error.data.length !== 0) return res.status(400).json(error);

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
			return res.status(401).json({ ok: false, data: 'Product already exists' });
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Internal error - Try again later...' });
	}
};

module.exports = {
	validateFields,
	chekProductExist,
};
