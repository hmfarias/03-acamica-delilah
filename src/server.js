//========================================================
//1. Import Express and other libraries
//========================================================
const compression = require('compression');
const cors = require('cors'); // necessary so that in the front does not appear cors error
const express = require('express');
const helmet = require('helmet');

const APP_PORT = process.env.APP_PORT || 3000; //bring port from enviroment file (If it does not exist, assign 3000 by default)
const {
	jsonError,
	jwtProtection,
	rateLimitPolicy,
	tokenError,
} = require('./middlewares/globalMiddleware'); //global middlewares
const {
	loginRoute,
	payMethodsRoute,
	productsRoute,
	rolesRoute,
	usersRoute,
} = require('./../src/v1/routes'); // Routes

const { OrdersService } = require('./services/index'); //ver

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
//localhost:3000/auth/login | localhost:3000/users/register
app.use('/api/v1/auth', loginRoute);
//localhost:3000/users
app.use('/api/v1/users', usersRoute);

//Products Endpoints ----------------------
//localhost:3000/products
app.use('/api/v1/products', productsRoute);

//Payment Methods Endpoints ---------------
//localhost:3000/paymethods
app.use('/api/v1/paymethods', payMethodsRoute);

//Roles Endpoints -------------------------
//localhost:3000/roles
app.use('/api/v1/roles', rolesRoute);

//Orders Endpoints ------------------------
//bring Orders Dashboard endpoint if user is Admin
//localhost:3000/orders/dashboard
app.get('/api/v1//ordersdashboard', async (req, res) => {
	res.status(200);
	const orders = await OrdersService.bringOrders();
	res.json(orders);
});

//create new Order endpoint
//localhost:3000/orders
app.post('/api/v1//orders', async (req, res) => {
	const { payment_method, products } = req.body;
	const newOrder = await OrdersService.createOrder(payment_method, products, req.user.id);

	res.json({ newOrder });
});

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
