const { Roles } = require('./../models/index');
const RolesService = () => {
	const bringRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, {
				attributes: ['id', 'name', 'deletedAt'],
				paranoid: false,
			});
			if (!role) return { code: 404, ok: false, data: 'role not found' };

			if (role.deletedAt != null)
				return { code: 404, ok: false, data: 'The role is deleted - (soft deleted)' };

			return { code: 200, ok: true, data: role };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
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
				return { code: 404, ok: false, data: 'There are no roles in the database.' };

			return { code: 200, ok: true, data: roles };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const deleteRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, { paranoid: false });
			if (!role) return { code: 404, ok: false, data: 'Role not found' };

			if ('admin ADMIN Admin'.includes(role.name))
				return { code: 403, ok: false, data: 'Unable to delete ADMIN role' };

			if (role.deletedAt != null)
				return { code: 404, ok: false, data: 'The role is already deleted' };

			const roleDeleted = await Roles.destroy({ where: { id: id } });

			if (!roleDeleted)
				return { code: 404, ok: false, data: 'The role could not be deleted' };

			return {
				code: 200,
				ok: true,
				data: `Role with ID: ${id} Name: ${role.name}, successfully deleted`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const newRole = async (req, res) => {
		try {
			const { name } = req.body;
			const nameLow = name.toLowerCase();
			const role = await Roles.create({ name: nameLow });
			if (!role)
				return { code: 404, ok: false, data: 'The role could not be registered' };

			return { code: 200, ok: true, data: role };
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	const restoreRole = async (id) => {
		try {
			const role = await Roles.findByPk(id, { paranoid: false });
			if (!role) return { code: 404, ok: false, data: 'Role not found' };

			if (role.deletedAt === null)
				return { code: 404, ok: false, data: 'The role is not deleted' };

			const rolRestored = await Roles.restore({ where: { id: id } });
			if (!rolRestored)
				return { code: 404, ok: false, data: 'The role could not be deleted' };

			return {
				code: 200,
				ok: true,
				data: `Role with ID: ${id} Name: ${role.name}, successfully restored`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
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
					data: 'No data was sent - The role could not be updated',
				};
			const nameLow = name.toLowerCase();

			const role = await Roles.findByPk(id);
			if (!role) return { code: 404, ok: false, data: 'Role not found' };

			const updatedRole = await Roles.update(
				{ name: name ? nameLow : product.name },
				{ where: { id: id } }
			);

			if (!updatedRole)
				return { code: 404, ok: false, data: 'The role could not be updated' };

			return {
				code: 200,
				ok: true,
				data: `Successfully updated role with ID: ${id} Name: ${name}`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: 'Internal error - Try again later',
				error: error,
			};
		}
	};

	return { bringRole, bringRoles, deleteRole, newRole, restoreRole, updateRole };
};
module.exports = RolesService();
