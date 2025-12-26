# CodeShack - Junior Guidance Platform

A modern web platform connecting junior developers with experienced mentors for doubt resolution and guidance.

![CodeShack](https://img.shields.io/badge/CodeShack-Junior%20Guidance-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-green)

## 📖 Overview

CodeShack is a comprehensive doubt-solving platform designed to help junior developers get guidance from verified mentors. The platform features real-time interactions, upvoting systems, and role-based access control.

### Key Features

- 🎓 **Role-Based System**: Junior developers, Mentors, and Admins
- ❓ **Doubt Management**: Post, answer, and resolve coding doubts
- 💬 **Real-time Comments**: Interactive discussion threads
- 👍 **Upvoting System**: Community-driven quality control
- ✅ **Mentor Verification**: Admin-approved mentor system
- 📊 **Admin Dashboard**: Comprehensive platform management
- 🔐 **Secure Authentication**: JWT-based auth with role permissions
- 📱 **Responsive Design**: Mobile-friendly interface

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Hooks
- **API Communication**: Fetch API with custom wrapper

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod schemas
- **Real-time**: Socket.io (for future features)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Codeshack-junior-guidance
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/codeshack
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRY=7d
   MENTOR_SECRET_KEY=mentor_secret_2024
   ADMIN_SECRET_KEY=admin_secret_2024
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create `.env.local` file in `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb-community
   ```

5. **Run the Application**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

📚 **For detailed setup instructions, see [LOCAL_SETUP.md](./LOCAL_SETUP.md)**

## 👥 User Roles

### Junior (Student)
- Post doubts with title, description, and tags
- Comment on doubts and answers
- Upvote helpful answers
- View mentor profiles
- Track their own doubts

### Mentor
- Answer doubts from juniors
- Reply to comments
- Build reputation through upvotes
- Create mentor profile with expertise tags
- **Requires admin approval**

### Admin
- Approve/reject mentor applications
- Manage users (ban/unban)
- Delete inappropriate content (doubts, answers, comments)
- View platform statistics
- Monitor admin activity logs

## 📁 Project Structure

```
Codeshack-junior-guidance/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation middleware
│   ├── schema/           # Zod validation schemas
│   ├── socket/           # Socket.io configuration
│   └── index.js          # Entry point
│
├── frontend/
│   ├── app/              # Next.js app directory
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── doubts/       # Doubt listing & detail pages
│   │   ├── profile/      # User profile pages
│   │   ├── ask/          # Post doubt page
│   │   └── space/        # Junior space (blog)
│   ├── components/       # Reusable React components
│   ├── utils/            # API & auth utilities
│   └── public/           # Static assets
│
└── README.md
```

## 🔑 Authentication Flow

1. **Registration**
   - Juniors: Direct registration, auto-approved
   - Mentors: Registration with secret key, requires admin approval
   - Admins: Registration with admin secret key

2. **Login**
   - Email and password authentication
   - JWT token issued on successful login
   - Token stored in localStorage
   - Auto-redirect based on role

3. **Protected Routes**
   - Middleware validates JWT tokens
   - Role-based access control
   - Automatic logout on token expiration

## 🛠️ API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/mentor-profiles/register` - Mentor registration
- `POST /api/admin/register` - Admin registration

### Doubts
- `GET /api/doubts` - Get all doubts (paginated)
- `POST /api/doubts` - Create new doubt
- `GET /api/doubts/:id` - Get doubt by ID
- `PATCH /api/doubts/:id` - Update doubt
- `DELETE /api/doubts/:id` - Delete doubt

### Answers
- `POST /api/answers/:doubtId` - Create answer
- `GET /api/answers/doubt/:doubtId` - Get answers for doubt
- `PATCH /api/answers/:id` - Update answer
- `DELETE /api/answers/:id` - Delete answer

### Admin
- `POST /api/admin/approve-mentor/:mentorId` - Approve mentor
- `POST /api/admin/reject-mentor/:mentorId` - Reject mentor
- `GET /api/admin/unverified-mentors` - Get unverified mentors
- `GET /api/admin/stats` - Get admin statistics
- `DELETE /api/admin/doubt/:doubtId` - Delete doubt (admin)

**For complete API documentation, see [BACKEND_INTEGRATION_GUIDE.md](./BACKEND_INTEGRATION_GUIDE.md)**

## 🎨 Design System

The platform uses a custom design system with:
- **Color Palette**: Blue primary, dark theme optimized
- **Typography**: System fonts with custom sizing
- **Components**: Reusable UI components (Sidebar, Cards, Badges)
- **Responsive**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and loading states

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation with Zod schemas
- CORS configuration
- Environment variable protection
- XSS protection through React

## 📊 Database Schema

### User Model
- name, email, passwordHash
- role (junior/mentor/admin)
- isMentorApproved (boolean)
- bio, createdAt

### Doubt Model
- title, description, tags
- userId (reference to User)
- status, upvotes, views
- createdAt, updatedAt

### Answer Model
- content, doubtId, mentorId
- upvotes, isAccepted
- createdAt, updatedAt

### MentorProfile Model
- userId, badge, expertiseTags
- totalUpvotes, approvedByAdmin

## 🧪 Testing

```bash
# Backend tests (when available)
cd backend
npm test

# Frontend tests (when available)
cd frontend
npm test
```

## 🚢 Deployment

### Backend Deployment
1. Set environment variables on hosting platform
2. Update `MONGODB_URI` to production database
3. Change `JWT_SECRET` to secure random string
4. Set `NODE_ENV=production`
5. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platforms

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codeshack
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
MENTOR_SECRET_KEY=mentor-secret
ADMIN_SECRET_KEY=admin-secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Authors

- **Avinash Singh Pal** - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Express.js community
- All contributors and testers

## 📞 Support

For issues, questions, or contributions:
- Create an issue in the repository
- Check [LOCAL_SETUP.md](./LOCAL_SETUP.md) for setup help
- Review [BACKEND_INTEGRATION_GUIDE.md](./BACKEND_INTEGRATION_GUIDE.md) for API details

---

**Built with ❤️ for the developer community**
