const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { Users, Roles } = require('../models/index');

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
				return {
					code: 401,
					ok: false,
					data: {},
					message: 'The token could not be generated',
				};

			return { code: 200, ok: true, data: token };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
				message: 'Internal error - Try again later',
			};
		}
	};

	// Register a new user
	const signUp = async (req, res) => {
		try {
			//check if the role exists before registering the new user
			const { roleId } = req.body;

			const roleIdDefault = roleId ? roleId : 2;

			const role = await Roles.findByPk(roleIdDefault);
			if (!role)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The selected role does not exist',
				};
			roleName = role.name;

			const { username, name, email, phone, address, password } = req.body;
			const newUser = await Users.create({
				username,
				name,
				email,
				phone,
				address,
				password,
				role_id: roleIdDefault,
			});

			if (!newUser)
				return {
					code: 401,
					ok: false,
					data: {},
					message: 'The user could not be registered',
				};

			//build the user JSON with the correct output format
			userResp = {
				id: newUser.id,
				username: newUser.username,
				name: newUser.name,
				email: newUser.email,
				phone: newUser.phone,
				address: newUser.address,
				deletedAt: null,
				role: { name: roleName },
			};

			return {
				code: 200,
				ok: true,
				data: userResp,
				message: 'User was successfully registered',
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
				message: 'Internal error - Try again later',
			};
		}
	};

	return { signIn, signUp };
};
module.exports = LoginService();
