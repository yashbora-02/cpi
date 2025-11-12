"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState({
    instructors: true,
    training: true,
    general: true,
    courses: true,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("firebaseToken");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4 flex flex-col">
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
          {
            label: "Create Class - Blended/Online",
            path: "/training/create-class",
          },
          { label: "Student Search", path: "/students/search" },
        ]}
        currentPath={pathname}
      />

      {/* Courses */}
      <DropdownSection
        label="Courses"
        isOpen={open.courses}
        onToggle={() => toggle("courses")}
        links={[
          { label: "Browse Courses", path: "/courses" },
          { label: "My Enrolled Courses", path: "/courses/enrolled" },
        ]}
        currentPath={pathname}
      />

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
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
