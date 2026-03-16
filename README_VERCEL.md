# Vercel Deployment Instructions

Since you want a Vercel app with a scheduled daily sync at 7 PM IST, I have prepared a Vercel-ready serverless project!

## Architecture
- **Serverless Function**: `api/fiidii.js` replaces the Express backend. It securely fetches the data from NSE.
- **Cron Job**: `vercel.json` tells Vercel to automatically hit this function every day at 13:30 UTC (which is 19:00 / 7:00 PM IST). 

## How to Deploy to Vercel

### Step 1: Deploying the Backend
1. Go to your GitHub and create a new repository (e.g., `nse-fiidii-proxy`).
2. Upload the contents of this `vercel-backend` folder to that repository.
3. Go to **vercel.com** and login with GitHub.
4. Click **Add New... > Project**.
5. Import your new `nse-fiidii-proxy` repository.
6. Leave all settings as default and click **Deploy**.
7. Vercel will give you a domain, e.g., `https://nse-fiidii-proxy.vercel.app`.

*(Note: Vercel's free tier allows 1 Cron Job, so your daily 7 PM sync will work automatically!)*

### Step 2: Updating Your Dashboard URL
1. Open your main dashboard file (`fii_dii_india_flows_dashboard.html`).
2. Around line 1789, locate `https://YOUR_DEPLOYED_BACKEND_URL.com/api/fiidii`.
3. Replace it with your new Vercel URL: `https://nse-fiidii-proxy.vercel.app/api/fiidii`.

### Step 3: Hosting the Dashboard
You can host your `fii_dii_india_flows_dashboard.html` anywhere! 
- You can even create *another* Vercel project just for the HTML file. 
- Now, when you visit your dashboard online, it will fetch perfectly from your Serverless Function!
