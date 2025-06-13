'use client';

import Sidebar from '@/components/Sidebar';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';

export const instructors = [
  {
    registry: '5649784',
    name: 'Adrian Grijalva',
    type: 'Instructor (Shared)',
    level: 'HSI Level 1',
    site: 'Arion Care Solutions',
  },
  {
    registry: '150233',
    name: 'Alison B Pattison',
    type: 'Instructor',
    level: 'HSI Level 2',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '3963480',
    name: 'Angelina Munoz',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '4016243',
    name: 'April Miles',
    type: 'Instructor (Shared)',
    level: 'HSI Level 1',
    site: 'April Miles Training Center',
  },
  {
    registry: '2436436',
    name: 'Berenisse Molinar',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '3963478',
    name: 'Caitlin Sanchez',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '4864850',
    name: 'Cassandra Gilmore',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '4120275',
    name: 'Cindy Gutierrez',
    type: 'Instructor (Shared)',
    level: 'HSI Level 1',
    site: 'CPR Mobile Training',
  },
  {
    registry: '3664196',
    name: 'Cintya Arcos',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
  {
    registry: '2881335',
    name: 'Dolores Delgado',
    type: 'Instructor',
    level: 'HSI Level 1',
    site: 'Arizona Provider Training, LLC',
  },
];


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
