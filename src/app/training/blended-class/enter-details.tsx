"use client";

import React from "react";

interface Props {
  program: string;
  setProgram: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  setStep: (value: number) => void;
}

export default function EnterBlendedDetails({
  program,
  setProgram,
  dueDate,
  setDueDate,
  setStep,
}: Props) {
  return (
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
            <option value="CPI Adult First Aid (2020) -(Blended)-DC">
              CPI Adult First Aid (2020) -(Blended)-DC
            </option>
            <option value="CPI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC">
              CPI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC
            </option>
            <option value="CPI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
              CPI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC
            </option>
            <option value="CPI Basic Life Support (2020) (Blended)-DC">
              CPI Basic Life Support (2020) (Blended)-DC
            </option>
            <option value="CPI CPR AED All Ages (2020) -(Blended)-DC">
              CPI CPR AED All Ages (2020) -(Blended)-DC
            </option>
            <option value="CPI Spanish Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
              CPI Spanish Adult First Aid | CPR AED All Ages (2020)
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
          <input type="checkbox" id="openEnrollment" className="h-4 w-4" />
          <label htmlFor="openEnrollment" className="text-sm text-gray-700">
            Open Enrollment
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              if (!program) return alert("Please select a program");
              if (!dueDate) return alert("Please enter a training due date");
              setStep(2);
            }}
            className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            SAVE & CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
