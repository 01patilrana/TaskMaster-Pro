# 🚀 Easy Deployment Steps

## 1. Prepare Your Code

```bash
# Create GitHub repositories
# Push both frontend and backend folders separately

# Frontend repo: taskmasterpro-frontend
# Backend repo: taskmasterpro-backend
```

## 2. Set Up MongoDB Atlas (Free)

1. Visit: https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Copy connection string

## 3. Deploy Backend to Render

1. Go to: https://render.com
2. Connect GitHub repo (taskmasterpro-backend)
3. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_string_here
   JWT_SECRET=super_secret_key_32_chars_minimum
   PORT=10000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

## 4. Deploy Frontend to Vercel

1. Go to: https://vercel.com
2. Connect GitHub repo (taskmasterpro-frontend)
3. Deploy with default settings

## 5. Update API URL

In `frontend/src/services/api.js`, change:
```javascript
baseURL: 'https://your-render-backend.onrender.com/api'
```

Then redeploy frontend.

## 🎉 That's it!

Your app will be live at: `https://your-app.vercel.app`

---
**Need help?** Check DEPLOYMENT.md for detailed instructions.
