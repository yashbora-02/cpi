import { NextResponse } from "next/server";
import { getFirestoreAdmin } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

/**
 * GET /api/debug/credits?userId=admin
 * Debug endpoint to see all credits for a user
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'admin';

    const db = getFirestoreAdmin();

    // Fetch all credits for the user
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .get();

    const credits = creditsSnapshot.docs.map(doc => ({
      documentId: doc.id,
      courseType: doc.data().courseType,
      credits: doc.data().credits,
      userId: doc.data().userId,
      userEmail: doc.data().userEmail,
    }));

    const totalCredits = credits.reduce((sum, c) => sum + c.credits, 0);

    return NextResponse.json({
      userId,
      totalCredits,
      breakdown: credits,
      documentCount: credits.length,
    });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}
