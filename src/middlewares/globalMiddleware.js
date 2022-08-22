const expressJwt = require('express-jwt');
const rateLimit = require('express-rate-limit');

const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file
const MAX_REQUEST = process.env.MAX_REQUEST; //Bring the maximum number of requests according to the rate limit policy from enviroment file
const MINUTES_TO_WAIT = process.env.MINUTES_TO_WAIT; //Bring the waiting time in minutes after exceeding the limit of requests, from enviroment file

const rateLimitPolicy = rateLimit({
	windowMs: MINUTES_TO_WAIT * 60 * 1000, //minutes * 60 * 1000
	max: MAX_REQUEST,
	message: `You have exceeded the ${MAX_REQUEST} requests - Try again later`,
	standardHeaders: true,
	legacyHeaders: false,
});

//Bad format Token  error handling
const tokenError = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({ ok: false, data: {}, message: 'The token sent is invalid' });
	} else {
		next(err);
	}
};

//Bad format json object error handling
const jsonError = (err, req, res, next) => {
	if (err.name === 'SyntaxError') {
		res
			.status(401)
			.send({ ok: false, message: 'The JSON object sent, has a format error' });
	} else {
		next(err);
	}
};

//Protect all endpoints (except login and register) using Express-JWT as global Middleware
const jwtProtection = () => {
	return expressJwt({
		secret: JWT_SECRET,
		algorithms: ['HS256'],
		credentialsRequired: false,
	}).unless({ path: ['/api/v1/auth/login', '/api/v1/auth/register'] });
};

module.exports = { jsonError, jwtProtection, rateLimitPolicy, tokenError };
