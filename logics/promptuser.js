const inquirer = require("inquirer");

const presentationText = `
                                                                                               
dddddddd                    
RRRRRRRRRRRRRRRRR                                                  d::::::d       GGGGGGGGGGGGG
R::::::::::::::::R                                                 d::::::d    GGG::::::::::::G
R::::::RRRRRR:::::R                                                d::::::d  GG:::::::::::::::G
RR:::::R     R:::::R                                               d:::::d  G:::::GGGGGGGG::::G
  R::::R     R:::::R  aaaaaaaaaaaaa  nnnn  nnnnnnnn        ddddddddd:::::d G:::::G       GGGGGG
  R::::R     R:::::R  a::::::::::::a n:::nn::::::::nn    dd::::::::::::::dG:::::G              
  R::::RRRRRR:::::R   aaaaaaaaa:::::an::::::::::::::nn  d::::::::::::::::dG:::::G              
  R:::::::::::::RR             a::::ann:::::::::::::::nd:::::::ddddd:::::dG:::::G    GGGGGGGGGG
  R::::RRRRRR:::::R     aaaaaaa:::::a  n:::::nnnn:::::nd::::::d    d:::::dG:::::G    G::::::::G
  R::::R     R:::::R  aa::::::::::::a  n::::n    n::::nd:::::d     d:::::dG:::::G    GGGGG::::G
  R::::R     R:::::R a::::aaaa::::::a  n::::n    n::::nd:::::d     d:::::dG:::::G        G::::G
  R::::R     R:::::Ra::::a    a:::::a  n::::n    n::::nd:::::d     d:::::d G:::::G       G::::G
RR:::::R     R:::::Ra::::a    a:::::a  n::::n    n::::nd::::::ddddd::::::dd G:::::GGGGGGGG::::G
R::::::R     R:::::Ra:::::aaaa::::::a  n::::n    n::::n d:::::::::::::::::d  GG:::::::::::::::G
R::::::R     R:::::R a::::::::::aa:::a n::::n    n::::n  d:::::::::ddd::::d    GGG::::::GGG:::G
RRRRRRRR     RRRRRRR  aaaaaaaaaa  aaaa nnnnnn    nnnnnn   ddddddddd   ddddd       GGGGGG   GGGG

`
console.log(presentationText);
const promptUser = () => {

    return inquirer.prompt([
        {
            type:"list",
            name:"landing",
            message: "What would you like to do ?",
            choices:["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Update Employee Manager","View employee by Manager", "View employee by Department", "Quit"]
        }
    ]);
};

module.exports = promptUser;