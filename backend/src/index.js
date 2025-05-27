require('dotenv').config();

const fastify = require('fastify')({ logger: true });

// fastify.register(require('@fastify/websocket'));

// fastify.register(require('./routes/auth'));
// fastify.register(require('./routes/websocket'));

fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('Server listening on 0.0.0.0:5000');
});