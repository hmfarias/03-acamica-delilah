const express = require('express');
const router = express.Router();

const { UsersService } = require('../../services');

const {
	isAdmin,
	isAdminNotHimself,
	isAuthUser,
	validateFieldsUpdate,
} = require('../../middlewares/usersMiddleware');
const { validateFieldParam } = require('../../middlewares/globalMiddleware');

router
	//GET all users
	.get('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await UsersService.getUsers();
		res.status(code).json({ ok, data, message });
	})

	//GET user by id param
	.get('/:id', isAuthUser, async (req, res) => {
		const { code, ok, data, message } = await UsersService.getUser(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//DELETE user by id
	.delete('/delete/:id', isAdminNotHimself, async (req, res) => {
		const { code, ok, data, message } = await UsersService.deleteUser(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///DELETE can only be done through the ID parameter
	.delete('/delete', validateFieldParam, async (req, res) => {})

	//UPDATE user by ID
	.put('/update/:id', isAuthUser, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await UsersService.updateUser(req, res);
		res.status(code).json({ ok, data, message });
	})
	//UPDATE can only be done through the ID parameter
	.put('/update', validateFieldParam, async (req, res) => {})

	//RESTORE user by id
	.put('/restore/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await UsersService.restoreUser(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///RESTORE can only be done through the ID parameter
	.put('/restore', validateFieldParam, async (req, res) => {});

module.exports = router;
