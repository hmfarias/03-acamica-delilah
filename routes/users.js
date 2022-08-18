const express = require('express');
const router = express.Router();

const { UsersService } = require('./../services/index');
const { isAdmin, isAuthUser } = require('./../middlewares/index');

//GET all users
router.get('/', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await UsersService.bringUsers();
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

//GET user by id param
router.get('/:id', isAuthUser, async (req, res) => {
	const { errCode, ok, data } = await UsersService.bringUser(req.params.id);
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

//DELETE user by id
router.delete('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await UsersService.deleteUser(req.params.id);
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

//RESTORE user by id
router.put('/:id', isAdmin, async (req, res) => {
	const { errCode, ok, data } = await UsersService.restoreUser(req.params.id);
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

module.exports = router;
