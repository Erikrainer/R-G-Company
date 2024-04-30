const inquirer = require("inquirer");

const pool = require("./pool");

const viewByDepartment = () => {
  return new Promise((resolve, reject) => {       
      pool.query('SELECT department_id, name FROM department;', (err, departmentResult) => {
        if (err) {
          console.error('Error executing manager query', err);
          reject(err);
          return;
        }

        const departments = departmentResult.rows.reduce((acc, row) => {
            // Map manager name to ID
            acc[row.name] = row.department_id;
            return acc;
          }, {});

    return inquirer.prompt([
        {
            type:"list",
            name:"departmentView",
            message: "Which department do you want to select ?",
            choices: Object.keys(departments)
        }
    ]).then(answers => {
        answers.newDepartmentView = departments[answers.departmentView];
        resolve(answers);
      }).catch(reject);
})}
)};

module.exports = viewByDepartment;