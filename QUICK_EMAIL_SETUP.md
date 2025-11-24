# ⚡ Quick Email Setup (3 Minutes)

Get email notifications for support tickets using your Gmail account!

## 🎯 What You Need

- Gmail account: `yashbora.ai@gmail.com`
- 3 minutes of your time

## 📋 3-Step Setup

### 1️⃣ Get Your Gmail App Password

**Go to:** https://myaccount.google.com/apppasswords

If link doesn't work:
1. Go to https://myaccount.google.com
2. Click "Security" → "2-Step Verification" → "App passwords"

**Create App Password:**
- Select app: **Mail**
- Select device: **Other** → Type: "CPI Training"
- Click **Generate**
- **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

⚠️ **Important:** Remove all spaces when copying!

### 2️⃣ Update `.env.local` File

Open `.env.local` in your project and find these lines:

```env
# Email Configuration (Gmail)
GMAIL_USER="yashbora.ai@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password-here"  # <- PASTE HERE
ADMIN_EMAIL="yashbora.ai@gmail.com"
```

Replace `your-gmail-app-password-here` with your password (no spaces):

```env
GMAIL_APP_PASSWORD="abcdefghijklmnop"
```

### 3️⃣ Restart Server & Test

```bash
# Stop server (Ctrl+C), then restart:
npm run dev
```

**Test it:**
1. Go to http://localhost:3000/support
2. Create a test ticket
3. Check your email! 📧

## ✅ Done!

You'll now receive emails at `yashbora.ai@gmail.com` whenever a support ticket is created!

## 🆘 Troubleshooting

**Can't find App Passwords option?**
→ Enable 2-Step Verification first: https://myaccount.google.com/signinoptions/two-step-verification

**"Invalid credentials" error?**
→ Make sure you removed all spaces from the app password

**No emails arriving?**
→ Check spam folder, verify `.env.local` is saved, restart server

## 📧 What Emails Look Like

**Admin Email (to you):**
- Subject: 🎫 New Support Ticket: TICKET-ABC123
- Contains: All ticket details, user info, description
- Professional HTML design with your brand colors

**User Confirmation:**
- Subject: ✅ Support Ticket Created: TICKET-ABC123
- Contains: Ticket number, 48-hour response promise

---

**That's it! No external services, no signups, just your Gmail!** 🚀
