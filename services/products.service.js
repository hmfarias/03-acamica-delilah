const { Products } = require('./../models/index');

const ProductsService = () => {
	const bringProduct = async (productId) => {
		try {
			const product = await Products.findByPk(productId, {
				paranoid: false,
			});
			if (!product)
				return {
					errCode: 404,
					ok: false,
					data: 'Product not found.',
				};

			if (product.deletedAt != null)
				return {
					errCode: 404,
					ok: false,
					data: 'The Product is deleted - (soft deleted)',
				};
			return {
				errCode: 200,
				ok: true,
				data: product,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	const bringProducts = async () => {
		try {
			const products = await Products.findAll();
			if (!products)
				return {
					errCode: 404,
					ok: false,
					data: 'There are no products in the database.',
				};
			return {
				errCode: 200,
				ok: true,
				data: products,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	const deleteProduct = async (productId) => {
		try {
			const product = await Products.findByPk(productId, { paranoid: false });
			if (!product)
				return {
					errCode: 404,
					ok: false,
					data: 'Product not found',
				};

			if (product.deletedAt != null)
				return { errCode: 404, ok: false, data: 'The product is already deleted' };

			const deletedProduct = await product.destroy();
			if (!deletedProduct)
				return {
					errCode: 404,
					ok: false,
					data: 'The product could not be updated',
				};

			return {
				errCode: 200,
				ok: true,
				data: `Product with ID = ${productId} successfully deleted - (soft deleted)`,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
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
				return {
					errCode: 404,
					ok: false,
					data: 'The product could not be registered',
				};
			return {
				errCode: 200,
				ok: true,
				data: product,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	const restoreProduct = async (productId) => {
		try {
			const product = await Products.findByPk(productId, { paranoid: false });
			if (!product) return { errCode: 404, ok: false, data: 'Product not found.' };

			if (product.deletedAt === null)
				return { errCode: 404, ok: false, data: 'The product is not deleted' };

			const productRestored = await Products.restore({ where: { id: productId } });
			if (productRestored)
				return {
					errCode: 200,
					ok: true,
					data: `Product with ID = ${productId} successfully restored `,
				};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	const updateProduct = async (req, res) => {
		try {
			const { id, name, price, image, available } = req.body;

			if (!name && !price && !image && !available)
				return {
					errCode: 400,
					ok: false,
					data: 'No data was sent - The product could not be updated',
				};
			const product = await Products.findByPk(id);
			if (!product)
				return {
					errCode: 404,
					ok: false,
					data: 'Product not found',
				};

			const updatedProduct = await Products.update(
				{
					name: name ? name : product.name,
					price: price ? price : product.price,
					image: image ? image : product.image,
					available: available,
				},
				{
					where: { id: id },
				}
			);

			if (!updatedProduct)
				return {
					errCode: 404,
					ok: false,
					data: 'The product could not be updated',
				};

			return {
				errCode: 200,
				ok: true,
				data: `Successfully updated product with ID = ${id}`,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
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
