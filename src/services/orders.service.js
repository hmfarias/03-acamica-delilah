const { getUserIdToken } = require('../helpers');
const {
	Orders,
	Products,
	Users,
	PaymentMethods,
	OrdersHasProducts,
} = require('./../models/index');

const OrdersService = () => {
	const getOrder = async (id) => {
		try {
			const order = await Orders.findByPk(id, {
				paranoid: false,
				include: [
					{ model: Products, through: { attributes: ['quantity'] } },
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});

			if (!order)
				return {
					code: 404,
					ok: false,
					data: {},
					message: `Order not found - Id:${id}`,
				};
			if (order.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The Order is deleted - (soft deleted)',
				};
			return {
				code: 200,
				ok: true,
				data: { order },
				message: 'Successfully recovered Order',
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

	const getOrders = async () => {
		try {
			const ordersDashboard = await Orders.findAll({
				include: [
					{ model: Products, through: { attributes: ['quantity'] } },
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});
			if (!ordersDashboard)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'There are no orders in the database.',
				};
			return {
				code: 200,
				ok: true,
				data: { orders: ordersDashboard },
				message: 'Successfully recovered Orders',
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

	const createOrder = async (req, res) => {
		try {
			const { payment_method_id: payMethodId, products: productsOrder } = req.body;
			// const payMethodId = req.body.paymethod;
			// const productsOrder = req.body.products;
			const userId = getUserIdToken(req.headers['authorization']);

			const productsData = await Promise.all(
				productsOrder.map(async (prod) => {
					const productDB = await Products.findByPk(prod.id);
					return {
						quantity: prod.quantity,
						price: productDB.price,
						id: productDB.id,
					};
				})
			);

			const totalPrice = productsData.reduce((acc, prod) => {
				return (acc += prod.quantity * parseFloat(prod.price));
			}, 0);

			const newOrder = await Orders.create({
				date: Date.now(),
				total_price: totalPrice,
				user_id: userId,
				payment_method_id: payMethodId,
			});

			await Promise.all(
				productsData.map(async (prod) => {
					await OrdersHasProducts.create(
						{
							order_id: newOrder.id,
							product_id: prod.id,
							quantity: prod.quantity,
						},
						{ fields: ['order_id', 'product_id', 'quantity'] }
					);
				})
			);

			return {
				code: 200,
				ok: true,
				data: { order: newOrder },
				message: 'Order was successfully registered',
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

	const updateOrder = async (req, res) => {
		try {
			const orderId = req.params.id;
			const orderStatus = req.body.status;

			const order = await Orders.findByPk(orderId);

			if (!order) return { code: 404, ok: false, data: {}, message: 'Order not found' };

			order.status = orderStatus;

			order.save();

			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successfully updated Order Status - Order Id = ${orderId}`,
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

	return { createOrder, getOrder, getOrders, updateOrder };
};

module.exports = OrdersService();
