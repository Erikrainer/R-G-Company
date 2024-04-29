const inquirer = require("inquirer");
const pool = require("./pool");

// EMPLOYEE INPUT 
const employeeInput = () => {
  return new Promise((resolve, reject) => {
    // Query to retrieve the list of roles from the database
    pool.query('SELECT role_id, title FROM role;', (err, roleResult) => {
      if (err) {
        console.error('Error executing query', err);
        reject(err);
        return;
      }

      // Extract role titles from the query result
      const roles = roleResult.rows.map(row => ({
        name: row.title,
        value: row.role_id
      }));

      // Query to retrieve the list of manager names from the database
      pool.query('SELECT first_name || \' \' || last_name AS full_name FROM employee;', (err, managerResult) => {
        if (err) {
          console.error('Error executing query', err);
          reject(err);
          return;
        }

        const managerNames = managerResult.rows.map(row => row.full_name);

        inquirer.prompt([
          {
            type: "input",
            name: "firstNameNewEmployee",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastNameNewEmployee",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "newEmployeeRole",
            message: "What is the employee's role?",
            choices: roles
          },
          {
            type: "list",
            name: "newEmployeeManager",
            message: "Who is the employee's manager?",
            choices: managerNames
          },
        ]).then(answers => {
          resolve(answers);
        }).catch(reject);
      });
    });
  });
};

module.exports = employeeInput;
