const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { Users, Roles } = require('../models/index');

const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

// Validate administrator user
const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers['authorization'];
		if (!token) return res.status(401).json({ ok: false, data: 'No credentials sent' });

		const userId = jwt.verify(req.headers.authorization.substring(7), JWT_SECRET).id;

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user) return res.status(404).json({ ok: false, data: 'Not a valid token.' });

		if (user.role.name !== 'admin')
			return res.status(401).json({ ok: false, data: 'Admin level required' });

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, message: 'Internal error - Try again later...' });
	}
};

// Validate administrator user or data owner
const isAuthUser = async (req, res, next) => {
	console.log(req.params);
	try {
		const token = req.headers['authorization'];
		if (!token) return res.status(401).json({ ok: false, data: 'No credentials sent' });

		const userId = jwt.verify(req.headers.authorization.substring(7), JWT_SECRET).id;
		const { id } = req.params; // user id on which you are going to act

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user) return res.status(404).json({ ok: false, data: 'Not a valid token.' });

		if (user.role.name !== 'admin' && userId != id)
			return res
				.status(401)
				.json({ ok: false, data: 'Administrator or data owner level required' });

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, message: 'Internal error - Try again later...' });
	}
};

// Validate user credentials when logging in
const validateUser = async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = await Users.findOne({
		where: { [Op.or]: [username ? { username } : { email }] },
	});
	if (!user)
		return res.status(401).json({ ok: false, data: 'Wrong username or password' });
	const passOk = password === user.password;

	if (!passOk)
		return res.status(401).json({ ok: false, data: 'Wrong username or password' });
	next();
};

// Validate fields for a user registration
const validateFields = async (req, res, next) => {
	const error = { ok: false, data: '' }; //object to record possible errors

	const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //possible characters to validate an email

	const { username, name, email, phone, address, password } = req.body;

	if (username.length === 0) error.data += 'Username required |';
	if (name.length === 0) error.data += 'Name required |';
	if (email.length === 0) error.data += 'Email required |';
	if (phone.length === 0) error.data += 'Phone required |';
	if (address.length === 0) error.data += 'Address required |';
	if (password.length === 0) error.data += 'Password required |';

	if (username.length < 5 && username.length > 0)
		error.data += 'Username field must have at least 5 characters |';

	if (password.length < 5 && password.length > 0)
		error.data += 'Password field must have at least 5 characters |';

	if (!regex.test(email) && email.length > 0)
		error.data += 'Email field has an invalid format |';

	if (error.data.length !== 0) return res.status(400).json(error);

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
				.json({ ok: false, data: 'Username or Email already exists.' });
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ ok: false, message: 'Internal error - Try again later...' });
	}
};

module.exports = {
	chekUserExist,
	isAdmin,
	isAuthUser,
	validateUser,
	validateFields,
};
