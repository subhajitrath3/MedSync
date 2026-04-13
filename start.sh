#!/bin/sh

# Start Nginx in the background
nginx

# Start the backend server
cd /app/backend
npm start
