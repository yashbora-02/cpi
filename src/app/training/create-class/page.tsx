"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StudentEntryDrawer from "@/components/StudentEntryDrawer";
import EnterBlendedDetails from "../blended-class/enter-details";
import EnterDigitalDetails from "../digital-cert-card/enter-details";
import { FaEdit, FaTrash, FaLink, FaFilePdf, FaEllipsisV } from "react-icons/fa";

import ConfirmModal from "@/components/ConfirmModal";
import AccessLinkModal from "@/components/AccessLinkModal";
import SelectStudentDrawer from "@/components/SelectStudentDrawer";
import SuccessModal from "@/components/SuccessModal";
import CreditConfirmationModal from "@/components/CreditConfirmationModal";
import DigitalCardFinalPage from "@/components/DigitalCardFinalPage";
import CertificateViewer from "@/components/CertificateViewer";
import EditRequestModal from "@/components/EditRequestModal";
import { auth } from "@/lib/firebase";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  certificate_url?: string;
}

export default function CreateClassPage() {
  const [step, setStep] = useState(1);
  const [programType, setProgramType] = useState("");
  const [program, setProgram] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rosterEntryType, setRosterEntryType] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"enter" | "upload">("enter");
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  const [editingStudentIndex, setEditingStudentIndex] = useState<number | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<number | null>(null);

  // Email toggle states
  const [sendStudentEmail, setSendStudentEmail] = useState(true);
  const [sendAdminEmail, setSendAdminEmail] = useState(false);
  const [sendClassroomEmail, setSendClassroomEmail] = useState(true);

  // Digital Card specific states
  const [showCreditConfirmModal, setShowCreditConfirmModal] = useState(false);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [digitalCardData, setDigitalCardData] = useState<any>(null);
  const [showCertificateViewer, setShowCertificateViewer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Fetch available credits when component mounts (for digital cards)
  useEffect(() => {
    if (programType === "digital") {
      fetchAvailableCredits();
    }

    // Get user email from Firebase auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, [programType]);

  const fetchAvailableCredits = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch("/api/credits/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableCredits(data.availableCredits);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
      // Fallback to default value
      setAvailableCredits(28);
    }
  };

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

  const handleEditStudent = (index: number) => {
    setEditingStudentIndex(index);
    setEditingStudent({ ...students[index] });
  };

  const handleSaveEdit = () => {
    if (editingStudentIndex !== null && editingStudent) {
      const updatedStudents = [...students];
      updatedStudents[editingStudentIndex] = editingStudent;
      setStudents(updatedStudents);
      setEditingStudentIndex(null);
      setEditingStudent(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentIndex(null);
    setEditingStudent(null);
  };

  const handleRemoveStudent = (index: number) => {
    setStudentToRemove(index);
    setShowRemoveConfirm(true);
  };

  const confirmRemoveStudent = () => {
    if (studentToRemove !== null) {
      const updatedStudents = students.filter((_, idx) => idx !== studentToRemove);
      setStudents(updatedStudents);
      setShowRemoveConfirm(false);
      setStudentToRemove(null);
    }
  };

  const cancelRemoveStudent = () => {
    setShowRemoveConfirm(false);
    setStudentToRemove(null);
  };

  // Digital Card submission handler
  const handleDigitalCardSubmit = async () => {
    setIsSubmitting(true);
    setShowCreditConfirmModal(false);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to submit");
        setIsSubmitting(false);
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch("/api/digital-cards/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          program,
          site,
          classType,
          startDate,
          endDate,
          accreditingInstructor,
          assistingInstructor,
          openEnrollment,
          students,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Digital card created:", data);

        // Add certificate_url to students (use mock certificate as fallback)
        const studentsWithCerts = students.map(s => ({
          ...s,
          certificate_url: "/cpi-cert.pdf"
        }));

        setDigitalCardData({
          id: data.digitalCardId,
          class_id: data.classId,
          program,
          site,
          class_type: classType,
          start_date: startDate,
          end_date: endDate,
          accrediting_instructor: accreditingInstructor,
          assisting_instructor: assistingInstructor,
          open_enrollment: openEnrollment,
          credits_used: data.creditsUsed,
          submitted_at: new Date().toISOString(),
          submitted_by: user.email || user.uid,
          students: studentsWithCerts,
        });

        setStep(5);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create digital card");
      }
    } catch (error) {
      console.error("Error submitting digital card:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#00A5A8] text-white px-8 py-6 shadow-lg">
          <h2 className="text-3xl font-bold">
            Add Class/Blended Online Training
          </h2>
          <p className="text-base mt-2 text-white/90">Create Class or Blended Training</p>
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
                    // Close all drawers first
                    setShowDrawer(false);
                    setShowSelectDrawer(false);
                    // Then open the appropriate one
                    if (value === "enter") {
                      setDrawerMode("enter");
                      setTimeout(() => setShowDrawer(true), 50);
                    } else if (value === "upload") {
                      setDrawerMode("upload");
                      setTimeout(() => setShowDrawer(true), 50);
                    } else if (value === "select") {
                      setTimeout(() => setShowSelectDrawer(true), 50);
                    }
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="enter">Enter Student</option>
                  <option value="upload">Upload Students (CSV)</option>
                  <option value="select">Select Student</option>
                </select>

                {showSelectDrawer && (
                  <SelectStudentDrawer
                    onClose={() => {
                      setShowSelectDrawer(false);
                      setRosterEntryType(""); // Reset dropdown so it can be selected again
                    }}
                    onSave={(selected) => {
                      setStudents(selected);
                      setShowSelectDrawer(false);
                      setRosterEntryType(""); // Reset dropdown after save
                    }}
                  />
                )}

                {students.length > 0 && (
                  <div className="mt-6 overflow-x-auto">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-md font-semibold text-gray-800">Student Roster</h4>
                      <span className="bg-[#00A5A8] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {students.length} {students.length === 1 ? 'Student' : 'Students'}
                      </span>
                    </div>
                    <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">#</th>
                          <th className="px-4 py-3 text-left font-semibold">Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Email</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 bg-white divide-y divide-gray-200">
                        {students.map((student, idx) => (
                          <tr key={idx} className="hover:bg-blue-50 transition">
                            <td className="px-4 py-3 text-gray-500 font-medium">{idx + 1}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">
                              {student.firstName} {student.lastName}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {student.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-sm text-gray-500 mt-3">
                      ✅ {students.length} {students.length === 1 ? 'student' : 'students'} ready for class
                    </p>
                  </div>
                )}

                {students.length === 0 && rosterEntryType && (
                  <div className="mt-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500 text-sm">No students added yet.</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {rosterEntryType === 'upload' ? 'Upload a CSV file to add students' : 'Select a roster entry method above to add students'}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-white text-gray-700 px-5 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
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
                <div className="flex flex-col gap-4 mb-6">
                  <label className="flex items-center gap-3">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendStudentEmail}
                        onChange={(e) => setSendStudentEmail(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A5A8]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A5A8]"></div>
                    </div>
                    <span className="text-sm text-gray-800 font-medium">
                      Online Student Course Email
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendAdminEmail}
                        onChange={(e) => setSendAdminEmail(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A5A8]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A5A8]"></div>
                    </div>
                    <span className="text-sm text-gray-800 font-medium">
                      Online Admin Training Email
                    </span>
                  </label>
                </div>
              )}

              {/* Digital cards: No email toggles - removed per requirements */}
              {programType === "digital" && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-5 mb-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-yellow-900 mb-1">
                        Important: Review Before Submitting
                      </h4>
                      <p className="text-sm text-yellow-800 font-medium">
                        Please review all information carefully. Once submitted, the digital card will be <strong>locked</strong> and cannot be edited directly. Any changes will require submitting a support ticket.
                      </p>
                    </div>
                  </div>
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
                      {programType === "digital" && (
                        <th className="border px-4 py-2 text-left font-medium">#</th>
                      )}
                      <th className="border px-4 py-2 text-left font-medium">
                        NAME
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        EMAIL
                      </th>
                      {programType === "blended" && (
                        <th className="border px-4 py-2 text-left font-medium">
                          STATUS
                        </th>
                      )}
                      {programType === "blended" && (
                        <th className="border px-4 py-2 text-left font-medium">
                          ACTIONS
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {programType === "digital" && (
                          <td className="border px-4 py-2 text-gray-500 font-medium">{idx + 1}</td>
                        )}
                        <td className="border px-4 py-2">
                          {editingStudentIndex === idx && programType === "blended" ? (
                            <input
                              type="text"
                              value={`${editingStudent?.firstName || ''} ${editingStudent?.lastName || ''}`}
                              onChange={(e) => {
                                const [firstName, ...lastNameParts] = e.target.value.split(' ');
                                setEditingStudent({
                                  ...editingStudent!,
                                  firstName: firstName || '',
                                  lastName: lastNameParts.join(' ') || ''
                                });
                              }}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            `${student.firstName} ${student.lastName}`
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editingStudentIndex === idx && programType === "blended" ? (
                            <input
                              type="email"
                              value={editingStudent?.email || ''}
                              onChange={(e) => setEditingStudent({ ...editingStudent!, email: e.target.value })}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            student.email
                          )}
                        </td>
                        {programType === "blended" && (
                          <td className="border px-4 py-2">Assigned</td>
                        )}
                        {programType === "blended" && (
                          <td className="border px-4 py-2">
                            <div className="flex gap-3 text-gray-600">
                              {editingStudentIndex === idx ? (
                                <>
                                  <button
                                    onClick={handleSaveEdit}
                                    className="hover:text-green-600 transition-colors text-sm px-2 py-1 bg-green-50 rounded"
                                    title="Save"
                                  >
                                    Save
                                  </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="hover:text-gray-600 transition-colors text-sm px-2 py-1 bg-gray-100 rounded"
                                  title="Cancel"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditStudent(idx)}
                                  className="hover:text-[#00A5A8] transition-colors"
                                  title="Edit student"
                                >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRemoveStudent(idx)}
                                  className="hover:text-red-600 transition-colors"
                                  title="Remove student"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="text-sm text-gray-600 mt-2">
                  Displaying {students.length} of {students.length}
                </p>

                {/* Pagination (Static) - Only show for blended */}
                {programType === "blended" && (
                  <div className="flex justify-end mt-4 gap-2 text-sm text-gray-600">
                    <button className="hover:text-black">«</button>
                    <span className="bg-[#00A5A8] text-white px-3 py-1 rounded">
                      1
                    </span>
                    <button className="hover:text-black">»</button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="bg-white text-gray-700 px-5 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  ← BACK
                </button>

                {programType === "blended" && (
                  <button
                    className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                    onClick={() => setShowModal(true)}
                  >
                    SEND CLASS NOTIFICATIONS
                  </button>
                )}

                {programType === "digital" && (
                  <button
                    className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-medium text-sm disabled:opacity-50"
                    onClick={() => {
                      // Validate required fields before opening modal
                      const missingFields = [];
                      if (!program) missingFields.push("Program");
                      if (!startDate) missingFields.push("Start Date");
                      if (!endDate) missingFields.push("End Date");
                      if (!accreditingInstructor) missingFields.push("Accrediting Instructor");
                      if (students.length === 0) missingFields.push("At least one student");

                      if (missingFields.length > 0) {
                        alert(`Please fill in the following required fields:\n\n• ${missingFields.join("\n• ")}`);
                        return;
                      }

                      setShowCreditConfirmModal(true);
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit ✓"}
                  </button>
                )}
              </div>

              {showModal && (
                <ConfirmModal
                  onConfirm={() => {
                    setShowModal(false);
                    setStep(4); // proceed
                  }}
                  onCancel={() => setShowModal(false)}
                  availableCredits={28}
                  creditsToUse={students.length}
                  studentCount={students.length}
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
                      "CPI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC (Blended)"}
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
                            {editingStudentIndex === idx ? (
                              <input
                                type="text"
                                value={`${editingStudent?.firstName || ''} ${editingStudent?.lastName || ''}`}
                                onChange={(e) => {
                                  const [firstName, ...lastNameParts] = e.target.value.split(' ');
                                  setEditingStudent({
                                    ...editingStudent!,
                                    firstName: firstName || '',
                                    lastName: lastNameParts.join(' ') || ''
                                  });
                                }}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              `${student.firstName} ${student.lastName}`
                            )}
                          </td>
                          <td className="border px-4 py-2">
                            {editingStudentIndex === idx ? (
                              <input
                                type="email"
                                value={editingStudent?.email || ''}
                                onChange={(e) => setEditingStudent({ ...editingStudent!, email: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              student.email
                            )}
                          </td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2">Pending</td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2">--</td>
                          <td className="border px-4 py-2">
                            <div className="flex gap-3 items-center justify-center text-gray-600">
                              {editingStudentIndex === idx ? (
                                <>
                                  <button
                                    onClick={handleSaveEdit}
                                    className="hover:text-green-600 transition-colors text-xs px-2 py-1 bg-green-50 rounded"
                                    title="Save"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="hover:text-gray-600 transition-colors text-xs px-2 py-1 bg-gray-100 rounded"
                                    title="Cancel"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleEditStudent(idx)}
                                  className="hover:text-[#00A5A8] transition-colors"
                                  title="Edit student"
                                >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                              )}
                              {editingStudentIndex !== idx && (
                                <>
                                  {programType === "blended" && (
                                    <button
                                      onClick={() => {
                                        setActiveLink(
                                          "https://pcmblsiwgjfc3pmqyyzx.app.clientclub.net/courses/offers/9698431c-c263-40b1-84e1-8e55a700c794"
                                        );
                                        setShowLinkModal(true);
                                      }}
                                      className="hover:text-[#00A5A8] transition-colors"
                                      title="Access Link"
                                    >
                                      <FaLink className="w-4 h-4" />
                                    </button>
                                  )}
                                  {programType === "digital" && (
                                    <button
                                      onClick={() => {
                                        window.open("/cpi-cert.pdf", "_blank");
                                      }}
                                      className="hover:text-red-600 transition-colors"
                                      title="View PDF Certificate"
                                    >
                                      <FaFilePdf className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    className="hover:text-gray-800 transition-colors"
                                    title="More options"
                                  >
                                    <FaEllipsisV className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
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
                  className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                  onClick={() => setShowSuccessModal(true)}
                >
                  Submit Class
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Final Page (Digital Cards Only) */}
          {step === 5 && digitalCardData && (
            <DigitalCardFinalPage
              digitalCard={digitalCardData}
              onCreateNew={() => {
                resetFields();
                setDigitalCardData(null);
              }}
              onViewCertificate={(student) => {
                setSelectedStudent(student);
                setShowCertificateViewer(true);
              }}
              onRequestEdit={() => {
                setShowEditRequestModal(true);
              }}
            />
          )}
        </div>

        {/* Modals and Drawers */}
        {showDrawer && (
          <StudentEntryDrawer
            key={`drawer-${drawerMode}`}
            onClose={() => {
              setShowDrawer(false);
              setRosterEntryType(""); // Reset dropdown so it can be selected again
            }}
            onSave={handleSaveStudents}
            mode={drawerMode}
          />
        )}
        <AccessLinkModal
          show={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          link={activeLink}
        />
        <SuccessModal
          show={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            resetFields();
          }}
          onCreateNew={() => {
            setShowSuccessModal(false);
            resetFields();
          }}
          studentCount={students.length}
          programType={programType}
        />

        {/* Remove Student Confirmation Modal */}
        {showRemoveConfirm && studentToRemove !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
              {/* Header */}
              <div className="bg-[#00A5A8] px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  Remove Student
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-2">
                  Are you sure you want to remove <span className="font-semibold">{students[studentToRemove].firstName} {students[studentToRemove].lastName}</span> from the roster?
                </p>
                <p className="text-gray-500 text-xs">
                  This action cannot be undone.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
                <button
                  onClick={cancelRemoveStudent}
                  className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemoveStudent}
                  className="px-5 py-2 bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Credit Confirmation Modal for Digital Cards */}
        <CreditConfirmationModal
          show={showCreditConfirmModal}
          onConfirm={handleDigitalCardSubmit}
          onCancel={() => setShowCreditConfirmModal(false)}
          availableCredits={availableCredits}
          creditsToUse={students.length}
          studentCount={students.length}
        />

        {/* Certificate Viewer Modal */}
        {selectedStudent && (
          <CertificateViewer
            show={showCertificateViewer}
            certificateUrl={selectedStudent.certificate_url || "/cpi-cert.pdf"}
            studentName={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
            onClose={() => {
              setShowCertificateViewer(false);
              setSelectedStudent(null);
            }}
          />
        )}

        {/* Edit Request Modal */}
        {digitalCardData && (
          <EditRequestModal
            show={showEditRequestModal}
            digitalCardData={{
              class_id: digitalCardData.class_id,
              program: digitalCardData.program,
              submitted_at: digitalCardData.submitted_at,
            }}
            userEmail={userEmail}
            onClose={() => setShowEditRequestModal(false)}
          />
        )}
      </main>
    </div>
  );
}
