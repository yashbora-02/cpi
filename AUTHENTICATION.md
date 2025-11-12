# Authentication System

## Overview

The CPI Training platform uses **Firebase Authentication** for secure user authentication.

## Current Implementation

### Firebase Configuration
- Location: [src/lib/firebase.ts](src/lib/firebase.ts)
- Environment variables stored in `.env.local`
- Firebase services initialized: Authentication, Firestore

### Authentication Helpers
- Location: [src/lib/firebaseAuth.ts](src/lib/firebaseAuth.ts)
- Functions available:
  - `loginWithEmail(email, password)` - Sign in existing users
  - `registerWithEmail(email, password)` - Create new users
  - `logout()` - Sign out current user
  - `getCurrentUser()` - Get current authenticated user

### Login Page
- Location: [src/app/login/page.tsx](src/app/login/page.tsx)
- Uses Firebase email/password authentication
- Stores Firebase ID token in localStorage as `firebaseToken`
- Redirects to `/dashboard` on successful login
- Uses `onAuthStateChanged` to check authentication state

## Authentication Flow

1. **User enters email and password** on login page
2. **Firebase validates credentials** via `loginWithEmail()`
3. **On success:**
   - Firebase returns authenticated user object
   - ID token is retrieved via `user.getIdToken()`
   - Token stored in localStorage as `firebaseToken`
   - User redirected to dashboard
4. **On error:**
   - User-friendly error message displayed
   - Common errors handled: invalid credentials, too many requests, network errors

## Creating Test Users

### Via Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `cpi-acdc1`
3. Navigate to Authentication → Users
4. Click "Add user"
5. Enter email and password

### Via Code (Registration)
Use the `registerWithEmail()` function:
```typescript
import { registerWithEmail } from '@/lib/firebaseAuth';

const { user, error } = await registerWithEmail('test@example.com', 'password123');
```

## Protected Routes

Protected routes should check for Firebase authentication:

```typescript
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Your protected content here
}
```

## Security Notes

- Firebase API keys in `.env.local` are safe to expose on client-side (they're restricted by Firebase Console settings)
- Firebase ID tokens expire after 1 hour and are automatically refreshed
- Always validate Firebase tokens on the server-side for API requests
- Never commit `.env.local` to version control (already in `.gitignore`)

## Migration from Previous System

The previous authentication system used:
- Prisma with PostgreSQL for user storage
- JWT tokens generated server-side
- `/api/login` endpoint for authentication

This has been replaced with Firebase Authentication for:
- Better security and scalability
- Built-in user management
- Automatic token refresh
- Email verification support
- Password reset functionality

## Future Enhancements

Consider implementing:
- Email verification flow
- Password reset functionality
- Social login (Google, Facebook, etc.)
- Multi-factor authentication (MFA)
- Role-based access control with Firestore
