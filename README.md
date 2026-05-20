# Simple MERN + DevOps Learning Project

A beginner-friendly Team Task Tracker built with the MERN stack (MongoDB, Express, React, Node.js) and complete DevOps integrations.

## Features
- **Authentication**: Register, Login, JWT auth.
- **Projects**: Create, View, Delete projects.
- **Tasks**: Create, Update Status, Delete tasks.
- **Dashboard**: View statistics (Total Projects, Total Tasks, Completed Tasks).

## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- MongoDB Atlas Account (or local MongoDB)

## Local Development Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file and add MONGO_URI, JWT_SECRET, PORT
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Docker & Local Testing

You can run the entire stack locally using Docker Compose:
```bash
docker-compose up --build
```
This starts a MongoDB container, the Node.js backend on `localhost:5000`, and the React frontend on `localhost:80`.

## Kubernetes (Minikube)

To deploy locally using Minikube:
1. Start Minikube: `minikube start`
2. Create Secrets (for MongoDB URI and JWT Secret):
   ```bash
   kubectl create secret generic app-secrets --from-literal=MONGO_URI="your_mongo_uri" --from-literal=JWT_SECRET="your_secret"
   ```
3. Apply configurations:
   ```bash
   kubectl apply -f k8s/
   ```

## CI/CD Deployment
- **GitHub Actions**: Automatically builds and pushes Docker images to DockerHub on push to `main`.
- **Render**: The backend is triggered to redeploy via a webhook in the GitHub Actions workflow.
- **Vercel**: The frontend can be linked directly to this repository via Vercel for automatic deployments.
