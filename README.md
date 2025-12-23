# Food Delivery Application

A scalable food delivery backend system with React frontend, Express backend for user APIs, and Flask backend for restaurant and delivery management.

## Architecture

- **Frontend**: React + Vite
- **Backend 1**: Node.js Express (port 3001) - Handles user-facing APIs
- **Backend 2**: Python Flask (port 3002) - Handles restaurant and delivery logic
- **Communication**: Express communicates with Flask for inter-service operations

## Features

- Browse restaurants
- View menus
- Place orders
- Track order status
- Professional UI with images

## Load Balancing

For production load balancing, use nginx as a reverse proxy.

Example nginx config:

```
upstream express_backend {
    server localhost:3001;
    server localhost:3002;  # if multiple
}

server {
    listen 80;
    location /api/ {
        proxy_pass http://express_backend;
    }
}
```

For multiple instances, use PM2 for Node.js clustering.

## Running the Application

1. Start Express backend:
   ```
   cd backend-express
   npm install
   npm start
   ```

2. Start Flask backend:
   ```
   cd backend-flask
   pip install -r requirements.txt
   python app.py
   ```

3. Start Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

Open http://localhost:5173 for the frontend.