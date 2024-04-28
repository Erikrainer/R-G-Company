const inquirer = require("inquirer");

// DEPARTMENT INPUT 
const departmentInput = () => {
    return inquirer.prompt([
        {
            type:"input",
            name:"newDepartment",
            message: "What is the name of the department ?",
        }
    ]);
};


module.exports = departmentInput;