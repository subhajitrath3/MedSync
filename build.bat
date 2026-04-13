@echo off
REM MedSync Production Build Script for Windows
REM This script builds both frontend and backend for production deployment

echo.
echo ========================================
echo   MedSync Production Build
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo [INFO] Node.js version:
node -v
echo [INFO] NPM version:
npm -v
echo.

REM Build Backend
echo ========================================
echo   Building Backend...
echo ========================================
cd backend

echo [INFO] Installing backend dependencies...
call npm install --production

REM Check if .env exists
if not exist .env (
    echo [WARNING] backend/.env file not found!
    echo Please create .env file using .env.production as template
)

echo [SUCCESS] Backend build complete
cd ..

REM Build Frontend
echo.
echo ========================================
echo   Building Frontend...
echo ========================================
cd frontend

echo [INFO] Installing frontend dependencies...
call npm install

echo [INFO] Building production bundle...
call npm run build

REM Check if .env.production exists
if not exist .env.production (
    echo [WARNING] frontend/.env.production file not found!
    echo Please create .env.production file with your production settings
)

echo [SUCCESS] Frontend build complete
echo [SUCCESS] Build output: frontend/dist/
cd ..

echo.
echo ========================================
echo   Build Completed Successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Configure environment variables
echo 2. Deploy backend to your hosting service
echo 3. Deploy frontend/dist to static hosting
echo 4. Update CORS settings with production domain
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
