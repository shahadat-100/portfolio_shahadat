# YOUR.DEV — iOS Developer Portfolio
## Chatbot powered by Google Gemini (Free API)

---

## 📁 Folder Structure

```
portfolio-site/
├── index.html        ← Full portfolio + AI chatbot
└── README.md         ← This file
```

---

## 🤖 Setting Up the Gemini Chatbot (Free)

### Step 1 — Get a FREE Gemini API Key
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the key (looks like: `AIzaSy...`)

> ✅ The free tier includes **1,500 requests/day** — plenty for a portfolio chatbot!

### Step 2 — Add your key to index.html
Open `index.html` and find this line near the bottom:

```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key:

```javascript
const GEMINI_API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

### Step 3 — Customize Developer Info
Find the `SYSTEM_PROMPT` variable and update:
- Your real name
- Your real email
- Your actual projects
- Your availability status

---

## 🚀 Deployment Options

| Platform   | How to deploy                                         | Free? |
|------------|-------------------------------------------------------|-------|
| GitHub Pages | Push to repo → Settings → Pages → Deploy from main | ✅    |
| Netlify    | Drag & drop the folder at netlify.com/drop            | ✅    |
| Vercel     | `vercel deploy` from this folder                      | ✅    |

---

## ⚠️ Security Note

This setup puts the API key in client-side JS — fine for a personal portfolio since
the Gemini free tier has a daily cap that limits abuse. For production apps, use a
backend proxy instead.

---

## 🔧 Gemini Model Used

`gemini-1.5-flash` — Google's fastest free model, ideal for chat.

To switch models, change the `GEMINI_URL` line:
```javascript
// Flash (default, fastest & free)
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Pro (slower, smarter, still free tier available)
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
```

---

Built with Tailwind CSS · Google Fonts · Material Symbols · Gemini AI
