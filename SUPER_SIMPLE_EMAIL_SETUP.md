# ⚡ SUPER SIMPLE Email Setup - Takes 2 Minutes!

No Gmail passwords, no app passwords, no complications!

## 🎯 3 Steps Only:

### Step 1: Get Free Access Key (30 seconds)

1. Go to: **https://web3forms.com**
2. Enter your email: **yashbora.ai@gmail.com**
3. Click **"Create Access Key"**
4. **Copy the access key** (looks like: `a1b2c3d4-1234-5678-90ab-cdef12345678`)

That's it! No signup, no verification, instant access key!

---

### Step 2: Add to `.env.local` (30 seconds)

Open your `.env.local` file and find this line:

```env
WEB3FORMS_ACCESS_KEY="YOUR_ACCESS_KEY_HERE"
```

Replace with your access key:

```env
WEB3FORMS_ACCESS_KEY="a1b2c3d4-1234-5678-90ab-cdef12345678"
```

---

### Step 3: Restart & Test (1 minute)

```bash
npm run dev
```

**Test it:**
1. Go to: http://localhost:3000/support
2. Create a test ticket
3. Check your email: **yashbora.ai@gmail.com** 📧

---

## ✅ Done!

You'll receive an email with all ticket details instantly!

### What the Email Looks Like:

```
🎫 New Support Ticket: TICKET-XYZ123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TICKET NUMBER: TICKET-XYZ123
TYPE: General Request
TITLE: Test Ticket

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REPORTED BY: John Doe
EMAIL: john@example.com
PHONE: +1-555-123-4567

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESCRIPTION:
This is a test ticket to verify emails work...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ RESPONSE TIME: Please respond within 48 hours.
```

---

## 💡 Why Web3Forms?

✅ **No signup** - Just enter email, get key
✅ **Instant** - Works immediately
✅ **Free** - 250 emails/month free forever
✅ **Simple** - No complicated setup
✅ **Reliable** - Used by thousands of developers
✅ **No passwords** - No Gmail app passwords needed

---

## 🆘 Troubleshooting

### Not receiving emails?

1. **Check spam folder** - First time might go to spam
2. **Verify access key** - Make sure it's copied correctly in `.env.local`
3. **Restart server** - Run `npm run dev` again
4. **Check email** - Make sure `yashbora.ai@gmail.com` is correct in `.env.local`

### "WEB3FORMS_ACCESS_KEY not configured" error?

- Make sure you saved the `.env.local` file
- Restart your dev server after adding the key

---

## 🚀 Production Deployment

When deploying to Vercel:

1. Go to Vercel project settings
2. Add environment variable:
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: Your access key
3. Add environment variable:
   - Name: `ADMIN_EMAIL`
   - Value: `yashbora.ai@gmail.com`
4. Redeploy

---

**That's literally it! No other setup needed!** 🎉

### Get Started Now:

👉 https://web3forms.com
