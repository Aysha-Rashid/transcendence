
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Initialize SQLite database
const db = new sqlite3.Database('./sqlite3.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error('Database connection error:', err.message);
  console.log('Connected to SQLite database');
});

// Initialize the database schema
const initDatabase = () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
  )`;
  db.run(sql, (err) => {
    if (err) console.error('Table creation error:', err.message);
  });
};

// Run the initialization
initDatabase();

const insertUser = () => {
  const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  db.run(sql, ['dgfdgfh', 'fdhgfhgfh', 'dfgfhgfh'], (err) => {
    if (err) console.error('Insert error:', err.message);
  });
};

insertUser();


// Helper to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Helper to verify passwords
const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Export database and utility functions
module.exports = {
  db,
  hashPassword,
  verifyPassword,
};

// require('dotenv').config();

// const fastify = require('fastify')({ logger: true });

// // fastify.register(require('@fastify/websocket'));

// // fastify.register(require('./routes/auth'));
// // fastify.register(require('./routes/websocket'));

// fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   fastify.log.info('Server listening on 0.0.0.0:5000');
// });