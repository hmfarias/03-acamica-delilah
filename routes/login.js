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
	const { code, ok, data, error } = await LoginService.signIn(req, res);
	res.status(code).json({ ok, data, error });
});

//SIGNUP user
router.post('/register', validateFields, chekUserExist, async (req, res) => {
	const { code, ok, data, error } = await LoginService.signUp(req, res);
	res.status(code).json({ ok, data, error });
});

module.exports = router;
