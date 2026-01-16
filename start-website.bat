@echo off
echo.
echo ================================================
echo  Jehovah Jire Ministry Foundation Website
echo ================================================
echo.
echo Welcome! This script will help you run the website.
echo.
echo Options:
echo.
echo 1. Open Website in Browser
echo 2. Open Admin Panel
echo 3. Start Local Server (requires Python)
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto website
if "%choice%"=="2" goto admin
if "%choice%"=="3" goto server
if "%choice%"=="4" goto exit

goto invalid

:website
start "" "index.html"
goto end

:admin
start "" "admin.html"
goto end

:server
echo.
echo Starting local server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
goto end

:exit
exit /b

:invalid
echo.
echo Invalid choice. Please enter 1, 2, 3, or 4.
echo.
pause
goto start

:end
echo.
echo Operation completed.
echo.
pause