FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY ./frontend/package*.json ./

RUN npm install

# Install Tailwind CSS library and CLI
RUN npm install -D tailwindcss@3.4.1 @tailwindcss/postcss vite autoprefixer

# Copy the rest of the frontend files
COPY ./frontend/ .

COPY ./cert /app/cert/

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]
