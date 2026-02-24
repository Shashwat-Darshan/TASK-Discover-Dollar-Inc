# Deploying to Render.app

## Overview

Render.app is a modern cloud platform that natively supports Docker. This guide walks you through deploying the MEAN stack application on Render's free tier.

## Prerequisites

- Render.app account (free) - https://render.com
- GitHub repository connected to Render
- MongoDB Atlas account (free tier) - https://mongodb.com/atlas

## Architecture on Render

```
Internet → Render.com (Frontend)
              + Backend API
              ↓
         MongoDB Atlas (Cloud)
```

## Step-by-Step Deployment

### Step 1: Create MongoDB Atlas Account (FREE)

1. Go to https://mongodb.com/atlas
2. Sign up with email/GitHub
3. Create a **FREE** cluster:
   - Select "Free" tier
   - Choose region closest to you
   - Click "Create"
4. Wait for cluster to initialize (~5 minutes)
5. Get connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Replace `<username>:<password>` with actual credentials
   - **Save this string** - you'll need it for Render

**Example:** `mongodb+srv://user:password@cluster0.mongodb.net/dd_db?retryWrites=true`

### Step 2: Connect GitHub to Render

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Click **"Connect account"** next to GitHub
5. Authorize Render access to your GitHub account
6. Select repository: `TASK-Discover-Dollar-Inc`

### Step 3: Deploy Backend API

1. Fill in Web Service details:
   - **Name:** `crud-dd-backend`
   - **Environment:** Docker
   - **Branch:** main
   - **Build Command:** (Leave empty - Docker handles it)
   - **Start Command:** (Leave empty - Dockerfile has CMD)
   - **Plan:** Free
   - **Region:** Ohio (default)

2. Click **"Advanced"** and add environment variables:
   ```
   MONGODB_URL = mongodb+srv://user:pass@cluster0.mongodb.net/dd_db?retryWrites=true
   NODE_ENV = production
   PORT = 8080
   ```
   
3. Click **"Deploy Web Service"**

**Wait for deployment to complete (~5-10 minutes)**
- You'll get a URL like: `https://crud-dd-backend.onrender.com`
- Test it: `https://crud-dd-backend.onrender.com/api/tutorials`

### Step 4: Deploy Frontend

1. Click **"New +"** → **"Web Service"** again
2. Fill in details:
   - **Name:** `crud-dd-frontend`
   - **Environment:** Docker
   - **Branch:** main
   - **Plan:** Free
   - **Region:** Ohio

3. Click **"Advanced"** and add environment variables:
   ```
   BACKEND_URL = https://crud-dd-backend.onrender.com
   ```

4. Click **"Deploy Web Service"**

**Wait for deployment (~5-10 minutes)**
- You'll get a URL like: `https://crud-dd-frontend.onrender.com`
- Visit this URL to see your application

### Step 5: Update Frontend to Use Backend URL

The frontend needs to know about the backend URL. Update `frontend/src/app/services/tutorial.service.ts`:

```typescript
const baseUrl = '/api/tutorials';  // This will be proxied through Nginx
```

The Nginx reverse proxy (in frontend/nginx.conf) handles routing `/api/*` to the backend.

However, for Render, update to:
```typescript
const baseUrl = environment.production ? 
  'https://crud-dd-backend.onrender.com/api/tutorials' : 
  '/api/tutorials';
```

## Troubleshooting

### Backend shows "Cannot connect to the database"
- ✅ Check MongoDB Atlas connection string is correct
- ✅ Verify IP whitelist - add `0.0.0.0/0` to allow all IPs
- ✅ Check environment variable in Render is set correctly

### Frontend shows 404 or cannot reach backend
- ✅ Verify backend URL in Render is correct: `https://crud-dd-backend.onrender.com`
- ✅ Check CORS is enabled in backend (`backend/server.js`)
- ✅ Wait 2-3 minutes after deployment for services to be healthy

### Services won't deploy
- ✅ Check Docker build logs in Render console
- ✅ Ensure Dockerfile paths are correct
- ✅ Check for syntax errors in docker-compose.yml (if used)

## Manual Testing

### Test Backend API

```bash
# Get all tutorials
curl https://crud-dd-backend.onrender.com/api/tutorials

# Note: First request may take 30 seconds (Render free tier spins down)
```

### Test Frontend

```bash
# Open in browser
https://crud-dd-frontend.onrender.com
```

## Auto-Deployment from GitHub

Your GitHub workflows are already configured to work with Render:

1. **Every push to `main` branch triggers build**
2. Images are pushed to Docker Hub
3. Render automatically redeploys when you update the `Dockerfile`

To enable automatic redeploys on every push:
- Render → Web Service → Settings → "Auto-Deploy"
- Set to "Yes"

## Cost

**FREE TIER LIMITS:**
- Frontend: 750 hours/month (covers 24/7 usage)
- Backend: 750 hours/month
- MongoDB Atlas: 512 MB storage (includes ~100K documents)

**Limitations:**
- Services spin down after 15 minutes of inactivity (cold start ~30 seconds)
- No persistent disk storage
- Limited to 0.5 CPU, 512 MB RAM

**For production:** Upgrade to Render's paid tiers or use other providers (AWS, Azure, DigitalOcean)

## Next Steps

1. ✅ Create MongoDB Atlas cluster (FREE)
2. ✅ Connect GitHub repo to Render
3. ✅ Deploy backend API service
4. ✅ Deploy frontend service
5. ✅ Test both services
6. ✅ Share Render URLs: 
   - Frontend: https://crud-dd-frontend.onrender.com
   - Backend: https://crud-dd-backend.onrender.com

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string obtained
- [ ] GitHub connected to Render
- [ ] Backend service deployed
- [ ] Backend environment variables configured
- [ ] Frontend service deployed
- [ ] Frontend environment variables configured
- [ ] API tested and working
- [ ] Frontend accessible and loading
- [ ] CRUD operations working end-to-end

---

**Estimated time to complete:** 30-45 minutes
**Cost:** FREE (within free tier limits)
