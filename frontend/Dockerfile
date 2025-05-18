# Stage 1: Build with Vite
FROM node:18 AS builder

WORKDIR /app

COPY ./frontend/src /app/src
COPY ./frontend/package*.json /app
COPY ./frontend/public/ /app/public
COPY ./frontend/index.html /app/

# COPY tsconfig.json ./
# COPY tailwind.config.js ./
# COPY postcss.config.js ./
# COPY vite.config.ts ./
# COPY index.html ./
# COPY ./src ./
# COPY . .

RUN npm install
RUN npm install vite
CMD ["npm", "run", "dev"]
# RUN npm run dev
# RUN npm run dev