FROM node:18

WORKDIR /app

COPY ./backend/package*.json ./

RUN apt update

RUN npm install
RUN npm install fastify sqlite3 bcrypt jsonwebtoken dotenv

COPY ./backend/ /app/

EXPOSE 5000

CMD ["node", "./src/database.js"]
