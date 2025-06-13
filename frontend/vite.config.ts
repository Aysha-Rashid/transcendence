import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // allows external access to the container
    port: 3000,       // default port Vite uses
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    },
    publicDir: 'dist',
    proxy: {
      '/api': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false, // Allows self-signed certificates
        ws: true, // Enable WebSocket support if needed
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],    
    },
  },
});
