const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Products = sequelize.define(
	'products',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'products',
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
	}
);
module.exports = Products;
