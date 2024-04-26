DROP DATABASE IF EXISTS randg_db

CREATE DATABASE randg_db;


CREATE TABLE department (
id SERIAL PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
departments_id INTEGER,
  FOREIGN KEY (departments_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INTEGER,
manager_id INTEGER REFERENCES manager(id), -- have to reference another employee that is the manager of the current employee, null if has no manager
  FOREIGN KEY (roles_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);
