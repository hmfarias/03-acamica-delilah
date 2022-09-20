const express = require('express');
const router = express.Router();

const { OrdersService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	validateFields,
	isAuthUser,
	validateFieldsUpdate,
} = require('../../middlewares/ordersMiddleware');
const { validateFieldParam } = require('../../middlewares/globalMiddleware');

router
	// //POST new order
	.post('/', validateFields, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.newOrder(req, res);
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
	.put('/update/:id', isAdmin, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.updateOrderStatus(req, res);
		res.status(code).json({ ok, data, message });
	})
	//UPDATE can only be done through the ID parameter
	.put('/update', validateFieldParam, async (req, res) => {})

	// //RESTORE order by ID param
	.put('/restore/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.restoreOrder(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///RESTORE can only be done through the ID parameter
	.put('/restore', validateFieldParam, async (req, res) => {})

	//DELETE order by ID param
	.delete('/delete/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await OrdersService.deleteOrder(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///DELETE can only be done through the ID parameter
	.delete('/delete', validateFieldParam, async (req, res) => {});

module.exports = router;
