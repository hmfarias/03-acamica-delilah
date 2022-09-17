const express = require('express');
const router = express.Router();

const { isAdmin } = require('../../middlewares/usersMiddleware');
const { ProductsService } = require('../../services');
const {
	chekProductExist,
	validateFields,
	validateFieldsUpdate,
} = require('../../middlewares/productsMiddleware');
const { validateFieldParam } = require('../../middlewares/globalMiddleware');

router
	//POST new product
	.post('/', isAdmin, validateFields, chekProductExist, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.newProduct(req, res);
		res.status(code).json({ ok, data, message });
	})

	//GET all products
	.get('/', async (req, res) => {
		const { code, ok, data, message } = await ProductsService.getProducts(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//GET product by ID
	.get('/:id', validateFieldParam, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.getProduct(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//UPDATE product by ID
	.put('/update/:id', isAdmin, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.updateProduct(req, res);
		res.status(code).json({ ok, data, message });
	})
	//UPDATE can only be done through the ID parameter
	.put('/update', validateFieldParam, async (req, res) => {})

	// //RESTORE product by ID param
	.put('/restore/:id', isAdmin, validateFieldParam, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.restoreProduct(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})
	///RESTORE can only be done through the ID parameter
	.put('/restore', validateFieldParam, async (req, res) => {})

	//DELETE product by ID param
	.delete('/delete/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.deleteProduct(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})
	///DELETE can only be done through the ID parameter
	.delete('/delete', validateFieldParam, async (req, res) => {});

module.exports = router;
