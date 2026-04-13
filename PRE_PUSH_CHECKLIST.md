# Pre-Push Security Checklist

## Before Every Git Push

Run this checklist to ensure no secrets are exposed:

### 1. Run Security Check Script
```powershell
.\security-check.ps1
```

### 2. Manual Verification

- [ ] **No .env files staged**
  ```powershell
  git diff --cached --name-only | Select-String "\.env"
  # Should show nothing or only .env.example
  ```

- [ ] **Backend .env is NOT tracked**
  ```powershell
  git ls-files | Select-String "backend/.env$"
  # Should show nothing
  ```

- [ ] **Frontend .env is NOT tracked**
  ```powershell
  git ls-files | Select-String "frontend/.env$"
  # Should show nothing
  ```

- [ ] **No MongoDB URIs in code**
  ```powershell
  git grep -i "mongodb+srv://"
  # Should only appear in .example files
  ```

- [ ] **No hardcoded JWT secrets**
  ```powershell
  git grep -i "jwt_secret.*=.*[a-z0-9]{20,}"
  # Should only appear in .example files
  ```

- [ ] **No API keys in code**
  ```powershell
  git grep -E "(api[_-]?key|apikey).*=.*['\"]?[a-z0-9]{20,}"
  # Should only appear in .example files
  ```

### 3. Review Staged Changes
```powershell
# See what will be committed
git diff --cached

# Check file list
git status
```

### 4. If You Find Secrets

**STOP! Don't push!**

1. Unstage the file:
   ```powershell
   git reset HEAD <file-with-secret>
   ```

2. Remove from tracking (if already tracked):
   ```powershell
   git rm --cached <file-with-secret>
   ```

3. Update .gitignore:
   ```powershell
   # Add the file pattern to .gitignore
   echo "<file-pattern>" >> .gitignore
   ```

### 5. Safe to Push Checklist

Only push when ALL these are true:

- ✅ `security-check.ps1` passes with no errors
- ✅ No .env files in `git status` (except .env.example)
- ✅ All secrets use environment variables
- ✅ .env.example files have placeholders only
- ✅ No real MongoDB URIs in code
- ✅ No real API keys in code
- ✅ No passwords in code
- ✅ Reviewed `git diff --cached` output

### 6. Push Commands
```powershell
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Your descriptive message"

# Push to GitHub
git push
```

## Emergency: Already Pushed Secrets?

### Immediate Actions:

1. **⚠️ CHANGE ALL EXPOSED CREDENTIALS IMMEDIATELY!**

2. **For MongoDB:**
   - Go to MongoDB Atlas → Database Access
   - Delete the exposed user
   - Create new user with new password
   - Update your local .env with new credentials

3. **For JWT Secrets:**
   - Generate new secrets:
     ```powershell
     [Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))
     ```
   - Update backend/.env
   - All existing tokens will be invalidated

4. **For API Keys (Groq, Cloudinary, etc.):**
   - Go to the service provider
   - Revoke/delete the exposed key
   - Generate a new key
   - Update frontend/.env

5. **Remove from Git History:**
   ```powershell
   # Remove file from git cache
   git rm --cached backend/.env
   
   # Commit the removal
   git commit -m "Remove sensitive configuration file"
   
   # If already pushed, force push (⚠️ Use carefully!)
   git push --force
   ```

6. **Consider using BFG Repo-Cleaner** for thorough history cleanup:
   - Download from https://rtyley.github.io/bfg-repo-cleaner/
   - Follow instructions to remove secrets from entire history

## Tools to Help

### Git Hooks (Prevent accidental commits)

Create `.git/hooks/pre-commit` (Mac/Linux):
```bash
#!/bin/sh
./security-check.ps1
if [ $? -ne 0 ]; then
    echo "Security check failed. Commit aborted."
    exit 1
fi
```

### Automated Scanning

Use these tools to scan your repo:
- **gitleaks**: https://github.com/zricethezav/gitleaks
- **truffleHog**: https://github.com/trufflesecurity/truffleHog
- **git-secrets**: https://github.com/awslabs/git-secrets

## Questions?

See [SECURITY.md](SECURITY.md) for detailed security guidelines.

---

**Remember: It's better to be safe than sorry. When in doubt, run the security check!**
