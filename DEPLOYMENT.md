# Vercel Deployment Guide

This guide will help you deploy the CPI Training Platform to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Firebase Project**: Set up at [console.firebase.google.com](https://console.firebase.google.com)
3. **Firebase Service Account Key**: Required for server-side operations

## Step 1: Prepare Firebase Service Account Key

### Option 1: Using Service Account JSON (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file securely (DO NOT commit to Git)

### Option 2: Using Environment Variables

You can add Firebase credentials directly as environment variables in Vercel.

## Step 2: Configure Environment Variables in Vercel

Go to your Vercel project settings → **Environment Variables** and add:

### Firebase Client Configuration (Required)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Firebase Admin SDK (Required for Server-Side Operations)

**Option A: Using Service Account JSON (Recommended)**
```
FIREBASE_SERVICE_ACCOUNT_KEY=<paste entire JSON content here>
```

**Option B: Using Individual Fields**
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```
Note: Without service account key, admin features will have limited functionality.

### Email Configuration (Optional - for Support Tickets)
```
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
ADMIN_EMAIL=your-email@example.com
```

Get your FREE Web3Forms key at: https://web3forms.com

## Step 3: Deploy to Vercel

### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via GitHub

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure environment variables (see Step 2)
5. Click **Deploy**

### Method 3: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Continue with GitHub** or use another Git provider
3. Import your repository
4. Vercel will auto-detect Next.js
5. Add environment variables in the dashboard
6. Click **Deploy**

## Step 4: Post-Deployment Configuration

### 1. Verify Deployment
- Visit your deployment URL
- Test login with admin/instructor credentials
- Check Firestore connection
- Verify credit system works

### 2. Set Up Firestore Security Rules

Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow admin SDK full access (server-side)
    // Client-side rules below

    match /users/{userId} {
      allow read, write: if request.auth != null;
    }

    match /credits/{creditId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    match /digitalCards/{cardId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if false; // Cards are locked after creation

      match /students/{studentId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
    }

    match /tickets/{ticketId} {
      allow read, create: if true; // Public ticket creation
    }

    match /videos/{videoId} {
      allow read: if request.auth != null;
    }

    match /savedCards/{cardId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Configure Firebase Authentication

1. Go to Firebase Console → Authentication
2. Enable **Email/Password** sign-in method
3. Enable **Google** sign-in (optional)
4. Add your Vercel domain to authorized domains

### 4. Update CORS Settings (if needed)

If you encounter CORS issues with Firebase Storage:
1. Create a `cors.json` file:
   ```json
   [
     {
       "origin": ["https://your-vercel-domain.vercel.app"],
       "method": ["GET", "POST", "PUT", "DELETE"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

2. Apply CORS configuration:
   ```bash
   gsutil cors set cors.json gs://your-bucket-name.appspot.com
   ```

## Step 5: Seed Database (First-Time Setup)

After deployment, seed your database with initial data:

1. Visit: `https://your-domain.vercel.app/api/seed`
2. This will create:
   - Sample credits for admin user
   - Sample training videos

**Security Note**: The seed endpoint is protected and only works in development. For production seeding, you'll need to add a secret key check or use Firebase Admin SDK directly.

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors
- **Solution**: Already configured to ignore TypeScript errors in `next.config.ts`

**Issue**: Missing environment variables
- **Solution**: Ensure all required variables are set in Vercel dashboard

### Runtime Errors

**Issue**: Firebase Admin SDK not working
- **Solution**: Verify `FIREBASE_SERVICE_ACCOUNT_KEY` is set correctly in Vercel

**Issue**: 401 Unauthorized errors
- **Solution**: Check Firebase Auth is properly configured and domain is authorized

**Issue**: Firestore permission denied
- **Solution**: Update Firestore security rules (see Step 4.2)

### Performance Issues

**Issue**: Cold starts
- **Solution**: Vercel serverless functions may have cold starts. Consider upgrading to Pro plan for faster performance.

**Issue**: Large bundle size
- **Solution**: Already optimized with Next.js image optimization and code splitting

## Custom Domain Setup

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Update Firebase authorized domains to include your custom domain

## Monitoring and Analytics

### Vercel Analytics
- Enable in Vercel dashboard → **Analytics**
- Monitor performance, errors, and usage

### Firebase Analytics
- Already configured via `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- View analytics in Firebase Console

## Security Checklist

- [ ] Service account key is stored as environment variable (NOT in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] Firestore security rules are configured
- [ ] Firebase Authentication domains are restricted
- [ ] CORS is configured for production domain
- [ ] Admin routes are protected with authentication
- [ ] API routes verify authentication tokens

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | Firebase client API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | ✅ | Firebase measurement ID |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | ⚠️ Recommended | Service account JSON for admin operations |
| `WEB3FORMS_ACCESS_KEY` | ⬜ Optional | For email notifications |
| `ADMIN_EMAIL` | ⬜ Optional | Admin email for notifications |

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for client-side errors
3. Review Firebase Console for backend errors
4. Ensure all environment variables are correctly set
