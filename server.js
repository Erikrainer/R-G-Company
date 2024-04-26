const express = require('express');

const promptUser = require("./logics/promptuser");

require('dotenv').config();

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
const pool = new Pool(
    {
    user: process.env.USER,
    password: process.env.PASSWORD,    
    host: process.env.HOST,
    database: process.env.DATABASE,  
    },
    console.log(`Connected to the randg_db database.`)
  )

  pool.connect();

  pool.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  }
  });
  pool.query('SELECT * FROM role', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  };
  });
  pool.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
  } else {
      console.log(result.rows);
  }
  });

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });