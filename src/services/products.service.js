const { Products } = require('./../models/index');

const ProductsService = () => {
	const getProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, {
				attributes: ['id', 'name', 'price', 'image', 'available', 'deletedAt'],
				paranoid: false,
			});
			if (!product)
				return { code: 404, ok: false, data: {}, message: 'Product/s not found' };

			if (product.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Product is deleted - (soft deleted)',
				};

			return {
				code: 200,
				ok: true,
				data: { product },
				message: 'Successful operation',
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const getProducts = async () => {
		try {
			const products = await Products.findAll();
			if (!products)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'Product/s not found',
				};

			return {
				code: 200,
				ok: true,
				data: { products },
				message: 'Successfully recovered Products',
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const deleteProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, { paranoid: false });
			if (!product)
				return { code: 404, ok: false, data: {}, message: 'Product not found' };

			if (product.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Product is deleted - (soft deleted)',
				};

			const { name, price, available, image } = product;

			const deletedProduct = await product.destroy();
			if (!deletedProduct)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The product could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { product: { id, name, price, image, available } },
				message: `Successful operation for product ID: ${id}, Name: ${name}`,
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
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
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error',
				};
			const { id, available: avail } = product;
			return {
				code: 200,
				ok: true,
				data: { product: { id, name, price, image, available: avail } },
				message: `Successfull operation for product ID: ${product.id}, Name: ${product.name}`,
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const restoreProduct = async (id) => {
		try {
			const product = await Products.findByPk(id, { paranoid: false });
			if (!product)
				return { code: 404, ok: false, data: {}, message: 'Product not found' };

			if (product.deletedAt === null)
				return { code: 406, ok: false, data: {}, message: 'Product is not deleted' };

			const { name, price, available, image } = product;

			const productRestored = await Products.restore({ where: { id: id } });
			if (!productRestored)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The product could not be restored',
				};

			return {
				code: 200,
				ok: true,
				data: { product: { id, name, price, image, available } },
				message: `Successfull operation for Product ID: ${id} Name: ${name}`,
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const updateProduct = async (req, res) => {
		try {
			const { id } = req.params;
			const { name, price, image, available } = req.body;

			const product = await Products.findByPk(id);
			if (!product)
				return { code: 404, ok: false, data: {}, message: 'Product not found' };

			const nameUpd = name ? name : product.name;
			const priceUpd = price ? price : product.price;
			const imageUpd = image ? image : product.image;
			const availabeUpd = available ? available : product.available;

			const updatedProduct = await Products.update(
				{
					name: nameUpd,
					price: priceUpd,
					image: imageUpd,
					available: availabeUpd,
				},
				{ where: { id: id } }
			);

			if (!updatedProduct)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The product could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: {
					product: {
						id,
						name: nameUpd,
						price: priceUpd,
						image: imageUpd,
						available: availabeUpd,
					},
				},
				message: `Successfull operation for product ID: ${id} Name: ${name}`,
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	return {
		getProduct,
		getProducts,
		deleteProduct,
		newProduct,
		restoreProduct,
		updateProduct,
	};
};

module.exports = ProductsService();
