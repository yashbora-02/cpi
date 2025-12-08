"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  FaHeadset,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [open, setOpen] = useState({
    instructors: true,
    training: true,
    general: true,
    courses: true,
    support: true,
  });

  useEffect(() => {
    // Get user role from localStorage
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role);
    }
  }, []);

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    try {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("firebaseToken");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Define sections based on role
  const isAdmin = userRole === 'admin';
  const isInstructor = userRole === 'instructor';

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg text-[#1E90FF] hover:text-[#00D4E0] transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 min-h-screen bg-white shadow-2xl p-4 flex flex-col border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <Image
            src="/cpi logo.png"
            alt="CarePoint Institute"
            width={180}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
        {/* General Section - Both see Dashboard and Video Player */}
        {(isAdmin || isInstructor) && (
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
        )}

        {/* Instructors Section - Admin only */}
        {isAdmin && (
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
        )}

        {/* Training Section - Both see it, but different links */}
        {(isAdmin || isInstructor) && (
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
        )}

        {/* Courses Section - Admin only */}
        {isAdmin && (
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
        )}

        {/* Support Section - Admin only */}
        {isAdmin && (
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
        )}
      </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white font-bold rounded-lg hover:from-[#00D4E0] hover:to-[#1E90FF] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </>
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
        className="w-full flex justify-between items-center text-left px-4 py-3 text-[#2D2F33] font-bold hover:bg-gray-100 rounded-lg transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#1E90FF] group-hover:text-[#00D4E0] transition-colors">{icon}</span>
          <span>{label}</span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-xs text-gray-400" />
        ) : (
          <FaChevronDown className="text-xs text-gray-400" />
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
                  ? "bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#1E90FF] hover:bg-gray-50"
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
