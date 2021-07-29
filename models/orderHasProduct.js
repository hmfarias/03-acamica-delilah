const { DataTypes } = require("sequelize");
const sequelize = require("./../config/db");
const Order = require("./../models/order");
const Product = require("./../models/product");

const OrderHasProduct = sequelize.define(
	"order_has_product",
	{
		order_id: {
			field: "order_id",
			type: DataTypes.NUMBER,
			alloNull: false,
			references: {
				model: Order,
				key: "id",
			},
		},
		product_id: {
			field: "product_id",
			type: DataTypes.NUMBER,
			alloNull: false,
			references: {
				model: Product,
				key: "id",
			},
		},
		quantity: {
			type: DataTypes.NUMBER,
			alloNull: false,
		},
	},
	{
		tableName: "order_has_product",
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
	}
);
module.exports = OrderHasProduct;
