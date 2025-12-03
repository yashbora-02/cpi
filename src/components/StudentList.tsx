'use client';

import { Student } from '@/types';

export default function StudentList({
  students,
  onSelect,
}: {
  students: Student[];
  onSelect: (student: Student) => void;
}) {
  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        Student Details
      </h2>
      <ul className="space-y-4">
        {students.map((student, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(student)}
            className="cursor-pointer hover:bg-blue-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
          >
            <div className="text-blue-600 hover:underline font-semibold text-base">
              {student.firstName} {student.lastName}
            </div>
            <div className="text-gray-700 text-sm mt-1.5 flex items-center gap-1">
              <span className="font-medium">Email:</span>
              <span>{student.email}</span>
            </div>
            <div className="text-gray-600 text-sm mt-1 flex items-center gap-1">
              <span className="font-medium">Site:</span>
              <span>{student.site}</span>
            </div>
            <div className="text-gray-500 text-xs mt-2 flex items-center gap-1">
              <span className="font-medium">Status:</span>
              <span className={student.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>
                {student.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
