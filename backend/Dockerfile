FROM node:18

WORKDIR /app

COPY ./backend/package*.json ./

RUN apt-get update && apt-get install -y openssl sqlite3

RUN npm install

COPY ./backend/ ./

COPY ./cert /app/cert/

EXPOSE 5000

CMD ["node", "./src/index.js"]
