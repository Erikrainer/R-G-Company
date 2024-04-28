const inquirer = require("inquirer");

// EMPLOYEE INPUT 
const employeeInput = () => {
    return inquirer.prompt([
        {
            type:"input",
            name:"firstNameNewEmployee",
            message: "What is the employee`s first name ?",
        },
        {
            type:"input",
            name:"lastNameNewEmployee",
            message: "What is the employee`s last name ?",
        },
        {
            type:"list",
            name:"newEmployeeRole",
            message: "What is the employee`s role ?",
            choices:["ROLES HERE"]
        },
        {
            type:"list",
            name:"newEmployeeManager",
            message: "Who is the employee`s manager ?",
            choices:["EMPLOYEES HERE"]
        },
    ]);
};

module.exports = employeeInput;