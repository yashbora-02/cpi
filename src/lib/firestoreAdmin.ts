/**
 * Firestore Admin SDK Helper
 * Server-side Firestore operations for API routes
 */

import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Firebase Admin (reuse from firebaseAdmin.ts)
let adminApp: admin.app.App;

function getAdminApp() {
  if (adminApp) {
    return adminApp;
  }

  const existingApps = admin.apps;
  if (existingApps.length > 0 && existingApps[0]) {
    adminApp = existingApps[0];
    return adminApp;
  }

  try {
    // Try to load service account key
    const serviceAccountPath = join(process.cwd(), 'serviceAccountKey.json');

    try {
      const serviceAccount = JSON.parse(
        readFileSync(serviceAccountPath, 'utf8')
      );

      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('✅ Firebase Admin initialized with service account');
    } catch (fileError) {
      // Fallback to basic initialization (will work in some cases)
      console.warn('⚠️  Service account key not found. Using basic initialization.');
      console.warn('   Download service account key from Firebase Console for full functionality.');

      adminApp = admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }

  return adminApp;
}

/**
 * Get Firestore Admin instance
 */
export function getFirestoreAdmin() {
  const app = getAdminApp();
  return admin.firestore(app);
}

/**
 * Get server timestamp
 */
export function serverTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

/**
 * Increment a field value
 */
export function increment(value: number) {
  return admin.firestore.FieldValue.increment(value);
}

/**
 * Array union (add to array without duplicates)
 */
export function arrayUnion(...elements: any[]) {
  return admin.firestore.FieldValue.arrayUnion(...elements);
}

/**
 * Array remove
 */
export function arrayRemove(...elements: any[]) {
  return admin.firestore.FieldValue.arrayRemove(...elements);
}

export { admin };
