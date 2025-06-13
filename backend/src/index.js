require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const certDir = path.join(__dirname, '../cert/'); // Move up two levels to rootconsole.log(__dirname);
const keyPath = path.join(certDir, 'key.pem');
const certPath = path.join(certDir, 'cert.pem');

// Generate SSL certificates if they don't exist
// if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
//   console.log('Generating SSL certificate...');
//   fs.mkdirSync(certDir, { recursive: true });

//   execSync(`openssl req -x509 -newkey rsa:2048 -days 365 -nodes \
//     -keyout ${keyPath} -out ${certPath} -subj "/CN=ayal-ras"`, { stdio: 'inherit' });

//   console.log('SSL certificate generated at /cert');
// }

// Now start Fastify with HTTPS
const fastify = require('fastify')({
  logger: true,
  https: {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  },
});

const cors = require('@fastify/cors');

fastify.register(cors, {
  origin: "https://localhost:3000",
  methods: ['GET', 'POST', 'OPTIONS'], // Allow preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
  credentials: true, // Allow cookies or Authorization headers if needed
});

const authRoutes = require('./routes/auth');

// Register your routes
fastify.register(authRoutes);
fastify.get('/register', async (request, reply) => {
  return { message: 'registeration is working' };
});
fastify.get('/login', async (request, reply) => {
  return { message: 'login is working' };
});

fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('Server listening on 0.0.0.0:5000');
});

