"use client";

import React, { useState, useRef } from "react";
import { FaUpload, FaDownload, FaTimes, FaUserPlus, FaCloudUploadAlt } from "react-icons/fa";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

export default function StudentEntryDrawer({
  onClose,
  onSave,
  mode = "enter",
}: {
  onClose: () => void;
  onSave: (students: Student[]) => void;
  mode?: "enter" | "upload";
}) {
  const [students, setStudents] = useState<Student[]>(
    Array.from({ length: 15 }, () => ({
      firstName: "",
      lastName: "",
      email: "",
    }))
  );
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim());

        // Skip header row if it exists
        const startIndex = lines[0]?.toLowerCase().includes('first') ||
                          lines[0]?.toLowerCase().includes('name') ||
                          lines[0]?.toLowerCase().includes('email') ? 1 : 0;

        const uploadedStudents: Student[] = [];

        for (let i = startIndex; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));

          if (values.length >= 3) {
            uploadedStudents.push({
              firstName: values[0] || "",
              lastName: values[1] || "",
              email: values[2] || "",
            });
          } else if (values.length === 2) {
            // Handle case where only name and email provided
            uploadedStudents.push({
              firstName: values[0] || "",
              lastName: "",
              email: values[1] || "",
            });
          }
        }

        if (uploadedStudents.length === 0) {
          setUploadError("No valid student data found in file.");
          return;
        }

        // Merge uploaded students with existing empty slots
        const existingFilled = students.filter(
          s => s.firstName.trim() || s.lastName.trim() || s.email.trim()
        );
        const combined = [...existingFilled, ...uploadedStudents];

        // Ensure we have at least 15 rows
        while (combined.length < 15) {
          combined.push({ firstName: "", lastName: "", email: "" });
        }

        setStudents(combined);
      } catch {
        setUploadError("Error parsing file. Please check the format.");
      }
    };

    reader.onerror = () => {
      setUploadError("Error reading file.");
    };

    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadTemplate = () => {
    const template = "First Name,Last Name,Email\nJohn,Doe,john.doe@example.com\nJane,Smith,jane.smith@example.com";
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_roster_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChange = (idx: number, field: keyof Student, value: string) => {
    const updated = [...students];
    updated[idx][field] = value;
    setStudents(updated);
  };

  const handleSave = () => {
    const filled = students.filter(
      (s) => s.firstName.trim() || s.lastName.trim() || s.email.trim()
    );

    onSave([...filled]); // should trigger parent update
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 w-full md:w-[80%] lg:w-[60%] h-full bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b bg-[#00A5A8] text-white shadow-lg">
          <div className="flex items-center gap-3">
            {mode === "upload" ? (
              <FaCloudUploadAlt className="text-2xl" />
            ) : (
              <FaUserPlus className="text-2xl" />
            )}
            <div>
              <h2 className="text-xl font-bold">
                {mode === "upload" ? "Upload Students" : "Enter Students"}
              </h2>
              <p className="text-sm text-white/80">
                {mode === "upload" ? "Import students from a CSV file" : "Manually add students to the roster"}
              </p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={onClose}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Upload Section - Only shown in upload mode */}
        {mode === "upload" && (
          <div className="px-6 py-6 bg-gradient-to-b from-gray-50 to-white border-b">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00A5A8] transition-colors bg-white">
              <FaCloudUploadAlt className="text-5xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or</p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="bg-[#00A5A8] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#008f91] flex items-center gap-2 transition-all transform hover:scale-105 shadow-md"
                >
                  <FaUpload />
                  Choose File
                </label>
                <button
                  onClick={downloadTemplate}
                  className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-all border border-gray-300 shadow-sm"
                >
                  <FaDownload />
                  Download Template
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                CSV format: First Name, Last Name, Email
              </p>
            </div>
            {uploadError && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{uploadError}</p>
              </div>
            )}
          </div>
        )}

        {/* Manual Entry Grid - Only shown in enter mode */}
        {mode === "enter" && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Fill in the student details below. Empty rows will be ignored.
              </p>
            </div>
            <div className="space-y-3">
              {students.map((student, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-3 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-400 w-8">{idx + 1}</span>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all"
                    value={student.firstName}
                    onChange={(e) => handleChange(idx, "firstName", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all"
                    value={student.lastName}
                    onChange={(e) => handleChange(idx, "lastName", e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all"
                    value={student.email}
                    onChange={(e) => handleChange(idx, "email", e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg font-semibold"
              >
                <FaUserPlus /> Save Students
              </button>
            </div>
          </div>
        )}

        {/* Upload Preview Table - Only shown in upload mode */}
        {mode === "upload" && (
          <div className="p-6">
            {students.filter(s => s.firstName || s.lastName || s.email).length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Preview ({students.filter(s => s.firstName || s.lastName || s.email).length} students)
                  </h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Ready to save
                  </span>
                </div>
                <div className="overflow-x-auto max-h-96 rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">First Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Last Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students
                        .filter(s => s.firstName || s.lastName || s.email)
                        .map((student, idx) => (
                          <tr key={idx} className="hover:bg-blue-50 transition-colors">
                            <td className="px-4 py-3 text-gray-500 font-medium">{idx + 1}</td>
                            <td className="px-4 py-3 text-gray-800">{student.firstName}</td>
                            <td className="px-4 py-3 text-gray-800">{student.lastName}</td>
                            <td className="px-4 py-3 text-gray-800">{student.email}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FaCloudUploadAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No students uploaded yet</p>
                <p className="text-sm">Upload a CSV file above to see the preview here</p>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={handleSave}
                disabled={students.filter(s => s.firstName || s.lastName || s.email).length === 0}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg font-semibold disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                <FaUserPlus /> Save Students
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
