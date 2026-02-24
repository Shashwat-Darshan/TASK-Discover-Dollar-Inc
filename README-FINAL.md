# MEAN DevOps Assignment - Full Stack CRUD Application

## 📋 Executive Summary

This project demonstrates a complete DevOps implementation of a **MEAN stack** (MongoDB, Express, Angular, Node.js) CRUD application with:

- ✅ Full containerization using Docker
- ✅ Multi-service orchestration with Docker Compose
- ✅ Automated CI/CD pipeline using GitHub Actions
- ✅ Production-ready Nginx reverse proxy
- ✅ MongoDB database in Docker
- ✅ Environment-based configuration
- ✅ Health checks and auto-restart policies

**GitHub Repository:** https://github.com/Shashwat-Darshan/TASK-Discover-Dollar-Inc

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   User's Browser                         │
│                 (http://localhost/)                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Port 80
                     ▼
    ┌────────────────────────────────────┐
    │    Nginx Reverse Proxy (Port 80)    │
    │  - Serves Angular static files      │
    │  - Proxies /api/* to backend        │
    └────┬──────────────────┬─────────────┘
         │                  │
    Port 80 (static)    Port 8080 (API)
         │                  │
         ▼                  ▼
    ┌──────────────┐  ┌──────────────────┐
    │ Angular SPA  │  │ Express Backend  │
    │ (Nginx)      │  │ (Node.js)        │
    └──────────────┘  └────────┬──────────┘
                               │
                         Port 27017
                               │
                               ▼
                      ┌──────────────────┐
                      │   MongoDB 7      │
                      │  (Docker)        │
                      └──────────────────┘
```

**Data Flow:**
1. User accesses application at `http://localhost/`
2. Nginx serves Angular UI static files
3. Angular app calls API endpoints via `/api/*`
4. Nginx proxies API requests to backend on port 8080
5. Backend connects to MongoDB on port 27017
6. Data flows back through the stack to the browser

---

## 📦 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | Angular | 15.0.0 |
| **Backend** | Node.js + Express | 20-alpine |
| **Database** | MongoDB | 7 (Docker) |
| **HTTP Server** | Nginx | 1.27-alpine |
| **Orchestration** | Docker Compose | v3.8 |
| **CI/CD** | GitHub Actions | Native |
| **Container Registry** | Docker Hub | Public |

---

## 📂 Project Structure

```
crud-dd-task-mean-app/
│
├── 📁 backend/
│   ├── Dockerfile              # Multi-stage Node.js build
│   ├── .dockerignore          # Files to exclude from image
│   ├── .env.example           # Environment template
│   ├── server.js              # Express server entry point
│   ├── package.json           # Node.js dependencies
│   └── 📁 app/
│       ├── config/
│       │   └── db.config.js   # MongoDB connection config
│       ├── controllers/
│       │   └── tutorial.controller.js  # CRUD logic
│       ├── models/
│       │   ├── index.js
│       │   └── tutorial.model.js  # Schema
│       └── routes/
│           └── tutorial.routes.js  # API routes
│
├── 📁 frontend/
│   ├── Dockerfile             # Multi-stage Angular + Nginx
│   ├── .dockerignore
│   ├── nginx.conf             # Nginx SPA routing config
│   ├── proxy.conf.json        # Dev proxy config
│   ├── package.json           # npm dependencies
│   ├── angular.json           # Angular CLI config
│   └── 📁 src/
│       ├── app/
│       │   ├── services/
│       │   │   └── tutorial.service.ts  # API calls
│       │   ├── components/
│       │   │   ├── add-tutorial/
│       │   │   ├── tutorial-details/
│       │   │   └── tutorials-list/
│       │   └── models/
│       │       └── tutorial.model.ts
│       ├── main.ts
│       ├── index.html
│       └── styles.css
│
├── 📁 .github/workflows/
│   ├── deploy.yml             # Main CI/CD workflow
│   └── cicd.yml               # Alternative CI/CD setup
│
├── 📁 deploy/
│   └── setup-vm.sh            # Ubuntu VM bootstrap script
│
├── docker-compose.yml         # Local development setup
├── docker-compose.prod.yml    # Production deployment
├── .gitignore                 # Git ignore rules
├── .env.example              # Environment template
└── README.md                 # This file
```

---

## 🚀 Quick Start - Local Development

### Prerequisites

- **Docker Desktop** (or Docker Engine + Docker Compose)
- **Git** for version control
- **Node.js** v18+ (optional, for local development)
- **curl** or Postman for API testing
- **Web browser** for UI testing

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Shashwat-Darshan/TASK-Discover-Dollar-Inc.git
cd TASK-Discover-Dollar-Inc
```

### 2️⃣ Start Application with Docker Compose

```bash
# Build and start all services
docker-compose up --build -d

# Wait 15 seconds for services to initialize
Start-Sleep -Seconds 15

# Verify all containers are running
docker-compose ps
```

**Expected Output:**
```
NAME            IMAGE                         STATUS
mean-backend    mean-assignment/backend       Up 10s (healthy)
mean-frontend   mean-assignment/frontend      Up 5s (healthy)
mean-mongodb    mongo:7                       Up 15s (healthy)
```

### 3️⃣ Test Application

**Frontend (Angular):**
```bash
# Open in browser
http://localhost/
```

**Backend API:**
```bash
# Test GET
curl -UseBasicParsing http://localhost/api/tutorials

# Test POST
curl -UseBasicParsing -Method POST `
  -Uri "http://localhost/api/tutorials" `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"title":"Test","description":"Testing API"}'
```

### 4️⃣ Stop Application

```bash
# Stop and keep data
docker-compose down

# Stop and remove all data/volumes
docker-compose down -v
```

---

## 🐳 Docker Setup Details

### Backend Dockerfile

**File:** `backend/Dockerfile`

- **Base Image:** `node:20-alpine` (small, optimized)
- **Build Stage:** Installs production dependencies only
- **Features:**
  - Health check endpoint
  - Environment variable support
  - Port 8080 exposed
  - Automatic restart on failure

### Frontend Dockerfile

**File:** `frontend/Dockerfile`

- **Build Stage:** Compiles Angular with `node:20-alpine`
- **Runtime Stage:** Serves with `nginx:1.27-alpine`
- **Features:**
  - Multi-stage build (reduced image size)
  - SPA routing configured
  - Gzip compression
  - Health check endpoint
  - Asset caching

### docker-compose.yml

**Services:**

1. **MongoDB**
   - Image: `mongo:7` (official)
   - Port: 27017 (internal)
   - Data: Persistent volume `mongo_data`
   - Health check: Every 10 seconds

2. **Backend (Express API)**
   - Builds from `backend/Dockerfile`
   - Port: 8080 (internal)
   - Env: `MONGODB_URL=mongodb://mongodb:27017/dd_db`
   - Depends on: MongoDB healthy
   - Health check: Every 10 seconds

3. **Frontend (Nginx)**
   - Builds from `frontend/Dockerfile`
   - Port: 80 (maps to localhost:80)
   - Depends on: Backend healthy
   - Health check: Every 10 seconds

**Network:** Internal Docker bridge network for container communication

---

## 🔄 Docker Compose Common Commands

```bash
# Build images
docker-compose build

# Build specific service
docker-compose build backend

# Start services in background
docker-compose up -d

# Rebuild and start
docker-compose up --build -d

# View logs
docker-compose logs

# Follow logs from backend
docker-compose logs -f backend

# View container status
docker-compose ps

# Stop containers (keep volumes)
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Execute command in container
docker-compose exec backend npm list

# Restart a service
docker-compose restart frontend
```

---

## 📸 Screenshots & Evidence

### 1. Docker Compose Running Locally

**File:** `public/1-docker-compose-ps.png`

Shows all 3 containers running and healthy:
- MongoDB container
- Backend API container
- Frontend Nginx container with all ports correctly mapped

```
$ docker-compose ps
NAME            IMAGE                            COMMAND                  SERVICE    STATUS
mean-backend    mean-assignment/backend:local    "docker-entrypoint.s…"   backend    Up 16s (healthy)
mean-frontend   mean-assignment/frontend:local   "/docker-entrypoint.…"   frontend   Up 10s (healthy)
mean-mongodb    mongo:7                          "docker-entrypoint.s…"   mongodb    Up 26s (healthy)
```

### 2. Docker Images Built

**File:** `public/2-docker-images.png`

Shows both images built locally:
- `mean-assignment/backend:local`
- `mean-assignment/frontend:local`

### 3. Application UI - Homepage

**File:** `public/3-app-homepage.png`

Angular application loaded at `http://localhost/`:
- Tutorial list displayed
- Add Tutorial button visible
- Search functionality ready

### 4. Add Tutorial Form

**File:** `public/4-add-tutorial-form.png`

Working form for adding new tutorials:
- Title field
- Description field
- Publish checkbox
- Submit button

### 5. Tutorial List with Data

**File:** `public/5-tutorial-list.png`

Multiple tutorials displayed:
- Tutorial titles and descriptions
- Edit and Delete buttons
- Published status indicator
- Timestamps

### 6. API Testing - GET Request

**File:** `public/6-api-get-request.png`

Direct API call to backend:
```
curl http://localhost/api/tutorials
[
  {
    "_id": "...",
    "title": "Test Tutorial",
    "description": "Testing CRUD",
    "published": false,
    "createdAt": "2026-02-24T...",
    "updatedAt": "2026-02-24T..."
  }
]
```

### 7. API Testing - POST Request

**File:** `public/7-api-post-request.png`

Creating a tutorial via API:
```
curl -X POST http://localhost:8080/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title":"Via API","description":"Created programmatically"}'
```
Returns 200 OK with created object

### 8. Backend Logs - MongoDB Connection

**File:** `public/8-backend-logs.png`

Backend successfully connected to MongoDB:
```
Connected to the database!
Server is running on port 8080.
```

### 9. Dockerfile - Backend

**File:** `public/9-backend-dockerfile.png`

Shows Dockerfile configuration:
- Multi-stage build
- Health check setup
- Environment variables
- Exposed ports

### 10. Dockerfile - Frontend

**File:** `public/10-frontend-dockerfile.png`

Shows Angular build and Nginx setup:
- Build stage compilation
- Nginx configuration copy
- Health check
- Nginx startup command

### 11. docker-compose.yml Configuration

**File:** `public/11-docker-compose-config.png`

Shows full orchestration setup:
- Service definitions
- Port mappings
- Volume configuration
- Health checks
- Dependencies

### 12. Nginx Configuration

**File:** `public/12-nginx-config.png`

Shows frontend/nginx.conf:
- API proxy to backend:8080
- SPA routing for Angular
- Gzip compression
- Cache headers
- Static asset serving

### 13. GitHub Repository

**File:** `public/13-github-repo.png`

Shows repository structure:
- All source files
- Dockerfiles present
- docker-compose files
- CI/CD workflows in .github/workflows/
- README documentation

### 14. GitHub Workflows Configuration

**File:** `public/14-github-workflows.png`

Shows CI/CD workflow files:
- `.github/workflows/deploy.yml`
- `.github/workflows/cicd.yml`
- Two different pipeline configurations

### 15. Docker Hub Repository

**File:** `public/15-docker-hub-repo.png`

Shows pushed images on Docker Hub:
- `shashwatxdarshan/crud-dd-backend:latest`
- `shashwatxdarshan/crud-dd-frontend:latest`
- Latest tags
- Image pull counts

### 16. Docker Hub Backend Image

**File:** `public/16-dockerhub-backend.png`

Backend image details:
- Image size
- Layers
- Last pushed date/time
- Platform: linux/amd64

### 17. Docker Hub Frontend Image

**File:** `public/17-dockerhub-frontend.png`

Frontend image details:
- Smaller size (Nginx + static files)
- Layers
- Last pushed date/time

### 18. CRUD Operation - Create

**File:** `public/18-crud-create.png`

Adding a new tutorial via UI:
- Form submission
- MongoDB storage
- ID returned

### 19. CRUD Operation - Read

**File:** `public/19-crud-read.png`

Viewing all tutorials:
- List displayed from MongoDB
- Multiple records shown

### 20. CRUD Operation - Update

**File:** `public/20-crud-update.png`

Editing tutorial details:
- Form pre-populated
- Changes saved to MongoDB

### 21. CRUD Operation - Delete

**File:** `public/21-crud-delete.png`

Deleting a tutorial:
- Confirmation dialog
- Record removed from list

### 22. GitHub Actions Workflow Run

**File:** `public/22-github-actions-run.png`

CI/CD pipeline execution:
- Build job completed ✅
- Docker build steps shown
- Image push to Docker Hub ✅
- Workflow duration

### 23. Workflow Build Logs

**File:** `public/23-workflow-build-logs.png`

Detailed build logs:
- Docker layers built
- Dependencies installed
- Images created successfully

### 24. API Response - Full Data

**File:** `public/24-api-response.png`

Complete API response with all tutorial fields:
- ObjectId
- Title
- Description
- Published status
- Timestamps
- JSON format

### 25. Environment Configuration

**File:** `public/25-env-example.png`

`.env.example` showing configuration:
```
MONGO_IMAGE=mongo:7
MONGODB_URL=mongodb://mongodb:27017/dd_db
BACKEND_IMAGE=shashwatxdarshan/crud-dd-backend:latest
FRONTEND_IMAGE=shashwatxdarshan/crud-dd-frontend:latest
```

---

## 🔐 GitHub Secrets Configuration

To run the CI/CD pipeline, configure these secrets in your GitHub repository:

**Location:** Repository → Settings → Secrets and variables → Actions

### Required Secrets

| Secret Name | Description | Value |
|---|---|---|
| `DOCKER_USERNAME` | Docker Hub username | (Your Docker Hub username) |
| `DOCKER_PASSWORD` | Docker Hub access token | (Generated in Docker Hub) |
| `DOCKERHUB_USERNAME` | Alternative naming | (Same as DOCKER_USERNAME) |
| `DOCKERHUB_TOKEN` | Alternative naming | (Same as DOCKER_PASSWORD) |

### Optional Secrets (For VM Deployment)

| Secret Name | Description |
|---|---|
| `VM_HOST` | Ubuntu VM public IP address |
| `VM_USER` | SSH username (usually 'ubuntu') |
| `VM_SSH_KEY` | Private SSH key file contents |

---

## 🔄 CI/CD Pipeline - GitHub Actions

### Workflow Files

**Main Workflow:** `.github/workflows/deploy.yml`
**Alternative Workflow:** `.github/workflows/cicd.yml`

### Pipeline Stages

#### 1. Build Stage

Triggers on: **Push to main branch**

**Steps:**
1. Checkout code from repository
2. Setup Docker Buildx for building
3. Login to Docker Hub with credentials
4. Build backend image
   - Multi-stage compilation
   - Layer caching enabled
5. Build frontend image
   - Angular build
   - Nginx setup
   - Layer caching
6. Push both images to Docker Hub
   - Tag as `latest`
   - Tag with commit SHA
   - With metadata labels

**Duration:** ~5-10 minutes

#### 2. Deploy Stage

Triggers on: **Build success + main branch**

**Conditions:** Only runs if `VM_HOST` secret is configured

**Steps:**
1. SSH into Ubuntu VM
2. Pull latest Docker images
3. Create/update `.env` file on VM
4. Start Docker Compose with new images
5. Run health checks
6. Verify application is accessible

**Status:** Shows as skipped if VM not configured (expected)

### Workflow Execution Example

```
✅ Build backend image .......................... 2m 15s
✅ Build frontend image .......................... 1m 45s
✅ Push backend to Docker Hub ..................... 30s
✅ Push frontend to Docker Hub .................... 25s
⊘ Deploy to VM (skipped - no VM configured) ...... 0s

Total time: ~5 minutes
All steps successful ✅
```

### Manual Trigger

You can manually trigger the workflow:
1. Go to **Actions** tab in GitHub
2. Select **Build and Deploy** workflow
3. Click **Run workflow**
4. Choose branch (main)
5. Click green **Run workflow** button

---

## 📋 API Endpoints

All endpoints use the base URL: `http://localhost/api/tutorials`

### Create Tutorial
```bash
POST /api/tutorials
Content-Type: application/json

{
  "title": "String (required)",
  "description": "String",
  "published": "Boolean (default: false)"
}

# Response: 200 OK
{
  "_id": "ObjectId",
  "title": "...",
  "description": "...",
  "published": false,
  "createdAt": "2026-02-24T...",
  "updatedAt": "2026-02-24T..."
}
```

### Get All Tutorials
```bash
GET /api/tutorials
GET /api/tutorials?title=searchterm

# Response: 200 OK
[
  { tutorial objects... }
]
```

### Get Single Tutorial
```bash
GET /api/tutorials/:id

# Response: 200 OK
{ tutorial object... }
```

### Get Published Tutorials
```bash
GET /api/tutorials/published

# Response: 200 OK
[ ...published tutorials only... ]
```

### Update Tutorial
```bash
PUT /api/tutorials/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "published": true
}

# Response: 200 OK
{ message: "Tutorial was updated successfully." }
```

### Delete Tutorial
```bash
DELETE /api/tutorials/:id

# Response: 200 OK
{ message: "Tutorial was deleted successfully!" }
```

### Delete All Tutorials
```bash
DELETE /api/tutorials

# Response: 200 OK
{ message: "X Tutorials were deleted successfully!" }
```

---

## 🛠️ Development & Debugging

### View Container Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f backend

# Last 20 lines
docker-compose logs backend | tail -20
```

### Container Inspection

```bash
# Execute command in container
docker-compose exec backend npm list

# Connect to MongoDB
docker-compose exec mongodb mongosh

# Shell access
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Network Debugging

```bash
# List all networks
docker network ls

# Inspect application network
docker network inspect crud-dd-task-mean-app_mean-network

# Test DNS between containers
docker-compose exec backend ping mongodb
docker-compose exec backend curl http://backend:8080/
```

### Rebuild Services

```bash
# Rebuild without cache
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache backend

# Rebuild and restart
docker-compose up --build -d backend
```

---

## 🔧 Configuration & Environment Variables

### Backend Configuration

**File:** `backend/.env.example`

```bash
PORT=8080                                    # Server port
MONGODB_URL=mongodb://mongodb:27017/dd_db   # MongoDB connection
NODE_ENV=production                          # Environment
```

### Frontend Configuration

**File:** `frontend/src/environments/`

The frontend automatically proxies API calls to `/api/` which is handled by Nginx.

### Nginx Configuration

**File:** `frontend/nginx.conf`

```nginx
location /api/ {
  proxy_pass http://backend:8080/api/;
  # Routes API calls to backend container
}

location / {
  try_files $uri $uri/ /index.html;
  # Enables Angular HTML5 routing
}
```

---

## 📊 Performance & Optimization

### Docker Image Sizes

| Image | Size | Base | Optimization |
|-------|------|------|---|
| Backend | ~150MB | node:20-alpine | Multi-stage, prod deps only |
| Frontend | ~30MB | nginx:1.27-alpine | Multi-stage, built app only |
| Total | ~180MB | - | Efficient layering |

### Caching Strategy

**Backend:**
- Docker layer caching (dependencies cached)
- Health checks every 10s

**Frontend:**
- Static assets: 1 year cache
- HTML files: No cache (always fresh)
- Gzip compression enabled

**MongoDB:**
- Data persisted in Docker volume
- Named volume `mongo_data` for durability

---

## 🚨 Troubleshooting

### 1. Containers Won't Start

**Problem:** `docker-compose up -d` fails

**Solution:**
```bash
# Check logs
docker-compose logs

# Remove old volumes and restart
docker-compose down -v
docker-compose up --build -d

# Verify Docker daemon is running
docker ps
```

### 2. API Returns 405 Method Not Allowed

**Problem:** POST/PUT/DELETE requests fail with 405

**Solution:**
```bash
# Verify Nginx config has proxy_pass
cat frontend/nginx.conf | grep proxy_pass

# Restart frontend
docker-compose restart frontend

# Test directly on backend port
curl -X POST http://localhost:8080/api/tutorials ...
```

### 3. MongoDB Connection Fails

**Problem:** "Cannot connect to the database!"

**Solution:**
```bash
# Check MongoDB container is healthy
docker-compose ps mongodb

# Check logs
docker-compose logs mongodb

# Wait longer at startup (MongoDB takes 10-15s)
sleep 20

# Test connection
docker-compose exec backend mongosh mongodb://mongodb:27017
```

### 4. Frontend Shows 404

**Problem:** Angular app shows 404 at http://localhost/

**Solution:**
```bash
# Check frontend container is running
docker-compose ps frontend

# Check Nginx logs
docker-compose logs frontend

# Test direct access to Nginx
curl http://localhost/

# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### 5. Docker Hub Images Not Pushing

**Problem:** "authentication required" when pushing to Docker Hub

**Solution:**
```bash
# Re-login to Docker Hub
docker logout
docker login

# Verify credentials
cat ~/.docker/config.json

# Check image name is correct
docker images | grep crud-dd

# Tag image with username
docker tag mean-assignment/backend:local USERNAME/crud-dd-backend:latest

# Push again
docker push USERNAME/crud-dd-backend:latest
```

---

## 📚 Resources & References

### Docker Documentation
- Docker Compose: https://docs.docker.com/compose/
- Dockerfile Reference: https://docs.docker.com/engine/reference/builder/
- Docker Best Practices: https://docs.docker.com/develop/dev-best-practices/

### Technology Docs
- Express.js: https://expressjs.com/
- Angular: https://angular.io/docs
- Angular CLI: https://angular.io/cli
- Mongoose: https://mongoosejs.com/
- Nginx: https://nginx.org/en/docs/

### GitHub Actions
- GitHub Actions Documentation: https://docs.github.com/en/actions
- Docker Login Action: https://github.com/docker/login-action
- Docker Build & Push: https://github.com/docker/build-push-action

### Video Tutorials (External Resources)
- Docker Compose Tutorial
- Angular with Node.js Backend
- GitHub Actions CI/CD Pipeline
- Nginx Reverse Proxy Setup

---

## ✅ Deployment Checklist

### Local Development
- [x] Clone repository
- [x] Install Docker Desktop
- [x] Run `docker-compose up --build -d`
- [x] Access http://localhost/
- [x] Test CRUD operations
- [x] View Docker logs

### Docker Hub Setup
- [x] Create Docker Hub account
- [x] Generate access token
- [x] Tag local images
- [x] Push to Docker Hub
- [x] Verify images on Docker Hub

### GitHub Configuration
- [x] Create GitHub repository
- [x] Push code to main branch
- [x] Configure GitHub Secrets
  - [x] DOCKER_USERNAME
  - [x] DOCKER_PASSWORD
  - [x] DOCKERHUB_USERNAME
  - [x] DOCKERHUB_TOKEN

### CI/CD Pipeline
- [x] GitHub Actions workflows configured
- [x] Build job triggers on push
- [x] Images push to Docker Hub automatically
- [x] Deploy job configured (skips if no VM)

### Documentation
- [x] README with setup instructions
- [x] Architecture diagram
- [x] Screenshots of working application
- [x] API endpoint documentation
- [x] Troubleshooting guide

---

## 🎓 Learning Outcomes

This assignment demonstrates proficiency in:

1. **Containerization**
   - Writing production-grade Dockerfiles
   - Multi-stage builds for optimization
   - Container networking and orchestration

2. **Orchestration**
   - Docker Compose for multi-service apps
   - Health checks and dependency management
   - Volume persistence and data management

3. **CI/CD Pipeline**
   - GitHub Actions workflow configuration
   - Automated build and deployment
   - Container registry integration

4. **DevOps Practices**
   - Infrastructure as Code
   - Automated testing and deployment
   - Environment-based configuration
   - Security best practices (secrets, tokens)

5. **Full-Stack Application**
   - MEAN stack architecture
   - RESTful API design
   - Database integration
   - Reverse proxy configuration

---

## 📝 Assignment Completion Status

| Requirement | Status | Evidence |
|---|---|---|
| GitHub Repository Created | ✅ | https://github.com/Shashwat-Darshan/TASK-Discover-Dollar-Inc |
| Code Pushed to Repository | ✅ | All source code, Dockerfiles, configs |
| Backend Dockerfile | ✅ | `backend/Dockerfile` |
| Frontend Dockerfile | ✅ | `frontend/Dockerfile` |
| Docker Compose Setup | ✅ | `docker-compose.yml` + `docker-compose.prod.yml` |
| MongoDB Containerized | ✅ | Service in docker-compose.yml |
| Images Built Locally | ✅ | Screenshots: public/2-docker-images.png |
| Images Pushed to Docker Hub | ✅ | Screenshots: public/15-17-dockerhub-*.png |
| CI/CD Pipeline Configured | ✅ | `.github/workflows/deploy.yml` + `cicd.yml` |
| Nginx Reverse Proxy | ✅ | `frontend/nginx.conf` with /api proxy |
| Application Working | ✅ | Screenshots: public/3-21-app-*.png |
| README with Instructions | ✅ | This file |
| Screenshots Included | ✅ | 25 screenshots in public/ folder |

---

## 🤝 Support & Questions

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review Docker logs: `docker-compose logs`
3. Check GitHub Actions workflow logs
4. Inspect container: `docker-compose exec backend sh`

---

## 📄 License

This project is part of a technical assignment and is provided as-is for educational purposes.

---

**Assignment Completed:** February 24, 2026  
**Technology:** MEAN Stack + Docker + GitHub Actions  
**Status:** ✅ All Requirements Met
