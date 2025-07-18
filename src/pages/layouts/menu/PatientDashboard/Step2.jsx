
// import React from "react";

// const Step2 = ({
//   selectedDoctor,
//   selectedDate,
//   selectedTime,
//   handleBack,
//   handlePayment, // now expecting this prop
// }) => {
//   return (
//     <div className="space-y-6">
//       {/* Section Title */}
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm & Pay</h2>

//       {/* Doctor Summary Card */}
//       <div>
//         <h3 className="text-base font-semibold text-[#0e1630] mb-2">
//           Please review your selected doctor and appointment slot.
//         </h3>

//         {selectedDoctor ? (
//           <div className="bg-white p-5 rounded-lg shadow-md border border-[#0e1630] text-sm flex gap-5 items-start">
//             <div className="flex-shrink-0">
//               <img
//                 src={selectedDoctor.photoUrl || "https://via.placeholder.com/100"}
//                 alt={selectedDoctor.name}
//                 className="w-20 h-20 rounded-full object-cover border border-yellow-500"
//               />
//             </div>
//             <div className="space-y-1">
//               <h4 className="text-lg font-bold text-[#0e1630]">{selectedDoctor.name}</h4>
//               <p className="text-xs text-gray-600">{selectedDoctor.qualification}</p>
//               <p className="text-xs text-gray-600">
//                 <span className="font-medium text-[#0e1630]">Experience:</span> {selectedDoctor.experience} years
//               </p>
//               <p className="text-xs text-gray-600">
//                 <span className="font-medium text-[#0e1630]">Specialty:</span> {selectedDoctor.specialty}
//               </p>
//               <p className="text-xs text-gray-600">
//                 <span className="font-medium text-[#0e1630]">Location:</span> {selectedDoctor.location}
//               </p>
//               <p className="text-xs text-gray-600">
//                 <span className="font-medium text-[#0e1630]">Consultation Type:</span> {selectedDoctor.consultationType}
//               </p>
//               <p className="text-sm font-semibold text-yellow-600 mt-2">
//                 Consultation Fee: ₹{selectedDoctor.fees}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-red-500 text-sm">No doctor selected</p>
//         )}
//       </div>

//       {/* Appointment Date & Time */}
//       <p className="text-md font-semibold text-gray-800 mb-4">Review Your Appointment Details</p>
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 text-sm">
//         <h3 className="font-medium text-[#0e1630] mb-2">Appointment Slot</h3>
//         <p className="text-gray-600">
//           <span className="font-medium text-gray-800">Date:</span> {selectedDate || "Not selected"}
//         </p>
//         <p className="text-gray-600">
//           <span className="font-medium text-gray-800">Time:</span> {selectedTime || "Not selected"}
//         </p>
//         <p className="text-gray-600">
//           <span className="font-medium text-gray-800">Consultation Type:</span> {selectedDoctor?.consultationType || "Not selected"}
//         </p>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md me-4"
//         >
//           Back
//         </button>
//         <button
//           onClick={handlePayment}
//           className="px-4 py-2 bg-[#0e1630] hover:bg-[#0b1b2b] text-white rounded-md transition-colors duration-300 ease-in-out"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2;


import React from "react";

const Step2 = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  handleBack,
  handlePayment, // now expecting this prop
}) => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm & Pay</h2>

      {/* Doctor Summary Card */}
      <div>
        <h3 className="text-base font-semibold text-[#0e1630] mb-2">
          Please review your selected doctor and appointment slot.
        </h3>

        {selectedDoctor ? (
          <div className="bg-white p-5 rounded-lg shadow-md border border-[#0e1630] text-sm flex gap-5 items-start">
            <div className="flex-shrink-0">
              <img
                src={selectedDoctor.photoUrl || "https://via.placeholder.com/100"}
                alt={selectedDoctor.name}
                className="w-20 h-20 rounded-full object-cover border border-yellow-500"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0e1630]">{selectedDoctor.name}</h4>
              <p className="text-xs text-gray-600">{selectedDoctor.qualification}</p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-[#0e1630]">Experience:</span> {selectedDoctor.experience} years
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-[#0e1630]">Specialty:</span> {selectedDoctor.specialty}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-[#0e1630]">Location:</span> {selectedDoctor.location}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-[#0e1630]">Consultation Type:</span> {selectedDoctor.consultationType}
              </p>
              <p className="text-sm font-semibold text-yellow-600 mt-2">
                Consultation Fee: ₹{selectedDoctor.fees}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-sm">No doctor selected</p>
        )}
      </div>

      {/* Appointment Date & Time */}
      <p className="text-md font-semibold text-gray-800 mb-4">Review Your Appointment Details</p>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 text-sm">
        <h3 className="font-medium text-[#0e1630] mb-2">Appointment Slot</h3>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Date:</span> {selectedDate || "Not selected"}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Time:</span> {selectedTime || "Not selected"}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Consultation Type:</span> {selectedDoctor?.consultationType || "Not selected"}
        </p>

        {/* Refund Note */}
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded-md text-xs">
          <strong>Note:</strong> Once an appointment is booked, it is non-refundable.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md me-4"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="px-4 py-2 bg-[#0e1630] hover:bg-[#0b1b2b] text-white rounded-md transition-colors duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step2;
