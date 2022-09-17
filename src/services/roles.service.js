const { Roles } = require('./../models/index');
const RolesService = () => {
	const getRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, {
				paranoid: false,
			});
			if (!role) return { code: 404, ok: false, data: {}, message: 'role not found' };

			if (role.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Role is deleted - (soft deleted)',
				};

			return {
				code: 200,
				ok: true,
				data: { role },
				message: `Successful operation for Role ID: ${role.id}, Name: ${role.name}`,
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

	const getRoles = async () => {
		try {
			const roles = await Roles.findAll({
				paranoid: false,
			});
			if (!roles)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'Roles not found',
				};

			return {
				code: 200,
				ok: true,
				data: { roles },
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
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Role is deleted - (soft deleted)',
				};

			const roleDeleted = await role.destroy({ where: { id: id } });

			if (!roleDeleted)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The role could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { role },
				message: `Successful operation for Role ID: ${id} Name: ${role.name}`,
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
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The role could not be registered',
				};
			const { id, createdAt, updatedAt } = role;
			const deletedAt = null;
			return {
				code: 200,
				ok: true,
				data: { role: { id, name, createdAt, updatedAt, deletedAt } },
				message: `Successful operation for Role ID: ${role.id} , Name: ${role.name}`,
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
				return { code: 404, ok: false, data: {}, message: 'Role is not deleted' };

			const roleRestored = await role.restore({ where: { id: id } });
			if (!roleRestored)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The role could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { role },
				message: `Successful operation for Role ID: ${id} Name: ${role.name}`,
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
			const { id } = req.params;
			const { name } = req.body;

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
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The role could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: { role },
				message: `Successfully operation for role with ID: ${id} Name: ${name}`,
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

	return { getRole, getRoles, deleteRole, newRole, restoreRole, updateRole };
};
module.exports = RolesService();
