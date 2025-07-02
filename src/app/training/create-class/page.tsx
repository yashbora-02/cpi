"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StudentEntryDrawer from "@/components/StudentEntryDrawer";
import EnterBlendedDetails from "../blended-class/enter-details";
import EnterDigitalDetails from "../digital-cert-card/enter-details";

import ConfirmModal from "@/components/ConfirmModal";
import AccessLinkModal from "@/components/AccessLinkModal";
import SelectStudentDrawer from "@/components/SelectStudentDrawer";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

export default function CreateClassPage() {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [program, setProgram] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rosterEntryType, setRosterEntryType] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const handleSaveStudents = (filled: Student[]) => {
    setStudents([...filled]);
    setShowDrawer(false);
  };

  const [site, setSite] = useState("Arizona Provider Training, LLC"); // Hardcoded, as in screenshot
  const [classType, setClassType] = useState("Initial");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [accreditingInstructor, setAccreditingInstructor] = useState("");
  const [assistingInstructor, setAssistingInstructor] = useState("");
  const [openEnrollment, setOpenEnrollment] = useState(false);
  const [showSelectDrawer, setShowSelectDrawer] = useState(false);

  const resetFields = () => {
    setStep(1);
    setProgram(""); // or your default value
    setProgramType(""); // if applicable
    setDueDate(""); // or new Date()
    setStudents([]); // or reset to default 15 blank rows
    setStudents([]); // if using
    // Reset other state fields if needed
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      switch (name) {
        case "openEnrollment":
          setOpenEnrollment(e.target.checked);
          break;
      }
    } else {
      switch (name) {
        case "program":
          setProgram(value);
          break;
        case "site":
          setSite(value);
          break;
        case "classType":
          setClassType(value);
          break;
        case "startDate":
          setStartDate(value);
          break;
        case "endDate":
          setEndDate(value);
          break;
        case "accreditingInstructor":
          setAccreditingInstructor(value);
          break;
        case "assistingInstructor":
          setAssistingInstructor(value);
          break;
      }
    }
  };

  const handleContinueFromDigitalDetails = () => {
    // Optionally validate required fields here
    setStep(2); // move to the next step
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
                <EnterBlendedDetails
                  program={program}
                  setProgram={setProgram}
                  dueDate={dueDate}
                  setDueDate={setDueDate}
                  setStep={setStep}
                />
              )}

              {programType === "digital" && (
                <EnterDigitalDetails
                  program={program}
                  classType={classType}
                  accreditingInstructor={accreditingInstructor}
                  site={site}
                  startDate={startDate}
                  endDate={endDate}
                  assistingInstructor={assistingInstructor}
                  openEnrollment={openEnrollment}
                  onChange={handleInputChange}
                  onContinue={handleContinueFromDigitalDetails}
                />
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
                  className="border w-full p-2 rounded text-gray-800"
                  value={rosterEntryType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRosterEntryType(value);
                    if (value === "enter") {
                      setShowDrawer(true);
                    } else if (value === "select") {
                      setShowSelectDrawer(true);
                    }
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="enter">Enter Student</option>
                  <option value="select">Select Student</option>
                </select>

                {showDrawer && (
                  <StudentEntryDrawer
                    onClose={() => setShowDrawer(false)}
                    onSave={handleSaveStudents}
                  />
                )}

                {showSelectDrawer && (
                  <SelectStudentDrawer
                    onClose={() => setShowSelectDrawer(false)}
                    onSave={(selected) => setStudents(selected)}
                  />
                )}

                {rosterEntryType && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                      <thead className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {students.map((student, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-2 border-t border-gray-200 font-medium">
                              {student.firstName} {student.lastName}
                            </td>
                            <td className="px-4 py-2 border-t border-gray-200">
                              {student.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-sm text-gray-600 mt-2">
                      Displaying {students.length} of {students.length}
                    </p>
                  </div>
                )}
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

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Step 3: Review and Submit
              </h3>

              {/* Email Toggles */}
              {programType === "blended" && (
                <div className="flex items-center gap-8 mb-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-800 font-medium">
                      Online Student Course Email
                    </span>
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800">
                      ✎
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-800 font-medium">
                      Online Admin Training Email
                    </span>
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800">
                      ✎
                    </span>
                  </label>
                </div>
              )}

              {programType === "digital" && (
                <div className="flex items-center gap-8 mb-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-800 font-medium">
                      Classroom Course Email
                    </span>
                    <span className="cursor-pointer text-gray-500 hover:text-gray-800">
                      ✎
                    </span>
                  </label>
                </div>
              )}

              {/* Class Details Section */}
              {programType === "blended" && (
                <div className="bg-gray-50 border rounded p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Class Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-800">
                    <p>
                      <strong>PROGRAM:</strong> {program || "—"}
                    </p>
                    <p>
                      <strong>LOCATION:</strong> Arizona Provider Training, LLC
                    </p>
                    <p>
                      <strong>CLASS STATUS:</strong> Online
                    </p>
                    <p>
                      <strong>CLASS ID:</strong> 33043289
                    </p>
                    <p>
                      <strong>DATE:</strong> {dueDate || "—"}
                    </p>
                    <p>
                      <strong>CLASS NOTES:</strong> —
                    </p>
                  </div>
                </div>
              )}

              {programType === "digital" && (
                <div className="bg-gray-50 border rounded p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Class Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-800">
                    <p>
                      <strong>PROGRAM:</strong> {program || "—"}
                    </p>
                    <p>
                      <strong>LOCATION:</strong> Arizona Provider Training, LLC
                    </p>
                    <p>
                      <strong>CLASS STATUS:</strong> Online
                    </p>
                    <p>
                      <strong>CLASS ID:</strong> 33043289
                    </p>
                    <p>
                      <strong>START DATE:</strong> {startDate || "—"}
                    </p>
                    <p>
                      <strong>END DATE:</strong> {endDate || "—"}
                    </p>
                    <p>
                      <strong>ACCREDITING INSTRUCTOR:</strong>{" "}
                      {accreditingInstructor || "—"}
                    </p>
                    <p>
                      <strong>ASSISTING INSTRUCTOR:</strong>{" "}
                      {assistingInstructor || "—"}
                    </p>
                    <p>
                      <strong>OPEN ENROLLMENT:</strong>{" "}
                      {openEnrollment ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>CLASS NOTES:</strong> —
                    </p>
                  </div>
                </div>
              )}

              {/* Class Roster Table */}
              <div className="bg-white border rounded p-4 shadow">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Class Roster ({students.length} student
                  {students.length !== 1 && "s"})
                </h4>
                <table className="min-w-full border text-sm text-gray-800">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left font-medium">
                        NAME
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        EMAIL
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        STATUS
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="border px-4 py-2">{student.email}</td>
                        <td className="border px-4 py-2">Assigned</td>
                        <td className="border px-4 py-2">
                          <div className="flex gap-2 text-gray-600">
                            <span className="cursor-pointer hover:text-blue-600">
                              ✎
                            </span>
                            <span className="cursor-pointer hover:text-red-600">
                              🗑️
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="text-sm text-gray-600 mt-2">
                  Displaying {students.length} of {students.length}
                </p>

                {/* Pagination (Static) */}
                <div className="flex justify-end mt-4 gap-2 text-sm text-gray-600">
                  <button className="hover:text-black">«</button>
                  <span className="bg-green-600 text-white px-3 py-1 rounded">
                    1
                  </span>
                  <button className="hover:text-black">»</button>
                </div>
              </div>

              <div className="text-right">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  onClick={() => setShowModal(true)}
                >
                  SEND CLASS NOTIFICATIONS
                </button>
              </div>

              {showModal && (
                <ConfirmModal
                  onConfirm={() => {
                    setShowModal(false);
                    setStep(4); // proceed
                  }}
                  onCancel={() => setShowModal(false)}
                />
              )}
            </div>
          )}
          {step === 4 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                4. Track Progress
              </h3>

              {/* Class Details */}
              <div className="bg-white border rounded-lg shadow-sm p-4 mb-6 text-sm text-gray-800">
                <h4 className="font-semibold text-gray-600 mb-2">
                  Class Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <p>
                    <span className="font-bold">PROGRAM:</span>{" "}
                    {program ||
                      "HSI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC (Blended)"}
                  </p>
                  <p>
                    <span className="font-bold">PROGRAM TYPE:</span>{" "}
                    {programType || "blended"}
                  </p>
                  <p>
                    <span className="font-bold">LOCATION:</span> Arizona
                    Provider Training, LLC
                  </p>
                  <p>
                    <span className="font-bold">CLASS STATUS:</span> Online
                  </p>
                  <p>
                    <span className="font-bold">CLASS ID:</span> 33043289
                  </p>
                  <p>
                    <span className="font-bold">DUE DATE:</span>{" "}
                    {dueDate || "2025-06-25"}
                  </p>
                </div>
              </div>

              {/* Class Roster */}
              <div className="bg-white border rounded-lg shadow-sm p-4 text-sm text-gray-800">
                <h4 className="font-semibold text-gray-600 mb-2">
                  Class Roster ({students.length} students)
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-left text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Score</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Skill Class</th>
                        <th className="border px-4 py-2">Notes / Card #</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {students.map((student, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">
                            {student.firstName} {student.lastName}
                          </td>
                          <td className="border px-4 py-2">{student.email}</td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2">Pending</td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2 text-center text-gray-600 space-x-3">
                            <span className="cursor-pointer hover:text-gray-800">
                              ✏️
                            </span>
                            {programType === "blended" && (
                              <button
                                onClick={() => {
                                  setActiveLink(
                                    "https://pcmblsiwgjfc3pmqyyzx.app.clientclub.net/courses/offers/9698431c-c263-40b1-84e1-8e55a700c794"
                                  );
                                  setShowLinkModal(true);
                                }}
                                className="text-gray-600 hover:text-blue-600"
                              >
                                🔗
                              </button>
                            )}
                            {programType === "digital" && (
                              <button
                                onClick={() => {
                                  window.open("/cpi-cert.pdf", "_blank");
                                }}
                                className="text-gray-600 hover:text-red-600"
                                title="View PDF"
                              >
                                📄
                              </button>
                            )}

                            <span className="cursor-pointer hover:text-gray-800">
                              ⋮
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Displaying {students.length} of {students.length}
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  onClick={resetFields}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
        {showDrawer && (
          <StudentEntryDrawer
            onClose={() => setShowDrawer(false)}
            onSave={handleSaveStudents}
          />
        )}
        <AccessLinkModal
          show={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          link={activeLink}
        />
      </main>
    </div>
  );
}
