import { NextResponse } from "next/server";
import { getFirestoreAdmin } from "@/lib/firestoreAdmin";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

/**
 * GET /api/credits/balance
 * Fetch user's available credit balance
 * Supports both Firebase Auth (Bearer token) and custom auth (userId query param)
 * Optional: Filter by courseType
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');
    const courseType = searchParams.get('courseType'); // Optional filter

    let userId: string;

    // Support custom auth via query parameter (for admin/instructor)
    if (userIdParam) {
      userId = userIdParam;
    } else {
      // Fallback to Firebase Auth
      const decoded = await verifyTokenFromRequest(req);
      if (!decoded) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      userId = decoded.uid;
    }

    const db = getFirestoreAdmin();

    // Build query
    let query = db.collection('credits').where('userId', '==', userId);

    // Optionally filter by courseType
    if (courseType) {
      query = query.where('courseType', '==', courseType);
    }

    const creditsSnapshot = await query.get();

    const credits = creditsSnapshot.docs.map(doc => ({
      id: doc.id,
      type: doc.data().courseType,
      credits: doc.data().credits || 0,
    }));

    // Calculate total available credits
    const totalCredits = credits.reduce((sum, credit) => sum + credit.credits, 0);

    return NextResponse.json({
      availableCredits: totalCredits,
      creditBreakdown: credits,
      courseType: courseType || 'all',
    });
  } catch (error) {
    console.error("Error fetching credit balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit balance" },
      { status: 500 }
    );
  }
}
