# Create database script for Berties books

# Create the database
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

# Create the tables
CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    price  DECIMAL(5, 2),
    PRIMARY KEY(id));


# Create the tables
CREATE TABLE IF NOT EXISTS users (
    id     INT AUTO_INCREMENT,
    first_name   CHAR(50),
    last_name    CHAR(50),
    email        CHAR(255),
    username     CHAR(30),
    password     VARCHAR(60),
    PRIMARY KEY(id));

# Create the application user
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON berties_books.* TO ' berties_books_app'@'localhost';
