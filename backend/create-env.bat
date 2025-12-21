@echo off
echo Creating backend .env file...
echo.

(
echo # Server Configuration
echo PORT=5000
echo NODE_ENV=development
echo.
echo # MongoDB Configuration
echo MONGODB_URI=mongodb://localhost:27017/codeshack
echo.
echo # JWT Configuration
echo JWT_SECRET=codeshack_jwt_secret_key_2024_change_in_production
echo JWT_EXPIRY=7d
echo.
echo # CORS Configuration
echo CORS_ORIGIN=http://localhost:3000
echo.
echo # Secret Keys for Protected Registration
echo MENTOR_SECRET_KEY=mentor_secret_2024
echo ADMIN_SECRET_KEY=admin_secret_2024
) > .env

echo .env file created successfully!
echo.
echo Content:
type .env
echo.
echo You can now run: npm run dev
pause
