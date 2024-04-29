const inquirer = require("inquirer");

const pool = require("./pool");

// ROLE INPUT 
const roleInput = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT department_id, name FROM department;', (err, departmentResult) => {
          if (err) {
            console.error('Error executing role query', err);
            reject(err);
            return;
          }
    
          const departments = departmentResult.rows.reduce((acc, row) => {
            // Map department name to ID
            acc[row.name] = row.department_id;
            return acc;
          }, {});

    return inquirer.prompt([
        {
            type:"input",
            name:"newRole",
            message: "What is the name of the role ?",
        },
        {
            type:"input",
            name:"newSalary",
            message: "What is the salary of the role ?",
        },
        {
            type:"list",
            name:"roleDepartment",
            message: "Which department does the role belong to ?",
            choices: Object.keys(departments)
        }
    ]).then(answers => {
        // Map selected department
        answers.newRoleDepartment = departments[answers.roleDepartment];
        resolve(answers);
      }).catch(reject);
}
)}
)};


module.exports = roleInput;