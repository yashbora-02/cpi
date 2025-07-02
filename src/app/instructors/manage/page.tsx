"use client";

import Sidebar from "@/components/Sidebar";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { instructors } from "@/data/instructors";
import AddInstructorModal from "@/components/AddInstructorModal";
import { useState } from "react";

export default function ManageInstructorsPage() {
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [type, setType] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState(instructors);

  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState("new");

  const handleSearch = () => {
    const filtered = instructors.filter((ins) => {
      return (
        (name === "" || ins.name.toLowerCase().includes(name.toLowerCase())) &&
        (site === "" || ins.site === site) &&
        (type === "" || ins.type === type || type === "All")
      );
    });

    setFilteredInstructors(filtered);
  };

  const handleContinue = () => {
    setShowModal(false);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Manage Instructors
        </h1>

        <div className="bg-white p-4 rounded shadow max-w-6xl">
          <div className="mb-4 mb-4 flex justify-between items-center flex-wrap">
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-600"
                  checked
                  readOnly
                />
                <span className="ml-2 text-gray-600 placeholder-gray-600">
                  Basic Search
                </span>
              </label>
              <label className="inline-flex items-center text-gray-400">
                <input
                  type="radio"
                  className="form-radio text-gray-300"
                  disabled
                />
                <span className="ml-2 text-gray-600 placeholder-gray-600">
                  Advanced Search
                </span>
              </label>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold mt-2 md:mt-0"
            >
              + Add Instructor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1 text-gray-600 placeholder-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Site Assignment
              </label>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-gray-600 placeholder-gray-600"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              >
                <option value="">All</option>
                {[...new Set(instructors.map((i) => i.site))].map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Instructor Type
              </label>
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-gray-600 placeholder-gray-600"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All</option>
                <option value="Instructor">Instructor</option>
                <option value="Instructor (Shared)">Instructor (Shared)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
          >
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
                {filteredInstructors.map((ins, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200 hover:bg-blue-50 text-black`}
                  >
                    <td className="p-3">{ins.registry}</td>
                    <td className="p-3 text-blue-600 hover:underline cursor-pointer">
                      {ins.name}
                    </td>
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
            <AddInstructorModal
              show={showModal}
              setShow={setShowModal}
              // selection={selection}
              // setSelection={setSelection}
              // onContinue={handleContinue}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
