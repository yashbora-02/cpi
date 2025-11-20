"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  FaSignOutAlt,
  FaChartLine,
  FaVideo,
  FaUsersCog,
  FaUserCheck,
  FaBrain,
  FaPlusCircle,
  FaSearch,
  FaGraduationCap,
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
  FaHeadset
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState({
    instructors: true,
    training: true,
    general: true,
    courses: true,
    support: true,
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
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#2D2F33] to-[#1a1b1d] shadow-2xl p-4 flex flex-col border-r border-white/10">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <Image
          src="/logo.png"
          alt="CarePoint Institute"
          width={140}
          height={50}
          className="object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {/* General */}
        <DropdownSection
          label="General"
          icon={<FaChartLine className="text-lg" />}
          isOpen={open.general}
          onToggle={() => toggle("general")}
          links={[
            { label: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
            { label: "Video Player", path: "/video", icon: <FaVideo /> },
          ]}
          currentPath={pathname}
        />

        {/* Instructors */}
        <DropdownSection
          label="Instructors"
          icon={<FaUsersCog className="text-lg" />}
          isOpen={open.instructors}
          onToggle={() => toggle("instructors")}
          links={[
            { label: "Manage Instructors", path: "/instructors/manage", icon: <FaUsersCog /> },
            { label: "Reauthorize Instructors", path: "/instructors/reauthorize", icon: <FaUserCheck /> },
            { label: "Instructor Development", path: "/instructors/development", icon: <FaBrain /> },
          ]}
          currentPath={pathname}
        />

        {/* Training */}
        <DropdownSection
          label="Training"
          icon={<FaGraduationCap className="text-lg" />}
          isOpen={open.training}
          onToggle={() => toggle("training")}
          links={[
            { label: "Create Class - Blended/Online", path: "/training/create-class", icon: <FaPlusCircle /> },
            { label: "Student Search", path: "/students/search", icon: <FaSearch /> },
          ]}
          currentPath={pathname}
        />

        {/* Courses */}
        <DropdownSection
          label="Courses"
          icon={<FaGraduationCap className="text-lg" />}
          isOpen={open.courses}
          onToggle={() => toggle("courses")}
          links={[
            { label: "Browse Courses", path: "/courses", icon: <FaClipboardList /> },
            { label: "My Enrolled Courses", path: "/courses/enrolled", icon: <FaGraduationCap /> },
          ]}
          currentPath={pathname}
        />

        {/* Support */}
        <DropdownSection
          label="Support"
          icon={<FaHeadset className="text-lg" />}
          isOpen={open.support}
          onToggle={() => toggle("support")}
          links={[
            { label: "Support Center", path: "/support", icon: <FaHeadset /> },
          ]}
          currentPath={pathname}
        />
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#C10E21] to-[#a00d1c] text-white font-bold rounded-lg hover:from-[#a00d1c] hover:to-[#C10E21] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

type LinkItem = { label: string; path: string; icon?: React.ReactNode };

function DropdownSection({
  label,
  icon,
  isOpen,
  onToggle,
  links,
  currentPath,
}: {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  links: LinkItem[];
  currentPath: string;
}) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left px-4 py-3 text-white font-bold hover:bg-white/10 rounded-lg transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#00A5A8] group-hover:text-white transition-colors">{icon}</span>
          <span>{label}</span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-xs text-white/50" />
        ) : (
          <FaChevronDown className="text-xs text-white/50" />
        )}
      </button>
      {isOpen && (
        <div className="mt-1 ml-4 space-y-1">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPath === item.path
                  ? "bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon && <span className="text-base">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
