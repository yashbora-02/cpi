// Firebase Admin SDK for server-side token verification
import * as admin from 'firebase-admin';

let adminApp: admin.app.App;

// Initialize Firebase Admin SDK (server-side only)
function getAdminApp() {
  if (adminApp) {
    return adminApp;
  }

  const existingApps = admin.apps;
  if (existingApps.length > 0 && existingApps[0]) {
    adminApp = existingApps[0];
    return adminApp;
  }

  // For development, we can use the Firebase project ID
  // In production, you should use a service account key
  try {
    adminApp = admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }

  return adminApp;
}

// Verify Firebase ID token from request
export async function verifyFirebaseToken(token: string) {
  try {
    const app = getAdminApp();
    const auth = admin.auth(app);
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return null;
  }
}

// Extract and verify token from request
export async function verifyTokenFromRequest(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  return await verifyFirebaseToken(token);
}
