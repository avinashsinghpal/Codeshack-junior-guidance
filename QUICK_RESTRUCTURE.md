# Quick Restructuring Commands

Run these commands one by one in your terminal:

```bash
# Navigate to project directory
cd d:\projects\Codeshack-junior-guidance

# Create frontend directory
mkdir frontend

# Move directories
xcopy /E /I app frontend\app
xcopy /E /I components frontend\components
xcopy /E /I data frontend\data
xcopy /E /I utils frontend\utils
xcopy /E /I node_modules frontend\node_modules
xcopy /E /I .next frontend\.next

# Move files
copy package.json frontend\package.json
copy package-lock.json frontend\package-lock.json
copy next.config.js frontend\next.config.js
copy tailwind.config.js frontend\tailwind.config.js
copy postcss.config.js frontend\postcss.config.js
copy jsconfig.json frontend\jsconfig.json
copy .gitignore frontend\.gitignore
copy README.md frontend\README.md

# Delete original directories (after verifying copy worked)
rmdir /S /Q app
rmdir /S /Q components
rmdir /S /Q data
rmdir /S /Q utils
rmdir /S /Q node_modules
rmdir /S /Q .next

# Delete original files
del package.json
del package-lock.json
del next.config.js
del tailwind.config.js
del postcss.config.js
del jsconfig.json
del .gitignore
del README.md

# Verify structure
dir
cd frontend
dir

# Run the app
npm run dev
```

## Or use File Explorer:

1. Create a folder called `frontend` in `d:\projects\Codeshack-junior-guidance`
2. Move these folders into `frontend`:
   - app
   - components
   - data
   - utils
   - node_modules
   - .next

3. Move these files into `frontend`:
   - package.json
   - package-lock.json
   - next.config.js
   - tailwind.config.js
   - postcss.config.js
   - jsconfig.json
   - .gitignore
   - README.md

4. Open terminal in `frontend` folder and run:
   ```bash
   npm run dev
   ```

Done!
