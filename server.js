const express = require('express');
const mysql = require('mysql2');

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


//return all data from employee table
app.get('/api/employee', (req, res) => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

/*
//Get a single employee based on their id 
//temporarily hardcoded a id value of 1 for testing **
db.query(`SELECT * FROM employee WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});
*/

/*
// Delete a employee **set to a mock value of 1 for testing ** 
db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
*/

/*
//Create a employee
const sql = `INSERT INTO employee (first_name, last_name) 
              VALUES (?,?)`;
const params = ['Daniel', 'Rubino'];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
*/


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });