const { Op } = require('sequelize');

const { Users } = require('../models/index');
const { compare } = require('bcrypt');

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

module.exports = { validateUser };
