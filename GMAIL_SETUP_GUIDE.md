# Gmail Email Setup Guide - Simple & Quick! 📧

This guide shows you how to set up email notifications using your **Gmail account** - no external service signup needed!

## What Happens When a Ticket is Created?

1. **Admin Email (you)** gets a detailed notification at `yashbora.ai@gmail.com`
2. **User** gets a confirmation email with their ticket number

## Setup Steps (Takes 3 minutes!)

### Step 1: Enable 2-Step Verification on Your Gmail Account

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable it (if not already enabled)

### Step 2: Generate an App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or Google Account → Security → 2-Step Verification → App passwords
2. You may need to sign in again
3. In "Select app" dropdown, choose **Mail**
4. In "Select device" dropdown, choose **Other (Custom name)**
5. Type: **CPI Training Platform**
6. Click **Generate**
7. Google will show you a 16-character password (like: `abcd efgh ijkl mnop`)
8. **Copy this password** (you won't see it again!)

### Step 3: Add Credentials to `.env.local`

Open your `.env.local` file and update these lines:

```env
GMAIL_USER="yashbora.ai@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"  # <- Paste your 16-character password (no spaces)
ADMIN_EMAIL="yashbora.ai@gmail.com"
```

**Important:** Remove all spaces from the app password when pasting!

### Step 4: Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### Step 5: Test It!

1. Open your app: http://localhost:3000
2. Log in
3. Go to Support Center (`/support`)
4. Create a test ticket
5. Check your email at **yashbora.ai@gmail.com**

You should receive a beautifully formatted email with all ticket details!

## Example `.env.local` Configuration

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cpi_training"

# JWT Secret
JWT_SECRET="your-secret-key-here-change-in-production"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBZTgdJN65kF4krS4hi4wKCv6EaxvK0f-g"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="cpi-631f6.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="cpi-631f6"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="cpi-631f6.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="670668883146"
NEXT_PUBLIC_FIREBASE_APP_ID="1:670668883146:web:9e709c41b0cffee254a033"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-S807PFR4CG"

# Email Configuration (Gmail)
GMAIL_USER="yashbora.ai@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"  # Your actual 16-char app password
ADMIN_EMAIL="yashbora.ai@gmail.com"
```

## Troubleshooting

### Error: "Invalid credentials"
- **Solution:** Make sure you're using an **App Password**, not your regular Gmail password
- Make sure there are **no spaces** in the app password

### Error: "2-Step Verification required"
- **Solution:** Enable 2-Step Verification on your Google Account first

### Not receiving emails?
1. Check spam/junk folder
2. Verify `GMAIL_USER` is correct in `.env.local`
3. Check terminal logs for error messages
4. Make sure your dev server was restarted after adding credentials

### App Password option not showing?
- Make sure 2-Step Verification is enabled
- Wait 10-15 minutes after enabling 2-Step Verification
- Try accessing directly: https://myaccount.google.com/apppasswords

## What You'll Receive

### Admin Email (to yashbora.ai@gmail.com):
```
🎫 New Support Ticket: TICKET-ABC123

┌─────────────────────────────────┐
│ Ticket Number: TICKET-ABC123    │
│ Type: General Request           │
│ Title: Need help with login     │
│ Reported By: John Doe           │
│ Email: john@example.com         │
│ Phone: +1-555-123-4567          │
└─────────────────────────────────┘

Description:
I'm unable to log in to my account...

⏰ Response Time: Please respond within 48 hours.
```

### User Confirmation Email:
```
✅ Ticket Confirmed

Hey John Doe,

We got your ticket! We are working on it and will
answer within 48 hours.

Your Ticket Number: TICKET-ABC123

📌 Important: Please reference this ticket number
in any future correspondence about this issue.
```

## Security Notes

✅ **Safe:** App passwords are specific to applications and don't give access to your full Google Account

✅ **Secure:** You can revoke app passwords anytime without changing your Gmail password

✅ **Private:** App passwords are only shown once - keep them in `.env.local` only

## Gmail Sending Limits

- **Free Gmail:** 500 emails per day
- **Google Workspace:** 2,000 emails per day

More than enough for support tickets!

## Production Deployment (Vercel)

When deploying to production:

1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add these three variables:
   - `GMAIL_USER`: `yashbora.ai@gmail.com`
   - `GMAIL_APP_PASSWORD`: Your 16-character app password
   - `ADMIN_EMAIL`: `yashbora.ai@gmail.com`
4. Redeploy your app

## Summary

✅ No external service signup needed
✅ No credit card required
✅ No monthly fees
✅ Uses your existing Gmail account
✅ Professional HTML email templates
✅ Works in development and production
✅ Both admin and user get notified

**Total setup time: ~3 minutes!**

Need help? Check the troubleshooting section above or contact support.
