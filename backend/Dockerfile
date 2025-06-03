FROM node:18

WORKDIR /app

COPY ./backend/package*.json ./

RUN apt update
RUN apt install sqlite3

RUN npm install
# RUN npm uninstall @fastify/cors
# RUN npm install fastify sqlite3 bcrypt jsonwebtoken dotenv @fastify/cors@6
RUN npm install fastify@4 @fastify/cors@8 sqlite3 bcrypt jsonwebtoken dotenv

COPY ./backend/ /app/

EXPOSE 5000

CMD ["node", "./src/index.js"]
