FROM node:18

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install
RUN npm install -D vite tailwindcss postcss autoprefixer

COPY ./frontend/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]
