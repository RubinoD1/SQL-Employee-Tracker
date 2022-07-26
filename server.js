//possibly remove express, test if needed later. **
const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const startMenu = require('./utils/index');

const PORT = process.env.PORT || 3001;
const app = express();



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Ninteen84one!',
      database: 'employee'
    });
  //add SOURCE db/bb.sql query before startMenu to drop database ****
  db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the employee database.');
  
    startMenu();
  });



//Start menu, lists user options. 
const startMenu = () => {
  return inquirer.prompt({
      type: "list",
      //The choices are sorted by function view, add, update, and quit.
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Quit"
      ],
      message: "Select a option from the menu",
      name: "option"
    })
    .then(function(result) {
    //runs related function based on user input.   
      switch (result.option) {
        case "View departments":
          viewDepartment();
          //break is need in order to prevent the other functions from triggering. 
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
  });
};


const viewDepartment = () => {
  // selects the department table and displays all info
  let query = "SELECT * FROM department";
  db.query(query, function(err, res) {
    if (err) throw err;
    //use console.table to display results 
    console.table(res);
    //return to startMenu
    startMenu();
  });
};

const viewRoles = () => {
  // selects the role table and displays all info
  let query = "SELECT * FROM role";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewEmployees = () => {
  // selects the employee table and displays all info 
  let query = "SELECT * FROM employee";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

//adds department to department table
const addDepartment = () => {
  //inquirer question
  inquirer.prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "department",
      validate: departmentInput => {
        if(departmentInput) {
          return true;
        } else {
          console.log('A department name must be entered');
          return false;
        }
      }
})
.then(function(answer){
  //Insert into the department table the name of the new department an id will be auto-assigned 
  db.query("INSERT INTO department (name) VALUES (?)", [answer.department] , function(err, res) {
          if (err) throw err;
          console.log(answer.department + 'added to departments.');
          startMenu();
    })
  });
};

//adds role to role table 
const addRole = () => {
  inquirer.prompt([
      {
        type: "input",
        message: "Enter name of role",
        name: "roleTitle",
        validate: roleTitleInput => {
          if(roleTitleInput) {
            return true;
          } else {
            console.log('A name must be entered for the role');
            return false;
          }
        }
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "id",
      }
])
    .then(function(answer) {
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleTitle, answer.salary, answer.id], function(err, res) {
        if (err) throw err;
        console.log(answer.roleTitle + 'added to departments.');
        startMenu();
      });
    });
};

//adds employee to employee table
const addEmployee = () => {
  inquirer.prompt([
      {
        type: "input",
        message: "Enter the first name of the employee",
        name: "firstName",
        validate: firstNameInput => {
          if(firstNameInput) {
            return true;
          } else {
            console.log('A name must be entered for the employee');
            return false;
          }
        }
      },
      {
        type: "input",
        message: "Enter the last name of the employee",
        name: "lastName",
        validate: lastNameInput => {
          if(lastNameInput) {
            return true;
          } else {
            console.log('A last name must be entered for the employee');
            return false;
          }
        }
      },
      {
        type: "input",
        message: "Enter the employee's role id number",
        name: "roleId"
      },
      {
        type: "input",
        message: "Enter the manager id number",
        name: "managerId"
      }
    ])
    .then(function(answer) {

      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function(err, res) {
        if (err) throw err;
        console.log(answer.firstName + answer.lastName + ' added as a employee.');
        startMenu();
      });
    });
};

//updates a employee by sleceting them by id then changing the value of role based on user input.
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the id of the employee you would like to update",
        name: "employeeUpdate"
      },
      {
        type: "input",
        message: "Enter the new role",
        name: "updateRole"
      }
    ])
    .then(function(answer) {
   
      db.query('UPDATE employee SET role_id=? WHERE id= ?',[answer.updateRole, answer.employeeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
    });
};


//quits app 
const quit = () => {
  db.end();
  process.exit();
};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


