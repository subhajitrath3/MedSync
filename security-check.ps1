# MedSync Security Check Script
# Run this before pushing to GitHub

Write-Host "🔒 MedSync Security Check" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

$issuesFound = $false

# Check 1: Look for .env files in staging area
Write-Host "✓ Checking for staged .env files..." -ForegroundColor Yellow
$stagedEnvFiles = git diff --cached --name-only | Select-String -Pattern "\.env$" | Where-Object { $_ -notmatch "\.env\.example$" }
if ($stagedEnvFiles) {
    Write-Host "  ❌ DANGER! .env files are staged:" -ForegroundColor Red
    $stagedEnvFiles | ForEach-Object { Write-Host "     - $_" -ForegroundColor Red }
    Write-Host "  Run: git reset HEAD $($stagedEnvFiles -join ' ')" -ForegroundColor Yellow
    $issuesFound = $true
} else {
    Write-Host "  ✅ No .env files staged" -ForegroundColor Green
}

# Check 2: Verify .env files exist but are not tracked
Write-Host ""
Write-Host "✓ Checking .env files..." -ForegroundColor Yellow
$envFiles = @("backend\.env", "frontend\.env")
foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        Write-Host "  ⚠️  Found: $envFile (make sure it's not tracked)" -ForegroundColor Yellow
        $tracked = git ls-files $envFile 2>$null
        if ($tracked) {
            Write-Host "  ❌ DANGER! $envFile is tracked in git!" -ForegroundColor Red
            Write-Host "  Run: git rm --cached $envFile" -ForegroundColor Yellow
            $issuesFound = $true
        } else {
            Write-Host "  ✅ $envFile is not tracked" -ForegroundColor Green
        }
    }
}

# Check 3: Look for potential secrets in code
Write-Host ""
Write-Host "✓ Scanning for hardcoded secrets..." -ForegroundColor Yellow
$secretPatterns = @(
    "mongodb\+srv://[^'`""\s]+:[^'`""\s]+@",
    "Bearer\s+[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_.+/=]+",
    "gsk_[a-zA-Z0-9]{32,}",
    "sk-[a-zA-Z0-9]{32,}",
    "AKIA[0-9A-Z]{16}"
)

$codeFiles = Get-ChildItem -Path "backend\src", "frontend\src" -Recurse -Include *.js,*.ts,*.jsx,*.tsx -ErrorAction SilentlyContinue

$secretsFound = @()
foreach ($file in $codeFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        foreach ($pattern in $secretPatterns) {
            if ($content -match $pattern) {
                $secretsFound += $file.FullName
                break
            }
        }
    }
}

if ($secretsFound.Count -gt 0) {
    Write-Host "  ⚠️  Potential secrets found in:" -ForegroundColor Yellow
    $secretsFound | ForEach-Object { Write-Host "     - $_" -ForegroundColor Yellow }
    Write-Host "  Please review these files manually" -ForegroundColor Yellow
    $issuesFound = $true
} else {
    Write-Host "  ✅ No obvious secrets in source code" -ForegroundColor Green
}

# Check 4: Verify .gitignore exists and contains .env
Write-Host ""
Write-Host "✓ Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "  ✅ .gitignore includes .env pattern" -ForegroundColor Green
    } else {
        Write-Host "  ❌ .gitignore missing .env pattern!" -ForegroundColor Red
        $issuesFound = $true
    }
} else {
    Write-Host "  ❌ .gitignore file not found!" -ForegroundColor Red
    $issuesFound = $true
}

# Check 5: Look for .env.example files
Write-Host ""
Write-Host "✓ Checking for .env.example templates..." -ForegroundColor Yellow
$exampleFiles = @("backend\.env.example", "frontend\.env.example")
foreach ($exampleFile in $exampleFiles) {
    if (Test-Path $exampleFile) {
        Write-Host "  ✅ Found: $exampleFile" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Missing: $exampleFile (consider creating one)" -ForegroundColor Yellow
    }
}

# Check 6: Check for large files
Write-Host ""
Write-Host "✓ Checking for large files..." -ForegroundColor Yellow
$largeFiles = Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.Length -gt 10MB -and $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git" } |
    Select-Object FullName, @{Name="SizeMB";Expression={[math]::Round($_.Length/1MB, 2)}}

if ($largeFiles) {
    Write-Host "  ⚠️  Large files found:" -ForegroundColor Yellow
    $largeFiles | ForEach-Object { Write-Host "     - $($_.FullName) ($($_.SizeMB) MB)" -ForegroundColor Yellow }
} else {
    Write-Host "  ✅ No large files found" -ForegroundColor Green
}

# Check 7: Check current git status
Write-Host ""
Write-Host "✓ Git status summary..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "  Files to be committed:" -ForegroundColor Cyan
    $gitStatus | ForEach-Object { Write-Host "     $_" -ForegroundColor White }
} else {
    Write-Host "  ✅ Working tree clean" -ForegroundColor Green
}

# Final Summary
Write-Host ""
Write-Host "=========================" -ForegroundColor Cyan
if ($issuesFound) {
    Write-Host "❌ SECURITY ISSUES FOUND!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the issues above before pushing to GitHub." -ForegroundColor Yellow
    Write-Host "Review SECURITY.md for detailed guidelines." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ All security checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can safely push to GitHub now." -ForegroundColor Green
    Write-Host ""
    Write-Host "Quick commands:" -ForegroundColor Cyan
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m 'Your commit message'" -ForegroundColor White
    Write-Host "  git push" -ForegroundColor White
}

Write-Host ""
