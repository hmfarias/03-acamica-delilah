const express = require('express');
const router = express.Router();
const { validateUser, validateFields, chekUserExist } = require('../middlewares/index');

const { LoginService } = require('./../services/index');

//SIGNIN user
router.post('/login', validateUser, async (req, res) => {
	const { errCode, ok, data } = await LoginService.signIn(req, res);
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

//SIGNUP user
router.post('/register', validateFields, chekUserExist, async (req, res) => {
	const { errCode, ok, data } = await LoginService.signUp(req, res);
	res.status(errCode).json({
		ok: ok,
		data: data,
	});
});

module.exports = router;
