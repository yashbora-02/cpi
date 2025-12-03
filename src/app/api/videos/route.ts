import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Mock video data for fallback
const mockVideos = [
  {
    id: 1,
    title: "CPR Basics - Adult",
    description: "Learn the fundamentals of CPR for adult patients",
    video_id: "sample-video-1",
    video_url: "https://www.youtube.com/watch?v=sample1",
    thumbnail_url: "/thumbnail1.png",
  },
  {
    id: 2,
    title: "AED Training",
    description: "How to properly use an Automated External Defibrillator",
    video_id: "sample-video-2",
    video_url: "https://www.youtube.com/watch?v=sample2",
    thumbnail_url: "/thumbnail2.jpeg",
  },
];

export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const videos = await prisma.video.findMany({
      orderBy: { id: "asc" },
    });

    console.log("✅ Fetched videos from database:", videos.length, "records");
    return NextResponse.json(videos);
  } catch (error) {
    // Database not available - use mock mode
    console.log("⚠️  Database not connected. Returning MOCK video data.");
    console.log("   Mock videos:", mockVideos.length, "videos");
    return NextResponse.json(mockVideos);
  } finally {
    await prisma.$disconnect();
  }
}
