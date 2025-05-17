# Step 1: Build the app
FROM node

# Set working directory inside container
WORKDIR /app

# Copy project files
# COPY package*.json ./
# COPY tsconfig.json ./
# COPY vite.config.* ./
# COPY src ./src
# COPY public ./public
# RUN docker run --rm -it \
#   -v "$PWD":/app \
#   -w /app \
#   node:18 \
#   npm init -y
  # Install dependencies
  RUN npm install
  
  # Build the project
  RUN npm run build


# ENTRYPOINT [ "npx", "create-vite", "." ]
