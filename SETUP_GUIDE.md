# 🚀 Lima TechPark Jobs - Complete Setup Guide

## 📋 Prerequisites
- A Supabase account (free tier is fine)
- Your local development server running (Python HTTP server)

---

## 🔧 Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up / Sign in**
3. **Click "New Project"**
4. **Choose organization** (or create new one)
5. **Project name:** `lima-techpark-jobs`
6. **Database password:** Create a strong password (save it!)
7. **Region:** Choose closest to your location
8. **Click "Create new project"**
9. **Wait for project to be ready** (2-3 minutes)

---

## 🔑 Step 2: Get Your Supabase Credentials

1. **Go to your project dashboard**
2. **Click Settings (⚙️) → API**
3. **Copy the Project URL** (looks like: `https://xxxxxxxx.supabase.co`)
4. **Copy the anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
5. **Update supabase.js** with these credentials:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

---

## 🗄️ Step 3: Set Up Database Tables

1. **Go to Supabase Dashboard → SQL Editor**
2. **Copy and paste the entire contents of `schema.sql`**
3. **Click "Run"** (or press Ctrl+Enter)
4. **Wait for all tables to be created** (should show "Success")

### Tables Created:
- ✅ companies
- ✅ admin_users  
- ✅ company_users
- ✅ applicants
- ✅ jobs
- ✅ applications
- ✅ events
- ✅ activity_log

---

## 🌱 Step 4: Add Sample Data

1. **Still in SQL Editor**
2. **Copy and paste the entire contents of `seed.sql`**
3. **Click "Run"**
4. **Wait for data insertion** (should show "Success")

### Data Added:
- ✅ 7 companies (NovaTech, Voyager, Accenture, etc.)
- ✅ 12 job postings
- ✅ 8 events
- ✅ 12 activity log entries
- ✅ Admin and company user records

---

## 👤 Step 5: Create Authentication Accounts

### Method A: Via Supabase Dashboard (Recommended)

1. **Go to Authentication → Users**
2. **Add these users one by one:**

#### **Admin Account:**
- **Email:** `admin@limatechpark.com`
- **Password:** `Admin@2025`
- **User metadata (JSON):**
  ```json
  {"full_name": "Park Administrator"}
  ```

#### **Company Accounts:**
| Email | Password | Company | User Metadata |
|-------|----------|---------|--------------|
| `hr@novatech.ph` | `Company@2025` | NovaTech Solutions | `{"full_name": "NovaTech HR", "company_id": 1}` |
| `careers@voyager.ph` | `Company@2025` | Voyager Innovations | `{"full_name": "Voyager HR", "company_id": 2}` |
| `talent.cebu@accenture.com` | `Company@2025` | Accenture Cebu | `{"full_name": "Accenture HR", "company_id": 3}` |
| `jobs@pixelforge.io` | `Company@2025` | PixelForge Games | `{"full_name": "PixelForge HR", "company_id": 4}` |
| `hr@shieldnet.ph` | `Company@2025` | ShieldNet Security | `{"full_name": "ShieldNet HR", "company_id": 5}` |
| `careers@carthub.ph` | `Company@2025` | CartHub PH | `{"full_name": "CartHub HR", "company_id": 6}` |

### Method B: Via Test Portal (Alternative)
You can also register company users through the portal, but the dashboard method is faster.

---

## 🧪 Step 6: Test Your Setup

1. **Make sure your local server is running:**
   ```bash
   cd "c:\Users\Predator\Desktop\lima-techpark-jobs"
   python -m http.server 8000
   ```

2. **Open the test page:**
   ```
   http://localhost:8000/test.html
   ```

3. **You should see:**
   - ✅ Green "Connected to Supabase!" message
   - ✅ All tables showing record counts
   - ✅ Sample data displayed

---

## 🎯 Step 7: Test All Portals

### **Admin Portal**
```
http://localhost:8000/ADMIN_PORTAL.html
```
- **Login:** `admin@limatechpark.com` / `Admin@2025`
- **Should see:** Dashboard with company stats, job listings, events

### **Company Portal**
```
http://localhost:8000/COMPANY_PORTAL.html
```
- **Login:** `hr@novatech.ph` / `Company@2025`
- **Should see:** NovaTech company dashboard with their jobs and applicants

### **Applicant Portal**
```
http://localhost:8000/APPLIATION PORTAL (1).html
```
- **Click "Sign Up"**
- **Register with any email** (creates new account)
- **Should see:** Job listings, company profiles, ability to apply

---

## 🔍 Step 8: Verify Everything Works

### ✅ **Admin Portal Checklist:**
- [ ] Login works with admin credentials
- [ ] Dashboard shows company statistics
- [ ] Can view all companies, jobs, events
- [ ] Can enable/disable companies
- [ ] Logout returns to landing page
- [ ] Session persists on page reload

### ✅ **Company Portal Checklist:**
- [ ] Login works with company credentials
- [ ] Shows only that company's data
- [ ] Can view their job postings
- [ ] Can see applicants for their jobs
- [ ] Can post new jobs
- [ ] Logout works correctly

### ✅ **Applicant Portal Checklist:**
- [ ] Registration creates new account
- [ ] Login works with registered account
- [ ] Can browse all jobs and companies
- [ ] Can submit applications
- [ ] Can track own applications
- [ ] Logout works correctly

---

## 🚨 Troubleshooting

### **"Connection Failed" Error:**
- Check your SUPABASE_URL and SUPABASE_ANON_KEY in supabase.js
- Make sure you copied the full anon key (it's long!)
- Verify your Supabase project is active

### **"Invalid email or password":**
- Make sure you created the auth accounts in Supabase Dashboard
- Check email spelling (no typos)
- Passwords are case-sensitive

### **"No admin account found":**
- Make sure the email exists in admin_users table
- Check that auth email matches database email exactly

### **Blank screen / Loading stuck:**
- Check browser console for errors (F12 → Console)
- Make sure all script files are loading correctly
- Verify your local server is running

### **RLS Errors:**
- Make sure you ran the schema.sql with RLS disable statements
- Check that RLS is disabled on all tables

---

## 🎉 Success Indicators

When everything is working, you should see:

1. **Test page shows all green ✅ status**
2. **Admin can login and manage the park**
3. **Companies can login and manage their jobs**
4. **Applicants can register and apply for jobs**
5. **All data persists across page reloads**
6. **Sessions work correctly**

---

## 📱 Next Steps

Once everything is working:

1. **Customize the design** (colors, logos, branding)
2. **Add more sample data** if needed
3. **Set up email confirmations** in Supabase Auth settings
4. **Enable RLS** when ready for production
5. **Deploy to a real domain**

---

## 🆘 Need Help?

If you run into issues:

1. **Check the browser console** (F12 → Console) for JavaScript errors
2. **Verify Supabase project status** in dashboard
3. **Double-check all credentials** are copied correctly
4. **Make sure all SQL scripts ran successfully**

Good luck! 🚀
