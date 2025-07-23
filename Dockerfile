# Stage 1: Build the React/Vite app
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built app to Nginx’s html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Remove default Nginx config if needed
RUN rm /etc/nginx/conf.d/default.conf

# Copy your own custom Nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
