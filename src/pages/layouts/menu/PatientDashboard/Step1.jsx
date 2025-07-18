import React, { useState, useRef } from "react";
import Modal from "./DoctorModal";
const symptomSpecialtyMap = {
  fever: ["General Physician"],
  cough: ["General Physician"],
  chestpain: ["Cardiologist"],
  acne: ["Dermatologist"],
  skinrash: ["Dermatologist"],
};
const citiesData = [
  { id: 1, name: "Delhi" },
  { id: 2, name: "Mumbai" },
  { id: 3, name: "Bangalore" },
];
const Step1 = ({
  consultationType, setConsultationType, location, setLocation,
  symptoms, setSymptoms, specialty, setSpecialty, specialties, setSpecialties,
  date, setDate, time, setTime, doctors, selectedDoctor, setSelectedDoctor, handleNext,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const scrollRef = useRef(null);
  const handleSymptomsChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/\s/g, "");
    setSymptoms(e.target.value);
    setSpecialties(symptomSpecialtyMap[val] || []);
    setSpecialty("");
  };
  const filteredDoctors = doctors.filter((d) =>
    d.consultationType.toLowerCase() === consultationType.toLowerCase() &&
    d.specialty === specialty &&
    (consultationType !== "Physical" || d.location === location) &&
    (minPrice === "" || parseInt(d.fees) >= parseInt(minPrice)) &&
    (maxPrice === "" || parseInt(d.fees) <= parseInt(maxPrice))
  );
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  return (
    <div className="space-y-6 text-sm text-[#0E1630] min-h-[450px] rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Book <span className="text-yellow-400">Appointment</span>
      </h2>
      <div>
        <h4 className="font-semibold mb-2">Consultation Type</h4>
        <div className="flex gap-4">
          {["Physical", "Virtual"].map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer ${
                consultationType === type
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="consultationType"
                value={type}
                checked={consultationType === type}
                onChange={(e) => setConsultationType(e.target.value)}
                className="hidden"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
      {consultationType === "Physical" && (
        <div>
          <label className="font-semibold mb-2">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-[#CCD1DC] rounded-xl bg-white"
          >
            <option value="">Select location</option>
            {citiesData.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="font-semibold mb-2">Describe your symptoms</label>
        <input
          type="text"
          placeholder="e.g. Fever, Cough..."
          value={symptoms}
          onChange={handleSymptomsChange}
          className="w-full p-3 border border-[#CCD1DC] rounded-xl bg-white"
        />
      </div>
      {specialties.length > 0 && (
        <div className="space-y-2">
          {specialties.map((spec, i) => (
            <label
              key={i}
              className={`flex justify-between items-center px-4 py-2 border rounded-xl cursor-pointer ${
                specialty === spec
                  ? "border-[#0E1630] bg-[#0E1630]/10"
                  : "border-[#CCD1DC] hover:border-[#0E1630]"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="specialty"
                  value={spec}
                  checked={specialty === spec}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="accent-[#0E1630]"
                />
                <span>{spec}</span>
              </div>
            </label>
          ))}
        </div>
      )}
      {/* Price Range Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold mb-2">Minimum Fees (₹)</label>
          <input
            type="number"
            placeholder="e.g. 300"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-3 border border-[#CCD1DC] rounded-xl bg-white"
          />
        </div>
        <div>
          <label className="font-semibold mb-2">Maximum Fees (₹)</label>
          <input
            type="number"
            placeholder="e.g. 1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-3 border border-[#CCD1DC] rounded-xl bg-white"
          />
        </div>
      </div>
      {/* Doctors Section */}
      <div className="relative mt-6">
        <h4 className="text-base font-semibold mb-3">Available Doctors</h4>
        <div className="flex items-center gap-2 max-w-full overflow-hidden">
        <button 
    onClick={() => scroll(-1)} 
    className="p-2 bg-gray-200 rounded-full"
  >
    ◀️
  </button>
          <div ref={scrollRef} className="flex overflow-x-auto scroll-smooth small-scrollbar space-x-3 touch-auto">
            {filteredDoctors.length === 0 ? (
              <div className="text-gray-500">No doctors available</div>
            ) : (
              filteredDoctors.map((d, i) => (
                <div
                  key={i}
                  className="min-w-[200px] p-3 border rounded-2xl bg-white shadow-md cursor-pointer hover:border-[#0E1630]"
                  onClick={() => {
                    setSelectedDoctorForModal(d);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={d.photo}
                      alt={d.name}
                      onError={(e) => {
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/3870/3870822.png";
                      }}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0E1630]"
                    />
                    <div>
                      <h6 className="text-sm font-semibold">{d.name}</h6>
                      <p className="text-xs text-gray-500">{d.specialty}</p>
                      <p className="text-sm text-yellow-500 font-semibold">₹{d.fees}</p>
                      <p className="text-xs text-gray-600 italic">{d.doctorType}</p>
                      {d.doctorType === "Hospital Associated" && d.hospitalName && (
                        <p className="text-xs text-gray-500">:hospital: {d.hospitalName}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <button 
    onClick={() => scroll(1)} 
    className="p-2 bg-gray-200 rounded-full"
  >
    ▶️
  </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && selectedDoctorForModal && (
        <Modal
          doctor={selectedDoctorForModal}
          onClose={() => setIsModalOpen(false)}
          setSelectedDoctor={setSelectedDoctor}
          setDate={setDate}
          setTime={setTime}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};
export default Step1;