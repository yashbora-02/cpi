'use client';

import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

const mockInstructors = [
  { name: 'Berenisse Molinar', id: '2436436', expiration: '08/03/2025' },
  { name: 'Cassandra Gilmore', id: '4864850', expiration: '08/30/2025' },
  { name: 'Dolores Delgado', id: '2881335', expiration: '08/20/2025' },
  { name: 'Lizeth Flores', id: '9842626', expiration: '07/02/2025' },
  { name: 'Manuel Gongora', id: '9842627', expiration: '08/06/2025' },
  { name: 'Michelle Hale', id: '4478458', expiration: '06/16/2025' },
  { name: 'Monica Martinek', id: '3537880', expiration: '08/27/2025' },
];

export default function ReauthorizeModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleReauthorize = () => setShowCheckout(true);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose}></div>
      <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white z-50 p-6 rounded shadow-lg max-w-3xl w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Expiring Instructors &gt;&gt; Current to 90 Days Past Due
        </h2>

        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Instructor</th>
                <th className="p-2 text-left">Instructor ID</th>
                <th className="p-2 text-left">Expiration</th>
                <th className="p-2 text-center">HSI Instructor</th>
                <th className="p-2 text-center">AVERT</th>
              </tr>
            </thead>
            <tbody>
              {mockInstructors.map((inst, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{inst.name}</td>
                  <td className="p-2">{inst.id}</td>
                  <td className="p-2">{inst.expiration}</td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(inst.id)}
                      onChange={() => toggleSelect(inst.id)}
                    />
                  </td>
                  <td className="p-2 text-center">Select</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between flex-wrap gap-2">
          <button
            onClick={handleReauthorize}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Reauthorize All
          </button>
          <button
            onClick={handleReauthorize}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🔵 Reauthorize Selected
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            ❌ Close
          </button>
        </div>
      </div>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
