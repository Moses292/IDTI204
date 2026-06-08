# Vanuatu Centralized Tourism SPA

## About the Project
This project is a centralized booking system for Vanuatu tourism. It allows users to browse accommodations, car rentals, and tour operators through a web application built with React and Node.js.

## Features
- Browse accommodations, car rentals, and tour operators
- User signup and login
- Simple REST API using Node.js + Express
- PostgreSQL database
- Deployed on Render

## Project Structure
```
├── front-end/       # React SPA
├── back-end/        # Node.js + Express API
├── database/        # Database scripts
└── package.json     # Root scripts
```

## How to Run the Project

### 1. Install dependencies
```bash
# Backend
cd back-end
npm install

# Frontend
cd front-end
npm install
```

### 2. Start the backend
```bash
cd back-end
npm start
```

### 3. Start the frontend
```bash
cd front-end
npm start
```

## Environment Variables

### Backend
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `FRONTEND_URL` | Deployed frontend URL (for CORS) |
| `PORT` | Server port (default: 5000) |

### Frontend
| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API URL |

## Tech Stack
- **Frontend**: React 18, React Router
- **Backend**: Node.js, Express 5
- **Database**: PostgreSQL
- **Deployment**: Render
