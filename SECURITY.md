# 🔒 Security Guidelines for MedSync

## ⚠️ IMPORTANT: Never Commit Secrets to Git

This document explains how to keep your secrets safe when working with MedSync.

---

## 🚨 Critical Files to NEVER Commit

The following files contain sensitive information and should NEVER be committed to Git:

- ❌ `backend/.env` - Contains database credentials, JWT secrets, API keys
- ❌ `frontend/.env` - Contains Groq API key and other secrets
- ❌ `.env` - Any environment files with real values
- ❌ `*.pem`, `*.key` - SSL certificates and private keys
- ❌ `config/secrets.js` - Any hardcoded secrets

---

## ✅ Safe Files to Commit

These example files are safe to commit (they contain placeholder values):

- ✅ `backend/.env.example` - Template with placeholder values
- ✅ `frontend/.env.example` - Template with placeholder values
- ✅ `.env.example` - Root environment template

---

## 🛡️ Environment Variables Setup

### For Development

1. **Copy the example files:**
   ```powershell
   # Backend
   Copy-Item backend\.env.example backend\.env
   
   # Frontend
   Copy-Item frontend\.env.example frontend\.env
   ```

2. **Edit with your real values:**
   - Open `backend/.env` and replace all placeholder values
   - Open `frontend/.env` and add your Groq API key
   - NEVER commit these files!

### For Production (Hugging Face Spaces)

Add secrets directly in the Space settings:
1. Go to your Space → Settings → Variables and secrets
2. Add each secret individually
3. Never include secrets in your code

---

## 🔐 Secrets Reference

### Backend Secrets (backend/.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` | ✅ Yes |
| `JWT_SECRET` | JWT signing secret (32+ chars) | `your_random_32_character_secret_here` | ✅ Yes |
| `JWT_EXPIRE` | JWT token expiration | `7d` | ✅ Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | `another_random_secret_here` | ✅ Yes |
| `JWT_REFRESH_EXPIRE` | Refresh token expiration | `30d` | ✅ Yes |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8080` | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` | ❌ Optional |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` | ❌ Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnop` | ❌ Optional |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` | ❌ Optional |
| `EMAIL_PORT` | SMTP port | `587` | ❌ Optional |
| `EMAIL_USER` | Email username | `your-email@gmail.com` | ❌ Optional |
| `EMAIL_PASSWORD` | Email password/app password | `your_app_password` | ❌ Optional |

### Frontend Secrets (frontend/.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` | ✅ Yes |
| `VITE_GROQ_API_KEY` | Groq AI API key | `gsk_...` | ❌ Optional (for AI features) |

---

## 🔍 How to Get API Keys

### MongoDB Atlas (Required)
1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Go to Database Access → Add New User
4. Go to Network Access → Add IP Address → Allow 0.0.0.0/0
5. Click Connect → Get connection string
6. **⚠️ Keep this secret!**

### Groq API (Optional - for AI features)
1. Visit https://console.groq.com
2. Sign up for free account
3. Go to API Keys section
4. Generate new API key
5. **⚠️ Keep this secret!**

### Cloudinary (Optional - for image uploads)
1. Visit https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Copy Cloud Name, API Key, and API Secret
5. **⚠️ Keep these secret!**

---

## 🚫 What NOT to Do

### ❌ DON'T hardcode secrets in code:
```javascript
// ❌ BAD - Never do this!
const mongoUri = "mongodb+srv://user:password@cluster.mongodb.net/db";
const jwtSecret = "my_secret_key_123";
```

### ✅ DO use environment variables:
```javascript
// ✅ GOOD - Always use environment variables
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

### ❌ DON'T commit .env files:
```bash
# ❌ BAD
git add backend/.env
git commit -m "Add config"
```

### ✅ DO commit .env.example files:
```bash
# ✅ GOOD
git add backend/.env.example
git commit -m "Add config template"
```

---

## 🔒 Generate Secure Secrets

### Generate JWT Secret (Windows PowerShell)
```powershell
# Generate a secure random secret
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Generate JWT Secret (Mac/Linux)
```bash
# Generate a secure random secret
openssl rand -base64 32
```

---

## 🚨 If You Accidentally Committed Secrets

### Immediate Actions:

1. **⚠️ CHANGE ALL EXPOSED SECRETS IMMEDIATELY!**
   - Change MongoDB password
   - Rotate JWT secrets
   - Regenerate API keys

2. **Remove from Git history:**
   ```powershell
   # Remove file from git tracking
   git rm --cached backend/.env
   
   # Commit the removal
   git commit -m "Remove sensitive file"
   
   # Force push (if already pushed)
   git push --force
   ```

3. **For MongoDB Atlas:**
   - Go to Database Access
   - Delete the exposed user
   - Create a new user with a new password

4. **For Groq API:**
   - Go to console.groq.com
   - Revoke the exposed API key
   - Generate a new one

---

## ✅ Security Checklist Before Pushing to GitHub

- [ ] Run `git status` and check no .env files are staged
- [ ] Verify .gitignore includes all .env patterns
- [ ] Ensure all secrets use environment variables
- [ ] .env.example files have placeholder values only
- [ ] No hardcoded secrets in source code
- [ ] No API keys in comments or documentation
- [ ] MongoDB connection strings use environment variables
- [ ] All sensitive files are in .gitignore

---

## 🔐 Testing Your Setup

Run this command to check for accidentally staged secrets:

```powershell
# Check for .env files in staging area
git diff --cached --name-only | Select-String -Pattern "\.env$"

# Should return nothing. If it shows files, unstage them:
git reset HEAD backend/.env frontend/.env
```

---

## 📋 .gitignore Verification

Your `.gitignore` should include these patterns:

```gitignore
# Environment variables
.env
.env.local
.env.development
.env.test
.env.production
.env.production.local
*.env
!.env.example

# Secrets and keys
*.pem
*.key
*.cert
secrets.js
config/secrets.js

# Database
*.db
*.sqlite

# Logs with potential secrets
*.log
npm-debug.log*

# Uploads
uploads/
temp/
```

---

## 🆘 Getting Help

If you've exposed secrets:
1. ⚠️ **Act immediately** - change all exposed credentials
2. 🔄 Rotate all API keys
3. 🔒 Review your git history
4. 📧 Consider using tools like:
   - [git-secrets](https://github.com/awslabs/git-secrets)
   - [gitleaks](https://github.com/zricethezav/gitleaks)
   - [truffleHog](https://github.com/trufflesecurity/truffleHog)

---

## 📚 Additional Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [MongoDB Security Best Practices](https://www.mongodb.com/docs/manual/security/)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

<div align="center">

**🔒 Remember: When in doubt, don't commit it! 🔒**

*Keep your secrets secret, and your application secure.*

</div>
