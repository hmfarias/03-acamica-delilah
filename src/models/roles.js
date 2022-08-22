const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Roles = sequelize.define(
	'roles',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'roles',
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
		paranoid: true,
	}
);

module.exports = Roles;
