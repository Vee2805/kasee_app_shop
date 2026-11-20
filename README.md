# 🏪 Kasee Shop Analytics & Decision Support Portal

**Client:** Mr. John Nzioka (Owner/Manager, Kasee Shop, Thika, Kenya)  
**Consultant:** Daniel Vaati (Registration No. 221570)  
**Academic Unit:** DSA 8402: Communication Strategies for Analysts Capstone  

---

## 🚀 How to Deploy on Render (Free & Fast)

You have two very easy options to deploy this application to [Render.com](https://render.com).

### Option 1: Deploy as a "Static Site" (Recommended: Instant & 100% Free Forever)
Since the application runs client-side interactive calculators and decision models with pre-compiled assets, a **Render Static Site** is ideal: **it has zero spin-down delay (never goes to sleep) and loads instantly!**

1. Push this `kasee_app` folder (or the entire repository) to your **GitHub** account:
   ```bash
   cd "kasee_app"
   git init
   git add .
   git commit -m "Deploy Kasee Shop Decision Portal"
   # Link to your GitHub repo:
   git branch -M main
   git remote add origin https://github.com/<your-username>/kasee-shop-portal.git
   git push -u origin main
   ```
2. Log into [Render.com](https://dashboard.render.com).
3. Click **New +** $\rightarrow$ **Static Site**.
4. Connect your GitHub repository.
5. In the configuration fields:
   * **Name:** `kasee-shop-portal`
   * **Build Command:** *(leave empty)*
   * **Publish Directory:** `.` *(or `./kasee_app` if deploying the root repo)*
6. Click **Create Static Site**.
7. In about 30 seconds, Render will provide your live URL (e.g. `https://kasee-shop-portal.onrender.com`)!

---

### Option 2: Deploy as a "Node.js Web Service"
If you prefer running the full Express.js backend server:

1. Push to GitHub (as in step 1 above).
2. Log into [Render.com](https://dashboard.render.com).
3. Click **New +** $\rightarrow$ **Web Service**.
4. Connect your GitHub repository.
5. In the configuration fields:
   * **Name:** `kasee-shop-portal`
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Plan:** Free
6. Click **Create Web Service**.
7. Render will build and deploy your app with health checks at `/health`.

---

## 💻 How to Run Locally

To test or demonstrate the app on your computer:

```bash
cd "kasee_app"
npm start
```
Then open your browser and navigate to:
```text
http://localhost:3000
```

---

## 📦 What is Included in this App

* **Live Baseline KPI Ribbon:** Gross turnover (KES 1.01M), profit margin (13.0%), cash volatility (3.8×), and trapped credit (KES 34,731).
* **Interactive Stock Mix Simulator:** Real-time slider adjusting capital from low-margin energy drinks to high-margin fresh produce and water refills.
* **Debtor Risk Matrix & Till Guide:** Interactive tracking of all 12 institutional and commercial debtors in Thika with one-click Swahili/English follow-up scripts.
* **Product Catalog & Margin Matrix:** 6 high-resolution product photography cards displaying indicative prices, margins, and strategic recommendations.
* **10 Analytical Charts Gallery:** Full-resolution capstone charts.
* **Deliverables Download Hub:** Direct access to all official capstone PDFs, Excel calculators, and presentation slides.
