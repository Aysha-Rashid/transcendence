FROM node:18


WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y openssl sqlite3

RUN npm install fastify@4 @fastify/cors@8 sqlite3 bcrypt jsonwebtoken dotenv openssl

COPY ./backend/ ./

COPY ./cert /app/cert/

EXPOSE 5000

CMD ["node", "./src/index.js"]
