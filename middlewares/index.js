const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { Users, Roles } = require('../models/index');

const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers['authorization'];
		if (!token)
			return res.status(401).json({ ok: false, message: 'No credentials sent' });

		const userId = jwt.verify(req.headers.authorization.substring(7), JWT_SECRET).id;

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user) return res.status(404).json({ ok: false, message: 'Not a valid token.' });

		if (user.role.name !== 'admin')
			return res.status(401).json({ ok: false, message: 'Admin level required' });

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal error - Try again later...' });
	}
};

const isAuthUser = async (req, res, next) => {
	console.log(req.params);
	try {
		const token = req.headers['authorization'];
		if (!token)
			return res.status(401).json({ ok: false, message: 'No credentials sent' });

		const userId = jwt.verify(req.headers.authorization.substring(7), JWT_SECRET).id;
		const { id } = req.params; // user id on which you are going to act

		const user = await Users.findByPk(userId, {
			include: [Roles],
		});

		if (!user) return res.status(404).json({ ok: false, message: 'Not a valid token.' });

		console.log('USER ID ---------');
		console.log(userId);
		console.log('USER TO ACT ---------');
		console.log(id);

		if (user.role.name !== 'admin' && userId != id)
			return res.status(401).json({ ok: false, message: 'Unauthorized user' });

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal error - Try again later...' });
	}
};

const validateUser = async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = await Users.findOne({
		where: { [Op.or]: [username ? { username } : { email }] },
	});
	if (!user)
		return res.status(401).json({ ok: false, message: 'Wrong username or password' });
	const passOk = password === user.password;

	if (!passOk)
		return res.status(401).json({ ok: false, message: 'Wrong username or password' });
	next();
};

const signIn = async (req, res) => {
	try {
		const { username, email } = req.body;
		const user = await Users.findOne({
			where: { [Op.or]: [username ? { username } : { email }] },
		});
		const token = jwt.sign(
			{
				id: user.id,
				name: user.name,
				email: user.email,
			},
			JWT_SECRET, //secret string
			{ expiresIn: '120m' } // Expiration time of the token
		);
		res.status(200).header('auth-token', token).json({ ok: true, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Internal error - Try again later...' });
	}
};

const validateFields = async (req, res, next) => {
	const error = { ok: false, message: '' }; //object to record possible errors

	const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //possible characters to validate an email

	const { username, name, email, phone, address, password } = req.body;

	if (username.length === 0) error.message += 'Username field is required. ';
	if (name.length === 0) error.message += 'Name field is required. ';
	if (email.length === 0) error.message += 'Email field is required. ';
	if (phone.length === 0) error.message += 'Phone field is required. ';
	if (address.length === 0) error.message += 'Address field is required. ';
	if (password.length === 0) error.message += 'Password field is required. ';

	if (username.length < 5 && username.length > 0)
		error.message += 'The Username field must have at least 5 characters. ';

	if (password.length < 5 && password.length > 0)
		error.message += 'The Password field must have at least 5 characters. ';

	if (!regex.test(email) && email.length > 0)
		error.message += 'The Email field has an invalid format. ';

	if (error.message.length !== 0) return res.status(400).json(error);

	next();
};

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
				.json({ ok: false, message: 'Username or Email already exists.' });
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Internal error - Try again later...' });
	}
};

const signUp = async (req, res) => {
	const { username, name, email, phone, address, password, role_id } = req.body;
	const newUser = await Users.create({
		username,
		name,
		email,
		phone,
		address,
		password,
		role_id: role_id ? role_id : 2,
	});
	res.status(201).json({ ok: true, newUser });
};

module.exports = {
	chekUserExist,
	isAdmin,
	isAuthUser,
	signIn,
	signUp,
	validateUser,
	validateFields,
};
