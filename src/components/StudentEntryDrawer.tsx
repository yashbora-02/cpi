"use client";

import React, { useState } from "react";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

export default function StudentEntryDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (students: Student[]) => void;
}) {
  const [students, setStudents] = useState<Student[]>(
    Array.from({ length: 15 }, () => ({
      firstName: "",
      lastName: "",
      email: "",
    }))
  );

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
    <div className="fixed top-0 right-0 w-full md:w-[80%] lg:w-[60%] h-full bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 border-l border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Roster Entry</h2>
        <button
          className="text-2xl text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      {/* Grid of Student Entries */}
      <div className="p-6">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 border-b pb-2"
          >
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded text-gray-800"
              value={student.firstName}
              onChange={(e) => handleChange(idx, "firstName", e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded text-gray-800"
              value={student.lastName}
              onChange={(e) => handleChange(idx, "lastName", e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded text-gray-800"
              value={student.email}
              onChange={(e) => handleChange(idx, "email", e.target.value)}
            />
          </div>
        ))}

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <span>&#8681;</span> Save Updated
          </button>
        </div>
      </div>
    </div>
  );
}
