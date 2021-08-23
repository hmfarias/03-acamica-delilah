# acamica-delilah

Desarrollo Web Full Stack - Proyecto integrador Sprint 3 - JavaScript, NodeJs, Swagger. Postman

Repositorio: https://github.com/hmfarias/03-acamica-delilah.git

# Delilah Restó

General description

It is the backend for an online ordering system for a restaurant by operating the necessary parts to mount a REST API that allows CRUD operations on a data structure.

Deliverable

The objective of the Delilah project submitted is to emulate the task of a backend developer. The deliverables are:

*JS files

*SQL file or installation from the application

*Documentation file

*Readme.md with installation instructions



The frontend is not included in the deliverable package or resources of this project.The focus is on the backend.

Use of libraries
No libraries, plugins or any other resource that is not specified in the instruction guide received, since the objective of the project is to validate the basic knowledge.

Creation instructions followed

Project evaluation method

The task of an evaluator is to download the project and install it by following readme.md instructions.

The objective is to validate that the application works on any platform, therefore the evaluator will perform all the tests on your local environment.

Steps:

Step 1: Introduction to the project
Among the discharged resources, each of the views was analyzed to understand the project in its entirety.
It was observed rightly as it is the behavior of the application and the architecture of it began to be diagnosed roughly.

Step 2: Definition of the specification
Based on the relevant information, the documentation was made with Swagger under the OpenAPI standard.
A SPEC.YML file was created in the root directory of the project and the list of Endpoints was completed.

Step 3: Creation of the environment
A new folder was created on the computer, and a GIT repository was started. Likewise, the NodejS project was initialized by creating the package.json file.
The necessary dependencies were also installed and the web server was created.

Step 4: Endpoints
Express was installed on the project and it began to define all the routes that were specified in the documentation.
The Get, Post, Put and Delete methods were used depending on the action to be made.

Step 5: Structure of information
The structure of the database was designed so that support all the flow of the application. For this, each of the views was reviewed again and each table was diamed based on the expedited information of those views.

Step 6: Connection to the database
The server code was introduced with the connection to the database and it was enabled and 'listening' in a local port, connected to a MySQL database.

List and product creation

Step 1: The table and product structure was created
Based on the specification created previously, the product table was created with the columns required to meet the specification of the API.

Step 2: Product Crud
Express was added to the project, and the first endpoint of / products was created and the necessary operations were generated to be able to create, read, update and delete a product.

Users System

Step 1: The table and user structure was created

Step 2: Registration and user login
Based on the specification, the corresponding endpoint was created to give the user a way to create a new account.
Likewise, the Token JWT was incorporated to give registered users a way to log in to the platform.

Step 3: Role validation was added
Finally, a role validation strategy was generated for all existing endpoints. For example, that "only administrators users can create, edit and delete products, and that logical users only have access to their personal information."

Creation of orders

Step 1: The table and order structure was created
The order table is related to two tables: users and products. When creating it, the following conditions were taken into account:
An order can be made by a single user.
A user can perform more than an order.
An order may contain several products.
A product can be part of several orders.

Step 2: Creating and getting orders
With the tables already created, the first endpoint was generated for the creation of the products. Always based on the specification to know what to be received and what should be returned.
Then a new endpoint was created to get get of all the products. This query not only returns the detail of orders but also the detail of all products.
The GET of all orders can only be executed by an administrator. A logged user only receives the own.

Step 3: Edition of orders
The last step to end the API was to provide the administrator to edit tools on orders made to update the state of them. That's why an endpoint was created to make an update on the order path.

IN SPANISH:

Descripción general
Se trata del backend para un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

Entregable
El objetivo del proyecto Delilah Restó es emular la tarea de un desarrollador backend. Los entregables son:

Archivos JS
Archivo SQL o instalación desde la aplicación
Archivo de documentación
README.md con instrucciones de instalación

El frontend no está incluido en el paquete de entregables ni recursos de este proyecto. El foco está puesto en el Backend.

Uso de librerías
No se utilizaron librerías, plugins o cualquier otro recurso que no esté especificado en la guía de instrucciones recibida, ya que el objetivo del proyecto es validar los conocimientos de base.

Consignas

a. Método de evaluación del proyecto

La tarea de un evaluador es descargar el proyecto e instalarlo siguiendo tus instrucciones del README.md.

El objetivo es validar que la aplicación funcione en cualquier plataforma, por lo tanto el evaluador realizará todas las pruebas sobre su entorno local.

Pasos:

Paso 1: Introducción al proyecto
Entre los recursos descargados, se analizó cada una de las vistas para entender el proyecto en su totalidad.
Se observó con detenimiento cómo es el comportamiento de la aplicación y se comenzó a diagramar a grandes rasgos la arquitectura de la misma.

Paso 2: Definición de la especificación
En base a la información relevada, se realizó la documentación con Swagger bajo el estándar OpenAPI.
Se creó un archivo spec.yml en el directorio raíz del proyecto y se completó el listado de endpoints.

Paso 3: Creación del entorno
Se creó una nueva carpeta en la computadora, y se dió inicio a un repositorio de git. Asimismo, se inicializó el proyecto de NodeJS creando el archivo package.json.
Se instalaron además, las dependencias necesarias y se creó el servidor web.

Paso 4: Endpoints
Se instaló express en el proyecto y se comenzó a definir todas las rutas que se especificaron en la documentación.
Se utilizaron los métodos tipo GET, POST, PUT y DELETE dependiendo la acción a realizar.

Paso 5: Estructura de la información
Se diseñó la estructura de la base de datos de modo que soporte todo el flujo de la aplicación. Para ello se revisó nuevamente cada una de las vistas y se diagramó cada tabla en base a la información extaida de esas vistas.

Paso 6 : Conexión a la base de datos
Se introdujo el código del servidor con la conexión a la base de datos y el mismo quedó habilitado y ‘escuchando’ en un puerto local, conectado a una base de datos MySQL.

Listado y creación de productos

Paso 1: Se creó la tabla y estructura de productos
En base a la especificación creada anteriormente, se creó la tabla de productos con las columnas requeridas para cumplir la especificación de la API.

Paso 2: CRUD de productos
Se agregó Express al proyecto, y se creó el primer endpoint de /productos y se generaron las operaciones necesarias para poder crear, leer, actualizar y borrar un producto.

Sistema de usuarios

Paso 1: Se creó la tabla y estructura de usuarios

Paso 2: Registro y login de usuarios
Basándose en la especificación, se creó el endpoint correspondiente para darle al usuario una forma de crear una nueva cuenta.
Asimismo se incorporó al proyecto el token JWT para darle a los usuarios registrados una forma de iniciar sesión en la plataforma.

Paso 3: Se agregó validación de roles
Por último, se generó una estrategia de validación de roles para todos los endpoints existentes. Por ejemplo, que “solo usuarios administradores puedan crear, editar y eliminar productos, y que los usuarios logueados solo tengan acceso a su información personal”.

Creación de pedidos

Paso 1: Se creó la tabla y estructura de pedidos
La tabla de pedidos se relaciona con dos tablas: la de usuarios y la de productos. Al crearla, se tuvo en cuenta las siguientes condiciones:
Un pedido puede ser realizado por un único usuario.
Un usuario puede realizar más de un pedido.
Un pedido puede contener varios productos.
Un producto puede formar parte de varios pedidos.

Paso 2: Creando y obteniendo pedidos
Con las tablas ya creadas, se generó el primer endpoint para la creación de los productos. Siempre basandose en la especificación para saber qué se recibir y qué se debe devolver.
Luego se creó un nuevo endpoint para hacer GET de todos los productos. Esta consulta no solo devuelve el detalle de los pedidos sino también el detalle de todos los productos.
El GET de todos los pedidos solo puede ser ejecutado por un administrador. Un usuario logueado solo recibe los propios.

Paso 3: Edición de pedidos
El último paso para finalizar la API fue brindarle al administrador herramientas de edición sobre los pedidos realizados para poder actualizar el estado de los mismos. Para eso se creó un endpoint para hacer un UPDATE sobre la ruta de pedidos.
