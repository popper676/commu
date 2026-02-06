@echo off
echo ========================================
echo Community Myanmar Backend Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm install failed
    pause
    exit /b 1
)
echo.

echo Step 2: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo Error: Prisma generate failed
    pause
    exit /b 1
)
echo.

echo Step 3: Running database migrations...
echo NOTE: Make sure PostgreSQL is running and DATABASE_URL in .env is correct
call npx prisma migrate dev --name init
if %ERRORLEVEL% NEQ 0 (
    echo Error: Database migration failed
    echo Please check your DATABASE_URL in backend\.env
    pause
    exit /b 1
)
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the backend server:
echo   cd backend
echo   npm run dev
echo.
echo Backend will run on: http://localhost:8000
echo.
pause
