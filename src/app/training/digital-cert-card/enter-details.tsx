import React from "react";

interface DigitalCertCardsProps {
  program: string;
  classType: string;
  accreditingInstructor: string;
  site: string;
  startDate: string;
  endDate: string;
  assistingInstructor: string;
  openEnrollment: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onContinue: () => void;
}

const EnterDigitalDetails: React.FC<DigitalCertCardsProps> = ({
  program,
  classType,
  accreditingInstructor,
  site,
  startDate,
  endDate,
  assistingInstructor,
  openEnrollment,
  onChange,
  onContinue,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 text-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Program *
        </label>
        <select
          name="program"
          value={program}
          onChange={onChange}
          className="border w-full p-2 rounded text-gray-800"
        >
          <option value="">-- Select Program --</option>
          <option value="HSI Adult First Aid (2020) -(Blended)-DC">
            HSI Adult First Aid (2020) -(Blended)-DC
          </option>
          <option value="HSI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC">
            HSI Adult First Aid | CPR AED Adult Infant (2020) -(Blended)-DC
          </option>
          <option value="HSI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
            HSI Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC
          </option>
          <option value="HSI Basic Life Support (2020) (Blended)-DC">
            HSI Basic Life Support (2020) (Blended)-DC
          </option>
          <option value="HSI CPR AED All Ages (2020) -(Blended)-DC">
            HSI CPR AED All Ages (2020) -(Blended)-DC
          </option>
          <option value="HSI Spanish Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC">
            HSI Spanish Adult First Aid | CPR AED All Ages (2020) -(Blended)-DC
          </option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site
        </label>
        <div className="border p-2 rounded bg-gray-50 text-gray-700">
          Arizona Provider Training, LLC
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Class Type</label>
        <input
          type="text"
          name="classType"
          value="Initial"
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          readOnly
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">
          Accrediting Instructor *
        </label>
        <select
          name="accreditingInstructor"
          value={accreditingInstructor}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-gray-800"
        >
          <option value="">-- Select Instructor --</option>
          <option value="John Smith">John Smith</option>
          <option value="Jane Doe">Jane Doe</option>
          <option value="Michael Johnson">Michael Johnson</option>
          <option value="Emily Brown">Emily Brown</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">End Date *</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Assisting Instructor</label>
        <select
          name="assistingInstructor"
          value={assistingInstructor}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-gray-800"
        >
          <option value="">-- Select Instructor --</option>
          <option value="Anna White">Anna White</option>
          <option value="Chris Evans">Chris Evans</option>
          <option value="Laura Green">Laura Green</option>
          <option value="David Lee">David Lee</option>
        </select>
      </div>
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          name="openEnrollment"
          checked={openEnrollment}
          onChange={onChange}
          className="mr-2"
        />
        <label>Open Enrollment</label>
      </div>
      <div className="col-span-2 flex justify-end mt-6">
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default EnterDigitalDetails;
