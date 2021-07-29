const { User, Role } = require("../models");

const isAdmin = async (req, res, next) => {
	const currentUser = await User.findByPk(req.user.id, {
		include: [Role],
	});
	console.log(currentUser.role);
	if (currentUser.role.name == "admin") {
		next();
	} else {
		res.status(401).json({ error: "User should be admin" });
	}
};

module.exports = { isAdmin };
