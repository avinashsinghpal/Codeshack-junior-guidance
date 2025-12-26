# CodeShack - Local Project Setup Guide

Complete guide to set up and run the CodeShack Junior Guidance platform locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Codeshack-junior-guidance
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/codeshack

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=7d

# Mentor Registration Secret
MENTOR_SECRET_KEY=your-mentor-registration-secret-key

# CORS
FRONTEND_URL=http://localhost:3000
```

> **Important:** Change the `JWT_SECRET` and `MENTOR_SECRET_KEY` to secure random strings in production.

#### Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

#### Run Backend Server

```bash
npm run dev
```

The backend server will start at `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Run Frontend Development Server

```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

## 📁 Project Structure

```
Codeshack-junior-guidance/
├── backend/                 # Node.js/Express backend
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── schema/            # Validation schemas
│   └── index.js           # Entry point
│
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── utils/             # Utility functions
│   └── public/            # Static assets
│
└── README.md
```

## 🔑 User Roles & Registration

### Junior (Student) Registration

1. Go to `http://localhost:3000/signup`
2. Fill in the registration form
3. Select role: **Junior**
4. No secret key required
5. Auto-approved upon registration

### Mentor Registration

1. Go to `http://localhost:3000/signup`
2. Fill in the registration form
3. Select role: **Mentor**
4. Enter the **Mentor Secret Key** (from `.env` file)
5. Account created but requires admin approval

> **Note:** The mentor secret key is set in the backend `.env` file as `MENTOR_SECRET_KEY`

## 🛠️ Development Commands

### Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Run tests (if available)
npm test
```

### Frontend

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🗄️ Database Setup

### MongoDB Connection

The application will automatically create the database and collections on first run.

### Initial Data (Optional)

If you want to seed the database with sample data, you can create a seed script or manually add data through the application.

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
- Ensure MongoDB is running: `mongod --version`
- Check the `MONGODB_URI` in backend `.env`
- Verify MongoDB service is started

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change PORT in .env
```

### Issue: CORS Errors

**Solution:**
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that both servers are running

### Issue: JWT Token Errors

**Solution:**
- Clear browser localStorage
- Re-login to get a new token
- Verify `JWT_SECRET` is set in backend `.env`

## 📝 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Doubts
- `GET /api/doubts` - Get all doubts
- `POST /api/doubts` - Create new doubt
- `GET /api/doubts/:id` - Get doubt by ID

### Answers
- `POST /api/answers` - Create answer
- `GET /api/answers/doubt/:doubtId` - Get answers for a doubt

### Comments
- `POST /api/comments` - Create comment
- `GET /api/comments/doubt/:doubtId` - Get comments for a doubt

### Upvotes
- `POST /api/upvotes/:answerId` - Upvote an answer
- `DELETE /api/upvotes/:answerId` - Remove upvote

For complete API documentation, see [BACKEND_INTEGRATION_GUIDE.md](./BACKEND_INTEGRATION_GUIDE.md)

## 🧪 Testing the Application

### 1. Create a Junior Account
- Navigate to signup page
- Register as a junior
- Login with credentials

### 2. Post a Doubt
- Go to "Ask a Doubt" page
- Fill in title, description, and tags
- Submit the doubt

### 3. Create a Mentor Account
- Logout from junior account
- Register as a mentor (use secret key)
- Login with mentor credentials

### 4. Answer a Doubt
- Go to "Doubts" page
- Click on a doubt
- Post an answer

### 5. Test Upvoting
- Login as junior
- View a mentor's answer
- Click the upvote button

## 🔐 Security Notes

- Never commit `.env` files to version control
- Change default secrets in production
- Use HTTPS in production
- Implement rate limiting for production
- Keep dependencies updated

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues or questions:
- Check existing documentation
- Review error logs in console
- Check MongoDB logs
- Verify environment variables

---

**Happy Coding! 🚀**
