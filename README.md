# MEAN DevOps Assignment (CRUD Tutorials App)

A complete DevOps implementation of a full-stack MEAN application with containerization, CI/CD pipeline, and cloud deployment.

**Technology Stack:**
- **Backend**: Node.js + Express REST API (Port 8080)
- **Frontend**: Angular 15 SPA with Nginx reverse proxy (Port 80)
- **Database**: MongoDB (Docker container on Port 27017)
- **Orchestration**: Docker Compose v3.8
- **CI/CD**: GitHub Actions (automated build, push, deploy)
- **Cloud**: Ubuntu VM on AWS/Azure/GCP with Docker & Nginx

**Key Features:**
- ✅ Multi-stage Docker builds for optimized images
- ✅ Health checks for all services
- ✅ Automated CI/CD pipeline with GitHub Actions
- ✅ Environment-based configuration
- ✅ Nginx reverse proxy on single port (80)
- ✅ Production-ready deployment scripts

## 1. Repository Structure

```
crud-dd-task-mean-app/
├── backend/
│   ├── Dockerfile                 # Multi-stage Node.js build
│   ├── .dockerignore
│   ├── .env.example
│   ├── server.js                  # Express server
│   ├── package.json
│   └── app/
│       ├── config/db.config.js    # MongoDB config (env vars)
│       ├── controllers/
│       ├── models/
│       └── routes/
├── frontend/
│   ├── Dockerfile                 # Multi-stage Angular + Nginx
│   . System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Browser                            │
│                     (http://<VM-IP>)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP Port 80
                         ▼
        ┌────────────────────────────────────┐
        │      Nginx Reverse Proxy            │
        │    (frontend-app container)         │
        │      - Static files (/)             │
        │      - Proxy /api/* to backend      │
        └────────┬──────────────┬─────────────┘
                 │ Port 3000    │ Port 8080
                 ▼              ▼
        ┌──────────────┐  ┌──────────────────┐
        │ Angular SPA  │  │ Express Backend  │
        │  (port 80)   │  │  (port 8080)     │
        └──────────────┘  └────────┬──────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │  MongoDB         │
                          │ (port 27017)     │
                          └──────────────────┘
```

**Data Flow:**
1. User accesses `http://<VM-IP>/`
2. Nginx serves Angular UI
3. Angular app calls `/api/tutorials` (Nginx proxies to backend)
4. Backend queries MongoDB via internal Docker network
5. Response flows back through the stack └── setup-vm.sh                # Ubuntu VM setup script
├── docker-compose.yml             # Production orchestration
├── .gitignore
└── README.md                       # This file
```

## 2) Architecture

```text
User Browser
    |
    v
Port 80 (Nginx container - frontend service)
    |-- /            -> Angular static files
    |-- /api/*       -> backend:8080 (Express)
                          |
                          v
                     MongoDB:27017
```

## 3. Prerequisites

**Local Development:**
- Git (for version control)
- Docker Desktop or Docker Engine (v20+)
- Docker Compose (v2.0+)
- Node.js v18+ (optional, for local development only)
- npm/yarn (optional)
. Push Code to GitHub

Create a new repository on GitHub, then:

```bash
# From project root
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial MEAN DevOps assignment setup with Dockerfile and CI/CD"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
git push -u origin main
```

**Verify:**
- Check GitHub repo contains Dockerfile, docker-compose.yml, .github/workflows/
- All code is properly committed
DOCKER_USERNAME       # Your Docker Hub username
DOCKER_PASSWORD       # Docker Hub access token (NOT password)
VM_HOST               # Public IP of Ubuntu VM
VM_USER               # SSH user (typically 'ubuntu')
VM_SSH_KEY            # Private SSH key for VM access
```

## 4) Create and Push GitHub Repository

Run from project root:

```bash
git init
git . Local Testing with Docker Compose

### Build and Start
```bash
# From project root
docker-compose up --build -d

# Wait 10-15 seconds for services to initialize
sleep 15

# Check status
docker-compose ps
```

**Expected output:**
```
CONTAINER ID   IMAGE                    COMMAND                  STATUS
xxx . Docker Images - Build & Push Manual

### Build Images
```bash
DOCKER_USERNAME="your-docker-username"

docker build -t $DOCKER_USERNAME/crud-dd-backend:latest ./backend
docker build -t $DOCKER_USERNAME/crud-dd-frontend:latest ./frontend

# Verify images created
docker images | grep crud-dd
```

**Expected image sizes:**
- Backend: ~150-200 MB (Node.js + dependencies)
- Frontend: ~20-30 MB (Nginx + Angular build)

### Push to Docker Hub
```b. Ubuntu VM Setup & Deployment

### Step 1: Launch Ubuntu VM
Create a **Ubuntu 22.04 LTS** instance on your cloud provider:

**AWS EC2 Example:**
```bash
# Instance type: t2.micro
# Storage: 20 GB
# Security Group: Allow SSH (22) and HTTP (80) from anywhere
# Download SSH key pair
```

**GCP Compute Engine Example:**
```bash
# Machine type: e2-micro
# Boot disk: Ubuntu 22.04 LTS, 20GB
# Firewall: Allow HTTP, HTTPS, SSH
```

### Step 2: Connect & Setup Docker
```bash
# SSH into VM
ssh . Nginx Reverse Proxy Configuration

### Config Location
File: [frontend/nginx.conf](frontend/nginx.conf)

### How It Works

```nginx
┌─ Port 80 (Nginx Container) ──────────────┐
│                                           │
│  Location /          → /usr/share/nginx/html (Angular)
│  Location /api/*     → http://backend:8080 (Express)
│  Location /health    → Health check endpoint
│                                           │
└───────────────────────────────────────────┘
```

### Key Features
- **SPA Routing**: HTML5 history mode - all routes fallback to index.html
- **Compression**: Gzip enabled for JS, CSS, JSON
- **Caching**: 
  - Assets (JS/CSS/images): 1 year cache
  - HTML: No cache (always fresh)
- **Health Check**: `/health` endpoint for container monitoring

### Testing Nginx
```bash
# From VM or local machine
curl -v http://localhost/
# Should return Angular index.html

curl http://localhost/api/tutorials
# Should return JSON from backend
``
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login for docker group changes
exit
ssh -i ~/path/to/key.pem ubuntu@<VM-PUBLIC-IP>
```

### Step 3: Clone Repository
```bash
cd ~
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git crud-app
cd crud-app
```

### Step 4: Configure & Start
```bash
# Create config file
cat > .env << EOF
MONGODB_URL=mongodb://mongodb:27017/dd_db
NODE_ENV=production
BACKEND_IMAGE=<your-username>/crud-dd-backend:latest
FRONTEND_IMAGE=<your-username>/crud-dd-frontend:latest
EOF

# Pull latest images
docker-compose pull

# Start services
docker-compose up -d

# Wait for startup and verify
sleep 15
docker-compose ps

# Verify connectivity
curl http://localhost/
curl http://localhost/api/tutorials
```

### Step 5: Test from Browser
```
Open in browser: http://<VM-PUBLIC-IP>/
- Should load Angular UI
- Try adding/editing/deleting tutorials
- Data persists in MongoDB

### View Logs
```bash
docker-compose logs -f backend     # Backend logs
docker-compose logs -f frontend    # Frontend (Nginx) logs
docker-compose logs -f mongodb     # MongoDB logs
```

### Stop and Clean Up
```bash
docker-compose down              # Stop containers (keep data)
docker-compose down -v           # Stop containers (remove volumes)
- Angular UI loads
- CRUD actions call `/api/tutorials`

Stop stack:

```bash
docker compose down
```

## 6) Docker Image Build and Push (Manual Validation)

```bash
docker build -t <dockerhub-user>/crud-dd-mean-backend:latest ./backend
docker build -t <dockerhub-user>/crud-dd-mean-frontend:latest ./frontend

docker login
docker push <dockerhub-user>/crud-dd-mean-backend:latest
docker push <dockerhub-user>/crud-dd-mean-frontend:latest
```

## 7) Ubuntu VM Setup

SSH into VM and run:

```bash
chmod +x deploy/setup-vm.sh
./deploy/setup-vm.sh /opt/mean-devops-assignment https://github.com/<your-username>/<your-repo>.git
```

Logout and login again (docker group refresh), then:

```bash
cd /opt/mean-devops-assignment
cp .env.example .env
```

Update `.env` with your Docker Hub image names and run:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## 8) Nginx Reverse Proxy

Nginx config is at `frontend/nginx/default.conf`:

- `/` serves Angular SPA
- `/api/` proxies to backend service (`backend:8080`)
- Public access is only through port `80`

## 9. CI/CD Pipeline with GitHub Actions

### Workflow File
Location: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

### Pipeline Stages

**Trigger:** Push to `main` branch

**Stage 1: Build**
- Checkout code
- Setup Docker Buildx
- Login to Docker Hub
- Build backend image with layer caching
- Build frontend image with layer caching
- Push both images to Docker Hub (tagged with `latest` + commit SHA)

**Stage 2: Deploy** (only if build succeeds)
- SSH into Ubuntu VM
- Pull latest Docker images
- Stop old containers: `docker-compose down`
- Start new containers with latest images
- Wait for services to become healthy
- Verify frontend and API are accessible

### Required GitHub Secrets

Add these secrets to your GitHub repository:

1. **DOCKER_USERNAME**
   - Your Docker Hub username
   - ⚠️ NOT your email

2. **DOCKER_PASSWORD**
   - Docker Hub access token (NOT password)
   - Create at: https://hub.docker.com/settings/security

3. **VM_HOST**
   - Public IP address of your Ubuntu VM
   - Example: `54.123.45.67`

4. **VM_USER**
   - SSH username (usually `ubuntu` for Ubuntu VMs)
   - AWS: `ubuntu` or `ec2-user`
   - GCP: `ubuntu`

5. **VM_SSH_KEY**
   - Private SSH key (full contents)
   - Copy entire file content: `cat ~/.ssh/id_rsa`
   - Include BEGIN and END lines

### How to Add Secrets
```
GitHub Repo → Settings → Secrets and variables → Actions → New repository secret
```

### Monitor Pipeline Execution
1. Push changes to main branch
2. Go to: https://github.com/<username>/<repo>/actions
3. Click latest workflow run
4. Watch real-time build logs
5. Verify images appear on Docker Hub

### Pipeline Output Example
```
✓ Build and push Backend ........................... 2m 15s
✓ Build and push Frontend ........................... 1m 45s
✓ Deploy to VM .................................... 30s
  - Pull latest images
  - Restart docker-compose
  - Verify services healthy
✓ Verify Deployment ............................... 5s
```

## 10. Development & Debugging

### Local Development (Without Docker)

**Backend Standalone:**
```bash
cd backend
npm install
node server.js
# Requires MongoDB running on localhost:27017
```

**Frontend Dev Server:**
```bash
cd frontend
npm install
npm start
# Launches at http://localhost:4200 with live reload
# Proxies /api calls to http://localhost:8080
```
. Screenshots for Submission

Please include the following screenshots in your submission:

### 1. GitHub Repository Setup
- [ ] Repository page showing Dockerfile, docker-compose.yml, .github/workflows/
- [ ] Git commit history showing deployment files

### 2. CI/CD Pipeline Configuration
- [ ] GitHub Actions workflow file (.github/workflows/deploy.yml)
- [ ] GitHub repository Secrets configuration (with hidden values)
- [ ]. Quick Reference Commands

### Docker Compose
```bash
docker-compose up -d                 # Start all services
docker-compose down                  # Stop all services
docker-compose ps                    # List services
docker-compose logs -f               # Follow all logs
docker-compose down -v               # Stop and remove volumes
docker-compose up --build -d backend # Rebuild and restart backend
```

### Docker Registry
```bash
docker login                         # Login to Docker Hub
docker build -t user/image:tag .     # Build image
docker push user/image:tag           # Push to registry
docker pull user/image:tag           # Pull from registry
docker images                        # List local images
docker rmi image:tag                 # Remove image
```

### Ubuntu VM (SSH)
```bash
ssh -i key.pem ubuntu@<IP>           # Connect to VM
docker-compose pull                  # Update images from Hub
docker-compose up -d                 # Start containers
docker ps                            # List running containers
docker logs container-name           # View container logs
```

### Monitoring
```bash
curl http://localhost/               # Test frontend
curl http://localhost/api/tutorials  # Test API
docker-compose stats                 # CPU/Memory usage
docker network inspect <network>     # Network details
```

### Cleanup
```bash
docker system prune                  # Remove unused images/containers
docker system prune -a --volumes     # Full cleanup
docker volume rm mongo_data          # Remove MongoDB data
### 4. Docker Images on Hub
- [ ] Docker Hub repository page
- [ ] Both images listed (backend and frontend)
- [ ] Tags showing `latest` and commit SHA
- [ ] Image sizes and pull statistics

### 5. Docker Compose Locally
- [ ] Terminal output: `docker-compose build`
- [ ] Terminal output: `docker-compose up -d`
- [ ] Terminal output: `docker-compose ps` (showing all healthy)
- [ ] Browser: Angular UI loaded at `http://localhost`

### 6. VM Deployment
- [ ] Terminal: SSH into VM (IP address visible)
- [ ] Terminal: `docker ps` showing all running containers
- [ ] Terminal: `curl http://localhost/` returning HTML
- [ ] Terminal: `curl http://localhost/api/tutorials` returning JSON

### 7. Application UI Working
- [ ] Browser: Application loaded from VM public IP
- [ ] Browser: Add Tutorial button working
- [ ] Browser: Tutorial list showing
- [ ] Browser: Edit/Delete functionality working

### 8. Infrastructure & Monitoring
- [ ] Cloud provider console showing VM details (IP, status, ports)
- [ ] Nginx configuration file shown in editor
- [ ] docker-compose.yml file shown in editor
- [ ] Backend server logs showing requests

### 9. End-to-End Test
- [ ] Add a new tutorial via UI
- [ ] Backend API returns the new tutorial
- [ ] Data persists in MongoDB
- [ ] All CRUD operations working (Create, Read, Update, Delete)
docker-compose logs -f mongodb     # MongoDB logs

# Connect to container shell
docker-compose exec backend sh
docker-compose exec mongodb mongosh

# Check container health
docker inspect <container-name> | grep -A 10 '"Health"'

# View network
docker network ls
docker network inspect crud-dd-task-mean-app_crud-network

# Rebuild specific service
docker-compose up -d --build backend
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Wait 15s for MongoDB health check to pass |
| Frontend shows 404 | Verify Nginx config in frontend/nginx.conf |
| API calls fail from frontend | Check backend health: `curl localhost:8080/` |
| Disk space full on VM | Run `docker system prune -a --volumes` |
| Images not updating | Clear cache: `docker-compose down -v && docker-compose up --build` |

## 11) Screenshots Checklist (For Submission)

Add screenshots in your submission/README showing:

- GitHub Actions workflow configuration
- Successful CI/CD workflow run logs
- Docker image build + push in Docker Hub
- Ubuntu VM running containers (`docker ps`)
- App UI working from VM public IP on port 80
- Nginx reverse proxy config and deployment details

## 12) Useful Commands

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
docker compose -f docker-compose.prod.yml ps
```
