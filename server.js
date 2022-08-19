//==========================================================================
//1. Import Express and other libraries
//==========================================================================
const compression = require('compression');
const express = require('express');
const expressJwt = require('express-jwt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); //ver

// Routes
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

const {
	OrdersService,
	ProductsService,
	PaymentMethodsService,
	RolesService,
} = require('./services/index'); //ver

// const { Op } = require('sequelize');
const cors = require('cors'); // necessary so that in the front does not appear cors error

const APP_PORT = process.env.APP_PORT || 3000; //bring port from enviroment file (If it does not exist, assign 3000 by default)
const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

//==========================================================================
//2. Create the Express instance
//==========================================================================
const app = express();

//==========================================================================
//3. Add Global Middleware
//==========================================================================

const rateLimitPolicy = rateLimit({
	message: 'Try again later',
	max: 10,
	windowMs: 5 * 60 * 1000, //minutes * 60 * 1000
});

//==========================================================================
// 3.1 Create Middlewares of our API
//==========================================================================
const { isAdmin } = require('./middlewares/usersMiddleware');
// const {
// 	validateCompraBody,
// 	validatePaqueteBody,
// } = require("./middlewares/index.js");
// const Paquete_Compra = require("./models/Paquete_Compra");
//const { response } = require("express");

//==========================================================================
// Use the libraries.
//==========================================================================
app.use(express.json()); // This Middleware makes us the JSON of the Body in the object of JS
app.use(helmet());
app.use(compression());
app.use(cors()); // necessary so that in the front does not appear cors error

//Protect all endpoints (except login and register) using Express-JWT as global Middleware
// for nothing in life, this chain must be exposed!!!
app.use(
	expressJwt({
		secret: JWT_SECRET,
		algorithms: ['HS256'],
		credentialsRequired: false,
	}).unless({ path: ['/users/login', '/users/register'] })
);

//Invalid token error handling
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({ ok: false, message: 'The token sent is invalid.' });
	} else {
		next(err);
	}
});

//Bad format json object  token error handling
app.use((err, req, res, next) => {
	if (err.name === 'SyntaxError') {
		res
			.status(401)
			.send({ ok: false, message: 'The JSON object sent, has a format error' });
	} else {
		next(err);
	}
});
//================================================================================
//4. ENDPOINTS
//================================================================================

//------------------------------------------------------------------------------//
//                                      Users Endpoints                         //
//------------------------------------------------------------------------------//
//localhost:3000/users/login | localhost:3000/users/register
app.use('/users', loginRoute);
//localhost:3000/users
app.use('/users', usersRoute);

//------------------------------- End users ------------------------------------//

//------------------------------------------------------------------------------//
//                                   Products Endpoints                         //
//------------------------------------------------------------------------------//
//localhost:3000/products
app.use('/products', productsRoute);

//------------------------------------------------------------------------------//
//                            Payment Methods Endpoints                         //
//------------------------------------------------------------------------------//
//Bring payment methods endpoint
//localhost:3000/payment
app.get('/payment', async (req, res) => {
	try {
		const paymentMethods = await PaymentMethodsService.bringPaymentMethods();
		res.status(200).json(paymentMethods);
	} catch (error) {
		res.status(500).json({ error: 'Try again later...' });
	}
});

//------------------------------------------------------------------------------//
//                                 Roles Endpoints                              //
//------------------------------------------------------------------------------//
//Bring Roles endpoint
//localhost:3000/roles
app.get('/roles', async (req, res) => {
	try {
		const roles = await RolesService.bringRoles();
		res.status(200).json(roles);
	} catch (error) {
		res.status(500).json({ error: 'Try again later...' });
	}
});

//------------------------------------------------------------------------------//
//                                   Orders Endpoints                           //
//------------------------------------------------------------------------------//
//bring Orders Dashboard endpoint if user is Admin
//localhost:3000/orders/dashboard
app.get('/ordersdashboard', isAdmin, async (req, res) => {
	res.status(200);
	const orders = await OrdersService.bringOrders();
	res.json(orders);
});

//create new Order endpoint
//localhost:3000/orders
app.post('/orders', async (req, res) => {
	const { payment_method, products } = req.body;
	const newOrder = await OrdersService.createOrder(payment_method, products, req.user.id);

	res.json({ newOrder });
});
//------------------------------------------------------------------------------//
//                                   Users                                   //
//------------------------------------------------------------------------------//

// //GET - Bring a user by ID
// //localhost:3000/usuarios/idUsuario
// app.get("/usuarios/:idUsuario", async (req, res) => {
// 	const idUsuario = req.params.idUsuario;
// 	try {
// 		const usuario = await Usuario.findByPk(idUsuario);
// 		res.status(200).json(usuario);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //POST - Add a user
// //localhost:3000/usuarios
// app.post("/usuarios", validateAdmin, async (req, res) => {
// 	try {
// 		const usuario = await Usuario.create({
// 			password: req.body.password,
// 			email: req.body.email,
// 			es_admin: req.body.es_admin,
// 		});
// 		res.status(200).json(usuario);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });
// //                                   End users                         //
// //------------------------------------------------------------------------------//

// //------------------------------------------------------------------------------//
// //                                   PACKAGES                                   //
// //------------------------------------------------------------------------------//
// //GET - Bring all the packets
// //localhost:3000/paquetes
// app.get("/paquetes", validateAdmin, async (req, res) => {
// 	try {
// 		const paquetes = await Paquete.findAll({
// 			include: [{ model: Fecha }, { model: Imagen }],
// 		});
// 		res.status(200).json(paquetes);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //GET - Bring a package by ID
// //localhost:3000/paquetes/:idPaquete
// app.get("/paquetes/:idPaquete", async (req, res) => {
// 	const idPaquete = req.params.idPaquete;
// 	try {
// 		const paquetes = await Paquete.findByPk(idPaquete, {
// 			include: [
// 				{
// 					model: Fecha,
// 				},
// 				{
// 					model: Imagen,
// 				},
// 			],
// 		});
// 		res.status(200).json(paquetes);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //POST - Add a package.
// //localhost:3000/paquetes
// app.post("/paquetes", validatePaqueteBody, async (req, res) => {
// 	try {
// 		const paquete = await Paquete.create(
// 			{
// 				precio: req.body.precio,
// 				destino: req.body.destino,
// 				comidas: req.body.comidas,
// 				alojamiento: req.body.alojamiento,
// 				duracion: req.body.duracion,
// 				descripcion: req.body.descripcion,
// 				pasajeros: req.body.pasajeros,
// 				fecha_paquetes: req.body.fecha_paquetes,
// 				imagen_paquetes: req.body.imagen_paquetes,
// 			},
// 			{ include: [Fecha, Imagen] } ////this creates the corresponding entries in the related tables: Fecha and Imagen
// 		);

// 		res.status(200).json(paquete);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //PUT - Modify a package by ID
// //localhost:3000/paquetes/idCompra
// app.put("/paquetes/:idPaquete", validateAdmin, validatePaqueteBody, async (req, res) => {
// 	const idPaquete = req.params.idPaquete;
// 	try {
// 		const paquete = await Paquete.update(
// 			{
// 				precio: req.body.precio,
// 				destino: req.body.destino,
// 				comidas: req.body.comidas,
// 				alojamiento: req.body.alojamiento,
// 				duracion: req.body.duracion,
// 				descripcion: req.body.descripcion,
// 				pasajeros: req.body.pasajeros,
// 			},
// 			{
// 				where: {
// 					id: {
// 						[Op.eq]: idPaquete,
// 					},
// 				},
// 			}
// 		);
// 		res.status(200).json(paquete);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde... modifica paquete" });
// 	}
// });
// //DELETE - Delete a package by ID
// //localhost:3000/compras/idCompra
// app.delete("/paquetes/:idPaquete", async (req, res) => {
// 	const idPaquete = req.params.idPaquete;
// 	try {
// 		// Removing package dates
// 		const fecha = await Fecha.destroy({
// 			where: {
// 				paquete_id: {
// 					[Op.eq]: idPaquete,
// 				},
// 			},
// 		});
// 		//Removing package images
// 		const imagen = await Imagen.destroy({
// 			where: {
// 				paquete_id: {
// 					[Op.eq]: idPaquete,
// 				},
// 			},
// 		});
// 		const paquete = await Paquete.destroy({
// 			where: {
// 				id: {
// 					[Op.eq]: idPaquete,
// 				},
// 			},
// 		});

// 		res.status(200).json(paquete);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //                                  End packages.                       //
// //------------------------------------------------------------------------------//

// //------------------------------------------------------------------------------//
// //                                   PURCHASES                                    //
// //GET - Bring all purchases
// //localhost:3000/compras
// app.get("/compras", validateAdmin, async (req, res) => {
// 	try {
// 		const compras = await Compra.findAll({
// 			include: [{ model: Paquete }],
// 		});
// 		res.status(200).json(compras);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //GET - Bring a purchase by ID
// //localhost:3000/compras/:idCompra
// app.get("/compras/:idCompra", async (req, res) => {
// 	const idCompra = req.params.idCompra;
// 	try {
// 		const compras = await Compra.findByPk(idCompra);
// 		res.status(200).json(compras);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //POST - Add a purchase
// //localhost:3000/compras
// app.post("/compras", validateCompraBody, async (req, res) => {
// 	try {
// 		const compra = await Compra.create(
// 			{
// 				cantidad: req.body.cantidad,
// 				fecha: req.body.fecha,
// 				usuario_id: req.body.usuario_id,
// 				fecha_viaje: req.body.fecha_viaje,
// 				paquetes: req.body.paquetes,
// 			}
// 			// { include: [PaqueteCompra] }
// 		);

// 		res.status(200).json(compra);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //DELETE - Delete a purchase by ID
// //localhost:3000/compras/idCompra
// app.delete("/compras/:idCompra", async (req, res) => {
// 	const idCompra = req.params.idCompra;
// 	try {
// 		const compra = await Compra.destroy({
// 			where: {
// 				id: {
// 					[Op.eq]: idCompra,
// 				},
// 			},
// 		});
// 		res.status(200).json(compra);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

// //PUT - Modify a purchase by ID
// //localhost:3000/compras/idCompra
// app.put("/compras/:idCompra", validateAdmin, validateCompraBody, async (req, res) => {
// 	const idCompra = req.params.idCompra;
// 	console.log(req.body);
// 	try {
// 		const compra = await Compra.update(
// 			{
// 				cantidad: req.body.cantidad,
// 				fecha: req.body.fecha,
// 				usuario_id: req.body.usuario_id,
// 				fecha_viaje: req.body.usuario_id,
// 			},
// 			{
// 				where: {
// 					id: {
// 						[Op.eq]: idCompra,
// 					},
// 				},
// 			}
// 		);
// 		res.status(200).json(compra);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde... modifica compra" });
// 	}
// });

// //                                  FIN COMPRAS                                 //
// //------------------------------------------------------------------------------//

// //GET - Bring all package-buy (to try)
// //localhost:3000/paquete_compra
// app.get("/paquete_compra", validateAdmin, async (req, res) => {
// 	try {
// 		const paquete_compra = await PaqueteCompra.findAll();
// 		res.status(200).json(paquete_compra);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

//----------------------------sequelize---------------------------------
//GET - TRAER BANDA/S POR PALABRA CLAVE - V2
//localhost:3000/bandas/buscar/unaPalabra
// app.get("/bandasv2/buscar/:palabra", async (req, res) => {
// 	const palabra = req.params.palabra;
// 	try {
// 		const bandas = await Bandas.findAll({
// 			where: {
// 				nombre: {
// 					[Op.substring]: palabra,
// 				},
// 			},
// 		});
// 		res.status(200).json(bandas);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });
//---------------------------- END sequelize---------------------------------

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
