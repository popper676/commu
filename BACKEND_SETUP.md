# 🚀 Backend Setup Guide

## Prerequisites

သင့်ကွန်ပျူတာမှာ အောက်ပါ software များ install လုပ်ထားရမည်:

1. **Node.js 18 or higher** 
   - Download: https://nodejs.org/
   - စစ်ဆေးရန်: `node --version`

2. **PostgreSQL 14 or higher**
   - Download: https://www.postgresql.org/download/windows/
   - စစ်ဆေးရန်: `psql --version`

## Step 1: PowerShell Execution Policy ပြင်ဆင်ခြင်း

Windows PowerShell မှာ npm run လို့မရတာကို ဖြေရှင်းရန်:

**Option A: Run as Administrator (အကောင်းဆုံး)**
1. PowerShell ကို Administrator အနေနဲ့ ဖွင့်ပါ
2. အောက်ပါ command ကို run ပါ:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Y (Yes) နှိပ်ပါ

**Option B: Command Prompt သုံးပါ (အလွယ်ဆုံး)**
- PowerShell အစား CMD (Command Prompt) ကို သုံးပါ
- CMD မှာ npm commands တွေဟာ ပုံမှန် အလုပ်လုပ်ပါတယ်

**Option C: Batch Script သုံးပါ**
- `setup-backend.bat` ကို double-click လုပ်ပါ

## Step 2: PostgreSQL Database Setup

### 2.1 Create Database

Command Prompt သို့မဟုတ် PowerShell မှာ:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE community_myanmar;

# Create user (optional)
CREATE USER myanmar_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE community_myanmar TO myanmar_user;

# Exit
\q
```

**တကယ်လို့ psql command မရှိဘူးဆိုရင်:**
- pgAdmin 4 ကိုဖွင့်ပြီး GUI ကနေ database create လုပ်နိုင်ပါတယ်

### 2.2 Update DATABASE_URL

`backend\.env` file ကို ဖွင့်ပြီး DATABASE_URL ကို update လုပ်ပါ:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/community_myanmar?schema=public"
```

ပုံစံ: `postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

## Step 3: Cloudinary Setup (File Upload အတွက်)

### 3.1 Create Free Cloudinary Account

1. https://cloudinary.com သို့သွားပါ
2. "Sign up for free" နှိပ်ပါ
3. Email ဖြင့် register လုပ်ပါ (သို့မဟုတ် Google account သုံးပါ)

### 3.2 Get API Credentials

1. Cloudinary Dashboard သို့ login ဝင်ပါ
2. သင့်မြင်တွေ့မည့် **Product Environment Credentials** section တွင်:
   - **Cloud Name** (eg: dxxxxx)
   - **API Key** (eg: 123456789012345)
   - **API Secret** (eg: abcdefghijklmnopqrstuvwx)

### 3.3 Update .env File

`backend\.env` ကို ဖွင့်ပြီး Cloudinary credentials များ ထည့်ပါ:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## Step 4: Install Dependencies & Setup

### Method A: Using Batch Script (Easiest)

```bash
# Double-click or run:
setup-backend.bat
```

### Method B: Manual Commands

Command Prompt (CMD) ကိုဖွင့်ပြီး:

```bash
# Navigate to backend folder
cd "C:\Users\User\Downloads\Telegram Desktop\community-myanmar-people\community-myanmar-people\backend"

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

## Step 5: Start Backend Server

### Method A: Using Batch Script

```bash
start-backend.bat
```

### Method B: Manual Command

```bash
cd backend
npm run dev
```

Backend server ဟာ http://localhost:8000 မှာ run နေပါပြီ!

## Step 6: Verify Setup

Browser ဖွင့်ပြီး အောက်ပါ URLs တွေကို test လုပ်ပါ:

- **Health Check**: http://localhost:8000/health
- **API Info**: http://localhost:8000/api

အောင်မြင်ရင် JSON response ပြမှာဖြစ်ပါတယ်!

## Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution**: Node.js ကို install လုပ်ပြီး computer restart လုပ်ပါ

### Issue 2: "Cannot connect to database"
**Solutions**:
- PostgreSQL ဖွင့်ထားတာ သေချာပါစေ (`services.msc` မှာ စစ်ဆေးနိုင်ပါတယ်)
- DATABASE_URL မှာ username/password မှန်ကန်မှု စစ်ဆေးပါ
- Database name create လုပ်ထားတာ သေချာပါစေ

### Issue 3: "Prisma migrate failed"
**Solution**:
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Issue 4: "File upload not working"
**Solution**:
- Cloudinary credentials မှန်ကန်မှု စစ်ဆေးပါ
- Internet connection ရှိတာ သေချာပါစေ

## Security Notice

**IMPORTANT**: Production မှာ deploy လုပ်ခါနီးမှာ:

1. `JWT_ACCESS_SECRET` နဲ့ `JWT_REFRESH_SECRET` ကို ပြောင်းပါ
2. Strong, random strings များ သုံးပါ (အနည်းဆုံး 32 characters)
3. `.env` file ကို Git မှာ commit မလုပ်ပါနဲ့

```bash
# Generate secure random strings (PowerShell):
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## Next Steps

✅ Phase 1 ပြီးပါပြီ! အခု Phase 2 (Authentication & Security) ကို စတင်နိုင်ပါပြီ

Backend setup အောင်မြင်ပါပြီ! 🎉
