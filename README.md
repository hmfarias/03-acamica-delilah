#Delilah Resto
![Logo delilah](https://user-images.githubusercontent.com/56005148/191755311-0408a1d6-c8c7-4956-959a-0b79166d0d9f.png)

<h1> Delilah Resto </h1>

##**TOPICS / TEMAS:**

- **[Repository](#repository) / [Repositorio](#repositorio)**
- **[Technology Stack](#technology-stack) / [Tecnologías utilizadas](#tecnologías-utilizadas)**
- **[General description](#general-description) / [Descripción General](#descripción-general)**
- **[Installation instructions](#installation-instructions) / [Instrucciones de Instalación](#instrucciones-de-instalación)**

> **ENGLISH:**

##Repository

You can download the project from the following GitHub repository:
https://github.com/hmfarias/03-acamica-delilah.git
[(return)](#delilah-resto)

##Technology Stack

- NodeJS
- Nodemon
- Express
- JSON Web Token
- Rate Limit
- MySQL
- Sequelize
- Postman
- Swagger

[(return)](#delilah-resto)

##General description

Delilah Resto is the backend for an online ordering system for a restaurant by operating the necessary parts to mount a REST API that allows CRUD operations on a data structure.

**Deliverable**
The objective of the Delilah project submitted is to emulate the task of a backend developer. The deliverables are:

- JS files
- SQL file or installation from the application
- Documentation file
- Readme.md with installation instructions

(The frontend is not included in the deliverable package or resources of this project. The focus is on the backend.)

**Use of libraries**
No libraries, plugins or any other resource that is not specified in the instruction guide received, since the objective of the project is to validate the basic knowledge.

**Creation process**

> Project evaluation method
> The task of an evaluator is to download the project and install it by following "readme" instructions.
> The objective is to validate that the application works on any platform, therefore the evaluator will perform all the tests on your local environment.

**Steps followed**

- **Step 1: Introduction to the project**
  Among the discharged resources, each of the views was analyzed to understand the project in its entirety.
  It was observed rightly as it is the behavior of the application and the architecture of it began to be diagnosed roughly.

- **Step 2: Definition of the specification**
  Based on the relevant information, the documentation was made with Swagger under the OpenAPI standard.
  A "delilahResto.json" file was created in the "SETUP" directory of the project and the list of Endpoints was completed.

- **Step 3: Creation of the environment**
  A folder was created on the computer, and a GIT repository was started over that folder. Likewise, the NodejS project was initialized by creating the package.json file.
  The necessary dependencies were also installed and the web server was created.

- **Step 4: Endpoints**
  Express was installed on the project and it began to define all the routes that were specified in the documentation.
  The Get, Post, Put and Delete methods were used depending on the action to be made.

- **Step 5: Structure of information**
  The structure of the database was designed so that support all the flow of the application. For this, each of the views was reviewed again and each table was diamed based on the expedited information of those views.

- **Step 6: Connection to the database**
  The server code was introduced with the connection to the database and it was enabled and 'listening' in a local port, connected to a MySQL database.

**List and product creation**

- **Step 1: Products structure and table**
  Based on the specification created previously, the Products table was created with the columns required to meet the specification of the API.

- **Step 2: Product CRUD**
  Express was added to the project, and the first endpoint of / products was created and the necessary operations were generated to be able to create, read, update and delete a product.

**Users System**

- **Step 1: Users Structure and table**
  Based on the specification created previously, the Users table was created with the columns required to meet the specification of the API.
  The **Users** table is related to **Roles** table. When creating it, the following conditions were taken into account: - An user has only one role. - A role can be assigned to multiple users.

- **Step 2: Registration and user login**
  Based on the specification, the corresponding endpoint was created to give the user a way to create a new account.
  Likewise, the Token **JWT** was incorporated to give registered users a way to log in to the platform.

- **Step 3: Role**
  A role validation strategy was generated for all existing endpoints. For example, that "only administrators users can create, edit and delete products, and that logical users only have access to their personal information."

**Roles creation**

- **Step 1: Roles structure and table**
  Based on the specification created previously, the Roles table was created with the columns required to meet the specification of the API.

- **Step 2: Roles CRUD**
  Necessary operations were generated to be able to create, read, update and delete a roles.

**Payment Methods creation**

- **Step 1: Payment Methods structure and table**
  Based on the specification created previously, the Payment Methods table was created with the columns required to meet the specification of the API.

- **Step 2: Payment Methods CRUD**
  Necessary operations were generated to be able to create, read, update and delete a payment methods.

**Creation of orders**

- **Step 1: Orders structure and table**
  The order table is related to two tables: **users** and **products**. When creating it, the following conditions were taken into account: - An order can be made by a single user. - A user can perform more than an order. - An order may contain several products. - A product can be part of several orders.

- **Step 2: Creating and getting orders**
  With the tables already created, the first endpoint was generated for the creation of the products. Always based on the specification to know what to be received and what should be returned.
  Then a new endpoint was created to get of all the products. This query not only returns the detail of orders but also the detail of all **products**, **users** and **payment method**.
  The GET of all orders can only be executed by an administrator. A logged user only receives the own.

- **Step 3: Edition of orders**
  The last step to end the API was to provide the administrator to edit tools on orders made to update the state of them. That's why an endpoint was created to make an update on the order path.

**Rate Limit Policy**
Finally, the rate limit policy was incorporated to allow control of incoming traffic for the API by limiting the number of requests that the API can receive within a given period of time. After the limit is reached, the policy rejects all requests, thereby avoiding any additional load on the backend API.

> When you configure the rate limiting policy, you can specify any number of pairs of quota (number of requests) and time window (time period) values.
> Refer to the topic [Environment File](#environment-file)

[(return)](#delilah-resto)

##Installation instructions
[(return)](#delilah-resto)

####**Environment File**
[(return)](#delilah-resto)

> **ESPAÑOL:**

####Tecnologías Utilizadas

- NodeJS
- Nodemon
- Express
- JSON Web Token
- Rate Limit
- MySQL
- Sequelize
- Postman
- Swagger

[(return)](#delilah-resto)

##Repositorio
https://github.com/hmfarias/03-acamica-delilah.git
[(return)](#delilah-resto)

##Descripción General

Delilah Resto is the backend for an online ordering system for a restaurant by operating the necessary parts to mount a REST API that allows CRUD operations on a data structure.

**Entregable**
The objective of the Delilah project submitted is to emulate the task of a backend developer. The deliverables are:

- JS files
- SQL file or installation from the application
- Documentation file
- Readme.md with installation instructions

(The frontend is not included in the deliverable package or resources of this project. The focus is on the backend.)

**Uso de Librerías**
No libraries, plugins or any other resource that is not specified in the instruction guide received, since the objective of the project is to validate the basic knowledge.

**Proceso de Creación**

> Project evaluation method
> The task of an evaluator is to download the project and install it by following "readme" instructions.
> The objective is to validate that the application works on any platform, therefore the evaluator will perform all the tests on your local environment.

**Pasos seguidos**

- **Step 1: Introduction to the project**
  Among the discharged resources, each of the views was analyzed to understand the project in its entirety.
  It was observed rightly as it is the behavior of the application and the architecture of it began to be diagnosed roughly.

- **Step 2: Definition of the specification**
  Based on the relevant information, the documentation was made with Swagger under the OpenAPI standard.
  A "delilahResto.json" file was created in the "SETUP" directory of the project and the list of Endpoints was completed.

- **Step 3: Creation of the environment**
  A folder was created on the computer, and a GIT repository was started over that folder. Likewise, the NodejS project was initialized by creating the package.json file.
  The necessary dependencies were also installed and the web server was created.

- **Step 4: Endpoints**
  Express was installed on the project and it began to define all the routes that were specified in the documentation.
  The Get, Post, Put and Delete methods were used depending on the action to be made.

- **Step 5: Structure of information**
  The structure of the database was designed so that support all the flow of the application. For this, each of the views was reviewed again and each table was diamed based on the expedited information of those views.

- **Step 6: Connection to the database**
  The server code was introduced with the connection to the database and it was enabled and 'listening' in a local port, connected to a MySQL database.

**List and product creation**

- **Step 1: Products structure and table**
  Based on the specification created previously, the Products table was created with the columns required to meet the specification of the API.

- **Step 2: Product CRUD**
  Express was added to the project, and the first endpoint of / products was created and the necessary operations were generated to be able to create, read, update and delete a product.

**Users System**

- **Step 1: Users Structure and table**
  Based on the specification created previously, the Users table was created with the columns required to meet the specification of the API.
  The **Users** table is related to **Roles** table. When creating it, the following conditions were taken into account: - An user has only one role. - A role can be assigned to multiple users.
- **Step 2: Registration and user login**
  Based on the specification, the corresponding endpoint was created to give the user a way to create a new account.
  Likewise, the Token **JWT** was incorporated to give registered users a way to log in to the platform.

- **Step 3: Role validation was added**
  Finally, a role validation strategy was generated for all existing endpoints. For example, that "only administrators users can create, edit and delete products, and that logical users only have access to their personal information."

**Roles creation**

- **Step 1: Roles structure and table**
  Based on the specification created previously, the Roles table was created with the columns required to meet the specification of the API.

- **Step 2: Roles CRUD**
  Necessary operations were generated to be able to create, read, update and delete a roles.

**Payment Methods creation**

- **Step 1: Payment Methods structure and table**
  Based on the specification created previously, the Payment Methods table was created with the columns required to meet the specification of the API.

- **Step 2: Payment Methods CRUD**
  Necessary operations were generated to be able to create, read, update and delete a payment methods.

**Creation of orders**

- **Step 1: Orders structure and table**
  The order table is related to two tables: **users** and **products**. When creating it, the following conditions were taken into account: - An order can be made by a single user. - A user can perform more than an order. - An order may contain several products. - A product can be part of several orders.

- **Step 2: Creating and getting orders**
  With the tables already created, the first endpoint was generated for the creation of the products. Always based on the specification to know what to be received and what should be returned.
  Then a new endpoint was created to get of all the products. This query not only returns the detail of orders but also the detail of all **products**, **users** and **payment method**.
  The GET of all orders can only be executed by an administrator. A logged user only receives the own.

- **Step 3: Edition of orders**
  The last step to end the API was to provide the administrator to edit tools on orders made to update the state of them. That's why an endpoint was created to make an update on the order path.

[(return)](#delilah-resto)

####Instrucciones de Instalación

[(return)](#delilah-resto)
