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
  FaCheckCircle,
  FaChartLine,
  FaExternalLinkAlt,
} from "react-icons/fa";

// Enrolled Course type
type EnrolledCourse = {
  id: string;
  title: string;
  progress: number;
  ghlUrl: string;
  thumbnail: string;
  enrolledDate: string;
  lastAccessed: string;
  completed: boolean;
};

export default function EnrolledCoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  // TODO: Fetch this from your database or GoHighLevel API
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "1",
      title: "CPR & AED Certification",
      progress: 75,
      ghlUrl: "https://your-ghl-domain.com/course/cpr-aed",
      thumbnail: "/courses/cpr.jpg",
      enrolledDate: "2025-01-05",
      lastAccessed: "2025-01-10",
      completed: false,
    },
    {
      id: "2",
      title: "First Aid Essentials",
      progress: 100,
      ghlUrl: "https://your-ghl-domain.com/course/first-aid",
      thumbnail: "/courses/first-aid.jpg",
      enrolledDate: "2024-12-15",
      lastAccessed: "2024-12-28",
      completed: true,
    },
  ];

  const handleContinueCourse = (ghlUrl: string) => {
    window.open(ghlUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
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
            <FaChartLine className="text-blue-600" />
            My Enrolled Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Track your progress and continue learning
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">
                  Total Enrolled
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {enrolledCourses.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaPlay className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {enrolledCourses.filter((c) => c.completed).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {enrolledCourses.filter((c) => !c.completed).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses List */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlay className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Courses Enrolled Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start learning by browsing our available courses
            </p>
            <button
              onClick={() => router.push("/courses")}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-48 h-32 bg-white border-2 border-blue-600 flex items-center justify-center">
                    <FaPlay className="text-blue-600 text-3xl opacity-70" />
                    {course.completed && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-sm" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {course.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>Enrolled: {course.enrolledDate}</span>
                          <span>Last: {course.lastAccessed}</span>
                        </div>
                      </div>
                      {course.completed && (
                        <div className="mt-2 md:mt-0">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                            <FaCertificate className="text-xs" />
                            Completed
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-600">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-blue-600">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleContinueCourse(course.ghlUrl)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group transform hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      {course.completed ? "Review Course" : "Continue Learning"}
                      <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
