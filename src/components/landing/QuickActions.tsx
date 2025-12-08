"use client";

import { useRouter } from "next/navigation";
import { FaGraduationCap, FaLaptop, FaUsers, FaCertificate } from "react-icons/fa";

export default function QuickActions() {
  const router = useRouter();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button
            onClick={() => router.push("/login")}
            className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00D4E0]"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaGraduationCap className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Book Training Now</h3>
            <p className="text-sm text-gray-600">Find classes in your area</p>
          </button>

          <button
            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00D4E0]"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaLaptop className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Online Courses</h3>
            <p className="text-sm text-gray-600">Learn at your own pace</p>
          </button>

          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00D4E0]"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaUsers className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Corporate Training</h3>
            <p className="text-sm text-gray-600">For teams & organizations</p>
          </button>

          <button
            onClick={() => router.push("/login")}
            className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00D4E0]"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaCertificate className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Recertification</h3>
            <p className="text-sm text-gray-600">Renew your certification</p>
          </button>
        </div>
      </div>
    </section>
  );
}
