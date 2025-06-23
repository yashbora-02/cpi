"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const enrolledCourses = [
  {
    name: "**Demo-HSI Basic Life Support (2020) (Blended)-DC",
    action: "Launch Course",
    status: "In Progress",
  },
  {
    name: "**Demo-HSI Instructor Development Course IDC (Blended) 2020",
    action: "Launch Course",
    status: "In Progress",
  },
  {
    name: "Preview-Opioid Overdose and Bystander Use of Naloxone ( Online Only )",
    action: "Review Course",
    status: "Completed",
  },
];

const enrichmentCourses = [
  {
    name: "**Demo-HSI Adult First Aid (2020) -(Blended)-DC",
  },
  {
    name: "**Demo-HSI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC",
  },
];

export default function InstructorDevelopmentPage() {
  const [addedCourses, setAddedCourses] = useState<string[]>([]);

  const handleAddCourse = (name: string) => {
    setAddedCourses((prev) => [...prev, name]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Instructor Development
        </h1>

        {/* Enrolled Courses */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Currently Enrolled Courses
          </h2>
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-700 font-semibold">
                <th>Course Name</th>
                <th className="text-center">Action</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, idx) => (
                <tr key={idx} className="bg-white shadow-sm rounded">
                  <td className="p-3 text-gray-800">{course.name}</td>
                  <td className="p-3 text-center">
                    <button
                      className={`px-4 py-1 font-semibold rounded ${
                        course.action === "Review Course"
                          ? "bg-white border border-gray-300 text-gray-800"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {course.action.toUpperCase()}
                    </button>
                  </td>
                  <td className="p-3 text-right text-gray-800">
                    {course.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enrichment Courses */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Enrichment Courses
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            The following courses can greatly enrich your abilities as an
            instructor. Click on the{" "}
            <strong className="font-semibold text-gray-800">
              &quot;Add Course&quot;
            </strong>{" "}
            button to enroll yourself into these courses.
          </p>
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-700 font-semibold">
                <th>Course Name</th>
                <th className="text-right">Click to Enroll</th>
              </tr>
            </thead>
            <tbody>
              {enrichmentCourses.map((course, idx) => (
                <tr key={idx} className="bg-white shadow-sm rounded">
                  <td className="p-3 text-gray-800">{course.name}</td>
                  <td className="p-3 text-right">
                    {addedCourses.includes(course.name) ? (
                      <span className="text-green-700 font-semibold">
                        Enrolled
                      </span>
                    ) : (
                      <button
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                        onClick={() => handleAddCourse(course.name)}
                      >
                        ADD COURSE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
