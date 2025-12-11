# Vercel Deployment Checklist

Use this checklist before deploying to Vercel to ensure everything is configured correctly.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] Build succeeds locally (`npm run build`)
- [x] No TypeScript errors (configured to ignore in `next.config.ts`)
- [x] All pages render correctly in dev mode
- [ ] Test all main features work locally
- [x] Course-specific credit system implemented
- [x] Digital card creation works
- [x] Support ticket system functional

### 2. Environment Variables
- [ ] All Firebase credentials ready
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- [ ] Firebase Service Account Key ready (entire JSON)
- [ ] Web3Forms key (optional, for email notifications)
- [ ] Admin email configured (optional)

### 3. Firebase Configuration
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Authentication methods enabled (Email/Password)
- [ ] Service account key downloaded
- [ ] Storage bucket configured (for file uploads)
- [ ] Firestore security rules updated (see DEPLOYMENT.md)

### 4. Git Repository
- [ ] Code committed to Git
- [ ] `.gitignore` includes:
  - `.env.local`
  - `serviceAccountKey.json`
  - `node_modules/`
  - `.next/`
- [ ] Pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is accessible to Vercel

### 5. Vercel Project Setup
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Node.js version: 18.x or higher

### 6. Vercel Environment Variables
Go to Project Settings → Environment Variables and add:

**Production Environment:**
- [ ] All Firebase client variables (NEXT_PUBLIC_*)
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` (paste entire JSON)
- [ ] `WEB3FORMS_ACCESS_KEY` (optional)
- [ ] `ADMIN_EMAIL` (optional)

**Important Notes:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the client
- `FIREBASE_SERVICE_ACCOUNT_KEY` should be kept secret (server-side only)
- All environments (Production, Preview, Development) should have the same variables

### 7. Build Configuration
- [x] `vercel.json` configured
- [x] `next.config.ts` optimized for production
- [x] TypeScript errors ignored during build
- [x] Image optimization enabled
- [x] Compression enabled

### 8. Post-Deployment Tasks
After successful deployment:
- [ ] Visit deployment URL to verify it loads
- [ ] Seed database: `https://your-domain.vercel.app/api/seed`
- [ ] Test login with admin/admin123
- [ ] Test course-specific credit system
- [ ] Test digital card creation
- [ ] Test support ticket submission
- [ ] Add custom domain (optional)
- [ ] Update Firebase authorized domains with Vercel URL

### 9. Firebase Security
- [ ] Update Firestore security rules
- [ ] Add Vercel domain to Firebase authorized domains
- [ ] Test authentication works on production
- [ ] Verify API routes are protected

### 10. Performance & Monitoring
- [ ] Enable Vercel Analytics (optional)
- [ ] Monitor build logs for warnings
- [ ] Check Lighthouse scores
- [ ] Test on mobile devices
- [ ] Verify all images load correctly

## 🚀 Deployment Methods

### Method 1: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Method 2: Git Integration (Recommended)
1. Push to GitHub
2. Import on Vercel
3. Configure environment variables
4. Deploy automatically on every push

### Method 3: Vercel Dashboard
1. Go to vercel.com/new
2. Import repository
3. Configure and deploy

## 🔍 Verification Steps

After deployment, test these features:

1. **Landing Page**
   - [ ] Loads correctly
   - [ ] Navigation works
   - [ ] Responsive design

2. **Authentication**
   - [ ] Login with admin/admin123
   - [ ] Dashboard redirects after login
   - [ ] Logout works

3. **Dashboard**
   - [ ] Shows credit breakdown by course type
   - [ ] Total credits display correctly
   - [ ] Navigation to all sections works

4. **Digital Card Creation**
   - [ ] Multi-step form works
   - [ ] Student roster builds correctly
   - [ ] Credit confirmation modal shows course-specific credits
   - [ ] Submission succeeds
   - [ ] Credits deduct from correct course type

5. **Credit System**
   - [ ] Credits display correctly per course
   - [ ] Cannot use CPR credits for First Aid courses
   - [ ] Purchase page loads
   - [ ] Package selection works

6. **Support System**
   - [ ] Ticket creation form works
   - [ ] File upload works
   - [ ] Email notification sent (if configured)
   - [ ] Unique ticket number generated

## ⚠️ Common Issues

### Build Fails
- **TypeScript errors**: Already configured to ignore
- **Missing env vars**: Check Vercel dashboard
- **Import errors**: Verify all dependencies in package.json

### Runtime Errors
- **Firebase errors**: Verify all env vars are set
- **401 Unauthorized**: Check Firebase service account key
- **CORS errors**: Add Vercel domain to Firebase

### Database Issues
- **Firestore permission denied**: Update security rules
- **Data not saving**: Check service account permissions
- **Seed endpoint not working**: Only works in dev mode by default

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Project DEPLOYMENT.md](./DEPLOYMENT.md)
- [Project CLAUDE.md](./CLAUDE.md)

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Site loads at Vercel URL
- ✅ Login works with admin credentials
- ✅ Dashboard shows course-specific credits
- ✅ Digital card creation completes
- ✅ Credits deduct correctly by course type
- ✅ No console errors in browser
- ✅ Firebase connection working

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify all environment variables
4. Review DEPLOYMENT.md for detailed guide
5. Check Firebase Console for errors
