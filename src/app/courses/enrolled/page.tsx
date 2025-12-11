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
          <div className="w-16 h-16 border-4 border-[#00D4E0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
            My Enrolled Courses
          </h1>
          <p className="text-base mt-2 text-white/90">Track your progress and continue learning</p>
        </div>

        <div className="p-8">

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#00D4E0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-[#00D4E0] text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your Enrolled Courses
          </h3>
          <p className="text-gray-600 mb-6">
            Your enrolled courses will be visible here
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 bg-[#00D4E0] text-white font-semibold rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Browse Available Courses
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
