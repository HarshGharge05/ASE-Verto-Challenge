CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(255),
    sku_code VARCHAR(255),
    price NUMERIC,
    quantity INTEGER
);