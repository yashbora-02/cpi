'use client';

import { Student } from '@/types';
import { useRouter } from 'next/navigation';

export default function StudentHistory({ student }: { student: Student }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded shadow p-4 max-w-4xl overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Class History — {student.firstName} {student.lastName}
      </h2>

      <table className="w-full table-auto border-separate border-spacing-0 text-sm">
        <thead>
            <tr className="bg-gray-100 text-left text-black border-b border-gray-300">
            <th className="p-3 font-semibold">Class ID</th>
            <th className="p-3 font-semibold">Program</th>
            <th className="p-3 font-semibold">Date</th>
            <th className="p-3 font-semibold">Status</th>
            </tr>
        </thead>
        <tbody>
            {student.history.map((entry, idx) => (
            <tr
                key={idx}
                className={`${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b border-gray-200 hover:bg-blue-50 transition`}
            >
                <td
                  className="p-3 text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                  onClick={() => router.push(`/class/${entry.id}`)}
                >
                {entry.id}
                </td>
                <td className="p-3 text-gray-800">{entry.program}</td>
                <td className="p-3 text-gray-700">{entry.date}</td>
                <td className="p-3 text-sm font-medium">
                {entry.status === 'Completed' ? (
                    <span className="text-blue-600">{entry.status}</span>
                ) : (
                    <span className="text-green-600">{entry.status}</span>
                )}
                </td>
            </tr>
            ))}
        </tbody>
        </table>


      <p className="text-xs text-gray-500 mt-4">
        Displaying {student.history.length} class record(s).
      </p>
    </div>
  );
}
