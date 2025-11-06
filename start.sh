#!/bin/bash

# PYRO CAST AI - Startup Script for Linux/Mac
# This script starts both backend and frontend servers

echo "🔥 Starting PYRO CAST AI..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python not found! Please install Python 3.8+"
    exit 1
fi
echo "✅ Python found: $(python3 --version)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js 16+"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"

echo ""
echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing Python dependencies..."
cd backend
python3 -m pip install -q -r requirements.txt || {
    echo "❌ Failed to install backend dependencies"
    exit 1
}

# Install frontend dependencies
echo "Installing Node.js dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install || {
        echo "❌ Failed to install frontend dependencies"
        exit 1
    }
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🚀 Starting servers..."
echo ""

# Start backend in background
echo "Starting backend server on http://localhost:5000..."
cd ../backend
python3 main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend server on http://localhost:3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📋 Server URLs:"
echo "   Backend API:  http://localhost:5000"
echo "   Frontend App: http://localhost:3000"
echo ""
echo "💡 Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

