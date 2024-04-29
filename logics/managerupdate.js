const inquirer = require("inquirer");

const pool = require("./pool");

const updateManager = () => {
  return new Promise((resolve, reject) => {       
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
            message: "Which employee`s manager do you want to update ?",
            choices: Object.keys(managers)
        },
        {
            type:"list",
            name:"managerSelection",
            message: "Which manager do you want to assign the selected employee ?",
            choices: Object.keys(managers)
        }
    ]).then(answers => {
        answers.newEmployeeSelection = managers[answers.employeeSelection];
        answers.newManagerSelection = managers[answers.managerSelection];
        resolve(answers);
      }).catch(reject);
})}
)};

module.exports = updateManager;