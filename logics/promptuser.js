const inquirer = require("inquirer");

const promptUser = () => {
    return inquirer.prompt([
        {
            type:"list",
            name:"landing",
            message: "What would you like to do ?",
            choices:["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Update Employee Manager", "Quit"]
        }
    ]);
};

module.exports = promptUser;