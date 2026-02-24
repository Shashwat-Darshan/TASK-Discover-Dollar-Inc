# Deploying MEAN Stack with Docker MongoDB on Render

## Overview

Instead of MongoDB Atlas, you'll use MongoDB in a **Docker container** managed by docker-compose. This means all three services (MongoDB, Backend, Frontend) run together in containers.

## Architecture

```
Render Web Service
├── MongoDB (Docker container, port 27017)
├── Backend API (Docker container, port 8080)
└── Frontend (Docker container, port 80)
```

## Prerequisites

- ✅ GitHub repository with Dockerfiles
- ✅ Docker Hub account with images pushed
- ✅ Render.app account
- ✅ Docker images built:
  - `shashwatxdarshan/crud-dd-backend:latest`
  - `shashwatxdarshan/crud-dd-frontend:latest`

## Step-by-Step Deployment

### Step 1: Set Up Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository: `TASK-Discover-Dollar-Inc`
4. Fill in service details:
   - **Name:** `crud-dd-app`
   - **Environment:** Docker
   - **Branch:** main
   - **Region:** Ohio
   - **Plan:** Free

### Step 2: Configure Environment

1. Click **"Advanced"** → **"Environment"**
2. **Copy and paste all these variables:**

```
MONGO_IMAGE=mongo:7
MONGODB_URL=mongodb://mongodb:27017/dd_db
BACKEND_IMAGE=shashwatxdarshan/crud-dd-backend:latest
FRONTEND_IMAGE=shashwatxdarshan/crud-dd-frontend:latest
NODE_ENV=production
PORT=8080
BACKEND_URL=https://crud-dd-app.onrender.com
```

### Step 3: Deploy

1. Click **"Deploy Web Service"**
2. **Wait 10-15 minutes** for deployment
3. Render will run `docker-compose up` which starts:
   - MongoDB container
   - Backend container
   - Frontend container

### Step 4: Test

Once deployed, you'll get a URL like: `https://crud-dd-app.onrender.com`

```bash
# Test Frontend
curl https://crud-dd-app.onrender.com

# Test Backend API
curl https://crud-dd-app.onrender.com/api/tutorials
```

## Environment Variables Reference

| Variable | Purpose | Value |
|---|---|---|
| `MONGO_IMAGE` | MongoDB Docker image | `mongo:7` |
| `MONGODB_URL` | MongoDB connection string (internal) | `mongodb://mongodb:27017/dd_db` |
| `BACKEND_IMAGE` | Backend Docker image (from Hub) | Your Docker Hub image |
| `FRONTEND_IMAGE` | Frontend Docker image (from Hub) | Your Docker Hub image |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Backend port | `8080` |
| `BACKEND_URL` | Backend API URL for frontend | `https://your-render-url.com` |

## How It Works

**docker-compose.prod.yml** defines three interconnected services:

1. **MongoDB:** 
   - Image: `mongo:7` (official MongoDB)
   - Internal port: 27017
   - Data persisted in `mongo_data` volume
   - Other containers connect via hostname `mongodb`

2. **Backend:**
   - Image: Your pre-built image from Docker Hub
   - Connects to MongoDB at: `mongodb://mongodb:27017/dd_db`
   - Exposed on port 8080

3. **Frontend:**
   - Image: Your pre-built Angular image from Docker Hub
   - Reverse proxy configured to route `/api/*` to backend
   - Exposed on port 80

All services communicate through Docker's internal network bridge.

## Troubleshooting

### MongoDB Connection Failed

**Problem:** Backend logs show "Cannot connect to the database"

**Solution:**
- Verify `MONGODB_URL` is exactly: `mongodb://mongodb:27017/dd_db`
- Check MongoDB has started (wait 10-15 seconds after deployment)
- Check docker-compose.prod.yml is in the repo root

### Frontend shows 404

**Problem:** Can't access the application

**Solution:**
- Wait for full deployment (10-15 minutes)
- Check Render build logs for errors
- Verify both images are pushed to Docker Hub
- Check image names in environment variables match exactly

### Data Not Persisting

**Problem:** Data lost after service restart

**Solution:**
- Render free tier services may spin down
- MongoDB data is stored in `mongo_data` volume
- Data persists while service is running
- Restarting the service doesn't clear data, but long inactivity (15+ mins) may cause issues

## Important Notes

### Free Tier Limitations

- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-45 seconds (cold start)
- ⚠️ Limited CPU/RAM (0.5 CPU, 512 MB)
- ✅ MongoDB data persists in volume

### Production Considerations

For production, consider:
- Upgrading from free tier
- Using MongoDB Atlas for separate database management
- Setting up monitoring and backups
- Using proper database credentials/authentication

## Local Testing Before Render

Test this locally first:

```bash
# Build images
docker-compose build -f docker-compose.prod.yml

# Build from Docker Hub images
export BACKEND_IMAGE=shashwatxdarshan/crud-dd-backend:latest
export FRONTEND_IMAGE=shashwatxdarshan/crud-dd-frontend:latest

# Run with docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d

# Test
curl http://localhost/api/tutorials

# Stop
docker-compose -f docker-compose.prod.yml down
```

## Delete/Stop Service

To stop the service on Render:

1. Go to Render dashboard
2. Select `crud-dd-app` service
3. Click **Settings** → **Suspend Service** (or Delete)

## Getting Help

Check:
- Render deployment logs (in browser console)
- Docker build logs
- docker-compose.prod.yml syntax
- Image names match exactly in environment variables

---

**Deployment URL Structure:** `https://crud-dd-app.onrender.com`
- Frontend: `https://crud-dd-app.onrender.com/`
- Backend API: `https://crud-dd-app.onrender.com/api/tutorials`
- MongoDB: Internal only (not exposed)

