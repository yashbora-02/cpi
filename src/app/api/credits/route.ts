import { NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Get userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // Query credits for specific user
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .get();

    const credits = creditsSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: doc.data().courseType,
      credits: doc.data().credits,
      userId: doc.data().userId,
      userEmail: doc.data().userEmail,
    }));

    console.log(`✅ Fetched ${credits.length} credits for user: ${userId}`);
    return NextResponse.json(credits);
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}
