# Environment Variables Setup Guide

## For Render.app Deployment

### Step 1: Get MongoDB Atlas Connection String

1. **Go to MongoDB Atlas:** https://mongodb.com/atlas
2. **Sign up** (use GitHub or email - both free)
3. **Create a FREE cluster:**
   - Platform: AWS
   - Region: Choose closest to you
   - Click "Create Cluster"
   - Wait 5-10 minutes for initialization

4. **Get Connection String:**
   - Click green "Connect" button
   - Choose "Drivers"
   - Select "Node.js" and version "3.6 or later"
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Create Database User (if not created):**
   - Click "Database Access"
   - Click "Add New Database User"
   - Enter username and password
   - Save these credentials

6. **Get Final Connection String:**
   - Replace `<username>` with your username
   - Replace `<password>` with your password
   - Replace `?retryWrites=true...` with `dd_db?retryWrites=true&w=majority`
   
   **Final format:**
   ```
   mongodb+srv://myuser:mypass@cluster0.abc123.mongodb.net/dd_db?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend on Render

1. **Go to Render:** https://render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub:** Select `TASK-Discover-Dollar-Inc` repo
4. **Fill in Service Details:**
   - Name: `crud-dd-backend`
   - Environment: `Docker`
   - Region: `Ohio` (default)
   - Plan: `Free`

5. **Click "Advanced" and go to "Environment"**
6. **Copy and Paste the Backend Variables:**

```
MONGODB_URL=mongodb+srv://myuser:mypass@cluster0.abc123.mongodb.net/dd_db?retryWrites=true&w=majority
NODE_ENV=production
PORT=8080
```

7. **Click "Deploy Web Service"**
8. **Wait 5-10 minutes** for deployment
9. **Copy the backend URL** - it will look like:
   ```
   https://crud-dd-backend.onrender.com
   ```

### Step 3: Deploy Frontend on Render

1. **Click "New +" → "Web Service"** (again)
2. **Connect GitHub:** Select `TASK-Discover-Dollar-Inc` repo
3. **Fill in Service Details:**
   - Name: `crud-dd-frontend`
   - Environment: `Docker`
   - Region: `Ohio`
   - Plan: `Free`

4. **Click "Advanced" and go to "Environment"**
5. **Paste this variable:**
   ```
   BACKEND_URL=https://crud-dd-backend.onrender.com
   ```
   (Use the actual URL you got from backend deployment)

6. **Click "Deploy Web Service"**
7. **Wait 5-10 minutes** for deployment
8. **You'll get frontend URL:**
   ```
   https://crud-dd-frontend.onrender.com
   ```

### Step 4: Test

```bash
# Test Backend
curl https://crud-dd-backend.onrender.com/api/tutorials

# Test Frontend
Open in browser: https://crud-dd-frontend.onrender.com
```

---

## Environment Variables Reference

### Backend Service (.env)
| Variable | Value | Example |
|---|---|---|
| `MONGODB_URL` | MongoDB Atlas connection string | `mongodb+srv://...@cluster0.mongodb.net/dd_db...` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port | `8080` |

### Frontend Service (.env)
| Variable | Value | Example |
|---|---|---|
| `BACKEND_URL` | Backend API base URL | `https://crud-dd-backend.onrender.com` |

---

## Troubleshooting

### Backend shows "Cannot connect to the database"
**Problem:** MongoDB connection fails
**Solution:**
1. Check MongoDB connection string is correct
2. In MongoDB Atlas → "Network Access" → Add IP: `0.0.0.0/0` (allows all IPs)
3. Check username/password in connection string
4. Check database name is `dd_db`

### Frontend cannot reach backend
**Problem:** API calls fail with CORS or connection error
**Solution:**
1. Verify backend URL in frontend environment: `https://crud-dd-backend.onrender.com`
2. Check CORS is enabled in backend (`backend/server.js`)
3. Wait 2-3 minutes after backend deployment
4. Test directly: `curl https://crud-dd-backend.onrender.com/api/tutorials`

### Services won't deploy
**Problem:** Deployment fails with build error
**Solution:**
1. Check Render deployment logs (in console)
2. Verify Dockerfile paths are correct
3. Check for typos in environment variables
4. Ensure repository is public or Render has access

---

## Copy-Paste Templates

### Backend Environment Variables
```
MONGODB_URL=mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.mongodb.net/dd_db?retryWrites=true&w=majority
NODE_ENV=production
PORT=8080
```

### Frontend Environment Variables
```
BACKEND_URL=https://crud-dd-backend.onrender.com
```

---

**Note:** Keep your MongoDB credentials secure. Never commit `.env` files with real credentials to version control. Use Render's environment variable management for sensitive data.
