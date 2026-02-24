# Assignment Screenshots

This document contains all required screenshots for the DevOps assignment submission.

## 1. GitHub Repository Structure

![GitHub Repository](./screenshots/1-github-repo.png)

**Shows:**
- Repository with all files (Dockerfile, docker-compose.yml, .github/workflows/)
- Complete code structure
- README.md visible

---

## 2. Dockerfile Configuration

### Backend Dockerfile
![Backend Dockerfile](./screenshots/2-backend-dockerfile.png)

**Shows:**
- Multi-stage Docker build
- Node.js base image
- Health checks configured
- Production optimizations

### Frontend Dockerfile
![Frontend Dockerfile](./screenshots/3-frontend-dockerfile.png)

**Shows:**
- Multi-stage build (build + nginx)
- Angular compilation
- Nginx serving the built app

---

## 3. Docker Compose Configuration

![docker-compose.yml](./screenshots/4-docker-compose.png)

**Shows:**
- 3 services: mongodb, backend, frontend
- Port mappings
- Health checks
- Volume persistence
- Network configuration

---

## 4. Local Docker Build & Run

### Build Process
![Docker Compose Build](./screenshots/5-docker-build.png)

**Command:** `docker-compose build`

**Shows:**
- Building backend image
- Building frontend image
- No errors

### Running Containers
![Docker Compose PS](./screenshots/6-docker-ps.png)

**Command:** `docker-compose ps`

**Shows:**
- All 3 containers running (mongodb, backend, frontend)
- All showing "healthy" status
- Correct port mappings (27017, 8080, 80)

---

## 5. Docker Hub - Pushed Images

![Docker Hub Repository](./screenshots/7-dockerhub.png)

**Shows:**
- Both images pushed (crud-dd-backend, crud-dd-frontend)
- Tagged with 'latest'
- Image sizes
- Last pushed timestamp

### Docker Hub Backend Image
![Backend Image Details](./screenshots/8-dockerhub-backend.png)

### Docker Hub Frontend Image
![Frontend Image Details](./screenshots/9-dockerhub-frontend.png)

---

## 6. GitHub Actions CI/CD Pipeline

### Workflow Configuration
![GitHub Actions Workflow](./screenshots/10-workflow-config.png)

**Shows:**
- .github/workflows/deploy.yml file
- Build and deploy jobs
- Docker build/push steps
- VM deployment (if configured)

### Workflow Execution
![Workflow Run](./screenshots/11-workflow-execution.png)

**Shows:**
- Successful workflow run (green checkmarks)
- Build job completed
- Docker images pushed
- Time taken for each step

### Workflow Logs
![Build Logs](./screenshots/12-workflow-logs.png)

**Shows:**
- Detailed build logs
- Docker build output
- Push to Docker Hub success

---

## 7. Application UI - Working Locally

### Homepage
![Application Homepage](./screenshots/13-app-homepage.png)

**URL:** `http://localhost/`

**Shows:**
- Angular application loaded
- Tutorial list interface
- Add button visible

### Add Tutorial
![Add Tutorial Form](./screenshots/14-add-tutorial.png)

**Shows:**
- Add tutorial form
- Title and Description fields
- Submit button

### Tutorial List with Data
![Tutorial List](./screenshots/15-tutorial-list.png)

**Shows:**
- Multiple tutorials displayed
- Edit and Delete buttons
- Published status

### Edit Tutorial
![Edit Tutorial](./screenshots/16-edit-tutorial.png)

**Shows:**
- Edit form with existing data
- Update functionality

### Tutorial Details
![Tutorial Details](./screenshots/17-tutorial-details.png)

**Shows:**
- Individual tutorial view
- All fields displayed

---

## 8. API Testing

### GET Request
![GET API Response](./screenshots/18-api-get.png)

**Command:** `curl http://localhost/api/tutorials`

**Shows:**
- JSON response with tutorials
- Status 200 OK

### POST Request
![POST API Response](./screenshots/19-api-post.png)

**Command:** 
```bash
curl -X POST http://localhost/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing API"}'
```

**Shows:**
- Successful creation
- Returns created object with ID

---

## 9. Nginx Configuration

![Nginx Config](./screenshots/20-nginx-config.png)

**Shows:**
- frontend/nginx.conf file
- Reverse proxy configuration
- `/api/` location block proxying to backend:8080
- SPA routing for Angular

---

## 10. MongoDB Connection

![Backend Logs - MongoDB](./screenshots/21-mongodb-connection.png)

**Command:** `docker-compose logs backend`

**Shows:**
- "Connected to the database!" message
- No connection errors
- Server running on port 8080

### MongoDB Container
![MongoDB Container](./screenshots/22-mongodb-container.png)

**Shows:**
- MongoDB container running
- Port 27017 exposed
- Healthy status

---

## 11. Network & Architecture

![Docker Network Inspect](./screenshots/23-docker-network.png)

**Command:** `docker network inspect crud-dd-task-mean-app_mean-network`

**Shows:**
- All 3 containers on same network
- Internal DNS resolution
- Container IP addresses

---

## 12. Complete CRUD Operations Demo

### Create Operation
![Create Tutorial](./screenshots/24-crud-create.png)

### Read Operation
![Read Tutorials](./screenshots/25-crud-read.png)

### Update Operation
![Update Tutorial](./screenshots/26-crud-update.png)

### Delete Operation
![Delete Tutorial](./screenshots/27-crud-delete.png)

---

## 13. GitHub Repository Secrets (Blurred)

![GitHub Secrets](./screenshots/28-github-secrets.png)

**Shows:**
- DOCKER_USERNAME configured
- DOCKER_PASSWORD configured
- (Values hidden for security)

---

## Summary

✅ All Dockerfiles created and working  
✅ docker-compose.yml orchestrating 3 services  
✅ Images pushed to Docker Hub  
✅ CI/CD pipeline configured with GitHub Actions  
✅ Application running and fully functional  
✅ Nginx reverse proxy working  
✅ MongoDB containerized and connected  
✅ Complete CRUD operations working  

**Total Screenshots:** 28  
**Status:** All requirements met ✅
