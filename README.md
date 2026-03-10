# Lima TechPark Jobs - Setup Guide

## 🚀 Quick Start with Live Server

### Option 1: VS Code Live Server Extension (Recommended)
1. Install **Live Server** extension in VS Code
2. Right-click on any HTML file (e.g., `ADMIN_PORTAL.html`)
3. Select "Open with Live Server"
4. Your app will open at `http://localhost:5500`

### Option 2: Python Simple Server
```bash
# Open terminal in your project folder
cd "c:\Users\Predator\Desktop\lima-techpark-jobs"

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000`

### Option 3: Node.js Serve
```bash
# Install serve globally (once)
npm install -g serve

# Run in your project folder
serve .
```

### Option 4: PHP Built-in Server
```bash
php -S localhost:8000
```

## 🔧 Before You Start

1. **Set up Supabase first:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Run `schema.sql` in Supabase SQL Editor
   - Run `seed.sql` to populate data

2. **Update credentials:**
   - Open `supabase.js`
   - Replace `YOUR_SUPABASE_PROJECT_URL` with your project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

## 🌐 Access URLs
Once live server is running:
- Admin Portal: `http://localhost:5500/ADMIN_PORTAL.html`
- Company Portal: `http://localhost:5500/COMPANY_PORTAL.html`
- Applicant Portal: `http://localhost:5500/APPLICATION%20PORTAL%20(1).html`

## 📱 Testing Tips
- Test all three portals
- Try login/registration flows
- Submit sample applications
- Verify data persists in Supabase

## 🔒 Security Notes
- In production, enable Row Level Security (RLS)
- Use proper authentication instead of placeholder passwords
- Implement file upload for resumes/portfolios
- Add input validation and sanitization
