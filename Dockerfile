# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the webpack bundle
RUN npm run start

# Update HTML with the hashed filename
RUN HASH=$(ls dist/chess-puzzle-player.*.js | sed 's/.*chess-puzzle-player\.\(.*\)\.js/\1/') && \
    sed -i "s/chess-puzzle-player\.HASH\.js/chess-puzzle-player.${HASH}.js/" index.html

# Production stage
FROM nginx:alpine

# Copy static files to nginx
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/dist /usr/share/nginx/html/dist/
COPY --from=builder /app/node_modules/cm-chessboard/assets /usr/share/nginx/html/node_modules/cm-chessboard/assets/
COPY --from=builder /app/problems.json /usr/share/nginx/html/

# Copy nginx config for SPA support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
