const { encrypt } = require('../helpers');
const { Roles, Users } = require('./../models/index');
const UsersService = () => {
	const getUser = async (id) => {
		try {
			const user = await Users.findByPk(id, {
				paranoid: false,
				attributes: [
					'id',
					'username',
					'name',
					'email',
					'phone',
					'address',
					'createdAt',
					'updatedAt',
					'deletedAt',
				], //set the attributes to not return password field
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
					code: 410,
					ok: false,
					data: {},
					message: 'User is deleted - (soft deleted)',
				};
			return {
				code: 200,
				ok: true,
				data: { user },
				message: `Successful operation for User ID: ${user.id}, Name: ${user.name}`,
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
				attributes: [
					'id',
					'username',
					'name',
					'email',
					'phone',
					'address',
					'createdAt',
					'updatedAt',
					'deletedAt',
				], //set the attributes to not return password field
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
				attributes: [
					'id',
					'username',
					'name',
					'email',
					'phone',
					'address',
					'createdAt',
					'updatedAt',
					'deletedAt',
				],
				paranoid: false,
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user) return { code: 404, ok: false, data: {}, message: 'User not found' };

			if (user.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'User is deleted - (soft deleted)',
				};
			const { username, name, email, phone, address } = user;

			const userDeleted = await user.destroy({ where: { id: id } });
			if (userDeleted)
				return {
					code: 200,
					ok: true,
					data: { user },
					message: `Successful operation for User ID: ${id}, Name: ${user.name}`,
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
				attributes: [
					'id',
					'username',
					'name',
					'email',
					'phone',
					'address',
					'createdAt',
					'updatedAt',
					'deletedAt',
				],
				paranoid: false,
				include: [{ model: Roles, attributes: ['name'] }],
			});
			if (!user) return { code: 404, ok: false, data: {}, message: 'User not found' };

			if (user.deletedAt === null)
				return { code: 404, ok: false, data: {}, message: 'User is not deleted' };

			const userRestored = await user.restore({ where: { id: id } });
			if (userRestored)
				return {
					code: 200,
					ok: true,
					data: { user },
					message: `Successful operation for User ID: ${id}, Name: ${user.name}`,
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

	const updateUser = async (req, res) => {
		try {
			const { id } = req.params;
			const { name, email, phone, address, password } = req.body;

			const user = await Users.findByPk(id, {
				paranoid: false,
				include: [{ model: Roles, attributes: ['name'] }],
			});

			if (!user) return { code: 404, ok: false, data: {}, message: 'User not found' };

			const nameUpd = name ? name : user.name;
			const emailUpd = email ? email : user.email;
			const phoneUpd = phone ? phone : user.phone;
			const addressUpd = address ? address : user.address;

			const passwordUpd = password ? await encrypt(password) : user.password;

			const updatedUser = user.update({
				name: nameUpd,
				email: emailUpd,
				phone: phoneUpd,
				address: addressUpd,
				password: passwordUpd,
			});

			if (!updatedUser)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The user could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: {
					user: {
						//I don't want to show password field
						id: user.id,
						username: user.username,
						name: user.name,
						email: user.email,
						phone: user.phone,
						address: user.address,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
						deletedAt: user.deletedAt,
						role: user.role,
					},
				},
				message: `Successfull operation for user ID: ${id} Name: ${user.name}`,
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

	return { getUser, getUsers, deleteUser, restoreUser, updateUser };
};
module.exports = UsersService();
