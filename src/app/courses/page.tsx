"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FaClock,
  FaCertificate,
  FaUsers,
  FaExternalLinkAlt,
  FaGraduationCap,
} from "react-icons/fa";

// Course type definition
type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  studentsEnrolled: number;
  thumbnail: string;
  ghlUrl: string; // GoHighLevel URL
  category: "CPR" | "First Aid" | "Combo" | "Advanced";
  certification: boolean;
};

export default function CoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Course data from GoHighLevel
  const courses: Course[] = [
    {
      id: "1",
      title: "CPR & AED Certification",
      description:
        "Learn life-saving CPR and AED techniques for adults, children, and infants. Nationally recognized 2-year certification.",
      duration: "4 hours",
      studentsEnrolled: 1250,
      thumbnail: "/thumbnail1.png",
      ghlUrl: "https://pcmblsiwgjfc3pmqyyzx.app.clientclub.net/courses/offers/9698431c-c263-40b1-84e1-8e55a700c794",
      category: "CPR",
      certification: true,
    },
    {
      id: "2",
      title: "CPR Training Course",
      description:
        "Comprehensive CPR training covering emergency response techniques, rescue breathing, and chest compressions. Get certified today.",
      duration: "6 hours",
      studentsEnrolled: 980,
      thumbnail: "/thumbnail2.jpeg",
      ghlUrl: "https://coherencemarketing.com/courses/offers/e1455d2e-8cd9-4abb-b68b-93b413fde8a2",
      category: "CPR",
      certification: true,
    },
  ];

  const categories = ["All", "CPR", "First Aid", "Combo", "Advanced"];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handleEnrollClick = (ghlUrl: string) => {
    // Redirect to GoHighLevel course page
    window.open(ghlUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00D4E0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaGraduationCap />
            Available Courses
          </h1>
          <p className="text-base mt-2 text-white/90">
            Explore our professional training courses
          </p>
        </div>

        <div className="p-8">

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#00D4E0] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition group border border-gray-100"
            >
              {/* Course Thumbnail */}
              <div className="relative h-36 bg-gray-100 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={144}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.certification && (
                  <div className="absolute top-1.5 right-1.5 bg-[#00D4E0] text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                    <FaCertificate className="text-[8px]" />
                    Certified
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-3">
                <h3 className="text-base font-bold text-gray-800 mb-1.5 group-hover:text-[#00D4E0] transition">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-[11px] mb-2 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-2.5">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#00D4E0] text-[10px]" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-[#00D4E0] text-[10px]" />
                    {course.studentsEnrolled.toLocaleString()}
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => handleEnrollClick(course.ghlUrl)}
                  className="w-full px-3 py-1.5 bg-[#00D4E0] text-white text-xs font-semibold rounded hover:bg-[#008a8d] transition flex items-center justify-center gap-1.5"
                >
                  Enroll Now
                  <FaExternalLinkAlt className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No courses found in this category.
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 max-w-xl">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Need Help Choosing a Course?</h2>
          <p className="mb-3 text-gray-600 text-xs">
            Our training specialists are here to help you find the perfect course.
          </p>
          <button className="px-3 py-1.5 bg-[#00D4E0] text-white text-xs font-semibold rounded hover:bg-[#008a8d] transition">
            Contact Support
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}
