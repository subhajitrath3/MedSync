#!/bin/bash

# MedSync Production Build Script
# This script builds both frontend and backend for production deployment

set -e  # Exit on error

echo "🚀 Starting MedSync Production Build..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Node.js version: $(node -v)${NC}"
echo -e "${BLUE}📦 NPM version: $(npm -v)${NC}"
echo ""

# Build Backend
echo -e "${BLUE}🔨 Building Backend...${NC}"
cd backend

# Install production dependencies
echo "Installing backend dependencies..."
npm install --production

# Verify .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}⚠️  Warning: backend/.env file not found!${NC}"
    echo "Please create .env file using .env.production as template"
fi

echo -e "${GREEN}✅ Backend build complete${NC}"
cd ..

# Build Frontend
echo ""
echo -e "${BLUE}🔨 Building Frontend...${NC}"
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Build production bundle
echo "Building production bundle..."
npm run build

# Verify .env.production file exists
if [ ! -f .env.production ]; then
    echo -e "${RED}⚠️  Warning: frontend/.env.production file not found!${NC}"
    echo "Please create .env.production file with your production settings"
fi

echo -e "${GREEN}✅ Frontend build complete${NC}"
echo -e "${GREEN}✅ Build output: frontend/dist/${NC}"
cd ..

echo ""
echo -e "${GREEN}🎉 Production build completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure environment variables"
echo "2. Deploy backend to your hosting service (Render, Heroku, Railway, etc.)"
echo "3. Deploy frontend/dist to static hosting (Vercel, Netlify, etc.)"
echo "4. Update CORS settings with your production domain"
echo ""
echo "See DEPLOYMENT_GUIDE.md for detailed instructions"
