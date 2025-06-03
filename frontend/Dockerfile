FROM node:18

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install
# RUN npm uninstall @fastify/cors
RUN npm install -D vite tailwindcss @tailwindcss/vite postcss autoprefixer fastify@4 @fastify/cors@8

# RUN npm install fastify sqlite3 bcrypt jsonwebtoken dotenv @fastify/cors@6


COPY ./frontend/ .

EXPOSE 3000

RUN npm run build 
CMD ["npm", "run", "dev"]
