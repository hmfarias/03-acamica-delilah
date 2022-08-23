const express = require('express');
const router = express.Router();

const { RolesService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const { validateFields, chekRoleExist } = require('../../middlewares/rolesMiddleware');

//POST a new role
router.post('/', isAdmin, validateFields, chekRoleExist, async (req, res) => {
	const { code, ok, data, message } = await RolesService.newRole(req, res);
	res.status(code).json({ ok, data, message });
});

router
	//GET all roles
	.get('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await RolesService.getRoles();
		res.status(code).json({ ok, data, message });
	})

	//GET rol by id param
	.get('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await RolesService.getRole(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//RESTORE rol by id
	.put('/:id', async (req, res) => {
		const { code, ok, data, message } = await RolesService.restoreRole(req.params.id);
		res.status(code).json({ ok, data, message });
	})

	//UPDATE rol
	.put('/', async (req, res) => {
		const { code, ok, data, message } = await RolesService.updateRole(req, res);
		res.status(code).json({ ok, data, message });
	})

	//DELETE rol by id
	.delete('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await RolesService.deleteRole(req.params.id);
		res.status(code).json({ ok, data, message });
	});

module.exports = router;
