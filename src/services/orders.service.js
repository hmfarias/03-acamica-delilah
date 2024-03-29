const { getUserIdToken, formatOrderOutput } = require('../helpers');
const {
	Orders,
	Products,
	Users,
	PaymentMethods,
	OrdersHasProducts,
} = require('./../models/index');

const OrdersService = () => {
	const newOrder = async (req, res) => {
		try {
			const { payment_method_id: payMethodId, products: productsOrder } = req.body;

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

			const orderNew = await Orders.create({
				date: Date.now(),
				total_price: totalPrice,
				user_id: userId,
				payment_method_id: payMethodId,
			});

			await Promise.all(
				productsData.map(async (prod) => {
					await OrdersHasProducts.create(
						{
							order_id: orderNew.id,
							product_id: prod.id,
							quantity: prod.quantity,
						},
						{ fields: ['order_id', 'product_id', 'quantity'] }
					);
				})
			);
			const order = await Orders.findByPk(orderNew.id, {
				include: [
					{
						model: Products,
						attributes: ['id', 'name', 'price', 'image'],
						through: { attributes: ['quantity'] },
					},
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});

			if (!order)
				return {
					code: 500,
					ok: false,
					data: { order },
					message: 'Unexpected error - The order could not be added',
				};

			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successful operation for order ID: ${order.id}`,
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

	const deleteOrder = async (id) => {
		try {
			const order = await Orders.findByPk(id, {
				paranoid: false,
				include: [
					{ model: Products, through: { attributes: ['quantity'] } },
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});
			if (!order) return { code: 404, ok: false, data: {}, message: 'Order not found' };

			if (order.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Order is deleted - (soft deleted)',
				};

			const deletedOrder = await order.destroy();
			if (!deletedOrder)
				return {
					code: 500,
					ok: false,
					data: { order },
					message: 'Unexpected error - The order could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successful operation for Order ID: ${id} `,
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

	const getOrder = async (id) => {
		try {
			const order = await Orders.findByPk(id, {
				paranoid: false,
				include: [
					{
						model: Products,
						attributes: ['id', 'name', 'price', 'image'],
						through: { attributes: ['quantity'] },
					},
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
					code: 410,
					ok: false,
					data: {},
					message: 'Order is deleted - (soft deleted)',
				};
			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successful operation for order ID: ${id}`,
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
					{
						model: Products,
						attributes: ['id', 'name', 'price', 'image'],
						through: { attributes: ['quantity'] },
					},
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

	const restoreOrder = async (id) => {
		try {
			const order = await Orders.findByPk(id, {
				paranoid: false,
				include: [
					{
						model: Products,
						attributes: ['id', 'name', 'price', 'image'],
						through: { attributes: ['quantity'] },
					},
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});
			if (!order) return { code: 404, ok: false, data: {}, message: 'Order not found' };

			if (order.deletedAt === null)
				return { code: 404, ok: false, data: {}, message: 'Order is not deleted' };

			const orderRestored = await Orders.restore({ where: { id: id } });
			if (!orderRestored)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The order could not be restored',
				};

			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successful operation for Order ID: ${id}`,
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

	const updateOrderStatus = async (req, res) => {
		try {
			const orderId = req.params.id;
			const orderStatus = req.body.status;

			const order = await Orders.findByPk(orderId, {
				paranoid: false,
				include: [
					{
						model: Products,
						attributes: ['id', 'name', 'price', 'image'],
						through: { attributes: ['quantity'] },
					},
					{ model: Users, attributes: ['name', 'address', 'phone', 'email'] },
					{ model: PaymentMethods, attributes: ['name'] },
				],
			});

			if (!order) return { code: 404, ok: false, data: {}, message: 'Order not found' };

			order.status = orderStatus;

			order.save();

			return {
				code: 200,
				ok: true,
				data: { order },
				message: `Successful operation for Order ID: ${orderId} `,
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
		newOrder,
		deleteOrder,
		getOrder,
		getOrders,
		restoreOrder,
		updateOrderStatus,
	};
};

module.exports = OrdersService();
