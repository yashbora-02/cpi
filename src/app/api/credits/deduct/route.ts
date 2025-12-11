import { NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp, increment } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, courseType, amount } = body;

    if (!userId || !courseType || !amount) {
      return NextResponse.json(
        { error: "userId, courseType, and amount are required" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // Find the credit document for this user and course type
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .where('courseType', '==', courseType)
      .limit(1)
      .get();

    if (creditsSnapshot.empty) {
      return NextResponse.json(
        { error: "Credit document not found" },
        { status: 404 }
      );
    }

    const creditDoc = creditsSnapshot.docs[0];
    const currentCredits = creditDoc.data().credits || 0;

    // Check if user has enough credits
    if (currentCredits < amount) {
      return NextResponse.json(
        { error: "Insufficient credits", available: currentCredits, required: amount },
        { status: 400 }
      );
    }

    // Deduct credits
    await creditDoc.ref.update({
      credits: increment(-amount),
      updatedAt: serverTimestamp(),
    });

    const newBalance = currentCredits - amount;

    console.log(`✅ Deducted ${amount} credits from ${userId} for ${courseType}. New balance: ${newBalance}`);

    return NextResponse.json({
      success: true,
      userId,
      courseType,
      deducted: amount,
      previousBalance: currentCredits,
      newBalance,
    });
  } catch (error) {
    console.error('Error deducting credits:', error);
    return NextResponse.json(
      { error: "Failed to deduct credits" },
      { status: 500 }
    );
  }
}
