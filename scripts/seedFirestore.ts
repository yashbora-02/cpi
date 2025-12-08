/**
 * Seed Firestore with initial data
 * Run with: npx tsx scripts/seedFirestore.ts
 */

import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

// Simple password hashing (matches your current system)
function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64');
}

async function seedUsers() {
  console.log('🌱 Seeding users...');

  // Create admin user
  await db.collection('users').doc('admin').set({
    username: 'admin',
    password: hashPassword('admin123'),
    role: 'admin',
    fullName: 'System Administrator',
    email: 'admin@cpi-training.com',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('✅ Created admin user');

  // Create instructor user
  await db.collection('users').doc('instructor').set({
    username: 'instructor',
    password: hashPassword('instructor123'),
    role: 'instructor',
    fullName: 'Training Instructor',
    email: 'instructor@cpi-training.com',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('✅ Created instructor user');
}

async function seedCredits() {
  console.log('\n🌱 Seeding credits...');

  const creditTypes = [
    { courseType: 'CPI-FA-2020', credits: 10 },
    { courseType: 'CPI-FA-CPR-AI-2020', credits: 8 },
    { courseType: 'CPI-FA-CPR-AA-2020', credits: 0 },
    { courseType: 'CPI-BLS-2020', credits: 25 },
    { courseType: 'CPI-CPR-AA-2020', credits: 8 },
    { courseType: 'CPI-ES-FA-CPR-2020', credits: 0 },
  ];

  // Add credits for admin user
  for (const credit of creditTypes) {
    await db.collection('credits').doc(`admin_${credit.courseType}`).set({
      userId: 'admin',
      userEmail: 'admin@cpi-training.com',
      courseType: credit.courseType,
      credits: credit.credits,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log('✅ Created credits for admin user');
}

async function seedVideos() {
  console.log('\n🌱 Seeding videos...');

  const videos = [
    {
      videoId: 'sample-video-1',
      title: 'CPR Basics - Adult',
      description: 'Learn the fundamentals of CPR for adult patients',
      videoUrl: 'https://www.youtube.com/watch?v=sample1',
      thumbnailUrl: '/thumbnail1.png',
    },
    {
      videoId: 'sample-video-2',
      title: 'First Aid Essentials',
      description: 'Essential first aid techniques for common emergencies',
      videoUrl: 'https://www.youtube.com/watch?v=sample2',
      thumbnailUrl: '/thumbnail2.png',
    },
  ];

  for (const video of videos) {
    await db.collection('videos').doc(video.videoId).set({
      ...video,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log('✅ Created sample videos');
}

async function main() {
  try {
    console.log('🚀 Starting Firestore seeding...\n');

    await seedUsers();
    await seedCredits();
    await seedVideos();

    console.log('\n✅ Firestore seeding complete!');
    console.log('\n📝 Default Credentials:');
    console.log('👤 Admin - Username: admin | Password: admin123');
    console.log('👨‍🏫 Instructor - Username: instructor | Password: instructor123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

main();
