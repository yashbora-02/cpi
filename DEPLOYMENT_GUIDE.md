# Vercel Deployment Guide

## Current Issues on Vercel

Your deployed site at `cpi-demo-nine.vercel.app` is experiencing 500 errors because:
1. ❌ Firebase Admin SDK is not configured with service account credentials
2. ❌ Firestore database may not be seeded with initial data

## Solution: Configure Firebase Service Account on Vercel

### Step 1: Add Firebase Service Account to Vercel

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Navigate to your project: **cpi-demo-nine**
3. Go to **Settings** → **Environment Variables**
4. Add a new environment variable:

   **Variable Name:** `FIREBASE_SERVICE_ACCOUNT_KEY`

   **Value:** Copy the ENTIRE contents of your `serviceAccountKey.json` file

   ⚠️ **IMPORTANT:** The value should be the entire JSON object as a string, including all the curly braces and quotes.

5. Make sure to select all environments (Production, Preview, Development)
6. Click **Save**

### Step 2: Update firestoreAdmin.ts to Use Environment Variable

The code already supports reading from the environment variable, but we need to update it:

```typescript
// In src/lib/firestoreAdmin.ts
try {
  // Try to load service account key from environment variable first
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountEnv) {
    const serviceAccount = JSON.parse(serviceAccountEnv);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized from environment variable');
  } else {
    // Fallback to file (for local development)
    const serviceAccountPath = join(process.cwd(), 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized with service account file');
  }
} catch (error) {
  // ...
}
```

### Step 3: Seed the Production Database

After deploying with the updated environment variables:

1. Visit: `https://cpi-demo-nine.vercel.app/api/seed`
2. This will create initial credits and videos in your production Firestore database
3. You should see: `{"success":true,"message":"Firestore seeded successfully!",...}`

### Step 4: Redeploy Your Site

1. In Vercel dashboard, go to **Deployments**
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

## Verification

After deployment, test these endpoints:

1. **Credits API:**
   ```
   https://cpi-demo-nine.vercel.app/api/credits?userId=admin
   ```
   Should return an array of credits

2. **Dashboard:**
   ```
   https://cpi-demo-nine.vercel.app/dashboard
   ```
   Should show your credits without errors

## Local Development Works Fine ✅

Your local development environment is working correctly:
- ✅ Firebase Admin SDK initialized with service account
- ✅ Credits API returns data: `curl http://localhost:3000/api/credits?userId=admin`
- ✅ Database seeding works: `curl http://localhost:3000/api/seed`
- ✅ Payment cards API fixed (removed composite index requirement)

## Need Help?

If you still see errors after following these steps:
1. Check Vercel logs: **Deployments** → Click on latest → **Functions** tab
2. Verify the environment variable was saved correctly
3. Make sure you redeployed after adding the environment variable
