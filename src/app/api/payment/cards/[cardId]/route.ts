import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { getFirestoreAdmin } from '@/lib/firestoreAdmin';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

// DELETE - Remove a saved card
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const { cardId } = await params;
    const db = getFirestoreAdmin();

    // Verify card belongs to user before deleting
    const cardDoc = await db.collection('savedCards').doc(cardId).get();

    if (!cardDoc.exists) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    const cardData = cardDoc.data();
    if (cardData?.userEmail !== userEmail) {
      return NextResponse.json(
        { error: "Unauthorized - card belongs to different user" },
        { status: 403 }
      );
    }

    // Delete the card
    await cardDoc.ref.delete();

    return NextResponse.json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 500 }
    );
  }
}

// PUT - Update card (set as default)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const { cardId } = await params;
    const body = await req.json();
    const { setAsDefault } = body;

    const db = getFirestoreAdmin();

    // Verify card belongs to user
    const cardDoc = await db.collection('savedCards').doc(cardId).get();

    if (!cardDoc.exists) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    const cardData = cardDoc.data();
    if (cardData?.userEmail !== userEmail) {
      return NextResponse.json(
        { error: "Unauthorized - card belongs to different user" },
        { status: 403 }
      );
    }

    if (setAsDefault) {
      // Unset all other cards as default
      const defaultCardsSnapshot = await db.collection('savedCards')
        .where('userEmail', '==', userEmail)
        .where('isDefault', '==', true)
        .get();

      const batch = db.batch();
      defaultCardsSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { isDefault: false });
      });
      await batch.commit();

      // Set this card as default
      await cardDoc.ref.update({ isDefault: true });

      const updatedCard = {
        id: cardDoc.id,
        ...cardData,
        isDefault: true,
      };

      return NextResponse.json({ success: true, card: updatedCard });
    }

    return NextResponse.json({
      success: true,
      card: { id: cardDoc.id, ...cardData }
    });
  } catch (error) {
    console.error("Error updating card:", error);
    return NextResponse.json(
      { error: "Failed to update card" },
      { status: 500 }
    );
  }
}
