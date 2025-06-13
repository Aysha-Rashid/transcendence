FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY ./frontend/package*.json ./

RUN npm install

# Copy the rest of the frontend files
COPY ./frontend/ .

COPY ./cert /app/cert/

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]
