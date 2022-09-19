const express = require('express');
const router = express.Router();

const { PayMethodsService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	validateFields,
	chekPayMethodExist,
	validateFieldsUpdate,
} = require('../../middlewares/payMethodsMiddleware');
const { validateFieldParam } = require('../../middlewares/globalMiddleware');

router
	//POST a new payment method
	.post('/', isAdmin, validateFields, chekPayMethodExist, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.newPayMethod(req, res);
		res.status(code).json({ ok, data, message });
	})

	//GET all payment methods
	.get('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.getPayMethods();
		res.status(code).json({ ok, data, message });
	})

	//GET payment method by id param
	.get('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.getPayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})

	//RESTORE payment method by id
	.put('/restore/:id', async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.restorePayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})
	///RESTORE can only be done through the ID parameter
	.put('/restore', validateFieldParam, async (req, res) => {})

	//UPDATE payment method by ID
	.put('/update/:id', isAdmin, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.updatePayMethod(req, res);
		res.status(code).json({ ok, data, message });
	})
	//UPDATE can only be done through the ID parameter
	.put('/update', validateFieldParam, async (req, res) => {})

	//DELETE payment method by id
	.delete('/delete/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.deletePayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})
	///DELETE can only be done through the ID parameter
	.delete('/delete', validateFieldParam, async (req, res) => {});

module.exports = router;
