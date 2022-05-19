 CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id bigint REFERENCES orders(id) on delete cascade,
    product_id bigint REFERENCES products(id) on delete cascade
 );