import React, { useState } from "react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  site: string;
  email: string;
}

interface SelectStudentDrawerProps {
  onClose: () => void;
  onSave: (selectedStudents: Student[]) => void;
}

const mockStudents: Student[] = [
  {
    id: "7711089",
    firstName: "Carrie",
    lastName: "Long",
    site: "Arizona Provider Training, LLC",
    email: "carrierlong@gmail.com",
  },
  {
    id: "7711090",
    firstName: "John",
    lastName: "Doe",
    site: "Phoenix Training Center",
    email: "johndoe@example.com",
  },
  {
    id: "7711091",
    firstName: "Jane",
    lastName: "Smith",
    site: "Tucson Institute",
    email: "janesmith@example.com",
  },
];

const SelectStudentDrawer: React.FC<SelectStudentDrawerProps> = ({
  onClose,
  onSave,
}) => {
  const [search, setSearch] = useState({ name: "", site: "", active: "" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSearchChange = (field: keyof typeof search, value: string) => {
    setSearch({ ...search, [field]: value });
  };

  const filteredStudents = mockStudents.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      fullName.includes(search.name.toLowerCase()) &&
      student.site.toLowerCase().includes(search.site.toLowerCase())
    );
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedStudents = mockStudents.filter((s) =>
      selectedIds.includes(s.id)
    );
    onSave(selectedStudents);
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[800px] bg-white shadow-lg z-50 overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Select Students</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl"
          >
            ×
          </button>
        </div>
      </div>

      {/* Search Fields */}
      <div className="p-6 grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-500"
          value={search.name}
          onChange={(e) => handleSearchChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Site Assignment"
          className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-500"
          value={search.site}
          onChange={(e) => handleSearchChange("site", e.target.value)}
        />
        <input
          type="text"
          placeholder="Active"
          className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-500"
          value={search.active}
          onChange={(e) => handleSearchChange("active", e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="px-6">
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 font-semibold">Select</th>
              <th className="px-3 py-2 font-semibold">ID</th>
              <th className="px-3 py-2 font-semibold">First Name</th>
              <th className="px-3 py-2 font-semibold">Last Name</th>
              <th className="px-3 py-2 font-semibold">Site Assignment</th>
              <th className="px-3 py-2 font-semibold">Email Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(student.id)}
                    onChange={() => toggleSelect(student.id)}
                  />
                </td>
                <td className="px-3 py-2">{student.id}</td>
                <td className="px-3 py-2">{student.firstName}</td>
                <td className="px-3 py-2">{student.lastName}</td>
                <td className="px-3 py-2">{student.site}</td>
                <td className="px-3 py-2">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-4 p-6 border-t">
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelectStudentDrawer;
