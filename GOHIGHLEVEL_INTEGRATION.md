# GoHighLevel Courses Integration Guide

## ✅ What's Been Added

### 1. New Sidebar Section
Added a "Courses" section in the instructor dashboard sidebar with two links:
- **Browse Courses** (`/courses`) - View all available courses
- **My Enrolled Courses** (`/courses/enrolled`) - Track enrolled courses and progress

### 2. Browse Courses Page (`/courses`)
Features:
- Category filtering (All, CPR, First Aid, Combo, Advanced)
- Course cards with:
  - Title and description
  - Duration and student count
  - Certification badge
  - "Enroll Now" button that opens GoHighLevel course page
- Responsive grid layout
- Help/Support section

### 3. Enrolled Courses Page (`/courses/enrolled`)
Features:
- Statistics dashboard (Total Enrolled, Completed, In Progress)
- Course progress tracking with progress bars
- "Continue Learning" buttons linking to GoHighLevel
- Completion badges for finished courses
- Empty state with "Browse Courses" CTA

## 🔧 How to Customize with Your GoHighLevel Courses

### Step 1: Get Your GoHighLevel Course URLs

In GoHighLevel, find your course URLs. They typically look like:
```
https://your-subdomain.gohighlevel.com/course/course-name
```

or if you have a custom domain:
```
https://courses.yourdomain.com/course-name
```

### Step 2: Update Course Data

Open [src/app/courses/page.tsx](src/app/courses/page.tsx) and update the `courses` array (around line 51):

```typescript
const courses: Course[] = [
  {
    id: "1",
    title: "Your Actual Course Title",
    description: "Your actual course description",
    duration: "4 hours", // Actual duration
    studentsEnrolled: 1250, // Actual count or estimate
    thumbnail: "/courses/cpr.jpg", // Path to course image
    ghlUrl: "https://your-actual-ghl-url.com/course/your-course", // YOUR REAL URL
    category: "CPR", // CPR | First Aid | Combo | Advanced
    certification: true,
  },
  // Add more courses here
];
```

### Step 3: Add Course Thumbnails (Optional)

Place course thumbnail images in `public/courses/`:
```
public/
  courses/
    cpr.jpg
    first-aid.jpg
    combo.jpg
    acls.jpg
```

Or use placeholder gradients (currently implemented).

### Step 4: Update Enrolled Courses Data

For the enrolled courses page, you can either:

**Option A: Hardcode Sample Data** (for demo)
Update [src/app/courses/enrolled/page.tsx](src/app/courses/enrolled/page.tsx) line 35

**Option B: Fetch from Database** (recommended for production)
Create an API endpoint to fetch user's enrolled courses:

```typescript
// In src/app/courses/enrolled/page.tsx
useEffect(() => {
  const fetchEnrolledCourses = async () => {
    const token = await user.getIdToken();
    const res = await fetch("/api/courses/enrolled", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEnrolledCourses(data);
  };

  if (user) {
    fetchEnrolledCourses();
  }
}, [user]);
```

## 🔗 GoHighLevel API Integration (Advanced)

If you want to dynamically fetch courses from GoHighLevel:

### 1. Get GoHighLevel API Key
- Log into GoHighLevel
- Go to Settings → API
- Generate an API key

### 2. Add to Environment Variables
In `.env.local`:
```
GHL_API_KEY="your-api-key-here"
GHL_LOCATION_ID="your-location-id"
```

### 3. Create API Route
Create `src/app/api/courses/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://rest.gohighlevel.com/v1/courses`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        },
      }
    );

    const courses = await response.json();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
```

### 4. Fetch Courses Dynamically
Update `src/app/courses/page.tsx`:

```typescript
const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  const fetchCourses = async () => {
    if (!user) return;

    const token = await user.getIdToken();
    const res = await fetch("/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCourses(data);
  };

  fetchCourses();
}, [user]);
```

## 📊 Tracking Course Progress

### Option 1: GoHighLevel Webhooks
Set up webhooks in GoHighLevel to notify your app when:
- User enrolls in a course
- User completes a lesson
- User completes a course

### Option 2: Manual Progress Updates
Create a form where instructors can manually update student progress.

### Option 3: Embedded Course Player
Embed GoHighLevel course player directly in your site:

```typescript
<iframe
  src={course.ghlUrl}
  className="w-full h-screen"
  allow="autoplay; fullscreen"
/>
```

## 🎨 Customization Options

### Change Brand Colors
The courses pages use your existing brand colors:
- Primary Red: `#C10E21`
- Teal: `#00A5A8`
- Dark Slate: `#2D2F33`

To change, update the Tailwind classes in the course pages.

### Add More Categories
Update the `categories` array in `src/app/courses/page.tsx`:

```typescript
const categories = ["All", "CPR", "First Aid", "Combo", "Advanced", "Your New Category"];
```

### Customize Course Card Layout
Modify the course card JSX in the courses grid section.

## 🚀 Next Steps

1. **Replace placeholder URLs** with your actual GoHighLevel course URLs
2. **Add real course data** (titles, descriptions, durations)
3. **Upload course thumbnails** to `public/courses/`
4. **Test the enrollment flow** - click "Enroll Now" and verify it opens your GHL course
5. **Set up progress tracking** (if needed)
6. **Customize styling** to match your brand

## 📝 Example GoHighLevel Course URLs

```
Main Courses Page: https://yoursite.gohighlevel.com/courses
Specific Course: https://yoursite.gohighlevel.com/courses/cpr-certification
Embedded Player: https://yoursite.gohighlevel.com/courses/cpr-certification/embed
```

## 🔐 Security Notes

- All course pages are protected by Firebase authentication
- Users must be logged in to view courses
- GoHighLevel URLs are opened in a new tab
- API keys should never be exposed to the client-side

## Need Help?

Check the [GoHighLevel API Documentation](https://highlevel.stoplight.io/) for more integration options.
