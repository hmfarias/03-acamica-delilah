const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

const getUserIdToken = (autorization) => {
	if (!autorization)
		return res.status(401).json({ ok: false, data: {}, message: 'No credentials sent' });

	const userId = jwt.verify(autorization.substring(7), JWT_SECRET).id;

	return userId;
};

module.exports = { getUserIdToken };
