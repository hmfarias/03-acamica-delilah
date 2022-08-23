const { Roles, Users } = require('./../models/index');
const UsersService = () => {
	const getUser = async (id) => {
		try {
			const user = await Users.findByPk(id, {
				paranoid: false,
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user)
				return {
					code: 404,
					ok: false,
					data: {},
					message: `User not found - Id:${id}`,
				};
			if (user.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The user is deleted - (soft deleted)',
				};
			return {
				code: 200,
				ok: true,
				data: { user },
				message: 'Successfully recovered User',
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const getUsers = async () => {
		try {
			const users = await Users.findAll({
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'], //set the attributes to not return password, Created_at and Updated_at fields
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!users)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'There are no users in the database.',
				};
			return {
				code: 200,
				ok: true,
				data: { users },
				message: 'Successfully recovered Users',
			};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const deleteUser = async (id) => {
		try {
			const user = await Users.findByPk(id, {
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'],
				paranoid: false,
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user) return { code: 404, ok: false, data: {}, message: 'User not found' };

			if (user.deletedAt != null)
				return { code: 404, ok: false, data: {}, message: 'The user is already deleted' };
			const { username, name, email, phone, address } = user;

			const userDeleted = await Users.destroy({ where: { id: id } });
			if (userDeleted)
				return {
					code: 200,
					ok: true,
					data: { user },
					message: `User with Id: ${id} successfully deleted - (soft deleted)`,
				};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const restoreUser = async (id) => {
		try {
			const user = await Users.findByPk(id, {
				attributes: ['id', 'username', 'name', 'email', 'phone', 'address', 'deletedAt'],
				paranoid: false,
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user) return { code: 404, ok: false, data: {}, message: 'User not found' };

			if (user.deletedAt === null)
				return { code: 404, ok: false, data: {}, message: 'The user is not deleted' };

			const userRestored = await Users.restore({ where: { id: id } });
			if (userRestored)
				return {
					code: 200,
					ok: true,
					data: { user },
					message: `User with Id: ${id} successfully restored`,
				};
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	return { getUser, getUsers, deleteUser, restoreUser };
};
module.exports = UsersService();
