const { db} = require('../database');
const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
  
// Helper to verify passwords
const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

async function authRoutes(fastify, options) {
  // Register a new user
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body;
    if (!username || !password) {
      return reply.code(400).send({ success: false, error: 'All fields are required' });
    }
  
    try {
      const hashed = await hashPassword(password);
      const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  
      // Wrap db.run in a Promise
      const userId = await new Promise((resolve, reject) => {
        db.run(sql, [username, hashed], function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
      });
  
      return reply.code(201).send({
        success: true,
        message: 'User registered successfully',
        user: {
          id: userId,
          username,
        },
      });
    } catch (err) {
      console.error('Registration failed:', err.message);
      return reply.code(400).send({ success: false, error: 'Username already taken or server error' });
    }
  });
  
  // Login existing user
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ success: false, error: 'Username and password are required' });
    }
    
    try {
      // Wrap db.get in a Promise (we use promise so that we can use await, without it, await wont work)
      const user = await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
  
      if (!user) {
        return reply.code(401).send({ success: false, error: 'Invalid username or password' });
      }
  
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return reply.code(401).send({ success: false, error: 'Invalid username or password' });
      }

      return reply.send({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (err) {
      console.error('Login error:', err.message);
      return reply.code(500).send({ success: false, error: 'Server error' });
    }
    });
}

module.exports = authRoutes;
