const { Roles, Users } = require('./../models/index');
const UsersService = () => {
	const bringUser = async (userId) => {
		try {
			const user = await Users.findByPk(userId, {
				paranoid: false,
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user)
				return {
					code: 404,
					ok: false,
					data: 'User not found',
				};

			if (user.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: 'The user is deleted - (soft deleted)',
				};
			return {
				code: 200,
				ok: true,
				data: user,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
				error: error,
			};
		}
	};

	const bringUsers = async () => {
		try {
			const users = await Users.findAll({
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!users)
				return {
					code: 404,
					ok: false,
					data: 'There are no users in the database.',
				};
			return {
				code: 200,
				ok: true,
				data: users,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
			};
		}
	};

	const deleteUser = async (userId) => {
		try {
			const user = await Users.findByPk(userId, { paranoid: false });
			if (!user) return { code: 404, ok: false, data: 'User not found' };

			if (user.deletedAt != null)
				return { code: 404, ok: false, data: 'The user is already deleted' };

			const userDeleted = await Users.destroy({ where: { id: userId } });
			if (userDeleted)
				return {
					code: 200,
					ok: true,
					data: `User with Id: ${id} successfully deleted - (soft deleted)`,
				};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
			};
		}
	};

	const restoreUser = async (userId) => {
		try {
			const user = await Users.findByPk(userId, { paranoid: false });
			if (!user) return { code: 404, ok: false, data: 'User not found' };

			if (user.deletedAt === null)
				return { code: 404, ok: false, data: 'The user is not deleted' };

			const userRestored = await Users.restore({ where: { id: userId } });
			if (userRestored)
				return {
					code: 200,
					ok: true,
					data: `User with Id: ${userId} successfully restored`,
				};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: error,
			};
		}
	};

	return { bringUser, bringUsers, deleteUser, restoreUser };
};
module.exports = UsersService();
