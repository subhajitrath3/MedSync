@echo off
REM Hugging Face Spaces Deployment Check Script for MedSync

echo ===============================================
echo 🏥 MedSync - Hugging Face Deployment Check
echo ===============================================
echo.

echo Checking required files...
echo.

set "all_files_exist=true"

if exist "Dockerfile" (
    echo   ✓ Dockerfile exists
) else (
    echo   ✗ Dockerfile is missing!
    set "all_files_exist=false"
)

if exist "start.sh" (
    echo   ✓ start.sh exists
) else (
    echo   ✗ start.sh is missing!
    set "all_files_exist=false"
)

if exist "nginx.conf" (
    echo   ✓ nginx.conf exists
) else (
    echo   ✗ nginx.conf is missing!
    set "all_files_exist=false"
)

if exist "app_config.yaml" (
    echo   ✓ app_config.yaml exists
) else (
    echo   ✗ app_config.yaml is missing!
    set "all_files_exist=false"
)

if exist ".dockerignore" (
    echo   ✓ .dockerignore exists
) else (
    echo   ✗ .dockerignore is missing!
    set "all_files_exist=false"
)

if exist "backend\package.json" (
    echo   ✓ backend\package.json exists
) else (
    echo   ✗ backend\package.json is missing!
    set "all_files_exist=false"
)

if exist "frontend\package.json" (
    echo   ✓ frontend\package.json exists
) else (
    echo   ✗ frontend\package.json is missing!
    set "all_files_exist=false"
)

echo.

if "%all_files_exist%"=="false" (
    echo ❌ Some required files are missing!
    echo Please create them before deployment.
    pause
    exit /b 1
)

echo ✅ All required files are present!
echo.

echo ===============================================
echo 📋 Environment Variables Checklist
echo ===============================================
echo Remember to set these in Hugging Face Spaces:
echo.
echo REQUIRED:
echo   - MONGODB_URI
echo   - JWT_SECRET
echo   - CLIENT_URL
echo.
echo OPTIONAL:
echo   - JWT_EXPIRE (default: 7d)
echo   - NODE_ENV (default: production)
echo   - PORT (default: 5000)
echo   - GROQ_API_KEY
echo   - CLOUDINARY_CLOUD_NAME
echo   - CLOUDINARY_API_KEY
echo   - CLOUDINARY_API_SECRET
echo.

echo ===============================================
echo 📦 Deployment Summary
echo ===============================================
echo   Platform: Hugging Face Spaces
echo   SDK: Docker
echo   Port: 7860
echo   Frontend: React + Vite (Nginx)
echo   Backend: Node.js + Express
echo   Database: MongoDB Atlas
echo.

echo ===============================================
echo 🚀 Next Steps
echo ===============================================
echo   1. Create Space on Hugging Face
echo   2. Choose Docker SDK
echo   3. Set up MongoDB Atlas
echo   4. Configure environment variables
echo   5. Push code to Space repository
echo   6. Wait for build
echo   7. Test deployment
echo.

echo 📚 See HUGGINGFACE_DEPLOYMENT.md for details
echo.
echo ✨ Ready to deploy!
echo.

pause
