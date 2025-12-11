import { FaUserMd, FaClock, FaShieldAlt, FaCertificate, FaLaptop, FaAward } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
            Why Professionals Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Award-winning training trusted by individuals, healthcare providers, and Fortune 500 companies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1E90FF] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Certified Expert Instructors</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn from nationally certified professionals with real-world emergency response experience. Our instructors bring decades of expertise to every training session.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1E90FF] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
              <FaClock className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Flexible Learning Options</h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from in-person, blended online, or fully remote training. Video-driven, scenario-based programs designed to engage all learning styles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1E90FF] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Latest Standards & Science</h3>
            <p className="text-gray-600 leading-relaxed">
              Our programs reflect the latest resuscitation science from the International Liaison Committee on Resuscitation (ILCOR). Stay current with evidence-based training.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#5DCCDB] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#5DCCDB] rounded-xl flex items-center justify-center mb-6">
              <FaCertificate className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Nationally Recognized Certification</h3>
            <p className="text-gray-600 leading-relaxed">
              Earn 2-year certifications accepted by employers, regulatory bodies, and organizations nationwide. OSHA-compliant and industry-standard.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#5DCCDB] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#5DCCDB] rounded-xl flex items-center justify-center mb-6">
              <FaLaptop className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Interactive & Practical</h3>
            <p className="text-gray-600 leading-relaxed">
              Engage in hands-on practice with immediate feedback. Our scenario-based approach ensures you're ready to act confidently in real emergencies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#5DCCDB] hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-[#5DCCDB] rounded-xl flex items-center justify-center mb-6">
              <FaAward className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Award-Winning Programs</h3>
            <p className="text-gray-600 leading-relaxed">
              Join over 5 million students who choose our trusted courses each year. Developed and refined over 40 years of excellence in safety training.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
