require('dotenv').config();

const fastify = require('fastify')({ logger: true });

// fastify.register(require('@fastify/websocket'));

// fastify.register(require('./routes/auth'));
// fastify.register(require('./routes/websocket'));

const cors = require('@fastify/cors');

// Register the CORS plugin BEFORE routes
fastify.register(cors, {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow preflight requests
});

const authRoutes = require('./routes/auth');

// Register your routes
fastify.register(authRoutes);
fastify.get('/', async (request, reply) => {
  return { message: 'API is working' };
});


fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('Server listening on 0.0.0.0:5000');
});

