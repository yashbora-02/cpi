import { NextRequest, NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp, increment } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

type PurchaseRequest = {
  packageId: string;
  courseType: string; // Now accepts any course ID as the type
  credits: number;
  price: number;
  userId?: string;
  userEmail?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: PurchaseRequest = await req.json();
    const { packageId, courseType, credits, price } = body;

    // Get userId from request body
    const userId = body.userId;
    const userEmail = body.userEmail;

    // Validate required fields
    if (!packageId || !courseType || !credits || !price || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate course type is not empty
    if (typeof courseType !== 'string' || courseType.trim() === '') {
      return NextResponse.json(
        { error: "Invalid course type" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // Find existing credit record for this user and course type
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .where('courseType', '==', courseType)
      .limit(1)
      .get();

    let creditDocId: string;
    let newTotalCredits: number;

    if (!creditsSnapshot.empty) {
      // Update existing credit record
      const creditDoc = creditsSnapshot.docs[0];
      creditDocId = creditDoc.id;
      const currentCredits = creditDoc.data().credits || 0;
      newTotalCredits = currentCredits + credits;

      await db.collection('credits').doc(creditDocId).update({
        credits: increment(credits),
        updatedAt: serverTimestamp(),
      });

      console.log(`✅ Updated credits for ${userId} - ${courseType}: +${credits} (total: ${newTotalCredits})`);
    } else {
      // Create new credit record
      creditDocId = `${userId}_${courseType}`;
      newTotalCredits = credits;

      await db.collection('credits').doc(creditDocId).set({
        userId,
        userEmail: userEmail || '',
        courseType,
        credits,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log(`✅ Created new credit record for ${userId} - ${courseType}: ${credits}`);
    }

    // Create transaction record for purchase history
    const transactionRef = db.collection('transactions').doc();
    await transactionRef.set({
      userId,
      userEmail: userEmail || '',
      packageId,
      courseType,
      credits,
      price,
      purchaseDate: serverTimestamp(),
      status: 'completed',
    });

    console.log(`💳 Transaction recorded: ${transactionRef.id}`);

    // TODO: In production, integrate with payment gateway here
    // - Process payment via Stripe, PayPal, etc.
    // - Verify payment confirmation
    // - Send confirmation email

    return NextResponse.json({
      success: true,
      message: "Credits purchased successfully",
      credit: {
        id: creditDocId,
        type: courseType,
        credits: newTotalCredits,
      },
      packageId,
      price,
    });
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve purchase history
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // Fetch transactions for this user
    const transactionsSnapshot = await db.collection('transactions')
      .where('userId', '==', userId)
      .orderBy('purchaseDate', 'desc')
      .get();

    const transactions = transactionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      packageId: doc.data().packageId,
      courseType: doc.data().courseType,
      credits: doc.data().credits,
      price: doc.data().price,
      purchaseDate: doc.data().purchaseDate?.toDate().toISOString() || new Date().toISOString(),
      status: doc.data().status,
    }));

    console.log(`✅ Fetched ${transactions.length} transactions for user: ${userId}`);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchase history" },
      { status: 500 }
    );
  }
}
