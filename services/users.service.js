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
		const user = await Users.findByPk(userId, { paranoid: false });
		if (!user) return { errCode: 404, ok: false, message: 'User not found.' };

		if (user.deletedAt != null)
			return { errCode: 404, ok: false, message: 'The user is already deleted' };

		const userDeleted = await Users.destroy({ where: { id: userId } });
		if (userDeleted)
			return {
				errCode: 200,
				ok: true,
				message: `Successfully deleted user with ID = ${userId} - (soft deleted)`,
			};
	};

	const restoreUser = async (userId) => {
		const user = await Users.findByPk(userId, { paranoid: false });
		if (!user) return { errCode: 404, ok: false, message: 'User not found.' };

		if (user.deletedAt === null)
			return { errCode: 404, ok: false, message: 'The user is not deleted' };

		const userRestored = await Users.restore({ where: { id: userId } });
		if (userRestored)
			return {
				errCode: 200,
				ok: true,
				message: `Successfully restored user with ID = ${userId}`,
			};
	};

	return { bringUser, bringUsers, deleteUser, restoreUser };
};
module.exports = UsersService();
