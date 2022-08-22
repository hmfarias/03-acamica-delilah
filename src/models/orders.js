const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Orders = sequelize.define(
	'orders',
	{
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		total_price: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM([
				'nuevo',
				'confirmado',
				'preparando',
				'enviando',
				'cancelado',
				'entregado',
			]),
			allowNull: true,
			defaultValue: 'nuevo',
		},
	},
	{
		tableName: 'orders',
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores (If the field names of the table have a underscore,you must put this option for Sequelize)
		paranoid: true,
	}
);
module.exports = Orders;
