DROP DATABASE IF EXISTS randg_db

CREATE DATABASE randg_db;


CREATE TABLE department (
department_id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
role_id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER,
  FOREIGN KEY (department_id)
  REFERENCES department(department_id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
employee_id SERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(role_id)
  ON DELETE SET NULL
manager_id INTEGER, -- have to reference another employee that is the manager of the current employee, null if has no manager
  FOREIGN KEY (manager_id)
  REFERENCES department(department_id)
  ON DELETE SET NULL
);
