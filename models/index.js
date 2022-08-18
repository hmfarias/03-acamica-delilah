//Here all relationships between tables for sequelize are defined

const Orders = require('./orders');
const OrdersHasProducts = require('./ordersHasProducts');
const PaymentMethods = require('./paymentMethods');
const Products = require('./products');
const Roles = require('./roles');
const Users = require('./users');

Users.belongsTo(Roles, {
	foreignKey: 'role_id', //belongsTo: foreing key in the users table that relates it to the roles table
});

Users.hasMany(Orders, {
	foreignKey: 'user_id', //hasMany: foreing key in the orders table, that relates it to the users table
});

Orders.belongsTo(PaymentMethods, {
	foreignKey: 'payment_method_id', //foreing key in the orders table that relates it to the payment_methods table
});

Orders.belongsTo(Users, {
	foreignKey: 'user_id',
});

// Many to many relationship
Orders.belongsToMany(Products, {
	through: OrdersHasProducts,
});

module.exports = {
	Orders,
	OrdersHasProducts,
	PaymentMethods,
	Products,
	Roles,
	Users,
};
