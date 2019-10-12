DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id VARCHAR(100),
    product_name VARCHAR(150),
    department_name VARCHAR(150),
    price DECIMAL(10, 8),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal1", "fruit loops", "groceries", 3.00, 10);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal2", "cheerios", "groceries", 3.25, 20);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal3", "fruity pebbles", "groceries", 3.50, 30);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal4", "apple jacks", "groceries", 3.75, 40);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal5", "honey crisp", "groceries", 4.00, 50);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal6", "lucky charms", "groceries", 4.25, 60);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal7", "frosted flakes", "groceries", 4.50, 70);
INSERT INTO products (item_id, product_name, deprtment_name, price, stock_quantity) VALUES
("cereal8", "rasin bran", "groceries", 4.75, 80);

USE bamazonDB;
SELECT * FROM products;