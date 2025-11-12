# Vercel Deployment Guide

This guide will help you deploy your CPI Training Platform to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your Firebase project credentials
3. A PostgreSQL database (recommended: Vercel Postgres, Supabase, or Railway)

## Step 1: Prepare Your Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` connection string

### Option B: Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the connection string (URI format)

### Option C: Railway
1. Create a project at [railway.app](https://railway.app)
2. Add a PostgreSQL database
3. Copy the `DATABASE_URL`

## Step 2: Push Your Code to GitHub

Your code is already pushed to: `https://github.com/yashbora-02/cpi`

## Step 3: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `yashbora-02/cpi`
3. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### Add Environment Variables

In the Vercel project settings, add these environment variables:

#### Database
```
DATABASE_URL=your_postgresql_connection_string
```

#### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important**: Copy these values from your `.env.example` or Firebase Console.

## Step 4: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized Domains**
4. Add your Vercel domain (e.g., `your-project.vercel.app`)

## Step 5: Initialize Database

After your first deployment:

1. Go to your Vercel project → Settings → Environment Variables
2. Verify `DATABASE_URL` is set correctly
3. The database schema will be automatically created during build via `prisma generate`

**Optional**: To manually push schema changes:
```bash
npx prisma db push
```

## Step 6: Deploy

Click **Deploy** in Vercel. The deployment process will:
1. Install dependencies
2. Run `prisma generate` (via postinstall script)
3. Build the Next.js application
4. Deploy to production

## Post-Deployment Checklist

- [ ] Visit your deployed URL
- [ ] Test user registration with email
- [ ] Test Google Sign-in
- [ ] Test dashboard access
- [ ] Verify course pages load correctly
- [ ] Check that protected routes redirect to login

## Troubleshooting

### Build Fails with Prisma Error
**Solution**: Ensure `DATABASE_URL` is set in environment variables. Prisma needs it to generate the client.

### Firebase Authentication Not Working
**Solution**:
1. Check that all `NEXT_PUBLIC_FIREBASE_*` variables are set
2. Verify your Vercel domain is added to Firebase Authorized Domains

### Database Connection Error
**Solution**:
1. Verify `DATABASE_URL` format is correct
2. Check database is accessible from the internet
3. For Vercel Postgres, ensure you're using the external connection string

### "Module not found: @/generated/prisma"
**Solution**: This is automatically fixed by the `postinstall` script. If it persists, check that `prisma generate` runs during build.

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Yes | Firebase measurement ID |

## Quick Deploy Button

Once your environment is configured, you can use this button for future deployments:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yashbora-02/cpi)

## Continuous Deployment

Every push to the `main` branch will automatically trigger a new deployment on Vercel.

## Production Best Practices

1. **Use Production Firebase Project**: Don't use your development Firebase project in production
2. **Secure Database**: Use strong passwords and connection pooling
3. **Monitor Logs**: Check Vercel Function Logs for any runtime errors
4. **Set up Domains**: Configure a custom domain in Vercel project settings
5. **Enable Analytics**: Use Vercel Analytics for performance monitoring

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Firebase Documentation](https://firebase.google.com/docs)
