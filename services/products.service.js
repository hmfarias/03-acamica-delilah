const { Products } = require('./../models/index');

const ProductsService = () => {
	const bringProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, {
				paranoid: false,
			});
			if (!product) return { code: 404, ok: false, data: 'Product not found' };

			if (product.deletedAt != null)
				return { code: 404, ok: false, data: 'The Product is deleted - (soft deleted' };

			return { code: 200, ok: true, data: product };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const bringProducts = async () => {
		try {
			const products = await Products.findAll();
			if (!products)
				return { code: 404, ok: false, data: 'There are no products in the database' };

			return { code: 200, ok: true, data: products };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const deleteProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, { paranoid: false });
			if (!product) return { code: 404, ok: false, data: 'Product not found' };

			if (product.deletedAt != null)
				return { code: 404, ok: false, data: 'The product is already deleted' };

			const deletedProduct = await product.destroy();
			if (!deletedProduct)
				return { code: 404, ok: false, data: 'The product could not be deleted' };

			return {
				code: 200,
				ok: true,
				data: `Product with Id: ${id} successfully deleted - (soft deleted)`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const newProduct = async (req, res) => {
		try {
			const { name, price, image, available } = req.body;

			const product = await Products.create({
				name,
				price,
				image,
				available: available ? available : true,
			});
			if (!product)
				return { code: 404, ok: false, data: 'The product could not be registered' };

			return { code: 200, ok: true, data: product };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const restoreProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, { paranoid: false });
			if (!product) return { code: 404, ok: false, data: 'Product not found' };

			if (product.deletedAt === null)
				return { code: 404, ok: false, data: 'The product is not deleted' };

			const productRestored = await Products.restore({ where: { id: id } });
			if (!productRestored)
				return { code: 404, ok: false, data: 'The product could not be restored' };

			return {
				code: 200,
				ok: true,
				data: `Product with Id: ${id} successfully restored`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const updateProduct = async (req, res) => {
		try {
			const { id, name, price, image, available } = req.body;

			if (!name && !price && !image && !available)
				return {
					code: 400,
					ok: false,
					data: 'No data was sent - The product could not be updated',
				};
			const product = await Products.findByPk(id);
			if (!product) return { code: 404, ok: false, data: 'Product not found' };

			const updatedProduct = await Products.update(
				{
					name: name ? name : product.name,
					price: price ? price : product.price,
					image: image ? image : product.image,
					available: available,
				},
				{ where: { id: id } }
			);

			if (!updatedProduct)
				return { code: 404, ok: false, data: 'The product could not be updated' };

			return {
				code: 200,
				ok: true,
				data: `Successfully updated product with ID = ${id}`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	return {
		bringProduct,
		bringProducts,
		deleteProduct,
		newProduct,
		restoreProduct,
		updateProduct,
	};
};

module.exports = ProductsService();
