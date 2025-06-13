'use client';

import Sidebar from '@/components/Sidebar';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { instructors } from '@/data/instructors';

export default function ManageInstructorsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Instructors</h1>

        <div className="bg-white p-4 rounded shadow max-w-6xl">
          <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold">
            Search Instructors
          </button>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-gray-100 text-black border-b border-gray-300">
                <tr>
                  <th className="p-3 font-semibold">Registry No.</th>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Instructor Type</th>
                  <th className="p-3 font-semibold">Authorization Level</th>
                  <th className="p-3 font-semibold">Site</th>
                  <th className="p-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((ins, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b border-gray-200 hover:bg-blue-50 text-black`}
                  >
                    <td className="p-3">{ins.registry}</td>
                    <td className="p-3 text-blue-600 hover:underline cursor-pointer">{ins.name}</td>
                    <td className="p-3">{ins.type}</td>
                    <td className="p-3">{ins.level}</td>
                    <td className="p-3">{ins.site}</td>
                    <td className="p-3 text-center flex gap-3 justify-center text-gray-600">
                      <FaEdit className="cursor-pointer hover:text-blue-600" />
                      <FaTrash className="cursor-pointer hover:text-red-600" />
                      <FaEllipsisV className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
