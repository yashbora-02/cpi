/**
 * Seed Firestore with initial data
 * Visit: http://localhost:3000/api/seed (only in development)
 */

import { NextResponse } from 'next/server';
import { getFirestoreAdmin, serverTimestamp } from '@/lib/firestoreAdmin';

export const dynamic = "force-dynamic";

// Simple password hashing (matches your current system)
function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64');
}

export async function GET(req: Request) {
  // In production, require a secret key for security
  if (process.env.NODE_ENV === 'production') {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Check for SEED_SECRET environment variable or use default
    const expectedSecret = process.env.SEED_SECRET || 'cpi-seed-2024';

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized. Add ?secret=YOUR_SEED_SECRET to the URL' },
        { status: 403 }
      );
    }
  }

  try {
    const db = getFirestoreAdmin();

    // Seed credits for admin (users already exist) - only if they don't exist
    const creditTypes = [
      { courseType: 'CPI-FA-2020', credits: 10 },
      { courseType: 'CPI-FA-CPR-AI-2020', credits: 8 },
      { courseType: 'CPI-FA-CPR-AA-2020', credits: 0 },
      { courseType: 'CPI-BLS-2020', credits: 25 },
      { courseType: 'CPI-CPR-AA-2020', credits: 8 },
      { courseType: 'CPI-ES-FA-CPR-2020', credits: 0 },
    ];

    let creditsCreated = 0;
    for (const credit of creditTypes) {
      const docRef = db.collection('credits').doc(`admin_${credit.courseType}`);
      const docSnap = await docRef.get();

      // Only create if doesn't exist
      if (!docSnap.exists) {
        await docRef.set({
          userId: 'admin',
          userEmail: 'admin@cpi-training.com',
          courseType: credit.courseType,
          credits: credit.credits,
          updatedAt: serverTimestamp(),
        });
        creditsCreated++;
      }
    }

    // Seed credits for instructor - only if they don't exist
    for (const credit of creditTypes) {
      const docRef = db.collection('credits').doc(`instructor_${credit.courseType}`);
      const docSnap = await docRef.get();

      // Only create if doesn't exist
      if (!docSnap.exists) {
        await docRef.set({
          userId: 'instructor',
          userEmail: 'instructor@cpi-training.com',
          courseType: credit.courseType,
          credits: credit.credits,
          updatedAt: serverTimestamp(),
        });
        creditsCreated++;
      }
    }

    // Seed sample videos (YouTube playlists) with course type associations
    const videos = [
      {
        videoId: 'g7wMAg5Umho',
        title: 'Why Your Organization Needs a CPR Trainer',
        description: 'CPI Adult First Aid Complete Class (2020) v1.0',
        videoUrl: 'https://www.youtube.com/watch?v=g7wMAg5Umho&list=PL82rIucEVvOqNvao2Qhs6gXiwhoyk7Uy2',
        thumbnailUrl: `https://img.youtube.com/vi/g7wMAg5Umho/hqdefault.jpg`,
        order: 1,
        courseTypes: ['CPI-FA-2020'], // First Aid only
        accessLevel: 'paid', // 'free' or 'paid'
      },
      {
        videoId: 'IMjV-8TmmZI',
        title: 'Why Should You Take CPR, AED, and First Aid Training',
        description: 'Combined First Aid and CPR AED instruction',
        videoUrl: 'https://www.youtube.com/watch?v=IMjV-8TmmZI&list=PL82rIucEVvOp_wD47IvzZKFmCXZ9VWrmQ',
        thumbnailUrl: `https://img.youtube.com/vi/IMjV-8TmmZI/hqdefault.jpg`,
        order: 2,
        courseTypes: ['CPI-FA-CPR-AI-2020', 'CPI-FA-CPR-AA-2020', 'CPI-ES-FA-CPR-2020'], // Combo courses
        accessLevel: 'paid',
      },
      {
        videoId: 'peo4wt5Z_8Q',
        title: 'Why Teach ASHI, MEDIC First Aid Hands-On Training',
        description: 'Full Combo Class for First Aid and CPR',
        videoUrl: 'https://www.youtube.com/watch?v=peo4wt5Z_8Q&list=PL82rIucEVvOrDee2PMEOIqgcjpIJnmW1a',
        thumbnailUrl: `https://img.youtube.com/vi/peo4wt5Z_8Q/hqdefault.jpg`,
        order: 3,
        courseTypes: ['CPI-BLS-2020', 'CPI-CPR-AA-2020'], // BLS and CPR courses
        accessLevel: 'paid',
      },
    ];

    let videosCreated = 0;
    for (const video of videos) {
      await db.collection('videos').doc(video.videoId).set({
        ...video,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      videosCreated++;
    }

    return NextResponse.json({
      success: true,
      message: 'Firestore seeded successfully!',
      creditsCreated,
      videosCreated,
      note: 'Credits and videos created successfully',
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed Firestore', details: (error as Error).message },
      { status: 500 }
    );
  }
}
