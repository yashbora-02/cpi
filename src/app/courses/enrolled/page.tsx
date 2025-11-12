"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaGraduationCap className="text-blue-600" />
            My Enrolled Courses
          </h1>
          <p className="text-gray-600">
            Track your progress and continue learning
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your Enrolled Courses
          </h3>
          <p className="text-gray-600 mb-6">
            Your enrolled courses will be visible here
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Browse Available Courses
          </button>
        </div>
      </div>
    </div>
  );
}
