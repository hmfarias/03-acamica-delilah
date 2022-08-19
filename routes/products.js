const express = require('express');
const router = express.Router();

const { ProductsService } = require('./../services/index');
const { isAdmin, isAuthUser } = require('../middlewares/usersMiddleware');
const { validateFields, chekProductExist } = require('../middlewares/productsMiddleware');

// const { createNewProduct, updateProduct, deleteProduct } = require('../services/product');

//POST new product
router.post('/', isAdmin, validateFields, chekProductExist, async (req, res) => {
	const { errCode, ok, data } = await ProductsService.newProduct(req, res);
	res.status(errCode).json({
		ok,
		data,
	});
});

//GET all products
router.get('/', async (req, res) => {
	const { errCode, ok, data } = await ProductsService.bringProducts(req.params.id);
	res.status(errCode).json({
		ok,
		data,
	});
});

//GET product by ID
router.get('/:id', async (req, res) => {
	const { errCode, ok, data } = await ProductsService.bringProduct(req.params.id);
	res.status(errCode).json({
		ok,
		data,
	});
});

// //UPDATE a product
router.put('/', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await ProductsService.updateProduct(req, res);
	res.status(errCode).json({
		ok,
		data,
	});
});

// //RESTORE product by ID param
router.put('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await ProductsService.restoreProduct(req.params.id);
	res.status(errCode).json({
		ok,
		data,
	});
});

// //DELETE product by ID param
router.delete('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await ProductsService.deleteProduct(req.params.id);
	res.status(errCode).json({
		ok,
		data,
	});
});

module.exports = router;