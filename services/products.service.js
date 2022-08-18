const { Products } = require('./../models/index');

const ProductsService = () => {
	const bringProducts = async () => {
		const products = await Products.findAll();
		if (!products)
			return {
				errCode: 404,
				ok: false,
				payload: 'There are no products in the database.',
			};
		return {
			errCode: 200,
			ok: true,
			payload: products,
		};
	};

	const newProduct = true;
	const updateProduct = true;
	const deleteProduct = true;
	const restoreProduct = true;

	return { bringProducts, newProduct, updateProduct, deleteProduct, restoreProduct };
};

module.exports = ProductsService();
