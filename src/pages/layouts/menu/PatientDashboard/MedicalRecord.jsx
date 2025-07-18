
import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://6809f36e1f1a52874cde79fe.mockapi.io/note")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openNoteModal = (noteData) => {
    setSelectedNote(noteData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical Records</h1>

      {/* Table */}
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Appointment Date</th>
            <th className="px-6 py-3 text-left">Diagnosis</th>
            <th className="px-6 py-3 text-left">Doctor Name</th>
            <th className="px-6 py-3 text-left">Doctor's Note</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {records.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-slate-50 transition duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.appointmentDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.symptoms}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.doctorName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => openNoteModal(item)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-150"
                >
                  View Note
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="relative bg-white px-6 pt-6 pb-10 rounded-xl shadow-xl w-full max-w-md border border-gray-300 animate-fadeIn">
            
            {/* Close icon at top right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Doctor's Note</h2>

            {/* Note content */}
            <div className="text-gray-700 max-h-[60vh] overflow-y-auto px-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200">
              {selectedNote.note || "No note available."}
            </div>

            {/* Last Updated info */}
            <div className="text-right text-xs text-gray-400 mt-4 pr-1">
              Last Updated: {formatDate(selectedNote.createdAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
