# Frontend Restructuring Guide

## Overview

This guide explains how to reorganize the CodeShack project by moving all frontend files into a `frontend` subdirectory to prepare for backend integration.

## Current Structure

```
Codeshack-junior-guidance/
├── app/
├── components/
├── data/
├── utils/
├── package.json
├── package-lock.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── .gitignore
├── .next/
├── node_modules/
└── README.md
```

## Target Structure

```
Codeshack-junior-guidance/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── utils/
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── jsconfig.json
│   ├── .gitignore
│   ├── .next/
│   ├── node_modules/
│   └── README.md
├── backend/ (to be created later)
└── README.md (root level)
```

## Manual Restructuring Steps

### Step 1: Create Frontend Directory

```bash
cd d:\projects\Codeshack-junior-guidance
mkdir frontend
```

### Step 2: Move Directories

```bash
# Move main directories
move app frontend\app
move components frontend\components
move data frontend\data
move utils frontend\utils
move node_modules frontend\node_modules
move .next frontend\.next
```

### Step 3: Move Configuration Files

```bash
# Move config files
move package.json frontend\package.json
move package-lock.json frontend\package-lock.json
move next.config.js frontend\next.config.js
move tailwind.config.js frontend\tailwind.config.js
move postcss.config.js frontend\postcss.config.js
move jsconfig.json frontend\jsconfig.json
move .gitignore frontend\.gitignore
```

### Step 4: Move Documentation (Optional)

```bash
# Move frontend-specific docs
move README.md frontend\README.md
```

## After Restructuring

### Update Working Directory

All npm commands should now be run from the `frontend` directory:

```bash
cd frontend
npm run dev
npm run build
npm install <package>
```

### Update Import Paths

**No changes needed!** The `@/` alias in `jsconfig.json` is relative to the project root, so all imports will continue to work:

```javascript
import Sidebar from '@/components/Sidebar';
import { getCurrentUser } from '@/utils/auth';
import { doubts } from '@/data/mockData';
```

### Update VS Code Workspace (Optional)

If using VS Code, you might want to update your workspace to point to the frontend directory:

```json
{
  "folders": [
    {
      "path": "frontend"
    }
  ]
}
```

## Verification Steps

After restructuring, verify everything works:

### 1. Check Directory Structure

```bash
cd d:\projects\Codeshack-junior-guidance
dir
# Should show: frontend/, backend/ (later), README.md

cd frontend
dir
# Should show: app/, components/, data/, utils/, package.json, etc.
```

### 2. Install Dependencies (if needed)

```bash
cd frontend
npm install
```

### 3. Run Development Server

```bash
cd frontend
npm run dev
```

### 4. Test Application

- Visit http://localhost:3000
- Test login/signup
- Navigate through all pages
- Verify all features work

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution:** Make sure you're running commands from the `frontend` directory:
```bash
cd frontend
npm run dev
```

### Issue: node_modules not found

**Solution:** Reinstall dependencies:
```bash
cd frontend
npm install
```

### Issue: .next build errors

**Solution:** Delete .next and rebuild:
```bash
cd frontend
rmdir /s .next
npm run dev
```

## Preparing for Backend Integration

Once frontend is restructured, you can add the backend:

### 1. Create Backend Directory

```bash
cd d:\projects\Codeshack-junior-guidance
mkdir backend
cd backend
```

### 2. Initialize Backend (Example with Node.js/Express)

```bash
npm init -y
npm install express mongoose cors dotenv bcrypt jsonwebtoken
```

### 3. Project Structure

```
Codeshack-junior-guidance/
├── frontend/          # Next.js frontend
│   ├── app/
│   ├── components/
│   └── ...
├── backend/           # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── README.md
```

### 4. Update Frontend API Calls

Create an API utility in `frontend/utils/api.js`:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Doubts
  getDoubts: async () => {
    const res = await fetch(`${API_URL}/doubts`);
    return res.json();
  },

  // Add more API calls...
};
```

### 5. Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeshack
JWT_SECRET=your_jwt_secret_here
```

## Running Both Frontend and Backend

### Option 1: Separate Terminals

Terminal 1 (Frontend):
```bash
cd d:\projects\Codeshack-junior-guidance\frontend
npm run dev
```

Terminal 2 (Backend):
```bash
cd d:\projects\Codeshack-junior-guidance\backend
npm start
```

### Option 2: Concurrently (Root Level)

Install concurrently at root:
```bash
cd d:\projects\Codeshack-junior-guidance
npm init -y
npm install concurrently
```

Update root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm start"
  }
}
```

Then run both:
```bash
npm run dev
```

## Next Steps

1. ✅ Restructure frontend into `frontend/` directory
2. ⏳ Create `backend/` directory
3. ⏳ Set up Express server
4. ⏳ Create MongoDB models
5. ⏳ Implement API routes
6. ⏳ Connect frontend to backend APIs
7. ⏳ Replace mock data with real API calls
8. ⏳ Add authentication middleware
9. ⏳ Deploy both frontend and backend

## Summary

This restructuring:
- ✅ Separates frontend and backend concerns
- ✅ Makes the project more scalable
- ✅ Follows industry best practices
- ✅ Prepares for backend integration
- ✅ Maintains all existing functionality

All import paths remain the same due to the `@/` alias configuration!
