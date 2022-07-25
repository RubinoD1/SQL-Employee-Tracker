//possibly remove express, test if needed later. **
const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const startMenu = require('./utils/startMenu');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


function viewDepartment() {
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

function viewRoles() {
  // selects the role table and displays all info
  let query = "SELECT * FROM role";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

function viewEmployees() {
  // selects the employee table and displays all info 
  let query = "SELECT * FROM employee";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};











app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


