# 🚀 TaskMaster Pro - Deployment Guide

## 🎯 Deployment Options

### Option 1: Vercel + Render (FREE - Recommended)
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Express + MongoDB)
- **Database**: MongoDB Atlas (Free tier)

### Option 2: Netlify + Railway
- **Frontend**: Netlify
- **Backend**: Railway
- **Database**: MongoDB Atlas

---

## 📋 Prerequisites

1. **GitHub Account** - Push your code to a GitHub repository
2. **MongoDB Atlas Account** - Free cloud database
3. **Vercel/Render Accounts** - Free hosting platforms

---

## 🔧 Step 1: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox - Forever free)
3. Create a database user:
   - Username: `taskmaster_user`
   - Password: `[generate secure password]`
4. Whitelist IP addresses:
   - Add `0.0.0.0/0` (allows all IPs - for production, restrict to your app's IPs)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmasterpro?retryWrites=true&w=majority
   ```

---

## 🔧 Step 2: Deploy Backend to Render

1. **Push backend to GitHub**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/taskmasterpro-backend.git
   git push -u origin main
   ```

2. **Deploy to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New+" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `taskmasterpro-api`
     - **Runtime**: Node
     - **Build command**: `npm install`
     - **Start command**: `npm start`
     - **Environment Variables**:
       ```
       MONGODB_URI=mongodb+srv://...
       JWT_SECRET=your_very_secure_secret_key_here_min_32_chars
       PORT=10000
       FRONTEND_URL=https://taskmasterpro-frontend.vercel.app
       ```

3. **Get your API URL** after deployment (looks like):  
   `https://taskmasterpro-api.onrender.com`

---

## 🔧 Step 3: Deploy Frontend to Vercel

1. **Update API URL in frontend**:
   Edit `frontend/src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: 'https://taskmasterpro-api.onrender.com/api', // Your Render URL
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

2. **Push frontend to GitHub**:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/taskmasterpro-frontend.git
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

4. **Set Environment Variables** (if needed):
   - Usually not required for frontend

5. **Deploy!** Your app will be live at:  
   `https://taskmasterpro-frontend.vercel.app`

---

## 🔧 Step 4: Final Configuration

1. **Update CORS in backend**:
   In `backend/server.js`, update the frontend URL:
   ```javascript
   app.use(cors({
     origin: 'https://taskmasterpro-frontend.vercel.app', // Your Vercel URL
     credentials: true
   }));
   ```

2. **Redeploy backend** to Render with the updated CORS settings

---

## 🎉 Done!

Your TaskMaster Pro app is now live:
- **Frontend**: `https://taskmasterpro-frontend.vercel.app`
- **Backend API**: `https://taskmasterpro-api.onrender.com`
- **Database**: MongoDB Atlas (managed)

---

## 💡 Tips

### For Development:
- Use demo mode (no database required)
- All data stored in localStorage

### For Production:
- Enable real authentication with MongoDB
- Add proper error handling
- Set up monitoring (Render dashboard)

### Custom Domain:
- Buy a domain (Namecheap, Google Domains, etc.)
- Point it to your Vercel deployment
- Update `FRONTEND_URL` in backend accordingly

---

## 🆘 Troubleshooting

**CORS Errors**: Make sure your Render backend URL matches the `FRONTEND_URL` environment variable

**API Not Working**: Check Render logs for errors, ensure MongoDB connection string is correct

**Slow First Load**: Render free tier spins down after inactivity - first request takes ~30 seconds

---

Need help? Check the platform docs:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
