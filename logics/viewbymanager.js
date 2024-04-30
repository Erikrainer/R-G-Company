const inquirer = require("inquirer");

const pool = require("./pool");

const viewByManager = () => {
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
            name:"managerView",
            message: "Which Manager do you want to select ?",
            choices: Object.keys(managers)
        }
    ]).then(answers => {
        answers.newmanagerView = managers[answers.managerView];
        resolve(answers);
      }).catch(reject);
})}
)};

module.exports = viewByManager;