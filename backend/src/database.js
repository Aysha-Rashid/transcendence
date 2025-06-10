
// import sqlite3 from sqlite
const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database('./sqlite3.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error('Database connection error:', err.message);
  console.log('Connected to SQLite database');
});

// to delete the user from the database
// const delet = () =>{
//   const del = `DELETE FROM users WHERE id = 2`;

//   db.run(del, (err) => {
//     if (err) console.error('Table creation error:', err.message);
//   });
// }
// delet();



// Initialize the database schema
const initDatabase = () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )`;
    db.run(sql, (err) => {
      if (err) console.error('Table creation error:', err.message);
    });
  };
  initDatabase();
  
  // Export database and utility functions
  module.exports = {
    db,
  };
  
  