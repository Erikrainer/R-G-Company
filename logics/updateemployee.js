const inquirer = require("inquirer");

const pool = require("./pool");

const updateEmployee = () => {
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

    return inquirer.prompt([
        {
            type:"list",
            name:"employeeSelection",
            message: "Which employee`s role do you want to update ?",
            choices: Object.keys(managers)
        },
        {
            type:"list",
            name:"roleSelection",
            message: "Which role do you want to assign the selected employee ?",
            choices: Object.keys(roles)
        }
    ]).then(answers => {
        answers.newEmployeeSelection = managers[answers.employeeSelection];
        answers.newRoleSelection = roles[answers.roleSelection];
        resolve(answers);
      }).catch(reject);
})}
)}
  )};

module.exports = updateEmployee;