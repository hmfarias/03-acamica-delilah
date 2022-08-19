const { PaymentMethods } = require('../models/index');

const PayMethodService = () => {
	const bringPayMethod = async (id) => {
		try {
			const method = await PaymentMethods.findByPk(id, {
				attributes: ['id', 'name', 'available', 'deletedAt'],
				paranoid: false,
			});
			if (!method) return { code: 404, ok: false, data: 'Payment method not found' };

			if (method.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: { id, name: method.name },
					message: 'The payment method is deleted - (soft deleted)',
				};

			return {
				code: 200,
				ok: true,
				data: method,
				message: 'Successfully recovered Role',
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	const bringPayMethods = async () => {
		try {
			const methods = await PaymentMethods.findAll({
				paranoid: false,
				attributes: ['id', 'name', 'available', 'deletedAt'],
			});
			if (!methods)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'There are no roles in the database.',
				};

			return {
				code: 200,
				ok: true,
				data: methods,
				message: 'Successfully recovered Roles',
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	const deletePayMethod = async (id) => {
		try {
			const method = await PaymentMethods.findByPk(id, { paranoid: false });
			if (!method)
				return { code: 404, ok: false, data: {}, message: 'Payment method not found' };

			if (method.deletedAt != null)
				return {
					code: 404,
					ok: false,
					data: { id, name: method.name },
					message: 'The payment method is already deleted',
				};

			const methodDeleted = await PaymentMethods.destroy({ where: { id: id } });

			if (!methodDeleted)
				return {
					code: 404,
					ok: false,
					data: { id, name: method.name },
					message: 'The payment method could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { id, name: method.name },
				message: `Payment method with ID: ${id} Name: ${method.name}, successfully deleted`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	const newPayMethod = async (req, res) => {
		try {
			const { name, available } = req.body;
			const nameLow = name.toLowerCase();

			const method = await PaymentMethods.create({
				name: nameLow,
				available: available ? available : true,
			});
			if (!method)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The payment method could not be registered',
				};

			return {
				code: 200,
				ok: true,
				data: method,
				message: 'Payment method successfully registered',
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	const restorePayMethod = async (id) => {
		try {
			const method = await PaymentMethods.findByPk(id, { paranoid: false });
			if (!method) return { code: 404, ok: false, data: 'Payment method not found' };

			if (method.deletedAt === null)
				return {
					code: 404,
					ok: false,
					data: { id, name: method.name },
					message: 'The payment method is not deleted',
				};

			const methodRestored = await PaymentMethods.restore({ where: { id: id } });
			if (!methodRestored)
				return {
					code: 404,
					ok: false,
					data: { id, name: method.name },
					message: 'The payment method could not be restored',
				};

			return {
				code: 200,
				ok: true,
				data: { id, name: method.name },
				message: `Payment method with ID: ${id} Name: ${method.name} successfully restored`,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	const updatePayMethod = async (req, res) => {
		try {
			const { id, name, available } = req.body;

			if (!name && !available)
				return {
					code: 400,
					ok: false,
					data: { id, name, available },
					message: 'No data was sent - The payment method could not be updated',
				};
			const nameLow = name.toLowerCase();

			const method = await PaymentMethods.findByPk(id);
			if (!method)
				return { code: 404, ok: false, data: {}, message: 'Payment method not found' };

			const updatedMethod = await PaymentMethods.update(
				{
					name: name ? nameLow : PaymentMethods.name,
					available: available,
				},
				{ where: { id: id } }
			);

			if (!updatedMethod)
				return {
					code: 404,
					ok: false,
					data: {},
					message: 'The payment method could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: { id, name: nameLow },
				message: `Payment method with Id: ${id} Name: ${method.name}, successfully updated `,
			};
		} catch (error) {
			return {
				code: 500,
				ok: false,
				data: {},
				message: 'Internal error - Try again later',
			};
		}
	};

	return {
		bringPayMethod,
		bringPayMethods,
		deletePayMethod,
		newPayMethod,
		restorePayMethod,
		updatePayMethod,
	};
};

module.exports = PayMethodService();
