const inquirer = require("inquirer");

// ROLE INPUT 
const roleInput = () => {
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
            choices:["DEPARTMENTS HERE"]
        }
    ]);
};


module.exports = roleInput;