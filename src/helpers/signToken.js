const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file
const EXPIRE_TIME_TOKEN = process.env.EXPIRE_TIME_TOKEN; //bring time to live token from enviroment file

const signToken = (id, name, email) => {
	return jwt.sign(
		{ id, name, email },
		JWT_SECRET, //secret string
		{ expiresIn: EXPIRE_TIME_TOKEN } // Expiration time of the token
	);
};

module.exports = { signToken };
