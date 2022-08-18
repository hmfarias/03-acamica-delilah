const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const PaymentMethods = sequelize.define(
	'payment_methods',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		tableName: 'payment_methods',
		//timestamps: false, // put into false if the tables do not have the fields created_at y updated_at
		underscored: true, //to sequelize respect the unerscores
	}
);
module.exports = PaymentMethods;
