const express = require('express');
const router = express.Router();

const { UsersService } = require('../../services');

const { isAdmin, isAuthUser } = require('../../middlewares/usersMiddleware');

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
	.delete('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await UsersService.deleteUser(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//RESTORE user by id
	.put('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await UsersService.restoreUser(req.params.id);
		res.status(code).json({ ok, data, message });
	});

module.exports = router;
