'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StudentList from '@/components/StudentList';
import StudentHistory from '@/components/StudentHistory';
import { mockStudents } from '@/data/mockData';
import { Student } from '@/types';

export default function StudentSearchPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setFirstName('Carrie');
    setLastName('Long');
  }, []);

  const handleSearch = () => {
    const match = mockStudents.find(
      (s) =>
        s.firstName.toLowerCase() === firstName.toLowerCase() &&
        s.lastName.toLowerCase() === lastName.toLowerCase()
    );
    setSelectedStudent(match || null);
    setSearched(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#00A5A8] text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold">Student Search</h1>
          <p className="text-base mt-2 text-white/90">Find and manage student records</p>
        </div>

        <div className="p-8">
        <div className="max-w-6xl mx-auto">

          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Search Students
            </button>
          </div>

          {/* Search Results */}
          {searched && !selectedStudent && (
            <div className="text-center text-gray-500 italic mt-10">
              <p className="text-lg">No student record(s) found.</p>
            </div>
          )}

          {selectedStudent && (
            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="bg-white p-4 rounded shadow min-h-[200px]">
                <StudentList
                  students={[selectedStudent]}
                  onSelect={setSelectedStudent}
                />
              </div>

              <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <StudentHistory student={selectedStudent} />
              </div>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}
