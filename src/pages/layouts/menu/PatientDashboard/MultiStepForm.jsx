import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const symptomSpecialtyMap = {
  fever: ["General Physician", "Pediatrics", "Pathology", "Psychiatry", "Oncology"],
  cough: ["General Physician", "Pulmonology", "ENT (Otolaryngology)", "Oncology", "Pathology"],
  chestpain: ["Cardiology", "Pulmonology", "Gastroenterology", "General Medicine", "Orthopedics"],
  acne: ["Dermatology", "Endocrinology", "Psychiatry", "Pathology"],
  skinrash: ["Dermatology", "Pediatrics", "Pathology", "Oncology"],
  headache: ["Neurology", "General Medicine", "Psychiatry", "ENT (Otolaryngology)"],
  stomachache: ["Gastroenterology", "General Medicine", "Pediatrics", "Endocrinology"],
  toothache: ["Dentistry", "Pediatrics", "General Medicine"],
  pregnancy: ["Gynecology", "Pediatrics", "Nephrology"],
  anxiety: ["Psychiatry", "Endocrinology", "General Medicine"],
  bloodinurine: ["Nephrology", "Hematology", "Urology"],
  fatigue: ["General Medicine", "Endocrinology", "Oncology", "Psychiatry"],
  jointpain: ["Orthopedics", "General Medicine", "Endocrinology"]
};


const MultiStepForm = () => {
  const [consultationType, setConsultationType] = useState("Physical");
  const [symptoms, setSymptoms] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const [doctorType, setDoctorType] = useState("All");
  const [hospitalName, setHospitalName] = useState("");
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [location, setLocation] = useState('');
  const scrollRef = useRef();

  const getTimesForDate = (date) => {
    return selectedDoctor?.availability
      .find((slot) => slot.date === date)
      ?.times || [];
  };

  useEffect(() => {
    axios.get("https://mocki.io/v1/7d33d5bc-8485-4059-b475-c6b62d5c3191")
      .then(res => setDoctors(res.data))
      .catch(console.error);
  }, []);

  const handleSymptomsChange = e => {
    const val = e.target.value.toLowerCase().replace(/\s/g, "");
    setSymptoms(e.target.value);
    setSpecialties(symptomSpecialtyMap[val] || []);
    setSpecialty("");
  };

const fetchCities = async () => {
  setLoadingCities(true);
  try {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ country: 'India' })
    });
    const data = await res.json();
    setCities(data.data.filter(c => ['Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad','Chennai','Kolkata','Pune','Jaipur','Surat','Lucknow','Kanpur','Nagpur','Indore','Bhopal'].includes(c)).sort());
  } catch (err) {
    console.error('Failed to fetch cities:', err);
  } finally {
    setLoadingCities(false);
  }
};

const detectCurrentLocation = () => {
  if (!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      setLocation(data.address.city || data.address.town || data.address.village || "");
      setFullAddress(data.display_name || "");
    } catch (error) {
      console.error("Nominatim API error:", error);
      alert("Failed to fetch location from Nominatim API");
    }
  }, (error) => {
    console.error("Geolocation error", error);
    alert("Error getting current position");
  });
};

const handleLocationChange = e => {
  e.target.value === 'current-location' ? detectCurrentLocation() : (setLocation(e.target.value), setFullAddress(''));
};


  useEffect(() => {
    fetchCities();
  }, []);

  const filteredDoctors = doctors.filter(d => 
    d.consultationType.toLowerCase() === consultationType.toLowerCase() &&
    d.specialty === specialty &&
    (consultationType !== "Physical" || d.location === location) &&
    (minPrice === "" || parseInt(d.fees) >= parseInt(minPrice)) &&
    (maxPrice === "" || parseInt(d.fees) <= parseInt(maxPrice)) &&
    (hospitalName === "" || d.hospital.toLowerCase().includes(hospitalName.toLowerCase())) &&
    (doctorType === "All" || d.doctorType === doctorType)
  );

  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    const payload = {
      userId,
      name: `${user?.firstName || "Guest"} ${user?.lastName || ""}`,
      phone: userDetails?.phone || "N/A",
      symptoms,
      date: selectedDate,
      time: selectedTime,
      specialty,
      consultationType,
      doctorId: selectedDoctor?.id || "N/A",
      doctorName: selectedDoctor?.name || "N/A",
      status: "Upcoming",
      notification: {
        doctorId: selectedDoctor?.id || "N/A",
        message: `You have a new appointment with ${user?.firstName || "a patient"} on ${selectedDate} at ${selectedTime}. The patient is experiencing: ${symptoms || "No symptoms provided"}.`
      }
    };

    setIsLoading(true);
    setShowBookingModal(false);
    setShowConfirmationModal(true);
    try {
      const bookingResponse = await axios.post(
        "https://67e3e1e42ae442db76d2035d.mockapi.io/register/book",
        payload
      );
      console.log("✅ Booking response:", bookingResponse.data);

      await sendNotificationToDoctor(payload.notification);
      

      setTimeout(() => {
        setShowConfirmationModal(false);
        setLocation("");
        setSymptoms("");
        setSelectedDate("");
        setSelectedTime("");
        setSpecialty("");
        setSpecialties([]);
        setSelectedDoctor(null);
        setConsultationType("Physical");
        navigate("/dashboard/book-appointment");
      }, 100);
    } catch (error) {
      console.error("❌ Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendNotificationToDoctor = async (notification) => {
    try {
      await axios.post("https://67e631656530dbd3110f0322.mockapi.io/drnotifiy", notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          Book an <span className="text-yellow-300">Appointment</span>
        </h2>
        {/* {fullAddress && (
       <div className="mt-2 p-2 w-full border border-[#ccd1dc] rounded-xl bg-gray-100">
          <strong>Full Address:</strong> {fullAddress}
          </div>
      )} */}
        <div className="space-y-8">
          <section>
            <h4 className="text-lg font-semibold mb-4 text-slate-700">Choose Consultation Type</h4>
            <div className="flex gap-4">
              {["Physical", "Virtual"].map((type) => (
                <button
                  key={type}
                  onClick={() => setConsultationType(type)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    consultationType === type
                      ? "bg-slate-600 text-white shadow-lg shadow-slate-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

        
  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Select Location
      </label>
      <select
        value={location}
        onChange={handleLocationChange}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all duration-200"
      >
        <option value="">Select Location</option>
        <option value="current-location">Use My Location</option>
        {loadingCities ? (
          <option disabled>Loading cities...</option>
        ) : (
          cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))
        )}
      </select>

      {/* Show selected location as text below the dropdown */}
      {location && location !== "current-location" && (
        <p className="mt-2 text-sm text-green-700 font-medium">
          Selected Location: {location}
        </p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Search Dr by Hospital Name
      </label>
      <input
        type="text"
        placeholder="Enter hospital name"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all duration-200"
      />
    </div>
  </section>
  <section>  <label className="block text-sm font-medium text-slate-700 mb-2">  Describe your symptoms</label>  <input type="text" placeholder="e.g. Fever, Cough..." value={symptoms}  onChange={handleSymptomsChange}   className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all duration-200"  />  </section>
 {specialties.length > 0 && (
            <section>
              <h4 className="text-lg font-semibold mb-4 text-slate-700">Suggested Specialties</h4>
              <div className="flex flex-wrap gap-3">  {specialties.map((spec) => (  <button key={spec}  onClick={() => setSpecialty(spec)}  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${  specialty === spec  ? "bg-slate-600 text-white shadow-lg shadow-slate-200"  : "bg-slate-100 text-slate-600 hover:bg-slate-200"  }`}  >  {spec}  </button> ))}  </div></section>
          )}

          <section>
            <h4 className="text-lg font-semibold mb-4 text-slate-700">Doctor Type</h4>
            <div className="flex flex-wrap gap-3">
              {["All", "Hospital Associated", "AV Swasthya", "Freelancer"].map((type) => (
                <button
                  key={type}
                  onClick={() => setDoctorType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    doctorType === type
                      ? "bg-slate-600 text-white shadow-lg shadow-slate-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Fees (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 300"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Maximum Fees (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all duration-200"
              />
            </div>
          </section>

          {/* <section className="relative">
            <h4 className="text-lg font-semibold mb-4 text-slate-700">Available Doctors</h4>
            {filteredDoctors.length > 0 ? (
              <div className="relative">
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
                >
                  {filteredDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setShowBookingModal(true);
                      }}
                      className="min-w-[280px] p-6 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
                    >
                      <h5 className="text-xl font-semibold text-slate-800 mb-2">{doc.name}</h5>
                      <p className="text-slate-600 mb-1">{doc.specialty}</p>
                      <p className="text-slate-600 font-medium mb-2">₹{doc.fees}</p>
                      <div className="space-y-1 text-sm text-slate-500">
                        <p> {doc.location || 'N/A'}</p>
                        <p> {doc.doctorType}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scroll(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-slate-50 transition-all"
                >
                  <FaChevronLeft className="text-slate-600" size={20} />
                </button>

                <button
                  onClick={() => scroll(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-slate-50 transition-all"
                >
                  <FaChevronRight className="text-slate-600" size={20} />
                </button>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No doctors match the selected filters.</p>
            )}
          </section> */}
          <section className="relative">
  <h4 className="text-lg font-semibold mb-4 text-slate-700">Available Doctors</h4>

  {filteredDoctors.length > 0 ? (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
      >
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            onClick={() => {
              setSelectedDoctor(doc);
              setShowBookingModal(true);
            }}
            className="min-w-[280px] p-4 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white flex gap-4 items-start"
          >
            {/* Doctor Avatar */}
            <img
              src={doc.image || "/default-doctor.png"} // Place your default image in /public folder
              alt={doc.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-300"
            />

            {/* Doctor Details */}
            <div>
              <h5 className="text-lg font-semibold text-slate-800 mb-1">{doc.name}</h5>
              <p className="text-slate-600 text-sm mb-1">{doc.specialty}</p>
              <p className="text-slate-600 font-medium text-sm mb-2">₹{doc.fees}</p>
              <div className="space-y-1 text-sm text-slate-500">
                <p>{doc.location || 'N/A'}</p>
                <p>{doc.doctorType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-slate-50 transition-all"
      >
        <FaChevronLeft className="text-slate-600" size={20} />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-slate-50 transition-all"
      >
        <FaChevronRight className="text-slate-600" size={20} />
      </button>
    </div>
  ) : (
    <p className="text-slate-500 text-center py-8">
      No doctors match the selected filters.
    </p>
  )}
</section>

        </div>
      </div>

      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{selectedDoctor.name}</h2>
              <p className="text-slate-600">{selectedDoctor.specialty} • {selectedDoctor.qualification}</p>
              <p className="text-slate-500">{selectedDoctor.experience} years experience</p>
              <p className="text-slate-600 font-medium mt-2">₹{selectedDoctor.fees}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Date
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime('');
                  }}
                >
                  <option value="">Choose a Date</option>
                  {selectedDoctor.availability?.map((slot) => (
                    <option key={slot.date} value={slot.date}>
                      {slot.date}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDate && (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Available Time Slots
    </label>
    <div className="grid grid-cols-3 gap-2">
      {getTimesForDate(selectedDate).map((time) => {
        const isBooked = selectedDoctor.bookedSlots?.some(
          (slot) => slot.date === selectedDate && slot.time === time
        );
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            disabled={isBooked}
            onClick={() => setSelectedTime(time)}
            className={`py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 
              ${isBooked
                ? "bg-red-100 text-red-500 border border-red-300 cursor-not-allowed"
                : isSelected
                ? "bg-green-600 text-white border border-green-700 shadow"
                : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"}`}
          >
            {time}
          </button>
        );
      })}
    </div>
  </div>
)}


              <button
                onClick={handlePayment}
                disabled={!selectedDate || !selectedTime || isLoading}
                className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                  !selectedDate || !selectedTime || isLoading
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-slate-600 hover:bg-slate-700 shadow-lg shadow-slate-200"
                }`}
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-600">Your appointment has been successfully scheduled.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;

