# Multi-stage Dockerfile for Hugging Face Spaces
FROM node:20-alpine as frontend-builder

# Build Frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend Stage
FROM node:20-alpine

# Install nginx for serving frontend
RUN apk add --no-cache nginx

# Set working directory for backend
WORKDIR /app/backend

# Copy backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend/ ./

# Copy built frontend to nginx directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create necessary directories
RUN mkdir -p /app/backend/uploads /run/nginx /var/log/nginx

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start both services
CMD ["/start.sh"]
