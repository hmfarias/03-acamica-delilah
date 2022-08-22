const { Sequelize } = require('sequelize');

const { DB_USER, DB_NAME, DB_PORT, DB_SERVER, DB_PWD } = process.env;

//mysql://user:password@server:port/database

const connectionString = `mysql://${DB_USER}${
	DB_PWD && `:${DB_PWD}`
}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

const sequelizeObject = new Sequelize(connectionString);

sequelizeObject
	.authenticate()
	.then(() => {
		console.log('All OK - connected database');
	})
	.catch((e) => {
		console.error(e.message);
	});

module.exports = sequelizeObject;
