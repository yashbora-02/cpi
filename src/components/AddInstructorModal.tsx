// components/AddInstructorModal.tsx
"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
  onContinue: () => void;
}

export default function AddInstructorModal({
  show,
  setShow,
  selection,
  setSelection,
  onContinue,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded shadow-lg">
        <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center rounded-t">
          <h2 className="text-lg font-semibold">Add Instructor</h2>
          <button onClick={() => setShow(false)} className="text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4 text-gray-700">
            Select to add a New instructor, Shared instructor or Change of
            Affiliation.
          </p>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="radio"
                name="instructorType"
                value="new"
                checked={selection === "new"}
                onChange={() => setSelection("new")}
                className="accent-green-600"
              />
              <span>Purchase or Complete New Instructor Application</span>
            </label>

            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="radio"
                name="instructorType"
                value="shared"
                checked={selection === "shared"}
                onChange={() => setSelection("shared")}
                className="accent-green-600"
              />
              <span>Shared Instructor</span>
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onContinue}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              CONTINUE WITH SELECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
