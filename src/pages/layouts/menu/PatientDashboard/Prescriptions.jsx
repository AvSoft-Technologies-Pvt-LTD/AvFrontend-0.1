// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const Prescription = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [file, setFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [doctorName, setDoctorName] = useState("");
//   const [hospitalName, setHospitalName] = useState("");
//   const [diagnosis, setDiagnosis] = useState("");
//   // Fetch existing prescriptions
//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);
//   const fetchPrescriptions = async () => {
//     try {
//       const res = await axios.get("https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion");
//       const data = res.data.map(item => ({
//         ...item,
//         status: item.status || "Verified", // Default to Verified if not present
//       }));
//       setPrescriptions(data);
//     } catch (err) {
//       console.error("Error fetching prescriptions:", err);
//     }
//   };
//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };
//   // Add new prescription
//   const handleAddPrescription = async () => {
//     if (!file) {
//       alert("Please select a file to upload!");
//       return;
//     }
//     try {
//       // Save directly to MockAPI with dummy file URL (optional: simulate upload)
//       const newPrescription = {
//         date: new Date().toLocaleDateString(),
//         doctorName: doctorName || "Unknown Doctor",
//         hospitalName: hospitalName || "Unknown Hospital",
//         diagnosis: diagnosis || "Not Provided",
//         status: "Unverified",
//         prescriptionURL: URL.createObjectURL(file), // For temporary preview
//       };
//       const saveRes = await axios.post(
//         "https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion",
//         newPrescription
//       );
//       // Update table immediately
//       setPrescriptions(prev => [saveRes.data, ...prev]);
//       // Reset form
//       setIsModalOpen(false);
//       setFile(null);
//       setDoctorName("");
//       setHospitalName("");
//       setDiagnosis("");
//       alert("Prescription added successfully!");
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save prescription. Please try again.");
//     }
//   };
//   return (
//     <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
//       {/* Add Button */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-150"
//         >
//           Add Prescription
//         </button>
//       </div>
//       {/* Modal */}
//       {isModalOpen && (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity">
//     <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] animate-fadeIn space-y-6">
//       {/* Title */}
//       <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
//         Upload Prescription
//       </h2>
//       <div className="space-y-6">
//         {/* File Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Upload Prescription
//           </label>
//           <input
//             type="file"
//             accept="image/*,application/pdf"
//             onChange={handleFileChange}
//             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//         {/* Doctor Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Doctor Name
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Doctor Name"
//             value={doctorName}
//             onChange={(e) => setDoctorName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//         {/* Hospital Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Hospital Name
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Hospital Name"
//             value={hospitalName}
//             onChange={(e) => setHospitalName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//         {/* Diagnosis */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Diagnosis
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Diagnosis"
//             value={diagnosis}
//             onChange={(e) => setDiagnosis(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//           />
//         </div>
//       </div>
//       {/* Buttons */}
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200 transform hover:scale-105"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleAddPrescription}
//           className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105"
//         >
//           Add Prescription
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       {/* Table */}
//       <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
//         <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
//           <tr>
//             <th className="px-6 py-3 text-left">Date</th>
//             <th className="px-6 py-3 text-left">Doctor</th>
//             <th className="px-6 py-3 text-left">Hospital</th>
//             <th className="px-6 py-3 text-left">Diagnosis</th>
//             <th className="px-6 py-3 text-left">Status</th>
//             <th className="px-6 py-3 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white text-gray-800">
//           {prescriptions.map((item, index) => (
//             <tr key={index} className="border-b border-gray-200 hover:bg-slate-50 transition duration-200">
//               <td className="px-6 py-4">{item.date}</td>
//               <td className="px-6 py-4">{item.doctorName}</td>
//               <td className="px-6 py-4">{item.hospitalName}</td>
//               <td className="px-6 py-4">{item.diagnosis}</td>
//               <td className="px-6 py-4">
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                   ${item.status === "Verified" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
//                   {item.status}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 {item.prescriptionURL ? (
//                   <a
//                     href={item.prescriptionURL}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-slate-600 text-white px-3 py-1 me-2 rounded hover:bg-slate-700 transition duration-150"
//                   >
//                     View
//                   </a>
//                 ) : (
//                   <span className="text-red-500">No File Available</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default Prescription;



import React, { useEffect, useState } from "react";
import axios from "axios";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  // Fetch existing prescriptions
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion");
      const data = res.data.map(item => ({
        ...item,
        status: item.status || "Verified",
      }));
      setPrescriptions(data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Add new prescription
  const handleAddPrescription = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }
    try {
      const newPrescription = {
        date: new Date().toLocaleDateString(),
        doctorName: doctorName || "Unknown Doctor",
        consultationType: consultationType || "General",
        diagnosis: diagnosis || "Not Provided",
        status: "Unverified",
        prescriptionURL: URL.createObjectURL(file),
      };
      const saveRes = await axios.post(
        "https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion",
        newPrescription
      );
      setPrescriptions(prev => [saveRes.data, ...prev]);
      setIsModalOpen(false);
      setFile(null);
      setDoctorName("");
      setConsultationType("");
      setDiagnosis("");
      alert("Prescription added successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save prescription. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      {/* Add Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-150"
        >
          Add Prescription
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] animate-fadeIn space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
              Upload Prescription
            </h2>
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Prescription
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* Doctor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Doctor Name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <input
                  type="text"
                  placeholder="Enter Consultation Type"
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  placeholder="Enter Diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrescription}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              >
                Add Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Doctor</th>
            <th className="px-6 py-3 text-left">Consultation Type</th>
            <th className="px-6 py-3 text-left">Diagnosis</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {prescriptions.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-slate-50 transition duration-200">
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{item.doctorName}</td>
              <td className="px-6 py-4">{item.type || "N/A"}</td>
              <td className="px-6 py-4">{item.diagnosis}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${item.status === "Verified" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {item.prescriptionURL ? (
                  <a
                    href={item.prescriptionURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-600 text-white px-3 py-1 me-2 rounded hover:bg-slate-700 transition duration-150"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-red-500">No File Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prescription;
