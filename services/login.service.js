const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { Users } = require('../models/index');

const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

const LoginService = () => {
	//Sign the token
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

			if (!token)
				return { errCode: 401, ok: false, data: 'The token could not be generated' };

			return {
				errCode: 200,
				ok: true,
				data: token,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	// Register a new user
	const signUp = async (req, res) => {
		try {
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

			if (!newUser)
				return { errCode: 401, ok: false, data: 'The user could not be registered' };

			//The object is filtered so as not to return the password field
			userResp = JSON.parse(
				JSON.stringify(newUser, [
					'username',
					'name',
					'email',
					'phone',
					'addres',
					'role_id',
				])
			);

			return {
				errCode: 200,
				ok: true,
				data: userResp,
			};
		} catch (error) {
			return {
				errCode: 500,
				ok: false,
				data: error,
			};
		}
	};

	return { signIn, signUp };
};
module.exports = LoginService();
