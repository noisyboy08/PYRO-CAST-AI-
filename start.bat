@echo off
echo ========================================
echo   PYRO CAST AI - Starting Servers
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python main.py"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Both servers are starting in separate windows.
echo Close this window when done.
pause

