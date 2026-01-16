@echo off
echo.
echo ================================================
echo    Jehovah Jire Ministry - Full Project Setup
echo ================================================
echo.

echo Starting Backend Server...
echo.

REM Start the backend server in a new window
start cmd /k "cd /d C:\Users\Student.LAPTOP-46MOQA5A\Desktop\jehohahjereministry-main\backend && npm run dev"

echo.
echo Backend server started on http://localhost:5000
echo.
echo Opening frontend in browser...
echo.

REM Open the main website in the default browser
start http://localhost:8080

echo.
echo To run the frontend server, navigate to the main directory and run:
echo npx http-server
echo.
echo Make sure MongoDB is connected to your backend!
echo.
pause