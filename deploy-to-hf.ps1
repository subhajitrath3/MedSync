# MedSync Hugging Face Deployment Script
# Run this script to deploy your application to Hugging Face Spaces

Write-Host "🚀 MedSync Hugging Face Deployment Helper" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git is installed" -ForegroundColor Green

# Prompt for Hugging Face username and space name
Write-Host ""
Write-Host "📝 Enter your Hugging Face details:" -ForegroundColor Yellow
$hfUsername = Read-Host "Hugging Face Username"
$spaceName = Read-Host "Space Name (e.g., medsync)"

if ([string]::IsNullOrWhiteSpace($hfUsername) -or [string]::IsNullOrWhiteSpace($spaceName)) {
    Write-Host "❌ Username and Space Name are required!" -ForegroundColor Red
    exit 1
}

$spaceUrl = "https://huggingface.co/spaces/$hfUsername/$spaceName"
$gitUrl = "https://huggingface.co/spaces/$hfUsername/$spaceName.git"

Write-Host ""
Write-Host "🎯 Deployment Target:" -ForegroundColor Cyan
Write-Host "   Space URL: $spaceUrl" -ForegroundColor White
Write-Host "   Git URL: $gitUrl" -ForegroundColor White
Write-Host ""

# Ask if space already exists
Write-Host "❓ Have you already created the Space on Hugging Face?" -ForegroundColor Yellow
Write-Host "   If not, go to: https://huggingface.co/new-space" -ForegroundColor Gray
$spaceExists = Read-Host "Space exists? (y/n)"

if ($spaceExists -ne 'y' -and $spaceExists -ne 'Y') {
    Write-Host ""
    Write-Host "📋 Create your Space first:" -ForegroundColor Yellow
    Write-Host "   1. Go to: https://huggingface.co/new-space" -ForegroundColor White
    Write-Host "   2. Space name: $spaceName" -ForegroundColor White
    Write-Host "   3. SDK: Select 'Docker'" -ForegroundColor White
    Write-Host "   4. Hardware: CPU basic (free)" -ForegroundColor White
    Write-Host "   5. Click 'Create Space'" -ForegroundColor White
    Write-Host ""
    Write-Host "After creating the Space, run this script again!" -ForegroundColor Green
    exit 0
}

# Create deployment directory
$deployDir = ".\.hf-deploy"
if (Test-Path $deployDir) {
    Write-Host "🧹 Cleaning previous deployment directory..." -ForegroundColor Yellow
    Remove-Item -Path $deployDir -Recurse -Force
}

Write-Host "📁 Creating deployment directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Clone the space
Write-Host ""
Write-Host "📥 Cloning your Hugging Face Space..." -ForegroundColor Yellow
Set-Location $deployDir
git clone $gitUrl .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to clone the Space. Please check:" -ForegroundColor Red
    Write-Host "   1. Space exists at: $spaceUrl" -ForegroundColor White
    Write-Host "   2. You have access to the Space" -ForegroundColor White
    Write-Host "   3. Git credentials are configured" -ForegroundColor White
    Set-Location ..
    exit 1
}

# Copy necessary files
Write-Host ""
Write-Host "📦 Copying project files..." -ForegroundColor Yellow

$filesToCopy = @(
    "Dockerfile",
    "start.sh",
    "nginx.conf",
    "app_config.yaml",
    "package.json",
    "docker-compose.yml"
)

foreach ($file in $filesToCopy) {
    if (Test-Path "..\$file") {
        Copy-Item "..\$file" -Destination "." -Force
        Write-Host "   ✓ $file" -ForegroundColor Green
    }
}

# Copy README_HF.md as README.md
if (Test-Path "..\README_HF.md") {
    Copy-Item "..\README_HF.md" -Destination ".\README.md" -Force
    Write-Host "   ✓ README.md (from README_HF.md)" -ForegroundColor Green
}

# Copy backend directory
Write-Host "   📂 Copying backend..." -ForegroundColor Cyan
if (Test-Path ".\backend") {
    Remove-Item -Path ".\backend" -Recurse -Force
}
Copy-Item "..\backend" -Destination ".\backend" -Recurse -Force -Exclude @("node_modules", "*.log", ".env")
Write-Host "   ✓ backend/" -ForegroundColor Green

# Copy frontend directory
Write-Host "   📂 Copying frontend..." -ForegroundColor Cyan
if (Test-Path ".\frontend") {
    Remove-Item -Path ".\frontend" -Recurse -Force
}
Copy-Item "..\frontend" -Destination ".\frontend" -Recurse -Force -Exclude @("node_modules", "dist", "*.log", ".env")
Write-Host "   ✓ frontend/" -ForegroundColor Green

# Git add and commit
Write-Host ""
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Deploy MedSync to Hugging Face Spaces"

# Push to Hugging Face
Write-Host ""
Write-Host "🚀 Pushing to Hugging Face..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully deployed to Hugging Face!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to: $spaceUrl" -ForegroundColor White
    Write-Host "   2. Click 'Settings' → 'Variables and secrets'" -ForegroundColor White
    Write-Host "   3. Add the following secrets:" -ForegroundColor White
    Write-Host ""
    Write-Host "      Required Secrets:" -ForegroundColor Yellow
    Write-Host "      - MONGODB_URI (your MongoDB Atlas connection string)" -ForegroundColor White
    Write-Host "      - JWT_SECRET (random 32+ character string)" -ForegroundColor White
    Write-Host "      - CLIENT_URL (https://$hfUsername-$spaceName.hf.space)" -ForegroundColor White
    Write-Host ""
    Write-Host "      Optional Secrets:" -ForegroundColor Yellow
    Write-Host "      - GROQ_API_KEY (for AI features)" -ForegroundColor White
    Write-Host "      - CLOUDINARY_CLOUD_NAME" -ForegroundColor White
    Write-Host "      - CLOUDINARY_API_KEY" -ForegroundColor White
    Write-Host "      - CLOUDINARY_API_SECRET" -ForegroundColor White
    Write-Host ""
    Write-Host "   4. Wait 5-10 minutes for the build to complete" -ForegroundColor White
    Write-Host "   5. Your app will be live at: https://$hfUsername-$spaceName.hf.space" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 For detailed setup instructions, see QUICKSTART_HF.md" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "❌ Failed to push to Hugging Face" -ForegroundColor Red
    Write-Host "Please check your Git credentials and try again" -ForegroundColor Yellow
}

# Return to original directory
Set-Location ..

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
