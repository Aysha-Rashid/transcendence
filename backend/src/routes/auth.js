const { db } = require('../database');
const bcrypt = require('bcrypt');
const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');

// Hash password function
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Verify password function
const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Create custom AJV instance with ajv-errors
const ajv = new Ajv({
  allErrors: true, // Collect all validation errors
});
ajvErrors(ajv);

// Define JSON Schema for registration
const registerSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        errorMessage: {
          minLength: 'Username must be at least 3 characters long',
          maxLength: 'Username must not exceed 20 characters',
        },
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: {
          minLength: 'Password must be at least 6 characters long',
        },
      },
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        username: 'Username is required',
        password: 'Password is required',
      },
      additionalProperties: 'No additional fields are allowed',
    },
  },
};

// Define JSON Schema for login
const loginSchema = {
 

 body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        errorMessage: {
          minLength: 'Username must be at least 3 characters long',
          maxLength: 'Username must not exceed 20 characters',
        },
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: {
          minLength: 'Password must be at least 6 characters long',
        },
      },
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        username: 'Username is required',
        password: 'Password is required',
      },
      additionalProperties: 'No additional fields are allowed',
    },
  },
};

async function authRoutes(fastify, options) {
  // Set custom AJV validator
  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });

  fastify.post('/api/register', { schema: registerSchema }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const hashed = await hashPassword(password);
      const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

      const userId = await new Promise((resolve, reject) => {
        db.run(sql, [username, hashed], function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
      });

      return reply.code(201).send({
        success: true,
        message: 'User registered successfully',
        user: { id: userId, username },
      });
    } catch (err) {
      fastify.log.error('Registration failed:', err.message);
      // console.log(err.message);
      if (err.code === 'SQLITE_CONSTRAINT') {
        return reply.code(409).send({ success: false, error: 'Username already taken' });
      }
      return reply.code(500).send({ success: false, error: 'Something went wrong on our end, please try again later' });
    }
  });

  fastify.post('/api/login', { schema: loginSchema }, async (request, reply) => {
    const { username, password } = request.body;

    try {
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
        user: { id: user.id, username: user.username },
      });
    } catch (err) {
      fastify.log.error('Login failed:', err.message);
      return reply.code(500).send({ success: false, error: 'Something went wrong on our end, please try again later' });
    }
  });
}

module.exports = authRoutes;