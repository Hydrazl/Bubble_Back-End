-- Active: 1756925329403@@127.0.0.1@3306

DROP DATABASE IF EXISTS bubble_db;
CREATE DATABASE IF NOT EXISTS bubble_db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'aluno';
FLUSH PRIVILEGES;
USE bubble_db;

SELECT * FROM posts;
SELECT banner FROM users;
DESCRIBE users;