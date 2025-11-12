# CPI Training Platform

A comprehensive CPR and First Aid training management platform built with Next.js, Firebase, and Prisma.

## Features

- **User Authentication**: Firebase Authentication with email/password and Google sign-in
- **Course Management**: Browse and enroll in CPR and First Aid courses
- **Instructor Portal**: Manage instructors, create classes, and track students
- **Credit System**: Track training credits by type (CPR Only, First Aid Only, Combo)
- **Responsive Design**: Modern UI with Tailwind CSS and smooth animations
- **Video Player**: Integrated video training content

## Tech Stack

- **Framework**: Next.js 15.3.3
- **Authentication**: Firebase Auth
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yashbora-02/cpi-demo.git
cd cpi-demo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT Secret
JWT_SECRET="your-secret-key-here"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yashbora-02/cpi-demo)

### Manual Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard:
   - Add all variables from `.env.local`
   - Make sure `DATABASE_URL` points to your production database
6. Click "Deploy"

### Environment Variables Setup on Vercel

Go to your project settings → Environment Variables and add:

- `DATABASE_URL` - Your production PostgreSQL connection string
- `JWT_SECRET` - Secure random string for JWT signing
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Database Setup for Production

1. Create a production PostgreSQL database (recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))
2. Add the connection string to Vercel environment variables
3. Run Prisma migrations in production:
   - Vercel will automatically run `prisma generate` during build
   - You may need to run `npx prisma db push` manually for initial setup

## Project Structure

```
cpi-demo/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── courses/      # Course pages
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   ├── lib/              # Utility functions & configs
│   └── styles/           # Global styles
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── vercel.json          # Vercel configuration
```

## Features by Page

### Landing Page (`/`)
- Professional landing page with CTA buttons
- Course showcase
- Pricing information
- FAQ section
- Testimonials

### Authentication
- `/login` - Email/password and Google sign-in
- `/register` - User registration with validation

### Dashboard (`/dashboard`)
- Credit overview (CPR Only, First Aid Only, Combo)
- Quick access to main features
- Logout functionality

### Courses
- `/courses` - Browse available courses
- `/courses/enrolled` - View enrolled courses with progress tracking

### Instructor Portal
- Manage instructors
- Create and schedule classes
- Student search functionality

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication → Email/Password and Google sign-in methods
3. Copy your Firebase config to `.env.local`
4. Add your deployment domain to Firebase authorized domains

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Support

For issues or questions, please open an issue on GitHub.
