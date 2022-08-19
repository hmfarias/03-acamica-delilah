const express = require('express');
const router = express.Router();

const { PayMethodsService } = require('../services/index');
const { isAdmin } = require('../middlewares/usersMiddleware');
const {
	validateFields,
	chekPayMethodExist,
} = require('../middlewares/payMethodsMiddleware');

//POST a new payment method
router.post('/', isAdmin, validateFields, chekPayMethodExist, async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.newPayMethod(req, res);
	res.status(code).json({ ok, data, message });
});

//GET all payment methods
router.get('/', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.bringPayMethods();
	res.status(code).json({ ok, data, message });
});

//GET payment method by id param
router.get('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.bringPayMethod(
		req.params.id
	);
	res.status(code).json({ ok, data, message });
});

//RESTORE payment method by id
router.put('/:id', async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.restorePayMethod(
		req.params.id
	);
	res.status(code).json({ ok, data, message });
});

//UPDATE payment method
router.put('/', async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.updatePayMethod(req, res);
	res.status(code).json({ ok, data, message });
});

//DELETE payment method by id
router.delete('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await PayMethodsService.deletePayMethod(
		req.params.id
	);
	res.status(code).json({ ok, data, message });
});

module.exports = router;
