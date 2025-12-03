"use client";

import React, { useState } from "react";
import { FaTimes, FaUsers, FaSearch, FaCheck } from "react-icons/fa";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  certificate_url?: string;
}

interface MockStudent {
  id: string;
  firstName: string;
  lastName: string;
  site: string;
  email: string;
}

interface SelectStudentDrawerProps {
  onClose: () => void;
  onSave: (selectedStudents: Student[]) => void;
  existingStudents?: Student[];
}

const mockStudents: MockStudent[] = [
  {
    id: "7711089",
    firstName: "Carrie",
    lastName: "Long",
    site: "Arizona Provider Training, LLC",
    email: "carrierlong@gmail.com",
  },
  {
    id: "7711090",
    firstName: "John",
    lastName: "Doe",
    site: "Phoenix Training Center",
    email: "johndoe@example.com",
  },
  {
    id: "7711091",
    firstName: "Jane",
    lastName: "Smith",
    site: "Tucson Institute",
    email: "janesmith@example.com",
  },
];

const SelectStudentDrawer: React.FC<SelectStudentDrawerProps> = ({
  onClose,
  onSave,
  existingStudents = [],
}) => {
  const [search, setSearch] = useState({ name: "", site: "", active: "" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearchChange = (field: keyof typeof search, value: string) => {
    setSearch({ ...search, [field]: value });
  };

  const filteredStudents = mockStudents.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(search.name.toLowerCase());
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedMockStudents = mockStudents.filter((s) =>
      selectedIds.includes(s.id)
    );

    // Check for duplicates based on email
    const existingEmails = existingStudents.map(s => s.email.toLowerCase());
    const duplicates = selectedMockStudents.filter(s =>
      existingEmails.includes(s.email.toLowerCase())
    );

    if (duplicates.length > 0) {
      const duplicateNames = duplicates.map(s => `${s.firstName} ${s.lastName}`).join(', ');
      setErrorMessage(`The following student(s) are already added: ${duplicateNames}`);
      return;
    }

    // Convert MockStudent to Student (remove id and site fields)
    const selectedStudents: Student[] = selectedMockStudents.map(s => ({
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
    }));

    onSave(selectedStudents);
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
      <div className="fixed right-0 top-0 h-full w-full md:w-[80%] lg:w-[60%] bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b bg-[#00A5A8] text-white shadow-lg">
          <div className="flex items-center gap-3">
            <FaUsers className="text-2xl" />
            <div>
              <h2 className="text-xl font-bold">Select Students</h2>
              <p className="text-sm text-white/80">
                Choose existing students from the database
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

        {/* Search Section */}
        <div className="px-6 py-6 bg-gradient-to-b from-gray-50 to-white border-b">
          <div className="flex items-center gap-2 mb-4">
            <FaSearch className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Search Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all"
              value={search.name}
              onChange={(e) => handleSearchChange("name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Status..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition-all"
              value={search.active}
              onChange={(e) => handleSearchChange("active", e.target.value)}
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
              <button
                onClick={() => setErrorMessage("")}
                className="ml-3 flex-shrink-0 text-red-500 hover:text-red-700"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Available Students ({filteredStudents.length})
            </h3>
            {selectedIds.length > 0 && (
              <span className="bg-[#00A5A8] text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedIds.length} selected
              </span>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Select</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">First Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Last Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const isAlreadyAdded = existingStudents.some(
                    s => s.email.toLowerCase() === student.email.toLowerCase()
                  );
                  return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isAlreadyAdded
                        ? "bg-gray-100 opacity-60 cursor-not-allowed"
                        : "hover:bg-[#00A5A8]/5 cursor-pointer"
                    } ${
                      selectedIds.includes(student.id) && !isAlreadyAdded ? "bg-[#00A5A8]/10" : ""
                    }`}
                    onClick={() => !isAlreadyAdded && toggleSelect(student.id)}
                  >
                    <td className="px-4 py-3">
                      {isAlreadyAdded ? (
                        <div className="w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center bg-gray-200">
                          <FaCheck className="text-gray-500 text-xs" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedIds.includes(student.id)
                            ? "bg-[#00A5A8] border-[#00A5A8]"
                            : "border-gray-300"
                        }`}>
                          {selectedIds.includes(student.id) && (
                            <FaCheck className="text-white text-xs" />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{student.id}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {student.firstName}
                      {isAlreadyAdded && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Already Added
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{student.lastName}</td>
                    <td className="px-4 py-3 text-gray-600">{student.email}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaUsers className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No students found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedIds.length === 0}
            className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg flex items-center gap-2 transition-all font-medium text-sm disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaCheck /> Add Selected ({selectedIds.length})
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectStudentDrawer;
