# 1. Base image
FROM node:18-alpine AS build

# 2. Set working directory
WORKDIR /app

# 3. Copy project files
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY . .

# 4. Install dependencies
RUN npm install

# 5. Build the app
RUN npm run build

# 6. Serve using nginx
FROM nginx:alpine AS production

# 7. Copy built assets to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# 8. Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# 9. Expose port and start server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
