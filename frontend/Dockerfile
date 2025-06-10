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

# Initialize Tailwind CSS configuration using the CLI
RUN npx tailwindcss@3.4.1 init

EXPOSE 3000

# Build CSS
RUN npm run build:css

CMD ["npm", "run", "dev"]