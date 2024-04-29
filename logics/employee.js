const inquirer = require("inquirer");

const pool = require("./pool");

// EMPLOYEE INPUT 
const employeeInput = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT role_id, title FROM role;', (err, roleResult) => {
      if (err) {
        console.error('Error executing role query', err);
        reject(err);
        return;
      }

      const roles = roleResult.rows.reduce((acc, row) => {
        // Map role title to ID
        acc[row.title] = row.role_id;
        return acc;
      }, {});

      pool.query('SELECT employee_id, first_name || \' \' || last_name AS full_name FROM employee;', (err, managerResult) => {
        if (err) {
          console.error('Error executing manager query', err);
          reject(err);
          return;
        }

        const managers = managerResult.rows.reduce((acc, row) => {
          // Map manager name to ID
          acc[row.full_name] = row.employee_id;
          return acc;
        }, {});

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
            choices: Object.keys(roles) // Use role titles as choices
          },
          {
            type: "list",
            name: "newEmployeeManager",
            message: "Who is the employee's manager?",
            choices: Object.keys(managers) // Use manager names as choices
          },
        ]).then(answers => {
          // Map selected role and manager name to IDs before resolving
          answers.newEmployeeRoleId = roles[answers.newEmployeeRole];
          answers.newEmployeeManagerId = managers[answers.newEmployeeManager];
          resolve(answers);
        }).catch(reject);
      });
    });
  });
};


module.exports = employeeInput;
