const PaymentMethod = require("./../models/paymentMethod");
const Order = require("./../models/order");
const OrderHasProduct = require("./../models/orderHasProduct");
const Product = require("./../models/product");
const Role = require("./../models/role");
const User = require("./../models/user");

User.belongsTo(Role, {
	foreignKey: "role_id",
});

User.hasMany(Order, {
	foreignKey: "user_id",
});

Order.belongsTo(PaymentMethod, {
	foreignKey: "payment_method_id",
});

Order.belongsTo(User, {
	foreignKey: "user_id",
});

// Many to many relationship
Order.belongsToMany(Product, {
	through: OrderHasProduct,
});

module.exports = {
	PaymentMethod,
	Order,
	OrderHasProduct,
	Product,
	Role,
	User,
};
