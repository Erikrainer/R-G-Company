const inquirer = require("inquirer");

const promptUser = () => {
    return inquirer.prompt([
        {
            type:"list",
            name:"landing",
            message: "What would you like to do ?",
            choices:["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        }
    ]);
};
promptUser();
module.exports = promptUser;


// DEPARTMENT INPUT 
// const promptUser = () => {
//     return inquirer.prompt([
//         {
//             type:"input",
//             name:"newDepartment",
//             message: "What is the name of the department ?",
//         }
//     ]);
// };

// ROLE INPUT 
// const promptUser = () => {
//     return inquirer.prompt([
//         {
//             type:"input",
//             name:"newRole",
//             message: "What is the name of the role ?",
//         },
//         {
//             type:"input",
//             name:"newSalary",
//             message: "What is the salary of the role ?",
//         },
//         {
//             type:"list",
//             name:"roleDepartment",
//             message: "Which department does the role belong to ?",
//             choices:[DEPARTMENTS HERE]
//         }
//     ]);
// };

// EMPLOYEE INPUT 
// const promptUser = () => {
//     return inquirer.prompt([
//         {
//             type:"input",
//             name:"firstNameNewEmployee",
//             message: "What is the employee`s first name ?",
//         },
//         {
//             type:"input",
//             name:"lastNameNewEmployee",
//             message: "What is the employee`s last name ?",
//         },
//         {
//             type:"list",
//             name:"newEmployeeRole",
//             message: "What is the employee`s role ?",
//             choices:[ROLES HERE]
//         },
//         {
//             type:"list",
//             name:"newEmployeeManager",
//             message: "Who is the employee`s manager ?",
//             choices:[EMPLOYEES HERE]
//         },
//     ]);
// };