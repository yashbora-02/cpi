"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Blended/Online Class
        </h1>

        {/* Button Container */}
        <div className="bg-white p-6 rounded shadow flex justify-end">
          <button
            onClick={() => router.push("/training/create-class")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
          >
            + CREATE NEW CLASS/BLENDED/ONLINE
          </button>
        </div>
      </main>
    </div>
  );
}
