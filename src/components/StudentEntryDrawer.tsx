"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {

    setUploadError("");
    setUploadSuccess("");
    setIsProcessing(true);

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setUploadError("Please upload a CSV file");
      setIsProcessing(false);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit");
      setIsProcessing(false);
      return;
    }

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
          setUploadError("No valid student data found in file. Please check the format.");
          setIsProcessing(false);
          return;
        }

        // Replace all students with uploaded ones
        const combined = [...uploadedStudents];

        // Ensure we have at least 15 rows
        while (combined.length < 15) {
          combined.push({ firstName: "", lastName: "", email: "" });
        }

        setStudents(combined);
        setUploadSuccess(`Successfully uploaded ${uploadedStudents.length} student${uploadedStudents.length !== 1 ? 's' : ''}`);
        setIsProcessing(false);
      } catch (error) {
        setUploadError("Error parsing file. Please check the format.");
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.");
      setIsProcessing(false);
    };

    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
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
          <div className="px-8 py-8 bg-white">
            {/* Sample CSV Download Section */}
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCloudUploadAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-blue-900 mb-1">
                      Need a Template?
                    </h4>
                    <p className="text-sm text-blue-800">
                      Download our sample CSV file to see the correct format
                    </p>
                  </div>
                </div>
                <button
                  onClick={downloadTemplate}
                  className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold text-sm flex items-center gap-2 transform hover:scale-[1.02] active:scale-95 flex-shrink-0"
                >
                  <FaDownload />
                  Download Sample CSV
                </button>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-[#00A5A8] bg-[#00A5A8]/5 scale-[1.01]'
                  : 'border-gray-300 hover:border-[#00A5A8]/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={`inline-block p-5 rounded-full mb-5 transition-all duration-300 ${
                isDragging ? 'bg-[#00A5A8]/10 scale-110' : 'bg-gray-50'
              }`}>
                <FaCloudUploadAlt className={`text-5xl transition-all duration-300 ${
                  isDragging ? 'text-[#00A5A8] animate-bounce' : 'text-gray-400'
                }`} />
              </div>
              <h3 className="text-lg font-semibold text-[#2D2F33] mb-2">
                {isDragging ? 'Drop your CSV file here' : 'Upload Student Roster'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {isDragging ? 'Release to upload' : 'Drag and drop your CSV file here, or click to browse'}
              </p>
              <div className="flex justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-8 py-3 rounded-lg cursor-pointer hover:shadow-lg flex items-center gap-2.5 transition-all transform hover:scale-[1.02] font-medium text-sm"
                >
                  <FaUpload />
                  Choose CSV File
                </label>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  CSV file only • Max size: 5MB • Required columns: First Name, Last Name, Email
                </p>
              </div>
            </div>
            {uploadError && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-[#C10E21] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-[#C10E21] font-semibold text-sm">{uploadError}</p>
                </div>
              </div>
            )}
            {isProcessing && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-[#00A5A8]"></div>
                </div>
                <p className="text-gray-700 text-sm">Processing CSV file...</p>
              </div>
            )}
            {uploadSuccess && !isProcessing && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-[#00A5A8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <p className="text-gray-700 text-sm">{uploadSuccess}</p>
              </div>
            )}
          </div>
        )}

        {/* Manual Entry Grid - Only shown in enter mode */}
        {mode === "enter" && (
          <div className="px-8 py-8 bg-gradient-to-b from-white to-gray-50">
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUserPlus className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">Manual Entry Mode</p>
                  <p className="text-xs text-blue-700">Fill in student details below • Empty rows will be ignored</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {students.map((student, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-3 items-center p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-200 hover:border-[#00A5A8]"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">{idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    value={student.firstName}
                    onChange={(e) => handleChange(idx, "firstName", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    value={student.lastName}
                    onChange={(e) => handleChange(idx, "lastName", e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    value={student.email}
                    onChange={(e) => handleChange(idx, "email", e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg flex items-center gap-2 transition-all font-medium text-sm"
              >
                <FaUserPlus />
                Save Students
              </button>
            </div>
          </div>
        )}

        {/* Upload Preview Table - Only shown in upload mode */}
        {mode === "upload" && (
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            {(() => {
              const filledStudents = students.filter(s => s.firstName || s.lastName || s.email);
              const filledCount = filledStudents.length;

              if (filledCount > 0) {
                return (
                  <>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-[#2D2F33] mb-1">
                        Student Roster Preview
                      </h3>
                      <p className="text-xs text-gray-600">
                        {filledCount} student{filledCount !== 1 ? 's' : ''} imported
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                      <div className="overflow-x-auto max-h-80">
                        <table className="min-w-full">
                          <thead className="bg-[#00A5A8] text-white sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">#</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">First Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Last Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filledStudents.map((student, idx) => (
                              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-xs text-gray-500">{idx + 1}</td>
                                <td className="px-4 py-3 text-sm text-[#2D2F33]">{student.firstName}</td>
                                <td className="px-4 py-3 text-sm text-[#2D2F33]">{student.lastName}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              } else {
                return null;
              }
            })()}

            {/* Save Button */}
            <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={students.filter(s => s.firstName || s.lastName || s.email).length === 0}
                className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-8 py-2.5 rounded-lg hover:shadow-lg flex items-center gap-2 transition-all font-medium text-sm disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaUserPlus />
                Save Students
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
