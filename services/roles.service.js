const { Roles } = require('./../models/index');
const RolesService = () => {
	const bringRoles = async () => {
		return await Roles.findAll({
			attributes: ['id', 'name'], //set the attributes to not return Created_at and Updated_at fields
		});
	};
	return { bringRoles };
};
module.exports = RolesService();
