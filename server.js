const express = require('express');

const promptUser = require("./logics/promptuser");

const roleInput = require("./logics/role");

const departmentInput = require("./logics/department");

const employeeInput = require("./logics/employee");

const objectsToTable = require("./logics/table");

const pool = require("./logics/pool");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

  async function init() {

    const userInitInput = await promptUser();

    // bellow user choices
    // "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"
    if(userInitInput.landing === 'View All Employees'){
      pool.query('SELECT * FROM employee', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
      } else {
        console.log(result.rows);
          const employeeTable = objectsToTable(result.rows);
          console.log(employeeTable);
          init();
      };
      });

    }else if (userInitInput.landing === "Add Employee") {
      const userEmployeeInput = await employeeInput(); // Get user input
      const { firstNameNewEmployee, lastNameNewEmployee, newEmployeeRoleId, newEmployeeManagerId } = userEmployeeInput;
      
      // Use parameterized query to avoid SQL injection
      const query = {
        text: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        values: [firstNameNewEmployee, lastNameNewEmployee, newEmployeeRoleId, newEmployeeManagerId]
      };
    
      pool.query(query, (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Employee added successfully!');
          init();
        }
      })
    }else if(userInitInput.landing === "Update Employee Role"){
      console.log("Update Employee Role");

    }else if(userInitInput.landing === "View All Roles"){
      pool.query('SELECT * FROM role', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
            console.log(result.rows)
            const roleTable = objectsToTable(result.rows);
            console.log(roleTable);
            init();
        };
      });

    }else if(userInitInput.landing === "Add Role"){
      console.log("Add Role");

    }else if(userInitInput.landing === "View All Departments"){
      pool.query('SELECT * FROM department', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
           const departmentTable = objectsToTable(result.rows);
            console.log(departmentTable);
            init();
        };
      });

    }else if(userInitInput.landing === "Add Department"){
      const userDepartmentInput = await departmentInput();
      const {newDepartment} = userDepartmentInput;
      const query = {
        text: 'INSERT INTO department (name) VALUES ($1)',
        values: [newDepartment]
      };
    
      pool.query(query, (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Department added successfully!');
          init();
        }});

    }else if(userInitInput.landing === "View All Employees"){
      console.log("View All Employees");

    }else{
      console.log("Thanks for using the RandGCompany system!!!");
      process.exit();
    }
  };

  init();

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {});