const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Users = sequelize.define(
	'users',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'users',
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
		paranoid: true,
	}
);
module.exports = Users;
