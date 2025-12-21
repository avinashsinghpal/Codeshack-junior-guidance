# Backend .env Configuration

**IMPORTANT:** Create a file named `.env` in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/codeshack

# JWT Configuration
JWT_SECRET=codeshack_jwt_secret_key_2024_change_in_production
JWT_EXPIRY=7d

# CORS Configuration
# Frontend URL
CORS_ORIGIN=http://localhost:3000

# Secret Keys for Protected Registration
MENTOR_SECRET_KEY=mentor_secret_2024
ADMIN_SECRET_KEY=admin_secret_2024
```

## How to Create:

1. Navigate to `backend` folder
2. Create a new file called `.env`
3. Copy the content above into it
4. Save the file

This file is gitignored for security (as it should be).
