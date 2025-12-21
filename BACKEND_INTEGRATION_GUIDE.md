# Backend Integration - Quick Start Guide

## Prerequisites

1. **MongoDB** must be running on `mongodb://localhost:27017/`
2. **Node.js** installed (v18 or higher)

## Setup Steps

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create .env file (see backend/ENV_SETUP.md for content)
# Copy this content into backend/.env:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codeshack
JWT_SECRET=codeshack_jwt_secret_key_2024_change_in_production
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
MENTOR_SECRET_KEY=mentor_secret_2024
ADMIN_SECRET_KEY=admin_secret_2024

# Install dependencies
npm install

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Create .env.local file (see frontend/ENV_SETUP.md for content)
# Add this line to frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Install dependencies (if needed)
npm install

# Start frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

## Testing the Integration

### 1. Test Backend API

Open browser and visit: http://localhost:5000

You should see:
```json
{
  "success": true,
  "message": "CodeShack API is running",
  "version": "1.0.0"
}
```

### 2. Test Frontend

1. Visit http://localhost:3000
2. You'll be redirected to `/landing` (not logged in)
3. Click "Sign up as Junior"
4. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
5. Click "Sign Up"
6. Check browser console - should see successful API call
7. Check localStorage - should have `authToken` and `user`

### 3. Verify Database

```bash
# Connect to MongoDB
mongosh

# Use codeshack database
use codeshack

# Check users collection
db.users.find().pretty()
```

You should see your newly created user!

## API Endpoints Available

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Users
- `GET /api/users/:userId` - Get user profile
- `PATCH /api/users/:userId` - Update profile (protected)
- `GET /api/users/mentors/approved` - Get all mentors

### Doubts
- `GET /api/doubts` - Get all doubts
- `POST /api/doubts` - Create doubt (protected)
- `GET /api/doubts/:id` - Get doubt by ID
- `PATCH /api/doubts/:id` - Update doubt (protected)
- `DELETE /api/doubts/:id` - Delete doubt (protected)

### Answers
- `GET /api/answers/doubt/:doubtId` - Get answers for a doubt
- `POST /api/answers` - Create answer (protected, mentor only)
- `PATCH /api/answers/:id` - Update answer (protected)
- `DELETE /api/answers/:id` - Delete answer (protected)

### Comments
- `GET /api/comments/doubt/:doubtId` - Get comments for a doubt
- `POST /api/comments` - Create comment (protected, junior only)
- `PATCH /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists in `backend/` directory
- Run `npm install` in backend directory

### Frontend can't connect to backend
- Check if backend is running on port 5000
- Verify `.env.local` exists in `frontend/` directory
- Check browser console for CORS errors
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL

### MongoDB connection error
- Start MongoDB: `mongod` or use MongoDB Compass
- Check connection string in backend `.env`
- Verify MongoDB is running on port 27017

## Next Steps

Once everything is working:
1. ✅ Authentication is connected
2. ⏳ Connect doubts creation to backend
3. ⏳ Connect answers/comments to backend
4. ⏳ Add real-time features with Socket.IO
5. ⏳ Deploy to production

## Development Workflow

**Terminal 1 - MongoDB:**
```bash
mongod
# Or use MongoDB Compass GUI
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Now you have a fully integrated full-stack application! 🎉
