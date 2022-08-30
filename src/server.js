//========================================================
//1. Import Express and other libraries
//========================================================
const compression = require('compression');
const cors = require('cors'); // necessary so that in the front does not appear cors error
const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../setup/delilahResto.json');

const APP_PORT = process.env.APP_PORT || 3000; //bring port from enviroment file (If it does not exist, assign 3000 by default)
const {
	jsonError,
	jwtProtection,
	rateLimitPolicy,
	tokenError,
} = require('./middlewares/globalMiddleware'); //global middlewares
const {
	loginRoute,
	ordersRoute,
	payMethodsRoute,
	productsRoute,
	rolesRoute,
	usersRoute,
} = require('./../src/v1/routes'); // Routes
//=======================================================
//2. Create the Express instance
//=======================================================
const app = express();

//=======================================================
//3. Use Global Middleware
//=======================================================
app.use(express.json()); // This Middleware makes us the JSON of the Body in the object of JS
app.use(helmet());
app.use(compression());
app.use(cors()); // necessary so that in the front does not appear cors error

//=======================================================
// 3.1 Use Middlewares of our API
//=======================================================
app.use(rateLimitPolicy); //Activate the rate limit policy
app.use(jwtProtection()); //protect endpoints with jwt
app.use(tokenError); //Handle invalid token error
app.use(jsonError); //Handle invalid json format error

//=============================================================
//4. ENDPOINTS
//=============================================================
//Users Endpoints --------------------------
app.use('/api/v1/auth', loginRoute);
//localhost:3000/users
app.use('/api/v1/users', usersRoute);
//Products Endpoints ----------------------
app.use('/api/v1/products', productsRoute);
//Payment Methods Endpoints ---------------
app.use('/api/v1/paymethods', payMethodsRoute);
//Roles Endpoints -------------------------
app.use('/api/v1/roles', rolesRoute);
//Orders Endpoints ------------------------
app.use('/api/v1/orders', ordersRoute);

//API DOCUMENTATION - you need to put in the browser the following address:
// http://localhost:3000/api/v1/docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//==========================================================================
//5. raise the server.
//==========================================================================
app.listen(APP_PORT, () => {
	console.log(`Listening in Port: ${APP_PORT}`);
});

// To capture the moment when the server is disconnected
// in case it had to close something more before going down
//SIGINT is triggered by pressing Ctrl + C
process.on('SIGINT', () => {
	console.log(' -- Server offline -- ');
	process.exit();
});
