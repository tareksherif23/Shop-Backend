# E-commerce Shop Backend
### A backend system for an e-commerce website that utilized the PERN stack and Typescript   

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## DB setup and connection

#### open the terminal and run the following commands to create and run the database:

-   switch to the postgres user `su postgres`
-   start psql `psql postgres`
-   in psql run the following:
    -   `CREATE USER shopdb_admin WITH PASSWORD 'pass@2022';`
    -   `CREATE DATABASE shop_backend;`
    -   `\c shop_backend`
    -   `GRANT ALL PRIVILEGES ON DATABASE shop_backend TO shopdb_admin;`
-   to test that it is working run `\dt` and it should output "No relations found."  
- *For the test database do the following:*
	- `CREATE DATABASE shop_backend_test;`
	- `\c shop_backend_test`
	- `GRANT ALL PRIVILEGES ON DATABASE shop_backend_test TO shopdb_admin;` 

#### add the following environment variables to your .env file and replace the placeholders with your values :

```sh
POSTGRES_HOST = 127.0.0.1
POSTGRES_PORT = 5432
POSTGRES_DB = shop_backend
POSTGRES_TEST_DB = shop_backend_test
POSTGRES_USER = shopdb_admin
POSTGRES_PASSWORD = pass@2022

ENV = dev
JWT_SECRET = <your_jwt_secret_string>
BCRYPT_PEPPER = <your_bcrypt_secret_string>
SALT_ROUNDS = <the_number_of_salt_rounds>

```
## Set up
-  `npm install` to install all dependencies

-  `npm run start-db` to set up the database and get access via [http://127.0.0.1:5432](http://127.0.0.1:5432)

-  `npm run build` to build the app
## Start the app
-  `npm run start` to start the app and get access via [http://127.0.0.1:3000](http://127.0.0.1:3000) 

## Test the app

- Set the ENV variable in the .env file to test

-  `npm run test` to run all tests

## Tech

The project uses a number of open source projects to work properly:
- [TypeScript] -  a strongly typed programming language that builds on JavaScript
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [PostgreSQL] - a powerful and open-source RDBMS
- [Jasmine] - behavior-driven development framework for testing JavaScript code

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact
#### Tarek Marzouk - [LinkedIn](https://www.linkedin.com/in/tarek-marzouk-300b82ab/) - tareksherif23@gmail.com


#### Project Link: https://github.com/tareksherif23/Shop-Backend

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [TypeScript]: <http://www.typescriptlang.org/>
   [Sharp]: <http://github.com/lovell/sharp>
   [PostgreSQL]: <http://postgresql.com>
   [Jasmine]: <http://jasmine.github.io/>