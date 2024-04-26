const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: '135798',
      host: 'localhost',
      database: 'radng_db'
    },
    console.log(`Connected to the radng_db database.`)
  )

  pool.connect();