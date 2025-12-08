import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { getFirestoreAdmin, serverTimestamp } from '@/lib/firestoreAdmin';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

// Helper function to detect card type from card number
function detectCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';

  return 'Unknown';
}

// GET - Fetch all saved cards for the user
export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const db = getFirestoreAdmin();

    // Simplified query to avoid composite index requirement
    // Fetch all cards for user, then sort in memory
    const cardsSnapshot = await db.collection('savedCards')
      .where('userEmail', '==', userEmail)
      .get();

    // Sort in memory: default cards first, then by creation date (newest first)
    const cards = cardsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => {
        // Sort by isDefault first (true before false)
        if (a.isDefault !== b.isDefault) {
          return b.isDefault ? 1 : -1;
        }
        // Then sort by createdAt (newest first)
        const aTime = a.createdAt?.toMillis() || 0;
        const bTime = b.createdAt?.toMillis() || 0;
        return bTime - aTime;
      });

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("Error fetching saved cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved cards", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Save a new card
export async function POST(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const body = await req.json();
    const { cardNumber, cardholderName, expiryDate, setAsDefault } = body;

    // Validate inputs
    if (!cardNumber || !cardholderName || !expiryDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract last 4 digits
    const cardLast4 = cardNumber.replace(/\s/g, '').slice(-4);

    // Detect card type
    const cardType = detectCardType(cardNumber);

    // Parse expiry date (format: MM/YY)
    const [expiryMonth, expiryYear] = expiryDate.split('/');

    const db = getFirestoreAdmin();

    // If setting as default, unset all other default cards
    if (setAsDefault) {
      const defaultCardsSnapshot = await db.collection('savedCards')
        .where('userEmail', '==', userEmail)
        .where('isDefault', '==', true)
        .get();

      const batch = db.batch();
      defaultCardsSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { isDefault: false });
      });
      await batch.commit();
    }

    // Create new saved card
    const cardData = {
      userEmail,
      cardLastFour: cardLast4,
      cardType,
      cardholderName,
      expiryMonth: expiryMonth.trim(),
      expiryYear: expiryYear.trim(),
      isDefault: setAsDefault || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const cardRef = await db.collection('savedCards').add(cardData);
    const savedCard = {
      id: cardRef.id,
      ...cardData,
    };

    return NextResponse.json({
      success: true,
      card: savedCard,
    });
  } catch (error) {
    console.error("Error saving card:", error);
    return NextResponse.json(
      { error: "Failed to save card" },
      { status: 500 }
    );
  }
}
