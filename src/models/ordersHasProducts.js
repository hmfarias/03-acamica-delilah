const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');
const Orders = require('./../models/orders');
const Products = require('./../models/products');

const OrdersHasProducts = sequelize.define(
	'orders_has_products',
	{
		//In relationships many to many is the only case in which the fields corresponding to foreign keys, such as Order_id and Product_ID should be defined. As can be seen in the rest of the models, the fields corresponding to Foraneas keys are not included in their definitions
		order_id: {
			field: 'order_id',
			type: DataTypes.NUMBER,
			alloNull: false,
			references: {
				model: Orders,
				key: 'id',
			},
		},
		product_id: {
			field: 'product_id',
			type: DataTypes.NUMBER,
			alloNull: false,
			references: {
				model: Products,
				key: 'id',
			},
		},
		quantity: {
			type: DataTypes.NUMBER,
			alloNull: false,
		},
	},
	{
		tableName: 'orders_has_products',
		//timestamps: false, // put in false if the fields created_at and updated_at, do not exist in the table
		underscored: true, //to sequelize respect the unerscores
		paranoid: true,
	}
);
module.exports = OrdersHasProducts;
