# Render.app Deployment - Separate Services (Recommended)

## Architecture on Render

Since Render doesn't natively support `docker-compose` orchestration, deploy as **3 separate Web Services**:

```
Service 1: MongoDB (Docker)
Service 2: Backend API (Docker from Hub)
Service 3: Frontend (Docker from Hub)
```

## Prerequisites

✅ Docker Hub images already pushed:
- `shashwatxdarshan/crud-dd-backend:latest`
- `shashwatxdarshan/crud-dd-frontend:latest`

✅ Render.app account

## Step-by-Step Deployment

### Service 1: Deploy MongoDB

1. Go to **Render Dashboard** → **New +** → **Web Service**
2. Choose **"Deploy an existing image"** (not "Build from source")
3. Enter image: `mongo:7`
4. Fill in details:
   - **Name:** `crud-dd-mongodb`
   - **Region:** Ohio
   - **Plan:** Free
5. Click **"Advanced"** → **"Environment"**
6. Add these variables:
   ```
   MONGO_INITDB_ROOT_USERNAME=admin
   MONGO_INITDB_ROOT_PASSWORD=password123
   ```
7. Click **"Deploy"**
8. **Wait for it to be live** (save the service URL)

### Service 2: Deploy Backend

1. **Render Dashboard** → **New +** → **Web Service**
2. Choose **"Deploy an existing image"**
3. Enter image: `shashwatxdarshan/crud-dd-backend:latest`
4. Fill in details:
   - **Name:** `crud-dd-backend`
   - **Region:** Ohio
   - **Plan:** Free
5. Click **"Advanced"** → **"Environment"**
6. Add these variables:
   ```
   MONGODB_URL=mongodb://admin:password123@crud-dd-mongodb:27017/dd_db?authSource=admin
   NODE_ENV=production
   PORT=8080
   ```
   Replace `crud-dd-mongodb` with your actual MongoDB service name
7. Click **"Deploy"**
8. **Note the backend URL** (looks like `https://crud-dd-backend.onrender.com`)

### Service 3: Deploy Frontend

1. **Render Dashboard** → **New +** → **Web Service**
2. Choose **"Deploy an existing image"**
3. Enter image: `shashwatxdarshan/crud-dd-frontend:latest`
4. Fill in details:
   - **Name:** `crud-dd-frontend`
   - **Region:** Ohio
   - **Plan:** Free
5. Click **"Advanced"** → **"Environment"**
6. Add this variable:
   ```
   BACKEND_URL=https://crud-dd-backend.onrender.com
   ```
7. Click **"Deploy"**

### Service 4 (Optional): Add Custom Domain

1. Go to frontend service settings
2. Click **"Add Custom Domain"**
3. Enter your domain

## Testing

Once all 3 services are live:

```bash
# Test MongoDB
curl https://crud-dd-mongodb.onrender.com

# Test Backend API
curl https://crud-dd-backend.onrender.com/api/tutorials

# Test Frontend
Open: https://crud-dd-frontend.onrender.com
```

## Important Notes

⚠️ **Render Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-45 seconds
- Limited CPU and RAM

### Service Communication

Services communicate via Render's internal network:
- **Backend** connects to MongoDB using internal service name: `crud-dd-mongodb`
- **Frontend** calls Backend via public URL: `https://crud-dd-backend.onrender.com`

### Environment Variables Explained

| Service | Variable | Value |
|---------|----------|-------|
| **MongoDB** | `MONGO_INITDB_ROOT_USERNAME` | `admin` (or any username) |
| **MongoDB** | `MONGO_INITDB_ROOT_PASSWORD` | Strong password (change this!) |
| **Backend** | `MONGODB_URL` | Connection string to MongoDB service |
| **Backend** | `NODE_ENV` | `production` |
| **Backend** | `PORT` | `8080` |
| **Frontend** | `BACKEND_URL` | Backend service URL |

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify MongoDB service is live and healthy
- Check connection string has correct service name
- Verify username/password matches MongoDB environment variables
- Wait 10+ seconds for MongoDB to initialize

### "Frontend cannot reach Backend"
- Verify Backend URL is correct in Frontend environment
- Check CORS is enabled in Backend
- Wait for all services to be fully started

### Services won't start
- Check Render build/deployment logs
- Verify Docker image names are correct
- Check environment variables syntax

## Cleanup

To delete a service:
1. Go to service → **Settings**
2. Click **"Delete Service"**

## Cost

Free tier:
- 750 hours/month per service × 3 = 2,250 total hours
- ✅ Covers 24/7 usage for all 3 services

Upgrade to paid for:
- Always-on services (no spin-down)
- More resources (CPU, RAM)
- Better performance

---

## Alternative: Single Multi-Service Setup

If you need MongoDB, Backend, and Frontend in a **single deployment**:

Use **Railway.app** or **Heroku** instead - they handle docker-compose better.

For Render, separate services is the recommended approach.
