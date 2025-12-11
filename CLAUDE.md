# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CPI Training Platform - a comprehensive CPR and First Aid training management system built with Next.js 15, Firebase Authentication, Firestore, and Tailwind CSS 4. The platform manages courses, instructors, students, training credits, and video content for certification programs.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm install          # Install dependencies
```

### Database Seeding
To seed Firestore with initial data:
1. Start the dev server: `npm run dev`
2. Visit: `http://localhost:3000/api/seed`
3. This creates sample credits and videos in Firestore

**Note:** Seeding is only available in development mode (NODE_ENV !== 'production')

### Environment Setup
Required environment variables (see `.env.example`):
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase client API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID
- `WEB3FORMS_ACCESS_KEY` - Free email service API key from https://web3forms.com (optional)
- `ADMIN_EMAIL` - Email address to receive support ticket notifications (optional)

## Architecture

### Tech Stack
- **Framework:** Next.js 15.5.7 with App Router
- **Language:** TypeScript 5
- **Database:** Firebase Firestore (NoSQL document database)
- **Storage:** Firebase Storage (for file uploads)
- **Auth:** Firebase Authentication (Email/Password + Google Sign-in)
- **Styling:** Tailwind CSS 4.0
- **UI Components:** React Icons, Headless UI
- **Deployment:** Vercel
- **Node.js:** 18+ required

### Database Architecture

**All data is stored in Firebase Firestore.** This is a NoSQL document database with real-time capabilities.

**Firestore Collections:**

1. **credits** - Training credits by user and course type
   - Fields: `userId`, `userEmail`, `courseType`, `credits`, `updatedAt`
   - One document per user per course type
   - Real-time credit balance tracking

2. **tickets** - Support tickets with file attachments
   - Fields: `ticketNumber`, `type`, `title`, `description`, `reportedBy`, `email`, `phone`, `fileUrl`, `fileName`, `status`, `createdAt`, `updatedAt`
   - Auto-generated unique ticket numbers

3. **videos** - Training video metadata
   - Fields: `videoId`, `title`, `description`, `videoUrl`, `thumbnailUrl`, `order`, `createdAt`, `updatedAt`
   - Ordered list of training videos

4. **digitalCards** - Class/training session records
   - Fields: `classId`, `program`, `site`, `classType`, `startDate`, `endDate`, `accreditingInstructor`, `assistingInstructor`, `openEnrollment`, `isLocked`, `submittedAt`, `submittedBy`, `creditsUsed`, `userId`, `createdAt`, `updatedAt`
   - **Subcollection:** `students` - Students enrolled in this digital card
     - Fields: `firstName`, `lastName`, `email`, `certificateUrl`, `createdAt`

5. **savedCards** - Saved payment cards for users
   - Fields: `userEmail`, `cardLastFour`, `cardType`, `cardholderName`, `expiryMonth`, `expiryYear`, `isDefault`, `createdAt`, `updatedAt`

### Directory Structure
```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API route handlers (protected with Firebase Auth)
│   │   ├── auth/             # Authentication endpoints
│   │   ├── credits/          # Credits management (GET/POST)
│   │   │   ├── route.ts      # GET/POST user credits
│   │   │   ├── balance/      # GET credit balance
│   │   │   └── purchase/     # POST purchase credits
│   │   ├── tickets/          # Support tickets (GET/POST)
│   │   ├── videos/           # GET video playlist
│   │   ├── digital-cards/    # Digital card management
│   │   │   ├── submit/       # POST create digital card
│   │   │   └── [classId]/    # GET digital card by ID
│   │   ├── payment/          # Payment card management
│   │   │   └── cards/        # GET/POST saved cards
│   │   │       └── [cardId]/ # DELETE/PUT card operations
│   │   └── seed/             # Database seeding endpoint (dev only)
│   ├── acceptance/           # Acceptance/accreditation info page
│   ├── courses/              # Course browsing and enrollment
│   ├── credits/purchase/     # Credit purchase page
│   ├── dashboard/            # Main dashboard with credit overview
│   ├── instructors/          # Instructor management
│   ├── login/                # Login page (Email + Google)
│   ├── register/             # Registration page
│   ├── students/search/      # Student search functionality
│   ├── support/              # Support Center with ticket creation
│   ├── training/             # Multi-step class creation wizard
│   │   └── create-class/     # Blended/Online class creation
│   ├── video/                # Video player page
│   └── page.tsx              # Landing page
├── components/               # Reusable components
│   ├── Sidebar.tsx           # Main navigation sidebar
│   ├── *Modal.tsx            # Various modal components
│   ├── *Drawer.tsx           # Drawer components
│   └── Student*.tsx          # Student-related components
├── lib/                      # Utility libraries
│   ├── firebase.ts           # Firebase client config (Auth + Firestore)
│   ├── firebaseAdmin.ts      # Firebase Admin SDK (Auth verification)
│   ├── firestoreAdmin.ts     # Firestore Admin SDK (database operations)
│   ├── firestoreHelpers.ts   # Firestore client-side helpers
│   ├── firebaseAuth.ts       # Auth helper functions
│   ├── LanguageContext.tsx   # i18n context (English/Spanish)
│   ├── translations.ts       # Translation strings
│   └── email.ts              # Email notifications (Web3Forms)
└── styles/                   # Global styles
```

### Authentication Flow

**Client-side** (`src/lib/firebase.ts`, `src/lib/firebaseAuth.ts`):
1. User authenticates via Firebase (Email/Password or Google Sign-in)
2. Firebase handles authentication state via `onAuthStateChanged`
3. ID token retrieved via `user.getIdToken()` and stored in localStorage as "firebaseToken"
4. Protected pages check auth state on mount, redirect to `/login` if not authenticated

**Server-side** (`src/lib/firebaseAdmin.ts`):
1. API routes extract token from `Authorization: Bearer <token>` header
2. `verifyTokenFromRequest(req)` validates Firebase ID token via Admin SDK
3. Returns decoded token or null if invalid
4. Unauthorized requests receive 401 response

### Key Architectural Patterns

**Component Conventions:**
- Use `"use client"` directive for components with hooks, event handlers, or browser APIs
- Server components by default (no directive needed)
- Props drilling for state management (no global state library)
- **IMPORTANT:** Wrap `useSearchParams()` in a Suspense boundary to avoid hydration warnings

**API Route Pattern (Firestore):**
```typescript
import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { getFirestoreAdmin, serverTimestamp } from '@/lib/firestoreAdmin';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getFirestoreAdmin();
    const snapshot = await db.collection('credits')
      .where('userId', '==', decoded.uid)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

**Protected Page Pattern:**
```typescript
"use client";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProtectedPage() {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const res = await fetch(`/api/endpoint?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      // ... handle response
    };
    fetchData();
  }, []);
}
```

**Multi-Step Form Pattern (training/create-class):**
- Uses `step` state variable for tracking position (1-4)
- Step 1: Program type selection
- Step 2: Roster building with drawer-based student entry
- Step 3: Review and confirmation
- Step 4: Progress tracking
- State accumulation across steps using multiple useState hooks

## Important Implementation Details

### Firestore Usage

**Server-side (API routes):**
```typescript
import { getFirestoreAdmin, serverTimestamp, increment } from '@/lib/firestoreAdmin';

const db = getFirestoreAdmin();

// Add document
const docRef = await db.collection('credits').add({
  userId: 'user123',
  credits: 10,
  createdAt: serverTimestamp(),
});

// Update document
await db.collection('credits').doc(docId).update({
  credits: increment(-1),
  updatedAt: serverTimestamp(),
});

// Query documents
const snapshot = await db.collection('credits')
  .where('userId', '==', 'user123')
  .orderBy('createdAt', 'desc')
  .limit(10)
  .get();

const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

**Client-side:**
```typescript
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const docRef = doc(db, 'credits', docId);
const docSnap = await getDoc(docRef);
const data = docSnap.data();
```

### Component Responsibilities
- **Sidebar.tsx** - Main navigation with collapsible sections and logout
- **Modal Components** - Confirmations, agreements, checkout, instructor management
- **Drawer Components** - Student entry and selection during class creation
- **Student Components** - Displaying student lists and history

### Key Features

**Support Ticket System** (`/support`, `/api/tickets`):
- Create support tickets with form validation
- File attachment upload to Firebase Storage (replaces local file system)
- Email notifications via Web3Forms (free service)
- GoHighLevel webhook integration for CRM automation
- Three ticket types: "General Request", "Application Issue / Bug", "Digital Card Change Request"
- Auto-generated unique ticket numbers (format: `TICKET-{timestamp}-{random}`)
- Files stored in Firebase Storage under `tickets/` directory

**Credit Purchase System** (`/credits/purchase`, `/api/credits/purchase`):
- Purchase packages for CPR Only, First Aid Only, or Combo credits
- Pre-configured packages with 10, 25, or 50 credits
- Updates credit balance in Firestore on successful purchase
- Protected with Firebase authentication

**Internationalization (i18n)**:
- Language toggle between English and Spanish
- Implemented via React Context (`src/lib/LanguageContext.tsx`)
- Translations stored in `src/lib/translations.ts`

**Digital Card Submission** (`/training/create-class`, `/api/digital-cards/submit`):
- Multi-step wizard for creating training classes
- Generates unique class IDs (format: `DC-{timestamp}-{random}`)
- Creates locked digital card records with student subcollection
- Automatically deducts credits based on student count
- Validates credit availability before submission
- Once locked, digital cards cannot be edited

### Styling Conventions
- Tailwind CSS 4 utility classes throughout
- **Brand Colors**:
  - Primary Red: `#C10E21` (CPI Red)
  - Primary Teal: `#00A5A8` (CPI Teal)
  - Dark Gray: `#2D2F33`
- Gradient backgrounds: `from-[#C10E21] to-[#00A5A8]`
- React Icons for UI elements
- Responsive breakpoints: sm, md, lg

## Common Development Workflows

### Adding a New API Route

1. Create `route.ts` in `src/app/api/[route-name]/`
2. Export `export const dynamic = "force-dynamic"`
3. Import `verifyTokenFromRequest` from `@/lib/firebaseAdmin`
4. Import `getFirestoreAdmin, serverTimestamp` from `@/lib/firestoreAdmin`
5. Add authentication check: return 401 if decoded token is null
6. Get Firestore instance: `const db = getFirestoreAdmin()`
7. Use try-catch for error handling
8. Return `NextResponse.json()` with appropriate status codes

### Adding a New Firestore Collection

1. Define TypeScript interfaces in `src/lib/firestoreHelpers.ts` (optional)
2. Create API route for server-side operations
3. Use `getFirestoreAdmin()` for server-side access
4. Use `db` from `src/lib/firebase.ts` for client-side access
5. Add appropriate indexes in Firebase Console if using complex queries

### Adding a Protected Page

1. Create `page.tsx` in appropriate `src/app/` subdirectory
2. Add `"use client"` directive at the top
3. Import `useRouter`, `useEffect`, `useState`
4. Import `onAuthStateChanged` from `firebase/auth` and `auth` from `@/lib/firebase`
5. Set up auth state listener in `useEffect`
6. Fetch data from API routes with `Authorization: Bearer ${token}` header

### Fetching Protected Data Pattern
```typescript
const token = await user.getIdToken();
const response = await fetch('/api/endpoint', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const data = await response.json();
```

### Email Notifications & Webhooks

**Email functionality** uses Web3Forms (free service):

**Setup:**
1. Sign up at https://web3forms.com
2. Add `WEB3FORMS_ACCESS_KEY` to environment variables
3. Set `ADMIN_EMAIL` to receive ticket notifications

**Functions** (`src/lib/email.ts`):
- `sendTicketNotificationToAdmin(data)` - Send ticket details to admin
- `sendTicketConfirmationToUser(email, ticketNumber, name)` - Send confirmation to user

**GoHighLevel Webhook Integration:**
- Ticket creation automatically triggers a webhook to GoHighLevel CRM
- Webhook URL is hardcoded in `/api/tickets/route.ts`
- Sends ticket data including file attachments for CRM automation
- Operates independently of email notifications (both systems run in parallel)

### Working with Digital Cards

Digital cards represent completed training classes and are immutable once submitted:

**Creating a Digital Card:**
1. User fills out multi-step form in `/training/create-class`
2. System validates credit availability
3. POST to `/api/digital-cards/submit` with class data and student roster
4. API generates unique class ID: `DC-{timestamp}-{random}`
5. Creates DigitalCard document with `isLocked: true`
6. Creates student documents in `students` subcollection
7. Deducts credits from user's balance in Firestore
8. Returns class ID and confirmation

**Important Constraints:**
- Digital cards are locked upon creation (`isLocked: true`)
- Locked cards cannot be edited or deleted
- Each student consumes one credit
- Submission fails if insufficient credits available
- Use support tickets for modification requests

### Firebase Admin SDK Setup

For server-side Firestore operations, you need a service account key:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `serviceAccountKey.json` in project root
4. **NEVER commit this file** (it's in .gitignore)
5. For Vercel deployment, add the entire JSON content as `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable

**Fallback:** If no service account key is provided, the system will use basic initialization with `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (limited functionality)
