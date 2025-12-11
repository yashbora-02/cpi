"use client";

import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1E90FF] to-[#5DCCDB] rounded-lg flex items-center justify-center">
              <FaHeart className="text-2xl text-white" />
            </div>
            <span className="text-2xl font-bold text-[#2D2F33]">CPI Training</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-[#2D2F33] hover:text-[#1E90FF] font-semibold transition">Courses</a>
            <a href="#about" className="text-[#2D2F33] hover:text-[#1E90FF] font-semibold transition">About</a>
            <a href="#pricing" className="text-[#2D2F33] hover:text-[#1E90FF] font-semibold transition">Pricing</a>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2.5 bg-[#1E90FF] text-white font-bold uppercase rounded-lg hover:bg-[#1873CC] transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
