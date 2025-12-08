import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firestoreAdmin';

export const dynamic = "force-dynamic";

// Simple password verification (matches the hashing in seed.ts)
function verifyPassword(inputPassword: string, storedPassword: string): boolean {
  const hashed = Buffer.from(inputPassword).toString('base64');
  return hashed === storedPassword;
}

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch (parseError) {
    console.error('Error parsing request body:', parseError);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: 'Username and password are required' },
      { status: 400 }
    );
  }

  try {
    const db = getFirestoreAdmin();

    // Query users collection by username
    const usersSnapshot = await db.collection('users')
      .where('username', '==', username.toLowerCase())
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const userDoc = usersSnapshot.docs[0];
    const user = userDoc.data();

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Return user info (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: userDoc.id,
        username: user.username,
        role: user.role,
        full_name: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Firestore error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
