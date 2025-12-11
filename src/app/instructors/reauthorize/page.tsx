"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ReauthorizeModal from "@/components/ReauthorizeModal";

export default function ReauthorizeInstructorsPage() {
  const [group, setGroup] = useState("");
  const [site, setSite] = useState("Arizona Provider Training, LLC");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    if (group && site) {
      setShowModal(true);
    } else {
      alert("Please select a group and site");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold">Reauthorize Instructors</h1>
          <p className="text-base mt-2 text-white/90">Manage instructor reauthorization</p>
        </div>

        <div className="p-8">

        <div className="bg-white p-6 rounded shadow">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Select a Group of Instructors to Reauthorize *
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full border p-2 rounded text-gray-600 placeholder-gray-600"
              >
                <option value="">-- Select Group --</option>
                <option>Current to 90 Days Past Due</option>
                <option>91 to 365 Days Past Due</option>
                <option>Greater Than 365 Days Past Due</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Select Site
              </label>
              <select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="w-full border p-2 rounded text-gray-600 placeholder-gray-600"
              >
                <option>Arizona Provider Training, LLC</option>
                <option>CPR Mobile Training</option>
                <option>April Miles Training Center</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            SEARCH
          </button>
        </div>

        {/* Modal */}
        {showModal && <ReauthorizeModal onClose={() => setShowModal(false)} />}
        </div>
      </main>
    </div>
  );
}
