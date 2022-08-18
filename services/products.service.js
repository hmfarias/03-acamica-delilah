const { Products } = require('./../models/index');

const ProductsService = () => {
	const bringProducts = async () => {
		return await Products.findAll();
	};

	return { bringProducts };
};

module.exports = ProductsService();
