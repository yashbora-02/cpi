import { NextResponse } from "next/server";
import { getFirestoreAdmin } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Get userId from query params (required for role-based access)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const userRole = searchParams.get('role');

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // Fetch all videos
    const videosSnapshot = await db.collection('videos')
      .orderBy('order', 'asc')
      .get();

    const allVideos = videosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Admin gets access to all videos
    if (userRole === 'admin') {
      console.log(`✅ Admin access - Fetched ${allVideos.length} videos`);
      return NextResponse.json(allVideos);
    }

    // For instructors/students, check their credits to determine access
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .get();

    // Get all course types user has purchased (credits > 0)
    const userCourseTypes = new Set<string>();
    creditsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.credits > 0) {
        userCourseTypes.add(data.courseType);
      }
    });

    // Filter videos based on user's purchased course types
    const accessibleVideos = allVideos.filter((video: any) => {
      // If video has no courseTypes defined or is marked as free, grant access
      if (!video.courseTypes || video.courseTypes.length === 0 || video.accessLevel === 'free') {
        return true;
      }

      // Check if user has credits for any of the video's course types
      return video.courseTypes.some((courseType: string) => userCourseTypes.has(courseType));
    });

    console.log(`✅ Fetched ${accessibleVideos.length}/${allVideos.length} videos for user ${userId} (${userCourseTypes.size} course types)`);
    return NextResponse.json(accessibleVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
