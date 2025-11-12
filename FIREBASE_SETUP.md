# Firebase Setup Guide for CPI Training

This guide will help you set up Firebase Authentication for the login portal.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "CPI Training")
   - Enable/disable Google Analytics (optional)
   - Create project

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started"
3. Go to the **Sign-in method** tab
4. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

## Step 3: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app:
   - App nickname: "CPI Training Web"
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

## Step 4: Get Firebase Configuration

After registering, you'll see your Firebase config object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

## Step 5: Add Environment Variables

1. Create a `.env.local` file in the project root (it's already in .gitignore)
2. Copy the template from `.env.example`
3. Fill in your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abc..."
```

## Step 6: Create Test Users

### Option 1: Via Firebase Console
1. Go to **Authentication** → **Users** tab
2. Click "Add User"
3. Enter email and password
4. Click "Add User"

### Option 2: Via Sign Up Page (if implemented)
- Users can register through the application

### Example Test User:
```
Email: instructor@cpitraining.com
Password: Test123!
```

## Step 7: Restart Development Server

After adding environment variables:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Firebase Authentication Flow

### Current Implementation:

**Login Page** (`src/app/login/page.tsx`):
- Uses Firebase email/password authentication
- Gets Firebase auth token
- Stores user session
- Redirects to dashboard

**Firebase Config** (`src/lib/firebase.ts`):
- Initializes Firebase app
- Exports auth and firestore instances

**Auth Helpers** (`src/lib/firebaseAuth.ts`):
- `loginWithEmail()` - Sign in user
- `registerWithEmail()` - Create new user
- `logout()` - Sign out user
- `getCurrentUser()` - Get current user

## Security Rules (Firestore)

If you're using Firestore, set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Optional: Firestore Database Setup

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode**
4. Select your region
5. Click "Enable"

## Migration from Current System

Your app currently uses:
- **Prisma + PostgreSQL** for admin login
- **JWT tokens** for session management

### Migration Options:

**Option 1: Firebase Only**
- Remove Prisma authentication
- Use Firebase for all auth
- Store user data in Firestore

**Option 2: Hybrid (Recommended)**
- Keep Prisma for data storage
- Use Firebase for authentication
- Sync Firebase UID with Prisma users

**Option 3: Keep Current + Add Firebase**
- Use Prisma/JWT for admins
- Use Firebase for instructors/students
- Two separate login flows

## Testing the Integration

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3001/login
3. Try logging in with your test user
4. Check browser console for any Firebase errors
5. Verify redirect to dashboard works

## Troubleshooting

### Error: "Firebase config is missing"
- Check that `.env.local` exists
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Restart dev server after adding env variables

### Error: "auth/invalid-email"
- Ensure email format is correct
- Check that Email/Password auth is enabled in Firebase Console

### Error: "auth/user-not-found"
- Create a test user in Firebase Console
- Or implement user registration

### Error: "auth/wrong-password"
- Verify password is correct
- Password must be at least 6 characters

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Enable Email/Password authentication
3. ✅ Add environment variables
4. ✅ Create test users
5. ⬜ Test login flow
6. ⬜ Implement user registration (optional)
7. ⬜ Add password reset (optional)
8. ⬜ Set up Firestore rules (if using database)

## Documentation

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
