const { Order, Product, User, PaymentMethod, OrderHasProduct } = require("./../models");

const OrdersService = () => {
	const bringOrders = async () => {
		return await Order.findAll({
			include: [
				{ model: Product },
				{ model: User, attributes: ["name", "address"] },
				{ model: PaymentMethod, attributes: ["name"] },
			],
		});
	};

	const createOrder = async (payment_method, products, user_id) => {
		const products_data = await Promise.all(
			products.map(async (prod) => {
				const productDB = await Product.findByPk(prod.id);
				return {
					quantity: prod.quantity,
					price: productDB.price,
					id: productDB.id,
				};
			})
		);

		const totalPrice = products_data.reduce((acc, prod) => {
			return (acc += prod.quantity * parseFloat(prod.price));
		}, 0);

		const newOrder = await Order.create({
			date: Date.now(),
			total_price: totalPrice,
			user_id: user_id,
			payment_method_id: payment_method,
		});

		await Promise.all(
			products_data.map(async (prod) => {
				await OrderHasProduct.create(
					{
						order_id: newOrder.id,
						product_id: prod.id,
						quantity: prod.quantity,
					},
					{ fields: ["order_id", "product_id", "quantity"] }
				);
			})
		);

		return newOrder;
	};

	return { bringOrders, createOrder };
};

module.exports = OrdersService();
