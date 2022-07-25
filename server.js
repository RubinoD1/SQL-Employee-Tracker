//possibly remove express, test if needed later. **
const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const inputCheck = require('./utils/inputCheck');

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
    },
    console.log('Connected to the employee database.')
  );






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });