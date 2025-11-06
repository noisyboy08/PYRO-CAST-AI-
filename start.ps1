# PYRO CAST AI - Startup Script for Windows
# This script starts both backend and frontend servers

Write-Host "🔥 Starting PYRO CAST AI..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found! Please install Python 3.8+" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js 16+" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install backend dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
cd backend
python -m pip install -q -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Cyan
cd ../frontend
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting servers..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
Write-Host "Starting backend server on http://localhost:5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\..\backend'; python main.py"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server on http://localhost:3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Server URLs:" -ForegroundColor Yellow
Write-Host "   Backend API:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Frontend App: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Close the server windows or press Ctrl+C to stop the servers" -ForegroundColor Magenta
Write-Host ""

# Keep script running
cd ..
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
