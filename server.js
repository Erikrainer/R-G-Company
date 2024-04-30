const express = require('express');

const promptUser = require("./logics/promptuser");

const roleInput = require("./logics/role");

const departmentInput = require("./logics/department");

const employeeInput = require("./logics/employee");

const objectsToTable = require("./logics/table");

const updateEmployee = require("./logics/updateemployee");

const managerUpdate = require("./logics/managerupdate");

const viewByManager = require("./logics/viewbymanager");

const viewByDepartment = require("./logics/viewbydepartment");

const pool = require("./logics/pool");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

  async function init() {

    const userInitInput = await promptUser();

    // bellow user choices
    // "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View All Employees","Update Employee Manager","View employee by Manager","View employee by Department", "Quit"
    if(userInitInput.landing === 'View All Employees'){
      pool.query(
        "SELECT  e.employee_id AS ID, e.first_name, e.last_name, r.title AS Title, d.name AS department, r.salary AS Salary, CASE  WHEN e.manager_id IS NOT NULL THEN CONCAT(m.first_name, ' ', m.last_name) ELSE NULL END AS Manager FROM employee AS e JOIN role AS r ON e.role_id = r.role_id JOIN department AS d ON r.department_id = d.department_id LEFT JOIN employee AS m ON e.manager_id = m.employee_id;", 
      (err, result) => {
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
      const userUpdateEmployee = await updateEmployee(); // Get user input
      const { newEmployeeSelection, newRoleSelection } = userUpdateEmployee;

      const updateQuery = {
        text: 'UPDATE employee set role_id = ($1) WHERE employee_id = ($2)',
        values: [newRoleSelection, newEmployeeSelection]
      };

      pool.query(updateQuery, (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Employee updated successfully!');
          init();
        }
      })

    }else if(userInitInput.landing === "View All Roles"){
      pool.query(
        'SELECT r.role_id AS id, r.title AS title, r.salary, d.name AS department FROM role AS r JOIN department AS d ON r.department_id = d.department_id;', 
        (err, result) => {
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
      const userRoleInput = await roleInput(); // Get user input
      const { newRole, newSalary, newRoleDepartment } = userRoleInput;
      const query = {
        text: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        values: [newRole, newSalary, newRoleDepartment]
      };
    
      pool.query(query, (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Role added successfully!');
          init();
        }});

    }else if(userInitInput.landing === "View All Departments"){
      pool.query('SELECT department_id AS id, name as Department FROM department', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
           const departmentTable = objectsToTable(result.rows);
            console.log(departmentTable);
            init();
        };
      });

    }else if(userInitInput.landing === "Add Department"){
      const userDepartmentInput = await departmentInput(); // Get user input
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

    }else if(userInitInput.landing === "Update Employee Manager"){
      const userManagerUpdate = await managerUpdate(); // Get user input
      const { newEmployeeSelection, newManagerSelection } = userManagerUpdate;

      const manageUpdateQuery = {
        text: 'UPDATE employee set manager_id = ($1) WHERE employee_id = ($2)',
        values: [newManagerSelection, newEmployeeSelection]
      }
      pool.query(manageUpdateQuery , (error, result) => {
        if(error){
          console.error("Error executing query", error);
        }else {
          console.log("Employee Manager Updated successfully!");
          init();
        }
      });

    }else if(userInitInput.landing === "View employee by Manager"){
     const managerView = await viewByManager();
     const { newmanagerView } = managerView;
      const viewByManagerMessage = {
        text:'SELECT employee_id AS employee_id, first_name || \' \' || last_name AS Employee_Name FROM employee WHERE manager_id = ($1);',
        values:[newmanagerView]
      }

    pool.query(viewByManagerMessage , (error, result) => {
      if(error){
        console.error("Error executing query", error);
      }else {
        if(result.rows.length === 0){
          console.log("No employees assigned for this manager yet!!");
          init();
        }else {
          const managerMessage = objectsToTable(result.rows);
          console.log(managerMessage);
          init();
        }
      }
    });

    }else if(userInitInput.landing === "View employee by Department"){
      const employeeDepartmentView = await viewByDepartment();
      const {newDepartmentView} = employeeDepartmentView;
      const viewByDepartmentMessage = {
        text: "SELECT e.employee_id, e.first_name || \' \' || e.last_name AS Employee_Name FROM employee e JOIN role r ON e.role_id = r.role_id JOIN department d ON r.department_id = d.department_id WHERE d.department_id = ($1);",
        values:[newDepartmentView]
      }
      pool.query(viewByDepartmentMessage , (error, result) => {
        if(error){
          console.error("Error executing query", error);
        }else {
          if(result.rows.length === 0){
            console.log("No employees assigned for this department yet!!");
            init();
          }else {
            const departmentMessage = objectsToTable(result.rows);
            console.log(departmentMessage);
            init();
          }
        }
      });
    
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