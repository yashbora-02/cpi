"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StudentEntryDrawer from "@/components/StudentEntryDrawer";

export default function CreateClassPage() {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [program, setProgram] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rosterType, setRosterType] = useState("");
  const [showStudentEntry, setShowStudentEntry] = useState(false);

  const handleContinue = () => {
    if (step === 1 && !program) {
      alert("Please select a program type");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-blue-700 text-white px-8 py-4 shadow">
          <h2 className="text-xl font-semibold">
            Add Class/Blended Online Training
          </h2>
          <p className="text-sm opacity-90">Create Class or Blended Training</p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-b shadow mt-2">
          {/* Horizontal Stepper */}
          <div className="flex justify-between mb-6 text-sm font-medium text-gray-500">
            <div
              className={`flex-1 text-center ${
                step === 1 ? "text-blue-600 font-bold" : ""
              }`}
            >
              1. Enter Details
            </div>
            <div
              className={`flex-1 text-center ${
                step === 2 ? "text-blue-600 font-bold" : ""
              }`}
            >
              2. Build Roster
            </div>
            <div
              className={`flex-1 text-center ${
                step === 3 ? "text-blue-600 font-bold" : ""
              }`}
            >
              3. Review and Submit
            </div>
            <div
              className={`flex-1 text-center ${
                step === 4 ? "text-blue-600 font-bold" : ""
              }`}
            >
              4. Track Progress
            </div>
          </div>

          {/* Step 1: Enter Details */}
          {step === 1 && (
            <>
              {/* Select Program Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Program Type *
                </label>
                <select
                  value={programType}
                  onChange={(e) => setProgramType(e.target.value)}
                  className="border w-full p-2 rounded text-gray-800"
                >
                  <option value="">-- Select Program Type --</option>
                  <option value="blended">– Blended –</option>
                  <option value="digital">– Digital Cert Cards –</option>
                </select>
              </div>

              {/* Fields shown only if Blended is selected */}
              {programType === "blended" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left side */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program *
                      </label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="border w-full p-2 rounded text-gray-800"
                      >
                        <option value="">-- Select Program --</option>
                        <option value="HSI Adult First Aid (2020) -(Blended)-DC">
                          HSI Adult First Aid (2020) -(Blended)-DC
                        </option>
                        <option value="HSI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC">
                          HSI Adult First Aid | CPR AED Adult Infant (2020)
                          -(Blended)-DC
                        </option>
                        <option value="HSI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
                          HSI Adult First Aid | CPR AED All Ages (2020)
                          -(Blended)-DC
                        </option>
                        <option value="HSI Basic Life Support (2020) (Blended)-DC">
                          HSI Basic Life Support (2020) (Blended)-DC
                        </option>
                        <option value="HSI CPR AED All Ages (2020) -(Blended)-DC">
                          HSI CPR AED All Ages (2020) -(Blended)-DC
                        </option>
                        <option value="HSI Spanish Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
                          HSI Spanish Adult First Aid | CPR AED All Ages (2020)
                          -(Blended)-DC
                        </option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class Notes
                      </label>
                      <textarea
                        rows={3}
                        className="border w-full p-2 rounded text-gray-800"
                        placeholder="Optional notes..."
                      />
                    </div>
                  </div>

                  {/* Right side */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site
                      </label>
                      <div className="border p-2 rounded bg-gray-50 text-gray-700">
                        Arizona Provider Training, LLC
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Training Due Date *
                      </label>
                      <input
                        type="date"
                        className="border w-full p-2 rounded text-gray-800"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="openEnrollment"
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor="openEnrollment"
                        className="text-sm text-gray-700"
                      >
                        Open Enrollment
                      </label>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => {
                          if (!program) return alert("Please select a program");
                          if (!dueDate)
                            return alert("Please enter a training due date");
                          setStep(2); // ✅ Move to step 2
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        SAVE & CONTINUE
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        SAVE & ADD NEW CLASS
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Placeholder for Step 2-4 */}
          {step === 2 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Step 2: Build Roster
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                To start building your roster, select a method from the drop
                down list below.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roster Entry Type
                </label>
                <select
                  value={rosterType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRosterType(value);
                    if (value === "enter-student") setShowStudentEntry(true);
                  }}
                  className="border w-full p-2 rounded text-gray-800"
                >
                  <option value="">-- Select Roster Entry Type --</option>
                  <option value="enter-student">Enter Student</option>
                  <option value="select-student">Select Student</option>
                  <option value="select-member">Select Member</option>
                  <option value="upload-students">Upload Students</option>
                </select>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  CONTINUE TO REVIEW
                </button>
              </div>
            </div>
          )}
        </div>
        {showStudentEntry && (
          <StudentEntryDrawer onClose={() => setShowStudentEntry(false)} />
        )}
      </main>
    </div>
  );
}
