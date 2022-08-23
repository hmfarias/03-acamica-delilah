const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { Users, Roles } = require('../models/index');
const { getUserIdToken } = require('../helpers');

const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

// Validate administrator user
const isAdmin = async (req, res, next) => {
	try {
		const userId = getUserIdToken(req.headers['authorization']);

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user)
			return res.status(404).json({ ok: false, data: {}, message: 'Not a valid token.' });

		if (user.role.name !== 'admin')
			return res
				.status(401)
				.json({ ok: false, data: {}, message: 'Admin level required' });

		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validates that the user is admin, but that it isn't his own account that he is acting in
const isAdminNotHimself = async (req, res, next) => {
	try {
		const userId = getUserIdToken(req.headers['authorization']);

		const { id } = req.params; // user id on which you are going to act

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user)
			return res.status(404).json({ ok: false, data: {}, message: 'Not a valid token.' });
		if (user.role.name !== 'admin')
			return res.status(401).json({
				ok: false,
				data: {},
				message: 'Admin level required',
			});

		if (userId == id)
			return res.status(401).json({
				ok: false,
				data: {},
				message: 'Admin can not delete own account',
			});

		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validate administrator user or data owner
const isAuthUser = async (req, res, next) => {
	try {
		const userId = getUserIdToken(req.headers['authorization']);

		const { id } = req.params; // user id on which you are going to act

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user)
			return res.status(404).json({ ok: false, data: {}, message: 'Not a valid token.' });

		if (user.role.name !== 'admin' && userId != id)
			return res.status(401).json({
				ok: false,
				data: {},
				message: 'Administrator or data owner level required',
			});

		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

// Validate fields for a user registration
const validateFields = async (req, res, next) => {
	const error = { ok: false, data: {}, message: '' }; //object to record possible errors

	const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //possible characters to validate an email

	const { username, name, email, phone, address, password } = req.body;

	if (username.length === 0) error.message += 'Username required |';
	if (name.length === 0) error.message += 'Name required |';
	if (email.length === 0) error.message += 'Email required |';
	if (phone.length === 0) error.message += 'Phone required |';
	if (address.length === 0) error.message += 'Address required |';
	if (password.length === 0) error.message += 'Password required |';

	if (username.length < 5 && username.length > 0)
		error.message += 'Username field must have at least 5 characters |';

	if (password.length < 5 && password.length > 0)
		error.message += 'Password field must have at least 5 characters |';

	if (!regex.test(email) && email.length > 0)
		error.message += 'Email field has an invalid format |';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

//Check if a user already exists
const chekUserExist = async (req, res, next) => {
	const { username, email } = req.body;
	try {
		const userExists = await Users.findOne({
			where: { [Op.or]: [{ username }, { email }] },
			paranoid: false,
		});
		if (userExists)
			return res
				.status(401)
				.json({ ok: false, data: {}, message: 'Username or Email already exists.' });
		next();
	} catch (error) {
		console.log(error);
		return res.status(error?.status || 500).json({
			ok: false,
			data: { error: error?.message || error },
			message: 'Internal error - Try again later...',
		});
	}
};

module.exports = {
	chekUserExist,
	isAdmin,
	isAdminNotHimself,
	isAuthUser,
	validateFields,
};
