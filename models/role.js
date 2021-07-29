const { DataTypes } = require("sequelize");
const sequelize = require("./../config/db");

const Role = sequelize.define(
	"role",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "role",
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
	}
);

module.exports = Role;
