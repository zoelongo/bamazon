DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER(11) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10, 8) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

USE bamazonDB;
SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, `fruit loops`, `groceries`, 3.00, 10),
    (2, `cheerios`, `groceries`, 3.25, 20),
    (3, `fruity pebbles`, `groceries`, 3.50, 30),
    (4, `apple jacks`, `groceries`, 3.75, 40),
    (5, `honey crisp`, `groceries`, 4.00, 50),
    (6, `lucky charms`, `groceries`, 4.25, 60),
    (7, `frosted flakes`, `groceries`, 4.50, 70),
    (8, `rasin bran`, `groceries`, 4.75, 80);
