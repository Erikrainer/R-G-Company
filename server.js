const express = require('express');

const promptUser = require("./logics/promptuser");

const roleInput = require("./logics/role");

const departmentInput = require("./logics/department");

const employeeInput = require("./logics/employee");

require('dotenv').config();

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
const pool = new Pool(
    {
    user: process.env.USER,
    password: process.env.PASSWORD,    
    host: process.env.HOST,
    database: process.env.DATABASE,  
    },
    console.log(`Connected to the randg_db database.`)
  )

  pool.connect();

  // async init() {
  //   const userInitInput = await promptUser();
  //   // bellow user choices
  //   // "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"
  //   await "OPEN THE FUNCTION";
  // };

  pool.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  }
  });
  pool.query('SELECT * FROM role', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  };
  });
  pool.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  }
  });

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });