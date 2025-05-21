import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // allows external access to the container
    port: 3000,       // default port Vite uses
  }
});
