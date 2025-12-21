@echo off
echo ========================================
echo CodeShack Frontend Restructuring Script
echo ========================================
echo.

echo Step 1: Creating frontend directory...
mkdir frontend
echo ✓ Frontend directory created
echo.

echo Step 2: Moving directories...
move app frontend\app
move components frontend\components
move data frontend\data
move utils frontend\utils
echo ✓ Directories moved
echo.

echo Step 3: Moving configuration files...
move package.json frontend\package.json
move package-lock.json frontend\package-lock.json
move next.config.js frontend\next.config.js
move tailwind.config.js frontend\tailwind.config.js
move postcss.config.js frontend\postcss.config.js
move jsconfig.json frontend\jsconfig.json
move .gitignore frontend\.gitignore
echo ✓ Configuration files moved
echo.

echo Step 4: Moving build artifacts...
if exist .next move .next frontend\.next
if exist node_modules move node_modules frontend\node_modules
echo ✓ Build artifacts moved
echo.

echo Step 5: Moving README...
move README.md frontend\README.md
echo ✓ README moved
echo.

echo ========================================
echo Restructuring complete!
echo ========================================
echo.
echo Next steps:
echo 1. cd frontend
echo 2. npm run dev
echo.
echo See RESTRUCTURING_GUIDE.md for more details.
pause
