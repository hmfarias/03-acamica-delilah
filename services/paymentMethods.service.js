const { PaymentMethods } = require('./../models/index');

const PaymentMethodsService = () => {
	const bringPaymentMethods = async () => {
		return await PaymentMethods.findAll({
			attributes: ['id', 'name', 'available'], //set the attributes to not return Created_at and Updated_at fields
		});
	};

	return { bringPaymentMethods };
};

module.exports = PaymentMethodsService();
