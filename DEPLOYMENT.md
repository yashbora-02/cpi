# Vercel Deployment Guide for CPI Training Platform

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/signup)
3. A Firebase project set up
4. A PostgreSQL database (recommended: Vercel Postgres, Supabase, or Railway)

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - CPI Training Platform"

# Add your GitHub repository as remote
git remote add origin https://github.com/yashbora-02/cpi-demo.git
git branch -M main
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

In Vercel dashboard, go to **Project Settings → Environment Variables** and add:

#### Database
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

#### JWT
```
JWT_SECRET=your-secure-random-string-here
```

#### Firebase (all required)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Set Up Production Database

#### Option A: Vercel Postgres (Recommended for Vercel)

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. Follow the setup wizard
4. Vercel will automatically add `DATABASE_URL` to your environment variables

#### Option B: Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the connection string
4. Add it as `DATABASE_URL` in Vercel environment variables

#### Option C: Railway

1. Create a project at [railway.app](https://railway.app)
2. Add a PostgreSQL database
3. Copy the connection string
4. Add it as `DATABASE_URL` in Vercel environment variables

### 5. Run Database Migrations

After database is set up, run Prisma migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull .env.local

# Run Prisma commands
npx prisma generate
npx prisma db push
```

Or run from Vercel dashboard terminal:
1. Go to your project
2. Click **Deployments**
3. Click on latest deployment → **Functions** tab → Open terminal
4. Run: `npx prisma db push`

### 6. Configure Firebase for Production

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication → Settings → Authorized domains**
4. Add your Vercel deployment domain (e.g., `your-project.vercel.app`)
5. Enable authentication methods:
   - Email/Password
   - Google Sign-In

### 7. Deploy

Click **Deploy** in Vercel dashboard. The deployment process will:
1. Install dependencies
2. Run `prisma generate`
3. Build the Next.js application
4. Deploy to Vercel's edge network

### 8. Verify Deployment

1. Visit your deployed URL
2. Test user registration and login
3. Check database connections
4. Test all features

## Post-Deployment

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Firebase authorized domains with your custom domain

### Monitoring

- **Vercel Analytics**: Enable in Project Settings
- **Error Tracking**: Check deployment logs for errors
- **Performance**: Monitor Core Web Vitals in Vercel dashboard

### Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### Build Errors

1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `prisma generate` runs successfully

### Database Connection Issues

1. Verify `DATABASE_URL` format
2. Check database firewall rules
3. Ensure SSL is enabled if required
4. Test connection from local environment

### Firebase Authentication Issues

1. Verify all Firebase environment variables are correct
2. Check authorized domains in Firebase Console
3. Ensure authentication methods are enabled

### Prisma Issues

```bash
# Reset Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database
npx prisma studio
```

## Environment Variables Checklist

- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET`
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use strong JWT_SECRET** - Generate with: `openssl rand -base64 32`
3. **Enable Firebase App Check** for production
4. **Use environment-specific Firebase projects**
5. **Keep dependencies updated**: `npm audit fix`

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Firebase Setup](https://firebase.google.com/docs/web/setup)

For project-specific issues, check the main [README.md](./README.md) or open an issue on GitHub.
