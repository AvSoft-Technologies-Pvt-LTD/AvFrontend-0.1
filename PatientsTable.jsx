import React, { useState } from "react";
import { FaPlus, FaChevronDown, FaHeartbeat, FaNotesMedical } from "react-icons/fa";

const RECORD_TYPES = [
  { id: "vitals", label: "Vitals", icon: FaHeartbeat },
  { id: "notes", label: "Clinical Notes", icon: FaNotesMedical },
];

const patients = [
  {
    name: "John Doe",
    diagnosis: "Hypertension",
    reason: "Routine Checkup",
    datetime: "2025-06-13 10:00",
  },
  {
    name: "Jane Smith",
    diagnosis: "Diabetes",
    reason: "Follow-up",
    datetime: "2025-06-13 11:00",
  },
];

export default function PatientsTable() {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const viewPatientDetails = (p) => alert(`Viewing details for ${p.name}`);
  const addForm = (id) => alert(`Add form: ${id}`);

  return (
    <div className="overflow-x-auto">
      <table className="table-container w-full border border-gray-200 text-sm overflow-visible">
        <thead>
          <tr className="table-head bg-gray-100">
            {["ID", "Name", "Diagnosis", "Reason", "Date & Time", "Actions"].map((h, i) => (
              <th key={i} className="py-1 px-3 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body overflow-visible">
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">No appointments found.</td>
            </tr>
          ) : (
            patients.map((p, i) => (
              <tr key={i} className="tr-style text-center hover:bg-gray-50 overflow-visible">
                <td className="py-1 px-3 border-b">{i + 1}</td>
                <td className="py-1 px-3 border-b">
                  <button
                    className="text-blue-700 underline hover:text-blue-900"
                    onClick={() => viewPatientDetails(p)}
                  >
                    {p.name}
                  </button>
                </td>
                <td className="py-1 px-3 border-b">{p.diagnosis}</td>
                <td className="py-1 px-3 border-b">{p.reason}</td>
                <td className="py-1 px-3 border-b">{p.datetime}</td>
                <td className="py-1 px-3 border-b relative overflow-visible z-20">
                  <button
                    className="btn btn-primary text-xs px-3 py-1 shadow mx-auto flex items-center gap-2 rounded-full bg-[#0E1630] text-white"
                    type="button"
                    onClick={() => setDropdownOpen(dropdownOpen === i ? null : i)}
                  >
                    <FaPlus className="text-base" /> Add Record{" "}
                    <FaChevronDown
                      className={`text-xs transition-transform ${
                        dropdownOpen === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen === i && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border rounded-xl shadow-xl min-w-[200px] z-50 py-2">
                      {RECORD_TYPES.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left transition-colors"
                          onClick={() => addForm(id)}
                          type="button"
                        >
                          <Icon className="text-green-500 text-lg" />
                          <span className="font-medium text-[#0E1630]">{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}