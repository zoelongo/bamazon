DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10, 8) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

USE bamazonDB;


INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("fruit loops", "groceries", 3.00, 10),
    ("cheerios", "groceries", 3.25, 20),
    ("fruity pebbles", "groceries", 3.50, 30),
    ("apple jacks", "groceries", 3.75, 40),
    ("honey crisp", "groceries", 4.00, 50),
    ("lucky charms", "groceries", 4.25, 60),
    ("frosted flakes", "groceries", 4.50, 70),
    ("rasin bran", "groceries", 4.75, 80);
    
SELECT * FROM products;