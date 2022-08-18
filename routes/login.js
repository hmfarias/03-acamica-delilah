const express = require('express');
const router = express.Router();
const {
	validateUser,
	signIn,
	validateFields,
	chekUserExist,
	signUp,
} = require('../middlewares/index');

router.post('/login', validateUser, signIn);

router.post('/register', validateFields, chekUserExist, signUp);

module.exports = router;
