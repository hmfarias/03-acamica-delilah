const express = require('express');
const router = express.Router();

const { RolesService } = require('./../services/index');
const { isAdmin } = require('./../middlewares/usersMiddleware');
const { validateFields, chekRoleExist } = require('../middlewares/rolesMiddleware');

//POST a new role
router.post('/', isAdmin, validateFields, chekRoleExist, async (req, res) => {
	const { code, ok, data, message } = await RolesService.newRole(req, res);
	res.status(code).json({ ok, data, message });
});

//GET all roles
router.get('/', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await RolesService.bringRoles();
	res.status(code).json({ ok, data, message });
});

//GET rol by id param
router.get('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await RolesService.bringRole(req.params.id);
	res.status(code).json({ ok, data, message });
});

//RESTORE rol by id
router.put('/:id', async (req, res) => {
	const { code, ok, data, message } = await RolesService.restoreRole(req.params.id);
	res.status(code).json({ ok, data, message });
});

//UPDATE rol
router.put('/', async (req, res) => {
	const { code, ok, data, message } = await RolesService.updateRole(req, res);
	res.status(code).json({ ok, data, message });
});

//DELETE rol by id
router.delete('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, message } = await RolesService.deleteRole(req.params.id);
	res.status(code).json({ ok, data, message });
});

module.exports = router;
