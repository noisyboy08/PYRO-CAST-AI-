# 🔥 PYRO CAST AI - How to Run

## ✅ All Errors Fixed!

I've fixed all the errors in your project:
- ✅ Fixed backend API variable name issues
- ✅ Installed missing `flask-cors` dependency
- ✅ Fixed frontend API configuration
- ✅ Added proper proxy configuration
- ✅ Fixed field name mapping between frontend and backend
- ✅ Created startup scripts for easy launching

## 🚀 EASIEST WAY TO RUN (Windows)

### Option 1: Use the Startup Script (Recommended)

1. Open PowerShell in the project root directory
2. Run:
   ```powershell
   .\start.ps1
   ```

This will automatically:
- ✅ Check Python and Node.js are installed
- ✅ Install all dependencies
- ✅ Start backend server (port 5000)
- ✅ Start frontend server (port 3000)

### Option 2: Manual Setup

#### Step 1: Start Backend

Open **PowerShell** or **Command Prompt**:

```powershell
cd backend
python main.py
```

Wait for: `🔥 Starting Wildfire Risk Prediction API...`
Backend will be at: **http://localhost:5000**

#### Step 2: Start Frontend

Open a **NEW** PowerShell or Command Prompt window:

```powershell
cd frontend
npm install    # Only needed first time
npm run dev
```

Wait for: `Local: http://localhost:3000/`
Frontend will be at: **http://localhost:3000**

## 🌐 Access the Application

Once both servers are running:

1. **Open your browser**
2. **Go to: http://localhost:3000**
3. **Click "Start Prediction"** to test the fire risk prediction
4. **Enter environmental data** or use "Load Sample Data"

## 📋 What Each Server Does

### Backend (Port 5000)
- Python Flask API server
- Handles fire risk predictions
- Provides data for charts and maps
- API endpoints for all frontend features

### Frontend (Port 3000)
- React web application
- User interface for predictions
- Interactive charts and maps
- Connects to backend via proxy

## 🔧 Troubleshooting

### Issue: "npm run dev" doesn't work in backend folder
**Solution:** You're in the wrong folder! The backend is Python, not Node.js. Only run `npm run dev` in the `frontend` folder.

### Issue: Port 5000 already in use
**Solution:** 
- Close any application using port 5000
- Or change port in `backend/main.py` line 16

### Issue: Port 3000 already in use
**Solution:**
- Close any application using port 3000
- Or change port in `frontend/vite.config.js` line 8

### Issue: Module not found errors
**Solution:**
```powershell
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Issue: Cannot connect to backend
**Solution:**
1. Make sure backend is running (check for Python output)
2. Test backend: Open http://localhost:5000/health in browser
3. Check CORS is enabled (it should be automatically)

### Issue: Python not found
**Solution:**
- Install Python 3.8+ from https://python.org
- Make sure to check "Add Python to PATH" during installation
- Restart terminal after installation

### Issue: Node.js not found
**Solution:**
- Install Node.js 16+ from https://nodejs.org
- Restart terminal after installation

## ✅ Verification Steps

1. **Backend Health Check:**
   - Open: http://localhost:5000/health
   - Should see JSON with `"status": "healthy"`

2. **Frontend Check:**
   - Open: http://localhost:3000
   - Should see the Pyro Cast AI homepage

3. **Full Test:**
   - Go to Predict page
   - Click "Load Sample Data"
   - Click "Predict Fire Risk"
   - Should see prediction results

## 🛑 Stopping the Servers

- **Windows**: Close the terminal windows or press `Ctrl+C` in each terminal
- **Script**: Press any key in the startup script window

## 📝 Important Notes

- ✅ Backend uses a dummy model if trained model file is missing (this is normal)
- ✅ Mock data is used if dataset file is not available
- ✅ Both servers support hot-reloading (changes update automatically)
- ✅ CORS is properly configured for frontend-backend communication

## 🎯 Quick Commands Reference

```powershell
# Start backend
cd backend
python main.py

# Start frontend (in new terminal)
cd frontend
npm run dev

# Install dependencies
cd backend
pip install -r requirements.txt

cd ../frontend
npm install
```

## 🆘 Still Having Issues?

1. Check Python version: `python --version` (need 3.8+)
2. Check Node.js version: `node --version` (need 16+)
3. Verify ports are free: Check Task Manager or use `netstat -ano | findstr :5000`
4. Check console output for specific error messages

---

**Ready to go!** Just run `.\start.ps1` and everything should work! 🚀

