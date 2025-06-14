"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState({
    instructors: true,
    training: true,
    general: true,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">CPI</h2>

      {/* General */}
      <DropdownSection
        label="General"
        isOpen={open.general}
        onToggle={() => toggle("general")}
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Video Player", path: "/video" },
        ]}
        currentPath={pathname}
      />

      {/* Instructors */}
      <DropdownSection
        label="Instructors"
        isOpen={open.instructors}
        onToggle={() => toggle("instructors")}
        links={[
          { label: "Manage Instructors", path: "/instructors/manage" },
          {
            label: "Reauthorize Instructors",
            path: "/instructors/reauthorize",
          },
          { label: "Instructor Development", path: "/instructors/development" },
        ]}
        currentPath={pathname}
      />

      {/* Training */}
      <DropdownSection
        label="Training"
        isOpen={open.training}
        onToggle={() => toggle("training")}
        links={[
          { label: "Create Class - Blended", path: "/training/blended" },
          { label: "Create Class - Digital", path: "/training/digital" },
          { label: "Student Search", path: "/students/search" },
        ]}
        currentPath={pathname}
      />
    </div>
  );
}

type LinkItem = { label: string; path: string };

function DropdownSection({
  label,
  isOpen,
  onToggle,
  links,
  currentPath,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  links: LinkItem[];
  currentPath: string;
}) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-blue-600"
      >
        {label}
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="ml-2 mt-2 flex flex-col gap-1">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`p-2 rounded hover:bg-blue-100 text-sm ${
                currentPath === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
