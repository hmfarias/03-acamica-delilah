const express = require('express');
const router = express.Router();

const { OrdersService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	validateFields,
	isAuthUser,
	validateFieldsUpdate,
} = require('../../middlewares/ordersMiddleware');

router
	// //POST new order
	// .post('/', validateFields, chekOrderExist, async (req, res) => {
	.post('/', validateFields, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.createOrder(req, res);
		res.status(code).json({ ok, data, message });
	})

	// //GET orders DASHBOARD
	.get('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.getOrders(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//GET order by ID
	.get('/:id', isAuthUser, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.getOrder(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	// //UPDATE an order
	.put('/newstatus/:id', isAdmin, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.updateOrderStatus(req, res);
		res.status(code).json({ ok, data, message });
	})

	// //RESTORE order by ID param
	.put('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.restoreOrder(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//DELETE order by ID param
	.delete('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.deleteOrder(req.params.id);
		res.status(code).json({ ok, data, message });
	});

module.exports = router;
