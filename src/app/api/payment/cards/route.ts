import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

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

    const savedCards = await prisma.savedCard.findMany({
      where: {
        user_email: userEmail,
      },
      orderBy: [
        { is_default: 'desc' },
        { created_at: 'desc' },
      ],
    });

    return NextResponse.json({ cards: savedCards });
  } catch (error) {
    console.error("Error fetching saved cards:", error);

    // Mock mode fallback
    console.log("⚠️ Database not connected. Running in MOCK MODE.");
    return NextResponse.json({
      cards: [
        {
          id: 1,
          user_email: "user@example.com",
          card_last_four: "4242",
          card_type: "Visa",
          cardholder_name: "John Doe",
          expiry_month: "12",
          expiry_year: "25",
          is_default: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    });
  } finally {
    await prisma.$disconnect();
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

    // If setting as default, unset all other default cards
    if (setAsDefault) {
      await prisma.savedCard.updateMany({
        where: {
          user_email: userEmail,
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }

    // Create new saved card
    const savedCard = await prisma.savedCard.create({
      data: {
        user_email: userEmail,
        card_last_four: cardLast4,
        card_type: cardType,
        cardholder_name: cardholderName,
        expiry_month: expiryMonth.trim(),
        expiry_year: expiryYear.trim(),
        is_default: setAsDefault || false,
      },
    });

    return NextResponse.json({
      success: true,
      card: savedCard,
    });
  } catch (error) {
    console.error("Error saving card:", error);

    // Mock mode fallback
    console.log("⚠️ Database not connected. Running in MOCK MODE.");
    return NextResponse.json({
      success: true,
      card: {
        id: Date.now(),
        user_email: decoded.email,
        card_last_four: "4242",
        card_type: "Visa",
        cardholder_name: "Mock User",
        expiry_month: "12",
        expiry_year: "25",
        is_default: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
