# 🚀 Quick Deploy to Hugging Face Spaces

Deploy MedSync to Hugging Face in 10 minutes!

## Step 1: Set Up MongoDB Atlas (5 min)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a **FREE** account
3. Create a **FREE** M0 cluster
4. Click "Database Access" → Add New User
   - Username: `medsync`
   - Password: (generate strong password)
   - Role: `Read and write to any database`
5. Click "Network Access" → Add IP Address
   - Add `0.0.0.0/0` (allows all connections)
6. Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

Your connection string should look like:
```
mongodb+srv://medsync:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medsync?retryWrites=true&w=majority
```

## Step 2: Create Hugging Face Space (2 min)

1. Go to [Hugging Face Spaces](https://huggingface.co/new-space)
2. Fill in:
   - **Owner**: Your username
   - **Space name**: `medsync` (or your choice)
   - **License**: MIT
   - **Select the Space SDK**: **Docker**
   - **Space hardware**: CPU basic (free)
3. Click **Create Space**

## Step 3: Configure Environment Variables (2 min)

In your Space, click **Settings** → **Variables and secrets**:

Add these secrets (click "New secret" for each):

| Name | Value | Example |
|------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://medsync:pass@cluster.mongodb.net/medsync` |
| `JWT_SECRET` | Random 32+ character string | `my_super_secret_jwt_key_12345678` |
| `CLIENT_URL` | Your Space URL | `https://YOUR_USERNAME-medsync.hf.space` |
| `GROQ_API_KEY` | (Optional) From [console.groq.com](https://console.groq.com) | `gsk_xxxxx` |

**To generate a strong JWT_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## Step 4: Upload Files (1 min)

### Option A: Using Git (Recommended)

```bash
# Clone your Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/medsync
cd medsync

# Copy all MedSync files into this directory
# (Don't copy node_modules!)

# Add all files
git add .

# Commit
git commit -m "Initial deployment"

# Push
git push
```

### Option B: Using Web Interface

1. In your Space, click "Files and versions"
2. Click "Add file" → "Upload files"
3. Upload these key files:
   - `Dockerfile`
   - `start.sh`
   - `nginx.conf`
   - `app_config.yaml`
   - Entire `backend/` folder
   - Entire `frontend/` folder
   - `README_HF.md` (rename to `README.md` after upload)

## Step 5: Wait for Build (5-10 min)

1. Hugging Face will automatically start building
2. Watch the build logs in the "Logs" tab
3. First build takes 5-10 minutes
4. You'll see:
   ```
   Building frontend...
   Building backend...
   Starting nginx...
   Starting backend server...
   ```

## Step 6: Test Your Deployment ✅

Once deployed, visit: `https://YOUR_USERNAME-medsync.hf.space`

Test these features:
- [ ] Homepage loads
- [ ] Register new account
- [ ] Login works
- [ ] View doctors list
- [ ] Search works

## Troubleshooting

### Build Failed?
- Check "Logs" tab for errors
- Verify all files uploaded correctly
- Ensure `Dockerfile` is in root directory

### App Not Loading?
- Wait 10 minutes (first build takes time)
- Check environment variables are set
- Verify MongoDB URI is correct

### Database Connection Error?
- Test your MongoDB URI locally first
- Ensure IP `0.0.0.0/0` is whitelisted
- Check database user has correct permissions

### Can't Login/Register?
- Verify `JWT_SECRET` is set
- Check `CLIENT_URL` matches your Space URL
- Look at browser console for errors

## Quick Commands

### Check deployment status
```bash
# View your Space
https://huggingface.co/spaces/YOUR_USERNAME/medsync

# View logs
https://huggingface.co/spaces/YOUR_USERNAME/medsync/logs
```

### Update deployment
```bash
git add .
git commit -m "Update"
git push
```

## Need Help?

1. Check [HUGGINGFACE_DEPLOYMENT.md](HUGGINGFACE_DEPLOYMENT.md) for detailed guide
2. Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for step-by-step checklist
3. View logs in your Space's "Logs" tab
4. Open an issue in the repository

## Cost

- **MongoDB Atlas**: FREE (M0 tier)
- **Hugging Face Space**: FREE (CPU basic)
- **Groq API**: FREE (with limits)
- **Total**: $0/month 🎉

## What's Next?

After successful deployment:
- [ ] Add your own doctors
- [ ] Customize branding
- [ ] Upgrade to paid tier for persistence
- [ ] Add custom domain
- [ ] Set up monitoring

---

**Deployment Time**: ~10 minutes
**Cost**: $0
**Difficulty**: Easy ⭐

🎉 **Congratulations! Your medical platform is now live!**
