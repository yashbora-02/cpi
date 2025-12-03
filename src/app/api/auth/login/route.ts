import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

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
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

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
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Database error:', error);

    // Mock mode fallback for development
    console.log('⚠️ Database not connected. Running in MOCK MODE.');

    // Use the already parsed body
    // Mock credentials
    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          username: 'admin',
          role: 'admin',
          full_name: 'System Administrator',
          email: 'admin@cpi-training.com',
        },
      });
    }

    if (username === 'instructor' && password === 'instructor123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 2,
          username: 'instructor',
          role: 'instructor',
          full_name: 'Training Instructor',
          email: 'instructor@cpi-training.com',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
