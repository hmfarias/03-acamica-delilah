const { PaymentMethods } = require('../models/index');

const PayMethodService = () => {
	const getPayMethod = async (id) => {
		try {
			const payMethod = await PaymentMethods.findByPk(id, {
				// attributes: ['id', 'name', 'available', 'deletedAt'],
				paranoid: false,
			});
			if (!payMethod)
				return { code: 404, ok: false, data: {}, message: 'Payment Method not found' };

			if (payMethod.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: { payMethod: { id, name: payMethod.name } },
					message: 'Payment Method is deleted - (soft deleted)',
				};

			return {
				code: 200,
				ok: true,
				data: { payMethod },
				message: `Successful operation for Payment Method ID: ${id}, Name: ${payMethod.name}`,
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

	const getPayMethods = async () => {
		try {
			const methods = await PaymentMethods.findAll({
				paranoid: false,
				// attributes: ['id', 'name', 'available', 'deletedAt'],
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
				data: { payMethods: methods },
				message: 'Successfully recovered Payment Methods',
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

	const deletePayMethod = async (id) => {
		try {
			const payMethod = await PaymentMethods.findByPk(id, { paranoid: false });
			if (!payMethod)
				return { code: 404, ok: false, data: {}, message: 'Payment method not found' };

			if (payMethod.deletedAt != null)
				return {
					code: 410,
					ok: false,
					data: {},
					message: 'Payment Method is deleted - (soft deleted)',
				};

			const methodDeleted = await payMethod.destroy();

			if (!methodDeleted)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The payment method could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { payMethod },
				message: `Successful operation for Payment Method ID: ${id} Name: ${payMethod.name}`,
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

	const newPayMethod = async (req, res) => {
		try {
			const { name, available } = req.body;
			const nameLow = name.toLowerCase();

			const payMethod = await PaymentMethods.create({
				name: nameLow,
				available: available ? available : true,
				deletedAt: null,
			});
			if (!payMethod)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The payment method could not be registered',
				};

			return {
				code: 200,
				ok: true,
				data: { payMethod },
				message: 'Payment Method successfully registered',
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

	const restorePayMethod = async (id) => {
		try {
			const payMethod = await PaymentMethods.findByPk(id, { paranoid: false });
			if (!payMethod)
				return { code: 404, ok: false, data: {}, message: 'Payment method not found' };

			if (payMethod.deletedAt === null)
				return {
					code: 406,
					ok: false,
					data: {},
					message: 'Payment Method is not deleted',
				};

			const methodRestored = await payMethod.restore();
			if (!methodRestored)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The Payment Method could not be deleted',
				};

			return {
				code: 200,
				ok: true,
				data: { payMethod },
				message: `Successful operation for Payment Method ID: ${id} Name: ${payMethod.name}`,
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

	const updatePayMethod = async (req, res) => {
		try {
			const { id } = req.params;
			const { name, available } = req.body;

			const payMethod = await PaymentMethods.findByPk(id);
			if (!payMethod)
				return { code: 404, ok: false, data: {}, message: 'Payment method not found' };

			const nameUpd = name ? name.toLowerCase() : payMethod.name;
			const availableUpd = available !== undefined ? available : payMethod.available;

			const updatedMethod = await payMethod.update({
				name: nameUpd,
				available: availableUpd,
			});

			if (!updatedMethod)
				return {
					code: 500,
					ok: false,
					data: {},
					message: 'Unexpected error - The Payment Method could not be updated',
				};

			return {
				code: 200,
				ok: true,
				data: { payMethod },
				message: `Successfully operation for Payment Method with ID: ${id} Name: ${nameUpd}`,
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

	return {
		getPayMethod,
		getPayMethods,
		deletePayMethod,
		newPayMethod,
		restorePayMethod,
		updatePayMethod,
	};
};

module.exports = PayMethodService();
