"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FaPlay,
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

  // TODO: Replace with your actual GoHighLevel course data
  const courses: Course[] = [
    {
      id: "1",
      title: "CPR & AED Certification",
      description:
        "Learn life-saving CPR and AED techniques for adults, children, and infants. Nationally recognized 2-year certification.",
      duration: "4 hours",
      studentsEnrolled: 1250,
      thumbnail: "/courses/cpr.jpg",
      ghlUrl: "https://your-ghl-domain.com/course/cpr-aed", // Replace with your actual URL
      category: "CPR",
      certification: true,
    },
    {
      id: "2",
      title: "First Aid Essentials",
      description:
        "Comprehensive first aid training covering bleeding control, burns, fractures, and medical emergencies.",
      duration: "3 hours",
      studentsEnrolled: 890,
      thumbnail: "/courses/first-aid.jpg",
      ghlUrl: "https://your-ghl-domain.com/course/first-aid", // Replace with your actual URL
      category: "First Aid",
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
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaGraduationCap className="text-blue-600" />
            Available Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our professional training courses powered by GoHighLevel
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:scale-105 hover:shadow-md"
              } active:scale-95`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group border border-gray-100"
            >
              {/* Course Thumbnail */}
              <div className="relative h-32 bg-white border-2 border-blue-600 flex items-center justify-center">
                <FaPlay className="text-blue-600 text-4xl opacity-70 group-hover:opacity-100 transition" />
                {course.certification && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <FaCertificate className="text-xs" />
                    Certified
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-blue-600 text-xs" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-blue-600 text-xs" />
                    {course.studentsEnrolled.toLocaleString()}
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => handleEnrollClick(course.ghlUrl)}
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Enroll Now
                  <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
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
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Need Help Choosing a Course?</h2>
          <p className="mb-4 text-gray-600 text-sm">
            Our training specialists are here to help you find the perfect course
            for your needs.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
