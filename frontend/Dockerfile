FROM node:18

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install
RUN npm install -D vite

COPY ./frontend/ .

EXPOSE 5000

CMD ["npm", "run", "dev"]
