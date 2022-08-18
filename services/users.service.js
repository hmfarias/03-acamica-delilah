const { Roles, Users } = require('./../models/index');
const UsersService = () => {
	const bringUsers = async () => {
		const users = await Users.findAll({
			attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
			include: [{ model: Roles, attributes: ['name'] }],
		});
		if (!users)
			return {
				errCode: 404,
				ok: false,
				data: 'There are no users in the database.',
			};
		return {
			errCode: 200,
			ok: true,
			data: users,
		};
	};

	const bringUser = async (userId) => {
		const user = await Users.findByPk(userId, {
			paranoid: false,
			attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
			include: [{ model: Roles, attributes: ['name'] }],
		});
		if (!user)
			return {
				errCode: 404,
				ok: false,
				data: 'User not found.',
			};

		if (user.deletedAt != null)
			return {
				errCode: 404,
				ok: false,
				data: 'The user is deleted (soft deleted)',
			};
		return {
			errCode: 200,
			ok: true,
			data: user,
		};
	};

	const deleteUser = async (userId) => {
		const user = await Users.findByPk(userId, { paranoid: false });
		if (!user) return { errCode: 404, ok: false, data: 'User not found.' };

		if (user.deletedAt != null)
			return { errCode: 404, ok: false, data: 'The user is already deleted' };

		const userDeleted = await Users.destroy({ where: { id: userId } });
		if (userDeleted)
			return {
				errCode: 200,
				ok: true,
				data: `Successfully deleted user with ID = ${userId} - (soft deleted)`,
			};
	};

	const restoreUser = async (userId) => {
		const user = await Users.findByPk(userId, { paranoid: false });
		if (!user) return { errCode: 404, ok: false, data: 'User not found.' };

		if (user.deletedAt === null)
			return { errCode: 404, ok: false, data: 'The user is not deleted' };

		const userRestored = await Users.restore({ where: { id: userId } });
		if (userRestored)
			return {
				errCode: 200,
				ok: true,
				data: `Successfully restored user with ID = ${userId}`,
			};
	};

	return { bringUser, bringUsers, deleteUser, restoreUser };
};
module.exports = UsersService();
