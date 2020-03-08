DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_unique INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100),
    department_name VARCHAR
    (100),
    price INT,
    stock_quantity INT,
    PRIMARY KEY
    (item_unique)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES("Colgate Total Whitening", "Personal Care", 3, 20),
        ("Cerave Moisturizing Cream 19oz", "Beauty", 13, 9),
        ("Iphone 8", "Electronics", 700, 15),
        ("Organic Valley Milk 2%, 1 Gallon", "Food", 7, 17 ),
        ("Jif Creamy Peanut Butter", "Food", 4, 35),
        ("Oroweat Potato Bread", "Food", 3, 55),
        ("Hanes White T-Shirt Medium", "Clothes & Shoes", 12, 45),
        ("NBA Spalding Basketball Full Size", "Sports", 120, 23),
        ("L.A. Dodgers Hat", "Clothes & Shoes", 15, 75),
        ("Oral B Glide Floss", "Personal Care", 5, 53);

    SELECT *
    FROM products;

    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name  VARCHAR
        (100) NOT NULL,
    over_head_costs DECIMAL
        (10, 2) NOT NULL,
    PRIMARY KEY
        (department_id)
);


        ALTER products
        ADD product_sales DECIMAL
        (10, 2)

        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES(Electronics, 400);

        SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, (p.product_sales - d.over_head_costs) AS total_profits
        FROM products AS p INNER JOIN departments AS d ON p.department_name = d.department_name
        GROUP BY d.department_name;
