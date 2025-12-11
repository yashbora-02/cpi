# CPI Training Platform

A comprehensive CPR and First Aid training management platform built with Next.js 15, Firebase Firestore, and Tailwind CSS 4.

## Features

- **Custom Authentication**: Admin/Instructor login with custom auth system
- **Course Management**: Browse and enroll in CPR and First Aid courses
- **Digital Card Creation**: Create locked digital certification cards for students
- **Course-Specific Credits**: Credits are tracked per course type (CPR, First Aid, BLS, etc.)
- **Credit Purchase System**: Purchase training credits with multiple package options
- **Support Ticket System**: Submit tickets with file attachments and email notifications
- **Video Training**: Integrated video player for training content
- **Responsive Design**: Modern UI with Tailwind CSS 4 and smooth animations
- **Real-time Database**: Firebase Firestore for scalable, real-time data

## Tech Stack

- **Framework**: Next.js 15.5.7 (App Router)
- **Language**: TypeScript 5
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Custom auth + Firebase Auth (Email/Password, Google)
- **Storage**: Firebase Storage
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Email**: Web3Forms (free email service)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project ([console.firebase.google.com](https://console.firebase.google.com))
- Firebase service account key (for admin operations)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yashbora-02/cpi-demo.git
cd cpi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Email Configuration (Optional - for support tickets)
WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
ADMIN_EMAIL="your-email@example.com"
```

4. Add Firebase service account key:

Download your service account key from Firebase Console and save it as `serviceAccountKey.json` in the project root (already in .gitignore).

5. Seed the database (first-time setup):
```bash
npm run dev
# Then visit: http://localhost:3000/api/seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Default Login Credentials

- **Username**: admin
- **Password**: admin123

## Deploy on Vercel

**📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yashbora-02/cpi-demo)

### Manual Deployment Steps

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables** in Vercel dashboard:

   Required:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
   - `FIREBASE_SERVICE_ACCOUNT_KEY` (entire JSON content)

   Optional:
   - `WEB3FORMS_ACCESS_KEY` (for email notifications)
   - `ADMIN_EMAIL` (for ticket notifications)

4. **Click Deploy** ✨

### Post-Deployment

1. **Seed your database**: Visit `https://your-domain.vercel.app/api/seed`
2. **Configure Firebase**: Add your Vercel domain to Firebase authorized domains
3. **Test the application**: Login with admin/admin123

## Project Structure

```
cpi/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── credits/        # Credit management
│   │   │   ├── digital-cards/  # Digital card creation
│   │   │   ├── tickets/        # Support tickets
│   │   │   └── videos/         # Video content
│   │   ├── dashboard/          # Main dashboard
│   │   ├── courses/            # Course management
│   │   ├── credits/purchase/   # Credit purchase page
│   │   ├── training/           # Class creation wizard
│   │   ├── support/            # Support center
│   │   ├── login/              # Login page
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utilities & Firebase config
│   │   ├── firebase.ts         # Firebase client
│   │   ├── firebaseAdmin.ts    # Firebase Admin SDK
│   │   ├── firestoreAdmin.ts   # Firestore Admin
│   │   ├── courseTypeMapping.ts # Course type mappings
│   │   └── email.ts            # Email service
│   └── styles/                 # Global CSS
├── public/                     # Static assets
│   └── uploads/                # User uploads
├── vercel.json                 # Vercel configuration
├── DEPLOYMENT.md               # Deployment guide
└── CLAUDE.md                   # Project documentation
```

## Key Features

### 🎓 Digital Card Creation
- Multi-step wizard for creating training classes
- Automatic student roster management
- Locked cards after submission (immutable)
- Certificate generation for students

### 💳 Course-Specific Credit System
- Credits are tracked per course type (CPR-AA, FA, BLS, etc.)
- Cannot use credits across different course types
- Real-time credit balance display
- Credit purchase with multiple package options

### 🎫 Support Ticket System
- Create tickets with file attachments
- Email notifications to admins
- Unique ticket number generation
- Support for Application Issues, Bugs, and Change Requests

### 📹 Video Training
- Integrated video player
- Course-based video organization
- Progress tracking

### 👤 User Management
- Custom authentication for admin/instructors
- Firebase Auth for end users
- Role-based access control

## Firestore Database Structure

See [CLAUDE.md](./CLAUDE.md) for complete database schema.

**Main Collections:**
- `credits` - User credits by course type
- `digitalCards` - Training class records (with students subcollection)
- `tickets` - Support tickets
- `videos` - Training videos
- `savedCards` - Payment cards

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database
3. Enable Authentication → Email/Password and Google (optional)
4. Create service account key for admin operations
5. Copy Firebase config to `.env.local`
6. Add your deployment domain to Firebase authorized domains

## Learn More

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## Support

For issues or questions, please open an issue on GitHub.
