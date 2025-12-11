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
  const [email, setEmail] = useState('');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setFirstName('Carrie');
    setLastName('Long');
    setEmail('');
  }, []);

  const handleSearch = () => {
    const matches = mockStudents.filter((s) => {
      const firstNameMatch = !firstName || s.firstName.toLowerCase() === firstName.toLowerCase();
      const lastNameMatch = !lastName || s.lastName.toLowerCase() === lastName.toLowerCase();
      const emailMatch = !email || s.email.toLowerCase().includes(email.toLowerCase());

      return firstNameMatch && lastNameMatch && emailMatch;
    });
    setSearchResults(matches);
    setSelectedStudent(null); // Reset selected student on new search
    setSearched(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold">Student Search</h1>
          <p className="text-base mt-2 text-white/90">Find and manage student records</p>
        </div>

        <div className="p-8">
        <div className="max-w-6xl mx-auto">

          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#00D4E0] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Search Students
            </button>
          </div>

          {/* Search Results */}
          {searched && searchResults.length === 0 && (
            <div className="text-center text-gray-500 italic mt-10">
              <p className="text-lg">No student record(s) found.</p>
            </div>
          )}

          {searched && searchResults.length > 0 && !selectedStudent && (
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Results: {searchResults.length} student{searchResults.length > 1 ? 's' : ''} found
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {searchResults.length > 1
                    ? 'Multiple students match your search. Click on a student card to view their class history.'
                    : 'Click on the student card to view their class history.'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((student, idx) => (
                  <div key={idx} onClick={() => setSelectedStudent(student)}>
                    <StudentList
                      students={[student]}
                      onSelect={setSelectedStudent}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  ← Back to Results
                </button>
                <div className="text-sm text-gray-600">
                  Viewing: <span className="font-semibold text-gray-800">{selectedStudent.firstName} {selectedStudent.lastName}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-600">{selectedStudent.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white px-4 py-3">
                    <h3 className="text-lg font-semibold">Student Information</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                        <p className="text-gray-900 font-semibold text-lg">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                      </div>
                      <div className="border-t pt-3">
                        <label className="text-xs font-medium text-gray-500 uppercase">Email Address</label>
                        <p className="text-gray-900">{selectedStudent.email}</p>
                      </div>
                      <div className="border-t pt-3">
                        <label className="text-xs font-medium text-gray-500 uppercase">Training Site</label>
                        <p className="text-gray-900">{selectedStudent.site}</p>
                      </div>
                      <div className="border-t pt-3">
                        <label className="text-xs font-medium text-gray-500 uppercase">Account Status</label>
                        <p className={`font-medium ${selectedStudent.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedStudent.status}
                        </p>
                      </div>
                      <div className="border-t pt-3">
                        <label className="text-xs font-medium text-gray-500 uppercase">Total Classes</label>
                        <p className="text-gray-900 font-semibold text-xl">{selectedStudent.history.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <StudentHistory student={selectedStudent} />
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}
