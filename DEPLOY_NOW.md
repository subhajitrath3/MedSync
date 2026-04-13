# 🚀 Deploy MedSync to Hugging Face - Simple Guide

Follow these steps to deploy your MedSync application to Hugging Face Spaces.

## Prerequisites Checklist

- [ ] Hugging Face account ([Sign up here](https://huggingface.co/join))
- [ ] MongoDB Atlas account ([Free tier here](https://www.mongodb.com/cloud/atlas/register))
- [ ] Git installed on your computer
- [ ] (Optional) Groq API key for AI features ([Get it here](https://console.groq.com))

## Step 1: Set Up MongoDB Atlas (5 minutes)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Free Cluster**
   - Choose AWS as provider
   - Select a free region
   - Cluster Name: `medsync-cluster`

3. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Username: `medsync`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"

4. **Allow All IP Addresses**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Add IP: `0.0.0.0/0`
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://medsync:YourPassword@medsync-cluster.xxxxx.mongodb.net/medsync?retryWrites=true&w=majority`

**Save this connection string - you'll need it later!**

## Step 2: Create Hugging Face Space (2 minutes)

1. **Go to Hugging Face**
   - Visit: https://huggingface.co/new-space

2. **Fill in Space Details**
   - **Owner**: Your username
   - **Space name**: `medsync` (or choose your own)
   - **License**: MIT
   - **Select the Space SDK**: Choose **Docker** ⚠️ Important!
   - **Space hardware**: CPU basic (free tier)
   - **Visibility**: Public (or Private if you prefer)

3. **Create Space**
   - Click "Create Space" button
   - Keep this tab open - you'll need it later

## Step 3: Deploy Using PowerShell Script (5 minutes)

### Automated Deployment (Recommended)

1. **Open PowerShell in project directory**
   ```powershell
   cd C:\Users\ABHIJEET\OneDrive\Desktop\MedSync_JK1
   ```

2. **Run deployment script**
   ```powershell
   .\deploy-to-hf.ps1
   ```

3. **Follow the prompts**
   - Enter your Hugging Face username
   - Enter your space name (e.g., `medsync`)
   - Confirm that the space has been created

4. **Script will automatically**
   - Clone your Hugging Face Space
   - Copy all necessary files
   - Commit and push to Hugging Face

### Manual Deployment (Alternative)

If the script doesn't work, use manual deployment:

1. **Clone your Space**
   ```powershell
   git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   cd YOUR_SPACE_NAME
   ```

2. **Copy essential files**
   ```powershell
   # Copy from MedSync project to Space directory
   Copy-Item ..\Dockerfile .
   Copy-Item ..\start.sh .
   Copy-Item ..\nginx.conf .
   Copy-Item ..\app_config.yaml .
   Copy-Item ..\README_HF.md .\README.md
   Copy-Item ..\backend . -Recurse
   Copy-Item ..\frontend . -Recurse
   ```

3. **Push to Hugging Face**
   ```powershell
   git add .
   git commit -m "Deploy MedSync"
   git push
   ```

## Step 4: Configure Environment Variables (3 minutes)

1. **Go to your Space Settings**
   - Visit: `https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME`
   - Click "Settings" tab
   - Click "Variables and secrets" section

2. **Add Required Secrets**

   Click "New secret" for each of the following:

   | Name | Value | Where to Get |
   |------|-------|--------------|
   | `MONGODB_URI` | Your MongoDB connection string | From Step 1 |
   | `JWT_SECRET` | Random 32+ character string | Generate below |
   | `CLIENT_URL` | `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space` | Your Space URL |

3. **Add Optional Secrets** (for full features)

   | Name | Where to Get |
   |------|--------------|
   | `GROQ_API_KEY` | https://console.groq.com (for AI features) |
   | `CLOUDINARY_CLOUD_NAME` | https://cloudinary.com (for image uploads) |
   | `CLOUDINARY_API_KEY` | https://cloudinary.com |
   | `CLOUDINARY_API_SECRET` | https://cloudinary.com |

4. **Generate JWT_SECRET** (if needed)

   Run this in PowerShell:
   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

## Step 5: Wait for Build & Launch (5-10 minutes)

1. **Monitor Build Progress**
   - Go to your Space page
   - Click on "Logs" tab
   - Watch the build process

2. **Build Steps You'll See**
   - Building frontend (React + Vite)
   - Building backend (Node.js + Express)
   - Setting up Nginx
   - Starting services

3. **When Build Completes**
   - The Space will automatically restart
   - You'll see "Running" status
   - Your app will be available at: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`

## Step 6: Test Your Deployment

1. **Visit Your Space**
   - Open: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`

2. **Test Features**
   - [ ] Homepage loads correctly
   - [ ] Register a new account
   - [ ] Login works
   - [ ] Find doctors map displays
   - [ ] Book an appointment

3. **Check Logs** (if issues occur)
   - Go to Space → "Logs" tab
   - Look for error messages
   - Common issues:
     - MongoDB connection failed → Check MONGODB_URI
     - CORS errors → Check CLIENT_URL matches your Space URL

## Troubleshooting

### Build Failed
- Check Logs tab for specific errors
- Ensure all environment variables are set correctly
- Verify MongoDB connection string is correct

### App Not Loading
- Wait 10 minutes for first build
- Check if Space is in "Running" state
- Clear browser cache and reload

### MongoDB Connection Error
- Verify connection string in MONGODB_URI
- Check IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

### API Requests Failing
- Verify CLIENT_URL matches your Space URL exactly
- Check browser console for CORS errors
- Ensure backend is running (check Logs)

## After Deployment

### Default Test Credentials
You can create test accounts or use these if seeded:
- **Patient**: `patient@test.com` / `password123`
- **Doctor**: `doctor@test.com` / `password123`

### Updating Your Deployment
When you make changes:
```powershell
cd .hf-deploy
git pull
# Copy updated files from your project
git add .
git commit -m "Update application"
git push
```

### Getting AI Features
To enable AI-powered features:
1. Get Groq API key from https://console.groq.com
2. Add as `GROQ_API_KEY` secret in Space settings
3. Restart Space

## Resources

- [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Project Documentation](PROJECT_DOCUMENTATION.md)

## Need Help?

- Check [QUICKSTART_HF.md](QUICKSTART_HF.md) for detailed instructions
- Check [HUGGINGFACE_DEPLOYMENT.md](HUGGINGFACE_DEPLOYMENT.md) for advanced configuration
- Visit Hugging Face Spaces community forums

---

**🎉 Congratulations! Your MedSync application is now live on Hugging Face Spaces!**
