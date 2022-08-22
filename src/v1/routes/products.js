const express = require('express');
const router = express.Router();

const { ProductsService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	validateFields,
	chekProductExist,
} = require('../../middlewares/productsMiddleware');

// const { createNewProduct, updateProduct, deleteProduct } = require('../services/product');

router
	//POST new product
	.post('/', isAdmin, validateFields, chekProductExist, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.newProduct(req, res);
		res.status(code).json({ ok, data, message });
	})

	//GET all products
	.get('/', async (req, res) => {
		const { code, ok, data, message } = await ProductsService.bringProducts(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})

	//GET product by ID
	.get('/:id', async (req, res) => {
		const { code, ok, data, message } = await ProductsService.bringProduct(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	// //UPDATE a product
	.put('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.updateProduct(req, res);
		res.status(code).json({ ok, data, message });
	})

	// //RESTORE product by ID param
	.put('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.restoreProduct(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})

	// //DELETE product by ID param
	.delete('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await ProductsService.deleteProduct(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	});

module.exports = router;
