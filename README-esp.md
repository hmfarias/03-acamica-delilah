[![Status][statuss-shield]][statuss-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

<br />

<div align="center">
  <a href="https://github.com/hmfarias/03-acamica-delilah">
    <img src="https://user-images.githubusercontent.com/56005148/191755311-0408a1d6-c8c7-4956-959a-0b79166d0d9f.png" alt="Logo" width="310" height="270">
  </a>

  <h2 align="center">Delilah Resto</h2>

  <p align="center">
    ¡Una increíble API REST para administrar un restaurante de entrega de comida rápida!
    <br />
    <a href="https://github.com/hmfarias/03-acamica-delilah"><strong>Explora los documentos »</strong></a>
    <br />
    <br />
    <a href="https://github.com/hmfarias/03-acamica-delilah">Ver repositorio</a>
    ·
    <a href="https://github.com/hmfarias/03-acamica-delilah/issues">Reportar un error</a>
    ·
    <a href="https://github.com/hmfarias/03-acamica-delilah/issues">Solicitar función</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

### Tabla de contenidos

  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
        <li><a href="#descripción-general">Desripción General</a></li>
          <ul><a href="#entregable">Entregable</a></ul>
          <ul><a href="#uso-de-librerias">Uso de Librerías</a></ul>
          <ul><a href="#proceso-de-creacion">Proceso de Creación</a></ul>
      </ul>
    </li>
    <li>
      <a href="#empezando">Empezando</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
        <li><a href="#documentacion">Documentación</a></li>
      </ul>
    </li>
    <li><a href="#contribuyendo">Contribuyendo</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## Sobre el Proyecto

[![Product Name Screen Shot][product-screenshot]](https://github.com/hmfarias/03-acamica-delilah)

Delilah Resto es el backend de un sistema de pedidos en línea para un restaurante que opera las partes necesarias para montar una API REST que permite operaciones CRUD en una estructura de datos.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Construido con

- [![NodeJS][nodejs]][node-url] As environnement
- [![Express][express]][express-url] Framework
- [![Nodemon][nodemon]][nodemon-url] Interface utility
- [![Ratelimit][ratelimit]][ratelimit-url] Control of incoming traffic in the API
- [![JSONWeb][jsonweb]][jsonweb-url] Standard to propagate between two parties in a secure way, the identity of a certain user and their privileges. Password encryption with the library [bcrypt](https://www.npmjs.com/package/bcrypt 'bcrypy').
- [![XAMPP][xampp]][xampp-url] as a Server
- [![MySQL][mysql]][mysql-url] Database Management System
- [![Workbench][workbench]][workbench-url] Graphic environment for database design, servers, administration and maintenance for the MySQL system
- [![Sequelize][sequelize]][sequelize-url] ORM for Nodejs to manipulate SQL database in a simple way
- [![Postman][postman]][postman-url] Tool to create requests and test the API in a simple way
- [![Swagger][swagger]][swagger-url] Open specification to define the REST API
- [![Others][others]][others-url] Additional packages for security and cors handling like [Helmet](https://www.npmjs.com/package/helmet 'Helmet'), [Compression](https://www.npmjs.com/package/helmet 'Compression') y [Cors](https://www.npmjs.com/package/cors 'Cors')

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Descripción general

Delilah Resto is the backend for an online ordering system for a restaurant by operating the necessary parts to mount a REST API that allows CRUD operations on a data structure.

#### Deliverable

The objective of the Delilah project submitted is to emulate the task of a backend developer. The deliverables are:

- JS files
- SQL file or installation from the application
- Documentation file
- [Readme.md](https://github.com/hmfarias/03-acamica-delilah#readme) with installation instructions

(The frontend is not included in the deliverable package or resources of this project. The focus is on the backend.)

#### Use of libraries

No libraries, plugins or any other resource that is not specified in the instruction guide received, since the objective of the project is to validate the basic knowledge.

#### Creation process

##### Steps followed

- **Step 1: Introduction to the project**
  Among the discharged resources, each of the views was analyzed to understand the project in its entirety.
  It was observed rightly as it is the behavior of the application and the architecture of it began to be diagnosed roughly.

- **Step 2: Definition of the specification**
  Based on the relevant information, the documentation was made with Swagger under the OpenAPI standard.
  A `delilahResto.json` file was created in the `SETUP` directory of the project and the list of Endpoints was completed.

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
  A role validation strategy was generated for all existing endpoints. For example, that `only administrators users can create, edit and delete products, and that logical users only have access to their personal information.`

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
> Refer to the topic [Environment File](#the-environment-file)

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This guide describes step by step how to set up the local environment to get the system up and running.
The necessary tools are indicated to set up the server, installation and configuration steps, the creation of the database and its population, and finally, the correct integration between both parts to be able to use the API locally or online.

### Prerequisites

Before starting the installation, it is necessary to have:

- [Node Js](https://nodejs.org/en/ 'Node js')
- [XAMPP](https://www.apachefriends.org/download.html 'XAMPP')
- [MySQL Workbench](https://www.mysql.com/products/workbench/ 'MYSQL')
- Install [Nodemon](https://nodemon.io/ 'nodemon')

  ```
  npm install nodemon -g (for global installation)
  npm install nodemon --save-dev (for local installation)
  ```

  <p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Installation

1. ##### Clone the repository project

- Create a folder in a local directory and from the `terminal` inside the created folder initialize git:

```
git init
```

- Clone the entire project:

```
git clone https://github.com/hmfarias/03-acamica-delilah.git
```

2. ##### Install dependencies

- In the root of the project, write the command::

```
npm install
```

> This creates the _node_modules_ folder with the necessary dependencies, such as _express_, _sequelize_, _jwt_ etc.

3. ##### Put online database

- Open [XAMPP](https://www.apachefriends.org/download.html 'XAMPP'). Go to `Server Manage` and start the `MySQL Database`
- Open [MySQL Workbench](https://www.mysql.com/products/workbench/ 'MYSQL') and establish the connection with the database. Make sure MySql database is running on port 3306.
- In the project there is a folder called `./setup`. In this folder are the script files necessary to create and populate the database.
  From MySQL Workbench go to the `File -> Open SQL Script` option, select and run the file `./setup/delilah_create.sql`. Next select and run the file `./setup/delilah_inserts.sql`.

  > This creates the `delilah` database, as well as the necessary tables and test data in the created tables.

4. #### Environment Variables

##### The Environment File

You will need to create or modify the `.env` file in the root folder of the project.
In this file you will need to set the following environment variables:

- To configure the connection to the database:
  - **DB_SERVER= (e.g. 127.0.0.1)**
  - **DB_USER= (e.g. root)** - **DB_PWD=**
  - **DB_NAME= delilah**
  - **DB_PORT= 3306**
  - **APP_PORT= 3000**
    <br>
- Secret string for JWT. Are numbers and special symbols that the server will use to generate the token for each logged in user. -- _NEVER EXPOSE THIS CHARACTER STRING_ --
  - **JWT_SECRET=(e.g. ger7gtlhiu&ylkjsd876fswihelgklmvals654sakltfghpa$)**
    <br>
- Time to live token
  - **EXPIRE_TIME_TOKEN = 120m**
    <br>
- Maximum number of requests according to the desired rate limit policy
  - **MAX_REQUEST = 20**
    <br>
- Waiting time in minutes after exceeding MAX_REQUEST
  - **MINUTES_TO_WAIT = 1**

5. #### Put the server online

   To put the server online run the following command in the terminal:

   ```
   npm run server
   ```

   > This starts the `./src/server.js ` file with nodemon.
   > You will see the following message in the console:
   >
   > ```
   >   Listening in Port: 3000
   >   Executing (default): SELECT 1+1 AS result
   >   All OK - connected database
   > ```

6. #### The API is online and listening on the selected port
   After completing the steps above, you can start testing the Delilah Resto API.
   You can use [Postman](https://www.postman.com/ 'Postman') for it.
   In the `setup` folder, you can find the Postman Collection which tests each and every API endpoint.
   Start Postman and import the file `./setup/API Delilah-postman_collection.json`. There you will have all the examples of use of each available endpoint, as well as the Json models of each request.
   According to the security scheme implemented for the API, in order to test each endpoint, you will need to log in to the system with an existing user (administrator or common user) and use the token returned by the server in the header of each request.
   With Server online, you can visit the documentation page, `localhost:3000/api/v1/docs` to get the details of each request and its response.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Documentation

With Server online, you can visit the documentation page, `localhost:3000/api/v1/docs` to get the details of each request and its response.
You can also go to [Swagger](https://editor.swagger.io/ 'Swagger') and drag or import the ` ./setup/delilahResto.yaml`.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>
<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- CONTACT -->

## Contact

Marcelo Farias - [+54 9 3512601888](https://twitter.com/your_username) - hmfarias7@gmail.com

Project Link: [https://github.com/hmfarias/03-acamica-delilah](https://github.com/hmfarias/03-acamica-delilah)

<<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->

<!-- [statuss-shield]: https://img.shields.io/badge/STATUS-Developing-green -->

[statuss-shield]: https://img.shields.io/badge/STATUSS-finished-green
[statuss-url]: https://github.com/hmfarias/03-acamica-delilah#readme
[forks-shield]: https://img.shields.io/github/forks/hmfarias/03-acamica-delilah
[forks-url]: https://github.com/hmfarias/03-acamica-delilah/network/members
[stars-shield]: https://img.shields.io/github/stars/hmfarias/03-acamica-delilah
[stars-url]: https://github.com/hmfarias/03-acamica-delilah/stargazers
[issues-shield]: https://img.shields.io/github/issues/hmfarias/03-acamica-delilah
[issues-url]: https://github.com/hmfarias/03-acamica-delilah/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: https://github.com/hmfarias/03-acamica-delilah/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/hugo-marcelo-farias
[product-screenshot]: https://user-images.githubusercontent.com/56005148/192166732-ecbcd321-b61d-4998-a114-5d616846ed8d.png
[nodejs]: https://img.shields.io/badge/nodeJS-347012?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/
[nodemon]: https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=4F4D3F
[nodemon-url]: https://nodemon.io/
[express]: https://img.shields.io/badge/express-35495E?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[jsonweb]: https://img.shields.io/badge/JSON_Web_Token-4A4A55?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jsonweb-url]: https://jwt.io/
[ratelimit]: https://img.shields.io/badge/Rate_Limt-4A4A55?style=for-the-badge&logo=express&logoColor=white
[ratelimit-url]: https://www.npmjs.com/package/express-rate-limit
[xampp]: https://img.shields.io/badge/XAMPP-EFEEE5?style=for-the-badge&logo=xampp&logoColor=orange
[xampp-url]: https://www.apachefriends.org/es/index.html
[mysql]: https://img.shields.io/badge/MySQL-3E6E93?style=for-the-badge&logo=mysql&logoColor=orange
[mysql-url]: https://www.mysql.com/
[workbench]: https://img.shields.io/badge/MySQL_Workbench-orange?style=for-the-badge&logo=mysql&logoColor=blue
[workbench-url]: https://www.mysql.com/products/workbench/
[sequelize]: https://img.shields.io/badge/Sequelize-grey?style=for-the-badge&logo=sequelize&logoColor=52B0E6
[sequelize-url]: https://sequelize.org/
[postman]: https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=white
[postman-url]: https://www.postman.com/
[swagger]: https://img.shields.io/badge/Swagger-4F8C2E?style=for-the-badge&logo=swagger&logoColor=white
[swagger-url]: https://swagger.io/
[others]: https://img.shields.io/badge/Others-grey?style=for-the-badge
[others-url]: https://github.com/hmfarias/03-acamica-delilah
