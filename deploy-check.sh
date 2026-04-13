#!/bin/bash

# Hugging Face Spaces Deployment Script for MedSync

echo "🏥 MedSync - Hugging Face Deployment Preparation"
echo "================================================"

# Check if required files exist
echo ""
echo "✅ Checking required files..."

required_files=(
    "Dockerfile"
    "start.sh"
    "nginx.conf"
    "app_config.yaml"
    ".dockerignore"
    "backend/package.json"
    "frontend/package.json"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file is missing!"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo ""
    echo "❌ Some required files are missing. Please create them first."
    exit 1
fi

echo ""
echo "✅ All required files are present!"

# Check for environment variables
echo ""
echo "📋 Environment Variables Checklist:"
echo "  Remember to set these in Hugging Face Spaces settings:"
echo "  - MONGODB_URI (Required)"
echo "  - JWT_SECRET (Required)"
echo "  - JWT_EXPIRE (Optional, default: 7d)"
echo "  - NODE_ENV (Optional, default: production)"
echo "  - PORT (Optional, default: 5000)"
echo "  - CLIENT_URL (Required, your Space URL)"
echo "  - GROQ_API_KEY (Optional, for AI features)"
echo "  - CLOUDINARY_* (Optional, for image uploads)"

# Create a deployment summary
echo ""
echo "📦 Deployment Summary:"
echo "  - Platform: Hugging Face Spaces"
echo "  - SDK: Docker"
echo "  - Port: 7860"
echo "  - Frontend: React + Vite (served via Nginx)"
echo "  - Backend: Node.js + Express (Port 5000)"
echo "  - Database: MongoDB Atlas (external)"

echo ""
echo "🚀 Next Steps:"
echo "  1. Create a new Space on Hugging Face"
echo "  2. Choose 'Docker' as the SDK"
echo "  3. Set up MongoDB Atlas database"
echo "  4. Configure environment variables in Space settings"
echo "  5. Push your code to the Space repository"
echo "  6. Wait for the build to complete"
echo "  7. Test your deployment"

echo ""
echo "📚 For detailed instructions, see: HUGGINGFACE_DEPLOYMENT.md"
echo ""
echo "✨ Ready to deploy to Hugging Face Spaces!"
