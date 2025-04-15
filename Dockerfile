# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies without running scripts
RUN npm install --ignore-scripts

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Start the server by directly running the built file to ensure pure JSON output
CMD ["node", "build/index.js"]
