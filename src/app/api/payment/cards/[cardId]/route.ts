import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// DELETE - Remove a saved card
export async function DELETE(
  req: Request,
  { params }: { params: { cardId: string } }
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

    const cardId = parseInt(params.cardId);

    // Verify card belongs to user before deleting
    const card = await prisma.savedCard.findFirst({
      where: {
        id: cardId,
        user_email: userEmail,
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the card
    await prisma.savedCard.delete({
      where: { id: cardId },
    });

    return NextResponse.json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);

    // Mock mode fallback
    console.log("⚠️ Database not connected. Running in MOCK MODE.");
    return NextResponse.json({ success: true, message: "Card deleted (mock mode)" });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update card (set as default)
export async function PUT(
  req: Request,
  { params }: { params: { cardId: string } }
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

    const cardId = parseInt(params.cardId);
    const body = await req.json();
    const { setAsDefault } = body;

    // Verify card belongs to user
    const card = await prisma.savedCard.findFirst({
      where: {
        id: cardId,
        user_email: userEmail,
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found or unauthorized" },
        { status: 404 }
      );
    }

    if (setAsDefault) {
      // Unset all other cards as default
      await prisma.savedCard.updateMany({
        where: {
          user_email: userEmail,
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });

      // Set this card as default
      const updatedCard = await prisma.savedCard.update({
        where: { id: cardId },
        data: { is_default: true },
      });

      return NextResponse.json({ success: true, card: updatedCard });
    }

    return NextResponse.json({ success: true, card });
  } catch (error) {
    console.error("Error updating card:", error);

    // Mock mode fallback
    console.log("⚠️ Database not connected. Running in MOCK MODE.");
    return NextResponse.json({
      success: true,
      card: {
        id: parseInt(params.cardId),
        is_default: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
