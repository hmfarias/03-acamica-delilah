const express = require('express');
const router = express.Router();

const { RolesService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	chekRoleExist,
	validateFields,
	validateFieldsUpdate,
} = require('../../middlewares/rolesMiddleware');
const { validateFieldParam } = require('../../middlewares/globalMiddleware');

//POST a new role
router
	.post('/', isAdmin, validateFields, chekRoleExist, async (req, res) => {
		const { code, ok, data, message } = await RolesService.newRole(req, res);
		res.status(code).json({ ok, data, message });
	})

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

	//UPDATE rol by ID
	.put('/update/:id', isAdmin, validateFieldsUpdate, async (req, res) => {
		const { code, ok, data, message } = await RolesService.updateRole(req, res);
		res.status(code).json({ ok, data, message });
	})
	//UPDATE can only be done through the ID parameter
	.put('/update', validateFieldParam, async (req, res) => {})

	//RESTORE rol by id
	.put('/restore/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await RolesService.restoreRole(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///RESTORE can only be done through the ID parameter
	.put('/restore', validateFieldParam, async (req, res) => {})

	//DELETE rol by id
	.delete('/delete/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await RolesService.deleteRole(req.params.id);
		res.status(code).json({ ok, data, message });
	})
	///DELETE can only be done through the ID parameter
	.delete('/delete', validateFieldParam, async (req, res) => {});

module.exports = router;
