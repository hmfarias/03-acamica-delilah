const express = require('express');
const router = express.Router();

const { UsersService, LoginService } = require('./../services/index');
const { isAdmin, isAuthUser } = require('./../middlewares/index');

router.get('/', isAdmin, async (req, res) => {
	const users = await UsersService.bringUsers();
	res.status(200).json(users);
});

router.get('/:id', isAuthUser, async (req, res) => {
	const user = await UsersService.bringUser(req.params.id);
	if (!user) return res.status(404).json({ ok: false, message: 'User not found.' });
	res.status(200).json(user);
});

router.delete('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, message } = await UsersService.deleteUser(req.params.id);
	res.status(errCode).json({
		ok: ok,
		message: message,
	});
});

router.put('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, message } = await UsersService.restoreUser(req.params.id);
	res.status(errCode).json({
		ok: ok,
		message: message,
	});
});

module.exports = router;
