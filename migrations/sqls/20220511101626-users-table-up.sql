CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password_digest VARCHAR
);