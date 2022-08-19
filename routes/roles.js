const express = require('express');
const router = express.Router();

const { RolesService } = require('./../services/index');
const { isAdmin } = require('./../middlewares/usersMiddleware');
const { validateFields, chekRoleExist } = require('../middlewares/rolesMiddleware');

//POST a new role
router.post('/', isAdmin, validateFields, chekRoleExist, async (req, res) => {
	const { code, ok, data, error } = await RolesService.newRole(req, res);
	res.status(code).json({ ok, data, error });
});

//GET all roles
router.get('/', isAdmin, async (req, res) => {
	const { code, ok, data, error } = await RolesService.bringRoles();
	res.status(code).json({ ok, data, error });
});

//GET rol by id param
router.get('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, error } = await RolesService.bringRole(req.params.id);
	res.status(code).json({ ok, data, error });
});

//RESTORE rol by id
router.put('/:id', async (req, res) => {
	const { code, ok, data, error } = await RolesService.restoreRole(req.params.id);
	res.status(code).json({ ok, data, error });
});

//UPDATE rol
router.put('/', async (req, res) => {
	const { code, ok, data, error } = await RolesService.updateRole(req, res);
	res.status(code).json({ ok, data, error });
});

//DELETE rol by id
router.delete('/:id', isAdmin, async (req, res) => {
	const { code, ok, data, error } = await RolesService.deleteRole(req.params.id);
	res.status(code).json({ ok, data, error });
});

module.exports = router;
