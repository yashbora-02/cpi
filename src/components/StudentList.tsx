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
    <div className="bg-white rounded shadow p-4 mb-6 max-w-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Student Name</h2>
      <ul className="space-y-2">
        {students.map((student, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(student)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
