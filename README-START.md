# 🚀 PYRO CAST AI - Quick Start Guide

## ✅ Prerequisites

Before running the project, make sure you have:

- **Python 3.8+** installed
- **Node.js 16+** installed
- **npm** (comes with Node.js)

## 🎯 Quick Start (Recommended)

### Windows
Simply run:
```powershell
.\start.ps1
```

This will automatically:
- Install all dependencies
- Start the backend server (port 5000)
- Start the frontend server (port 3000)

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

## 📝 Manual Setup

If you prefer to run servers manually:

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python main.py
```

The backend will be available at: **http://localhost:5000**

### 2. Frontend Setup

Open a **new terminal window** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies (first time only)
npm install

# Start the frontend development server
npm run dev
```

The frontend will be available at: **http://localhost:3000**

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: Open http://localhost:3000 in your browser
- **Backend API**: http://localhost:5000

## 🔧 Troubleshooting

### Backend Issues

1. **Port 5000 already in use:**
   - Close any application using port 5000
   - Or change the port in `backend/main.py`

2. **Missing dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Flask not found:**
   ```bash
   pip install flask flask-cors
   ```

### Frontend Issues

1. **Port 3000 already in use:**
   - Close any application using port 3000
   - Or change the port in `frontend/vite.config.js`

2. **Module not found errors:**
   ```bash
   cd frontend
   npm install
   ```

3. **Cannot connect to backend:**
   - Make sure backend is running on port 5000
   - Check that CORS is enabled in backend (it should be)

## 📊 API Endpoints

The backend provides these endpoints:

- `GET /health` - Health check
- `POST /predict` - Fire risk prediction
- `GET /api/dataset-stats` - Dataset statistics
- `GET /api/correlations` - Feature correlations
- `GET /api/geographical-data` - Geographical fire data
- `GET /api/risk-distribution` - Risk distribution
- `GET /api/historical-trends` - Historical trends
- `GET /api/outlier-analysis` - Outlier analysis

## 🛑 Stopping the Servers

- **Windows**: Close the PowerShell windows or press `Ctrl+C` in each terminal
- **Linux/Mac**: Press `Ctrl+C` in the terminal running the script

## ✅ Verification

After starting both servers, verify they're working:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Frontend:** Open http://localhost:3000 in your browser

## 📝 Notes

- The backend uses a dummy model if the trained model file is not found (this is normal)
- Mock data is used if the dataset file is not available
- Both servers support hot-reloading during development

## 🆘 Need Help?

If you encounter any issues:
1. Check that both Python and Node.js are installed
2. Verify all dependencies are installed
3. Ensure ports 3000 and 5000 are not in use
4. Check the console output for error messages

