const { Orders, Roles, Users } = require('../models/index');
const { getUserIdToken } = require('../helpers');

// Validate fields for a order registration
const validateFields = async (req, res, next) => {
	const { payment_method_id: payMethod, products } = req.body;

	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	if (!payMethod || payMethod == 0) error.message += 'Payment Method is required |';
	if (!products || products.length == 0) error.message += 'Products are required |';
	if (error.message.length !== 0) return res.status(400).json(error);

	products.map((prod, index) => {
		if (!prod.id || prod.id == 0)
			error.message += `Id for product ${index + 1} is required |`;
		if (!prod.quantity || prod.quantity == 0)
			error.message += `Quantity for product ${index + 1} is required |`;
	});
	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

// Validate fields for a order update
const validateFieldsUpdate = async (req, res, next) => {
	try {
		const { status } = req.body;

		const error = { ok: false, data: {}, message: '' }; //object to record possible errors

		if (!status || status.length === 0) error.message += 'Status is required |';
		if (error.message.length !== 0) return res.status(400).json(error);

		const possibleStatus = 'new confirmed preparing sending cancelled delivered';
		if (!possibleStatus.includes(status))
			error.message += `Status |${status}| not supported - Only: new | confirmed | preparing | sending | cancelled | delivered |, admitted`;
		if (error.message.length !== 0) return res.status(400).json(error);

		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validate administrator user or data owner
const isAuthUser = async (req, res, next) => {
	try {
		const userId = getUserIdToken(req.headers['authorization']);

		const { id: orderId } = req.params; // order id on which you are going to act

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user)
			return res.status(404).json({ ok: false, data: {}, message: 'Not a valid token.' });

		const order = await Orders.findByPk(orderId);

		if (!order)
			return res.status(404).json({ ok: false, data: {}, message: 'Order not found' });
		const userIdOrder = order.user_id;

		if (user.role.name !== 'admin' && userId != userIdOrder)
			return res.status(403).json({
				ok: false,
				data: {},
				message: 'Administrator or data owner level required',
			});

		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

module.exports = { validateFields, validateFieldsUpdate, isAuthUser };
