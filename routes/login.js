const express = require('express');
const router = express.Router();
const {
	validateUser,
	validateFields,
	chekUserExist,
} = require('../middlewares/usersMiddleware');

const { LoginService } = require('./../services/index');

//SIGNIN user
router.post('/login', validateUser, async (req, res) => {
	const { errCode, ok, data } = await LoginService.signIn(req, res);
	res.status(errCode).json({
		ok,
		data,
	});
});

//SIGNUP user
router.post('/register', validateFields, chekUserExist, async (req, res) => {
	const { errCode, ok, data } = await LoginService.signUp(req, res);
	res.status(errCode).json({
		ok,
		data,
	});
});

module.exports = router;
