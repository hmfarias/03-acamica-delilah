const { Op } = require('sequelize');

const { Users } = require('../models/index');
const { compare } = require('bcryptjs');

// Validate user credentials when logging in
const validateUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const user = await Users.findOne({
			where: { [Op.or]: [username ? { username } : { email }] },
		});
		if (!user)
			return res
				.status(401)
				.json({ ok: false, data: {}, message: 'Wrong username or password' });

		//
		const passOk = await compare(password, user.password);

		if (!passOk)
			return res
				.status(401)
				.json({ ok: false, data: {}, message: 'Wrong username or password' });
		next();
	} catch (error) {
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validate fields for a user login
const validateFieldsLogin = async (req, res, next) => {
	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	const { username, password } = req.body;

	if (!username || username.trim().length === 0)
		error.message += 'Username field is required |';
	if (!password || password.trim().length === 0)
		error.message += 'Password field is required |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

module.exports = { validateFieldsLogin, validateUser };
