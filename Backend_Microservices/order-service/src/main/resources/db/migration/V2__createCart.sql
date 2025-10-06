CREATE TABLE cart (
    id BIGSERIAL PRIMARY KEY,
    email varchar(255),
    product_id varchar(255) NOT NULL,
    sku_code varchar(255),
    name varchar(255),
    image_id varchar(255),
    description varchar(500),
    price NUMERIC,
    quantity int DEFAULT 1
);