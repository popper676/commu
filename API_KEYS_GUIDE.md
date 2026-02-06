# 🔑 API Keys & Credentials Setup Guide

This document explains how to get all the API keys needed for the backend.

## 1. Cloudinary (File Upload Service) - FREE

### အသုံးပြုရမည့် အကြောင်းအရင်း:
- Images, videos, documents တွေကို cloud မှာ store လုပ်ဖို့
- Automatic image optimization
- CDN (Content Delivery Network) support
- 25GB free storage

### Setup Steps:

#### a) Sign Up
1. Visit: https://cloudinary.com
2. Click "Sign up for free"
3. Enter your email and create password (or use Google/GitHub login)
4. Verify your email

#### b) Get Credentials
1. After login, you'll see the **Dashboard**
2. Look for the **Product Environment Credentials** box
3. You'll see:
   ```
   Cloud Name: dxxxxxx
   API Key: 123456789012345
   API Secret: abcdefghijklmnopqrstuvwx
   ```

#### c) Copy to .env
Open `backend/.env` and update:
```env
CLOUDINARY_CLOUD_NAME=dxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwx
```

**✅ FREE TIER LIMITS:**
- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: 25,000/month
- Enough for development and small production apps!

---

## 2. PostgreSQL Database

### Option A: Local Installation (Recommended for Development)

1. **Download**: https://www.postgresql.org/download/windows/
2. **Install**: Follow the installer wizard
3. **Remember**:
   - Port: 5432 (default)
   - Username: postgres
   - Password: (you choose)
4. **Create Database**:
   ```sql
   CREATE DATABASE community_myanmar;
   ```
5. **Update .env**:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/community_myanmar"
   ```

### Option B: Cloud Database (FREE Options)

#### Supabase (Recommended)
1. Visit: https://supabase.com
2. Click "Start your project"
3. Create a new project
4. Go to Settings → Database
5. Copy the **Connection string** (URI mode)
6. Paste into `DATABASE_URL` in `.env`

**✅ FREE TIER:**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- Unlimited API requests

#### Railway
1. Visit: https://railway.app
2. Sign up with GitHub
3. New Project → Provision PostgreSQL
4. Copy the **DATABASE_URL** from variables
5. Paste into `.env`

**✅ FREE TIER:**
- $5 credit per month
- Good for small projects

---

## 3. JWT Secrets (Security Tokens)

### Generate Secure Random Strings

JWT secrets ဟာ အလွန်အရေးကြီးပါတယ်! Production မှာ strong random strings သုံးပေးရပါမယ်.

#### Method A: Using PowerShell (Windows)
```powershell
# Generate Access Token Secret
-join ((65..90) + (97..122) + (48..57) + (33,35,36,37,38,42,43,45,61) | Get-Random -Count 40 | ForEach-Object {[char]$_})

# Generate Refresh Token Secret  
-join ((65..90) + (97..122) + (48..57) + (33,35,36,37,38,42,43,45,61) | Get-Random -Count 40 | ForEach-Object {[char]$_})
```

#### Method B: Using Node.js
```javascript
// Run in Node.js terminal
require('crypto').randomBytes(32).toString('hex')
```

#### Method C: Online Tool
- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" (256-bit)

### Update .env:
```env
JWT_ACCESS_SECRET=your_generated_secret_here_min_32_chars
JWT_REFRESH_SECRET=another_different_secret_min_32_chars
```

**🔒 SECURITY WARNINGS:**
- ⚠️ Never commit .env to Git
- ⚠️ Use different secrets for development and production
- ⚠️ Minimum 32 characters
- ⚠️ Access and Refresh secrets must be different

---

## 4. Payment Gateway APIs (Optional - Future)

သင့် app မှာ paid communities feature ကို activate လုပ်ချင်ရင် အောက်ပါ payment providers တွေကို သုံးနိုင်ပါတယ်.

### KBZ Pay
1. Visit: https://www.kbzpay.com/merchants
2. Apply for merchant account
3. Get API credentials

### Wave Money
1. Visit: https://www.wavemoney.com.mm
2. Contact for merchant integration
3. Get merchant ID and API keys

### AYA Pay
1. Visit: https://www.ayapay.com
2. Apply for business account
3. Get API integration details

**Note**: Payment integration ကို Phase 8 မှာ လုပ်မှာဖြစ်ပါတယ်. အခု လိုမနေပါဘူး.

---

## 5. Redis (Optional - For Scaling)

Real-time chat ကို multiple servers နဲ့ scale လုပ်ချင်ရင် Redis လိုပါမယ်.

### Option A: Local Installation
1. Download: https://github.com/microsoftarchive/redis/releases
2. Install and start Redis server
3. Update .env:
   ```env
   REDIS_URL=redis://localhost:6379
   ```

### Option B: Cloud Redis (FREE)

#### Upstash
1. Visit: https://upstash.com
2. Create account
3. Create Redis database
4. Copy connection string

**✅ FREE TIER:**
- 10,000 commands/day
- 256 MB storage

**Note**: Redis ဟာ optional ဖြစ်ပါတယ်. Small scale apps တွေမှာ မလိုဘူး.

---

## Summary Checklist

Setup လုပ်ဖို့ **လိုအပ်တာ** (Required):
- [x] Cloudinary (FREE - sign up at cloudinary.com)
- [x] PostgreSQL (FREE - local install or Supabase)
- [x] JWT Secrets (Generate random strings)

Optional (နောက်မှ လုပ်နိုင်တယ်):
- [ ] Payment Gateway APIs
- [ ] Redis  

---

## Quick Setup Commands

1. **Clone and navigate**:
   ```bash
   cd backend
   ```

2. **Copy .env and fill in values**:
   - Get Cloudinary credentials from dashboard
   - Setup PostgreSQL and get DATABASE_URL
   - Generate JWT secrets

3. **Install and migrate**:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start server**:
   ```bash
   npm run dev
   ```

---

## Need Help?

- Cloudinary: https://cloudinary.com/documentation
- Supabase: https://supabase.com/docs
- PostgreSQL: https://www.postgresql.org/docs/

---

**သတိပြုရန်:** All API keys များကို `.env` file ထဲမှာပဲ သိမ်းပါ. Git repository မှာ commit မလုပ်ပါနဲ့!
