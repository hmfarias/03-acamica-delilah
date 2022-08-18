// const { Users, Roles } = require('./../models/index');

// const LoginService = () => {
// 	const bringUser = async (username, password) => {
// 		return await Users.findOne({
// 			attributes: ['id', 'name', 'email'], //only bring those fields and not others like password field
// 			where: {
// 				username, //this is like "username = username
// 				password, //this is like "password = password"
// 			},
// 			include: [{ model: Roles }],
// 		});
// 	};

// 	return { bringUser };
// };

// module.exports = LoginService();
