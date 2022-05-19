# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `api/v1/products` [GET]
- Search `api/v1/product/:productName` [GET]
- Create `api/v1/products` [POST] [token required]
- Delete `api/v1/products/:id` [DELETE] [token required]
 
#### Users
- Index `api/v1/users` [GET] [token required]
- Show `api/v1/users/:id` [GET] [token required]
- Signup `api/v1/users/signup` [POST]
- Login `api/v1/users/login` [POST]

#### Orders
- Index `api/v1/orders` [GET] [token required]
- Show `api/v1/orders/:id` [GET] [token required]
- Create `api/v1/orders` [POST] [token required]
- Delete `api/v1/orders/:id` [DELETE] [token required]

## Database Schema
#### Product table
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User table
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR`
- lastName `VARCHAR`
- username `VARCHAR`
- email `VARCHAR`
- password `VARCHAR`

#### Orders table
- id `SERIAL PRIMARY KEY`
- status `VARCHAR`
- user_id `INTEGER` `REFERENCES users(id)`

#### Order_products table
- id `SERIAL PRIMARY KEY`
- order_id `INTEGER` `references orders(id)`
- product_id `INTEGER` `references products(id)`
- quantity `INTEGER`
