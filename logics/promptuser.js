const inquirer = require("inquirer");

let landingChoices = `"View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"`;

const promptUser = () => {
    return inquirer.prompt([
        {
            type:"list",
            name:"landing",
            message: "What would you like to do ?",
            choices:[landingChoices]
        }
    ]);
};

module.exports = promptUser;