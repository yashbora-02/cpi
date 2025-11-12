'use client';
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Instructors</h1>
      </main>
    </div>
  );
}
