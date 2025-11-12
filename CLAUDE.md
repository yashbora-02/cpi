# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CPI Training Platform - a comprehensive CPR and First Aid training management system built with Next.js 15, Firebase Authentication, PostgreSQL (via Prisma), and Tailwind CSS 4. The platform manages courses, instructors, students, training credits, and video content for certification programs.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database Commands
```bash
npx prisma generate  # Generate Prisma Client (outputs to src/generated/prisma)
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio GUI
```

### Environment Setup
Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase client API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID

## Architecture

### Tech Stack
- **Framework:** Next.js 15.3.3 with App Router
- **Language:** TypeScript 5
- **Database:** PostgreSQL with Prisma ORM 6.11.0
- **Auth:** Firebase Authentication (Email/Password + Google Sign-in)
- **Styling:** Tailwind CSS 4.0
- **UI Components:** React Icons
- **Deployment:** Vercel

### Directory Structure
```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API route handlers (protected with Firebase Auth)
│   │   ├── credits/          # GET credits data
│   │   └── videos/           # GET video playlist
│   ├── courses/              # Course browsing and enrollment
│   │   ├── enrolled/         # User's enrolled courses
│   │   └── page.tsx          # Browse all courses
│   ├── dashboard/            # Main dashboard with credit overview
│   ├── instructors/          # Instructor management
│   │   ├── add/              # Add new instructors
│   │   ├── development/      # Instructor development
│   │   ├── manage/           # Manage existing instructors
│   │   └── reauthorize/      # Reauthorize instructors
│   ├── login/                # Login page (Email + Google)
│   ├── register/             # Registration page
│   ├── students/search/      # Student search functionality
│   ├── training/             # Multi-step class creation wizard
│   │   └── create-class/     # Blended/Online class creation
│   ├── video/                # Video player page
│   └── page.tsx              # Landing page
├── components/               # Reusable components
│   └── Sidebar.tsx           # Main navigation sidebar
├── lib/                      # Utility libraries
│   ├── firebase.ts           # Firebase client config
│   ├── firebaseAdmin.ts      # Firebase Admin SDK for server
│   └── firebaseAuth.ts       # Auth helper functions
├── generated/
│   └── prisma/               # Generated Prisma Client (custom output)
└── styles/                   # Global styles
```

### Database Models (prisma/schema.prisma)
1. **admins** - Admin user credentials (login_id, password, timestamps)
2. **Credit** - Training credits by type (cpr_only, first_aid_only, combo)
3. **Video** - Training video metadata (title, description, video_id, video_url, thumbnail_url)

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

**API Route Pattern:**
```typescript
import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = new PrismaClient();
  // ... query logic
  return NextResponse.json(data);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);
  // ... component logic
}
```

**Multi-Step Form Pattern (training/create-class):**
- useState for currentStep tracking
- Conditional rendering based on step number
- State accumulation across steps
- Final submission aggregates all collected data

## Important Implementation Details

### Prisma Client Location
The Prisma Client is generated to `src/generated/prisma` (not default node_modules). Always import from:
```typescript
import { PrismaClient } from '@/generated/prisma';
```

### Route Structure & Pages
- **Landing Page** (`/`): Professional landing with course showcase, pricing, testimonials, FAQ
- **Authentication**: `/login` (Email/Google), `/register` (with validation)
- **Dashboard** (`/dashboard`): Credit overview cards (CPR Only, First Aid Only, Combo)
- **Courses**: `/courses` (browse), `/courses/enrolled` (user's courses with progress)
- **Instructors**: `/instructors/manage`, `/instructors/add`, `/instructors/reauthorize`, `/instructors/development`
- **Training**: `/training/create-class` (multi-step Blended/Online class creation)
- **Students**: `/students/search`
- **Video Player**: `/video`

### Component Responsibilities
- **Sidebar.tsx** - Main navigation with collapsible dropdown sections (General, Instructors, Training, Courses) and logout button
- Logout flow: Signs out via Firebase, removes localStorage token, redirects to `/login`

### Styling Conventions
- Tailwind CSS 4 utility classes throughout
- **Brand Colors**:
  - Primary Red: `#C10E21` (CPI Red)
  - Primary Teal: `#00A5A8` (CPI Teal)
  - Dark Gray: `#2D2F33`
- Gradient backgrounds: `from-[#C10E21] to-[#00A5A8]`
- React Icons for UI elements (FaShieldAlt, FaGraduationCap, FaSignOutAlt, etc.)
- Responsive breakpoints: sm, md, lg
- Smooth transitions and hover effects on buttons and cards

### Build Configuration Notes
- Turbopack enabled for faster development (`--turbopack` flag)
- Path aliases: `@/*` maps to `./src/*`
- Vercel deployment configured in `vercel.json` (region: iad1)

## Common Development Workflows

### Adding a New API Route
1. Create `route.ts` in `src/app/api/[route-name]/`
2. Export `export const dynamic = "force-dynamic"` for dynamic rendering
3. Import `verifyTokenFromRequest` from `@/lib/firebaseAdmin`
4. Add authentication check: return 401 if decoded token is null
5. Instantiate PrismaClient from `@/generated/prisma`
6. Use try-catch for error handling
7. Return `NextResponse.json()` with appropriate status codes

### Adding a New Database Model
1. Add model to `prisma/schema.prisma`
2. Run `npx prisma db push` to sync schema to database
3. Run `npx prisma generate` to update Prisma Client
4. Create API route for CRUD operations
5. Add Firebase auth check to protected endpoints

### Adding a Protected Page
1. Create `page.tsx` in appropriate `src/app/` subdirectory
2. Add `"use client"` directive at the top
3. Import necessary hooks: `useRouter`, `useEffect`, `useState`
4. Import `onAuthStateChanged` from `firebase/auth` and `auth` from `@/lib/firebase`
5. Set up auth state listener in `useEffect`:
   - Subscribe to `onAuthStateChanged`
   - Redirect to `/login` if user is null
   - Unsubscribe on cleanup
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
