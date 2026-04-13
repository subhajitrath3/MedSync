@echo off
REM MedSync Deployment Verification Script
echo.
echo ========================================
echo   MedSync Deployment Verification
echo ========================================
echo.

set SUCCESS=0
set WARNINGS=0
set ERRORS=0

REM Check Node.js
echo [1/10] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js installed
    node -v
    set /a SUCCESS+=1
) else (
    echo [ERROR] Node.js not installed
    set /a ERRORS+=1
)

REM Check NPM
echo.
echo [2/10] Checking NPM...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] NPM installed
    npm -v
    set /a SUCCESS+=1
) else (
    echo [ERROR] NPM not installed
    set /a ERRORS+=1
)

REM Check Backend Dependencies
echo.
echo [3/10] Checking backend dependencies...
if exist "backend\node_modules" (
    echo [OK] Backend dependencies installed
    set /a SUCCESS+=1
) else (
    echo [WARNING] Backend dependencies not installed
    echo Run: cd backend ^&^& npm install
    set /a WARNINGS+=1
)

REM Check Frontend Dependencies
echo.
echo [4/10] Checking frontend dependencies...
if exist "frontend\node_modules" (
    echo [OK] Frontend dependencies installed
    set /a SUCCESS+=1
) else (
    echo [WARNING] Frontend dependencies not installed
    echo Run: cd frontend ^&^& npm install
    set /a WARNINGS+=1
)

REM Check Backend .env
echo.
echo [5/10] Checking backend environment file...
if exist "backend\.env" (
    echo [OK] Backend .env file exists
    set /a SUCCESS+=1
) else (
    echo [WARNING] backend\.env not found
    echo Copy backend\.env.production to backend\.env and configure
    set /a WARNINGS+=1
)

REM Check Frontend .env
echo.
echo [6/10] Checking frontend environment file...
if exist "frontend\.env" (
    echo [OK] Frontend .env file exists
    set /a SUCCESS+=1
) else if exist "frontend\.env.production" (
    echo [WARNING] Using .env.production (create .env for development)
    set /a WARNINGS+=1
) else (
    echo [WARNING] frontend\.env not found
    echo Copy frontend\.env.production to frontend\.env and configure
    set /a WARNINGS+=1
)

REM Check Docker
echo.
echo [7/10] Checking Docker...
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Docker installed
    docker --version
    set /a SUCCESS+=1
) else (
    echo [INFO] Docker not installed (optional)
)

REM Check Deployment Files
echo.
echo [8/10] Checking deployment files...
if exist "docker-compose.yml" (
    echo [OK] docker-compose.yml exists
)
if exist "backend\Dockerfile" (
    echo [OK] Backend Dockerfile exists
)
if exist "frontend\Dockerfile" (
    echo [OK] Frontend Dockerfile exists
)
if exist "DEPLOYMENT_GUIDE.md" (
    echo [OK] Deployment guide exists
)
set /a SUCCESS+=1

REM Check Documentation
echo.
echo [9/10] Checking documentation...
if exist "README.md" (
    echo [OK] README.md exists
)
if exist "DEPLOYMENT_GUIDE.md" (
    echo [OK] DEPLOYMENT_GUIDE.md exists
)
if exist "GROQ_AI_INTEGRATION.md" (
    echo [OK] GROQ_AI_INTEGRATION.md exists
)
if exist "DEPLOYMENT_CHECKLIST.md" (
    echo [OK] DEPLOYMENT_CHECKLIST.md exists
)
set /a SUCCESS+=1

REM Check Git
echo.
echo [10/10] Checking Git repository...
if exist ".git" (
    echo [OK] Git repository initialized
    set /a SUCCESS+=1
) else (
    echo [INFO] Not a git repository
    echo Run: git init
)

REM Summary
echo.
echo ========================================
echo   Verification Summary
echo ========================================
echo [SUCCESS] %SUCCESS% checks passed
echo [WARNING] %WARNINGS% warnings
echo [ERROR] %ERRORS% errors
echo.

if %ERRORS% GTR 0 (
    echo [RESULT] Fix errors before deployment
    exit /b 1
) else if %WARNINGS% GTR 0 (
    echo [RESULT] Review warnings before deployment
) else (
    echo [RESULT] All checks passed! Ready for deployment
)

echo.
echo Next Steps:
echo 1. Configure environment variables
echo 2. Review DEPLOYMENT_CHECKLIST.md
echo 3. Run build.bat to create production build
echo 4. Follow DEPLOYMENT_GUIDE.md for deployment
echo.
pause
