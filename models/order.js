const { DataTypes } = require("sequelize");
const sequelize = require("./../config/db");

const Order = sequelize.define(
	"order",
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
				"nuevo",
				"confirmado",
				"preparando",
				"enviando",
				"cancelado",
				"entregado",
			]),
			allowNull: true,
			defaultValue: "NUEVO",
		},
	},
	{
		tableName: "order",
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
	}
);
module.exports = Order;
