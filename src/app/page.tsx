"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center p-4">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to CPI Training
      </h1>
      <p className="text-lg text-blue-600 mb-8">
        Your platform for CPR, First Aid, and Instructor Certification
      </p>
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
}
