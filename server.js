//voy en el minuto 01:16:00 del video
//==========================================================================
//1. Import Express and other libraries
//==========================================================================
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("./middlewares/index");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const {
	Order,
	Product,
	User,
	PaymentMethod,
	Role,
	OrderHasProduct,
} = require("./models/index");
const { OrdersService } = require("./services/index");

const { Op } = require("sequelize");
const cors = require("cors"); // necessary so that in the front does not appear cors error

const APP_PORT = process.env.APP_PORT || 3000; //bring port from enviroment file
const JWT_SECRET = process.env.JWT_SECRET; //bring secret string from enviroment file

//==========================================================================
//2. Create the Express instance
//==========================================================================
const app = express();

//==========================================================================
//3. Add Global Middleware
//==========================================================================

const rateLimitPolicy = rateLimit({
	message: "Try again later",
	max: 10,
	windowMs: 5 * 60 * 1000, //minutes * 60 * 1000
});

//==========================================================================
// 3.1 Create Middlewares of our API
//==========================================================================
// const {
// 	validateAdmin,
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

//Protect all endpoints (except login) using Express-JWT as global Middleware
// for nothing in life, this chain must be exposed!!!
app.use(
	expressJwt({
		secret: JWT_SECRET,
		algorithms: ["HS256"],
	}).unless({ path: ["/login"] })
);

//==========================================================================
//4. ENDPOINTS
//==========================================================================

//login endpoint
//localhost:3000/login
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const possibleUser = await User.findOne({
		attributes: ["id", "name", "email"], //only bring those fields and not others like password field
		where: {
			//this is like "username:username", When we have the same name in the variable it can be abbreviated
			username,
			//this is like "password:password", When we have the same name in the variable it can be abbreviated
			password,
		},
		include: [{ model: Role }],
	});

	if (possibleUser == null) {
		res.status(401).json({ error: "Incorrect user or password" });
	} else {
		const token = jwt.sign(
			{
				id: possibleUser.id,
				name: possibleUser.name,
				email: possibleUser.email,
			},
			JWT_SECRET, //secret string
			{ expiresIn: "60m" } // Expiration time of the token
		);

		res.json({ token });
	}
});

//Other endpoints
//------------------------------------------------------------------------------//
//                                   Orders                                   //
//------------------------------------------------------------------------------//
//create new Order endpoint
//localhost:3000/orders
app.post("/orders", async (req, res) => {
	const { payment_method, products } = req.body;
	const newOrder = await OrdersService.createOrder(payment_method, products, req.user.id);

	res.json({ newOrder });
});

//bring Order endpoint if user is Admin
//localhost:3000/orders/dashboard
app.get("/orders/dashboard", isAdmin, async (req, res) => {
	res.status(200);
	const orders = await OrdersService.bringOrders();
	res.json(orders);
});

//------------------------------------------------------------------------------//
//                                   Users                                   //
//------------------------------------------------------------------------------//
//GET - Bring all users
//localhost:3000/usuarios
// app.get("/usuarios", validateAdmin, async (req, res) => {
// 	try {
// 		const usuarios = await Usuario.findAll({
// 			include: [
// 				{
// 					model: Compra,
// 					include: [
// 						{
// 							model: Paquete,
// 						},
// 					],
// 				},
// 			],
// 		});

// 		res.status(200).json(usuarios);
// 	} catch (error) {
// 		res.status(500).json({ error: "Intente mas tarde..." });
// 	}
// });

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
process.on("SIGINT", () => {
	console.log(" -- Disconnected server -- ");
	process.exit();
});
