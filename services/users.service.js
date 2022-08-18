const { Roles, Users } = require('./../models/index');
const UsersService = () => {
	const bringUsers = async () => {
		return await Users.findAll({
			attributes: ['id', 'username', 'name', 'email', 'phone', 'address'], //set the attributes to not return password, Created_at and Updated_at fields
			include: [{ model: Roles, attributes: ['name'] }],
		});
	};

	const bringUser = async (userId) => {
		return await Users.findByPk(userId, {
			attributes: ['id', 'username', 'name', 'email', 'phone', 'address'], //set the attributes to not return password, Created_at and Updated_at fields
			include: [{ model: Roles, attributes: ['name'] }],
		});
	};

	const deleteUser = async (userId) => {
		return await Users.destroy({ where: { id: userId } });
	};

	const restoreUser = async (userId) => {
		return await Users.restore({ where: { id: userId } });
	};

	return { bringUser, bringUsers, deleteUser, restoreUser };
};
module.exports = UsersService();
