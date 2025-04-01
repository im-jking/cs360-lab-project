-- Step 1: Create the database
CREATE DATABASE shopdb;

-- Step 2: Use the database
USE shopdb;

-- Step 3: Create Users table
CREATE TABLE Users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100),
    datetime_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    funds INT,
    is_admin BOOLEAN
);

-- Step 4: Create Products table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price INT,
    in_stock INT,
    datetime_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 5: Create Orders table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    purchaser_email VARCHAR(100),
    product_id INT,
    FOREIGN KEY (purchaser_email) REFERENCES Users(email),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
