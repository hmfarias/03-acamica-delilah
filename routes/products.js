const express = require('express');
const router = express.Router();
const Products = require('./../models/index');
const { ProductsService } = require('./../services/index');
const { isAdmin, isAuthUser } = require('./../middlewares/index');

// const { createNewProduct, updateProduct, deleteProduct } = require('../services/product');

//GET all products
router.get('/', async (req, res) => {
	// const products = await ProductsService.bringProducts();
	// if (!products)
	// 	res.status(404).json({ message: 'There are no products in the database.' });

	// res.status(200).json(products);

	const { errCode, ok, payload } = await ProductsService.bringProducts(req.params.id);
	res.status(errCode).json({
		ok: ok,
		data: payload,
	});
});

// //POST new product
// router.post('/', isAdmin, newProduct);

// //UPDATE a product
// router.put('/', isAdmin, updateProduct);

// //DELETE a producto by ID param
// router.delete('/:id', isAdmin, deleteProduct);

// //RESTORE a product by ID param
// router.put('/:id', isAdmin, restoreProduct);

module.exports = router;
