const { Roles } = require('./../models/index');
const RolesService = () => {
	const bringRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, {
				attributes: ['id', 'name', 'deletedAt'],
				paranoid: false,
			});
			if (!role) return { code: 404, ok: false, data: {}, message: 'role not found' };

			if (role.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The role is deleted - (soft deleted)',
				};

			return { code: 200, ok: true, data: role, message: 'Successfully recovered Role' };
		} catch (error) {
			return {
				code: error?.status || 500,
				ok: false,
				data: { error: error?.message || error },
				message: 'Internal error - Try again later',
			};
		}
	};

	const bringRoles = async () => {
		try {
			const roles = await Roles.findAll({
				paranoid: false,
				attributes: ['id', 'name', 'deletedAt'],
			});
			if (!roles)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'There are no roles in the database.',
				};

			return {
				code: 200,
				ok: true,
				data: roles,
				message: 'Successfully recovered Roles',
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

	const deleteRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, { paranoid: false });
			if (!role) return { code: 404, ok: false, data: {}, message: 'Role not found' };

			if ('admin ADMIN Admin'.includes(role.name))
				return { code: 403, ok: false, data: {}, message: 'Unable to delete ADMIN role' };

			if (role.deletedAt != null)
				return { code: 404, ok: false, data: {}, message: 'The role is already deleted' };

			const roleDeleted = await Roles.destroy({ where: { id: id } });

			if (!roleDeleted)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The role could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { id, role: role.name },
				message: `Role with ID: ${id} Name: ${role.name}, successfully deleted`,
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

	const newRole = async (req, res) => {
		try {
			const { name } = req.body;
			const nameLow = name.toLowerCase();
			const role = await Roles.create({ name: nameLow });
			if (!role)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The role could not be registered',
				};

			return {
				code: 200,
				ok: true,
				data: role,
				message: 'Role was successfully registered',
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

	const restoreRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, { paranoid: false });
			if (!role) return { code: 404, ok: false, data: {}, message: 'Role not found' };

			if (role.deletedAt === null)
				return { code: 404, ok: false, data: {}, message: 'The role is not deleted' };

			const rolRestored = await Roles.restore({ where: { id: id } });
			if (!rolRestored)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The role could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { id, role: role.name },
				message: `Role with ID: ${id} Name: ${role.name}, successfully restored`,
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

	const updateRole = async (req, res) => {
		try {
			const { id, name } = req.body;

			if (!name)
				return {
					code: 400,
					ok: false,
					data: {},
					message: 'No data was sent - The role could not be updated',
				};
			const nameLow = name.toLowerCase();

			const role = await Roles.findByPk(id);
			if (!role) return { code: 404, ok: false, data: {}, message: 'Role not found' };

			const updatedRole = await Roles.update(
				{ name: name ? nameLow : product.name },
				{ where: { id: id } }
			);

			if (!updatedRole)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The role could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: `Successfully updated role with ID: ${id} Name: ${name}`,
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

	return { bringRole, bringRoles, deleteRole, newRole, restoreRole, updateRole };
};
module.exports = RolesService();
