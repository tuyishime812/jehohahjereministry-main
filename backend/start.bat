@echo off
echo Starting Jehovah Jire Ministry Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if MongoDB is accessible (optional check)
echo Checking MongoDB connection...
node -e "const mongoose = require('mongoose'); mongoose.connect(require('./config/config').dbConfig.uri).then(()=>{console.log('MongoDB connection OK');process.exit(0);}).catch(()=>{console.log('MongoDB connection failed - make sure MongoDB is running');process.exit(1);});" >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB connection: OK
) else (
    echo WARNING: Cannot connect to MongoDB. Make sure MongoDB is running.
    echo Press any key to continue anyway or Ctrl+C to abort...
    pause >nul
)

echo.
echo Starting server...
npm run dev