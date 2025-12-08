"use client";

import { useRouter } from "next/navigation";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function ImpactStory() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-br from-[#00D4E0] to-[#008a8d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-bold">Real Life. Real Impact.</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              "My CPR training saved my colleague's life"
            </h2>
            <p className="text-xl text-white/95 leading-relaxed mb-6">
              When David collapsed at work, Sarah's quick thinking and CPR skills made all the difference. Within minutes of cardiac arrest, she started chest compressions while a coworker called 911. David survived thanks to her training.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-[#1E90FF]">SM</span>
              </div>
              <div>
                <div className="font-bold text-lg">Sarah Martinez</div>
                <div className="text-white/80">Office Manager, Chicago</div>
              </div>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-4 bg-white text-[#1E90FF] font-bold uppercase rounded-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Be Ready Like Sarah
            </button>
          </div>
          <div className="relative hidden md:block">
            <div className="bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20">
              <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl">
                <FaHandHoldingHeart className="text-9xl text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
