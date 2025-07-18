import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("doctor");
  const [labAppointments, setLabAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => { fetchLab(); fetchDoctor(); }, []);
  useEffect(() => { const t = setTimeout(() => setShowSuggestion(true), 3000); return () => clearTimeout(t); }, []);

  const fetchLab = async () => {
    try {
      const res = await axios.get("https://680b3642d5075a76d98a3658.mockapi.io/Lab/payment");
      setLabAppointments(res.data.reverse());
    }
    catch (err) { console.error(err); }
  };

  const fetchDoctor = async () => {
    try {
      const patientEmail = localStorage.getItem("email");
      const patientUserId = localStorage.getItem("userId");
  
      if (!patientEmail || !patientUserId) {
        console.error("No user email or userId found in localStorage.");
        return;
      }
      const normalizedPatientEmail = patientEmail.trim().toLowerCase();
      const normalizedPatientUserId = patientUserId.trim();
      console.log("Patient Email from LocalStorage:", normalizedPatientEmail);
      console.log("Patient UserId from LocalStorage:", normalizedPatientUserId);
      const res = await axios.get("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book");
      console.log("All Appointments Fetched:", res.data);
  
      // Filter appointments to match either email or userId
      const filteredAppointments = res.data.filter((appointment) => {
        const appointmentEmail = appointment.email ? appointment.email.trim().toLowerCase() : null;
        const appointmentUserId = appointment.userId ? appointment.userId.trim() : null;
  
        console.log(`Comparing appointment email: '${appointmentEmail}' with patient email: '${normalizedPatientEmail}'`);
        console.log(`Comparing appointment userId: '${appointmentUserId}' with patient userId: '${normalizedPatientUserId}'`);
  
        // Return true if the appointment's email or userId matches the current user
        return appointmentEmail === normalizedPatientEmail || appointmentUserId === normalizedPatientUserId;
      });
      console.log("Filtered Appointments:", filteredAppointments);
      setDoctorAppointments(filteredAppointments.reverse());
      setAppointments(filteredAppointments.reverse());
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
    }
  };
  const getStatusClass = (s) => ({
    "Appointment Confirmed": "bg-blue-100 text-blue-800",
    "Technician On the Way": "bg-yellow-100 text-yellow-800",
    "Sample Collected": "bg-purple-100 text-purple-800",
    "Test Processing": "bg-orange-100 text-orange-800",
    "Report Ready": "bg-green-100 text-green-800",
    "Cancelled": "bg-red-100 text-red-600",
  }[s] || "bg-gray-100 text-gray-800");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          {["doctor", "lab"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full ${activeTab === tab ? "bg-[#0e1630] text-white" : "bg-gray-200 text-gray-700"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointments
            </button>
          ))}
        </div>
        <button onClick={() => navigate(activeTab === "lab" ? "/dashboard/lab-tests" : "/dashboard/book-appointment")} className="bg-[#F4C430] hover:bg-[#0e1630] hover:text-white text-[#0e1630] px-6 py-2 rounded-full font-semibold">
          Book Appointment
        </button>
      </div>

      {activeTab === "doctor" && (
        <div className="bg-white rounded shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Doctor Appointments</h2>
          <table className="min-w-full text-left">
            <thead><tr className="bg-gray-100">{["Doctor", "Speciality", "Date", "Time", "Status"].map(h => <th key={h} className="py-2 px-4 border-b">{h}</th>)}</tr></thead>
            <tbody>
              {doctorAppointments.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{a.doctorName}</td>
                  <td className="py-2 px-4 border-b">{a.specialty}</td>
                  <td className="py-2 px-4 border-b">{a.date}</td>
                  <td className="py-2 px-4 border-b">{a.time}</td>
                  <td className="py-2 px-4 border-b">
                    {a.status === "Confirmed" ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">Confirmed</span>
                    ) : a.status?.toLowerCase() === "rejected" ? (
                        <div className="flex items-center space-x-4 text-sm mt-1">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">Rejected</span>
                          <div className="text-gray-600"><strong>Reason:</strong> {a.rejectReason}    </div>
                        </div>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
                        Waiting for {a.doctorName}'s Confirmation
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "lab" && (
        <div className="bg-white rounded shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Lab Appointments</h2>
          <table className="min-w-full text-left">
            <thead><tr className="bg-gray-100">{["ID", "Test", "Lab", "Date", "Time", "Status", "Action"].map(h => <th key={h} className="py-2 px-4 border-b">{h}</th>)}</tr></thead>
            <tbody>
              {labAppointments.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{a.bookingId}</td>
                  <td className="py-2 px-4 border-b">{a.testTitle}</td>
                  <td className="py-2 px-4 border-b">{a.labName}</td>
                  <td className="py-2 px-4 border-b">{a.date}</td>
                  <td className="py-2 px-4 border-b">{a.time}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClass(a.status)}`}>
                      {a.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => navigate(`/dashboard/track-appointment/${a.bookingId}`)} className="text-[#0e1630] hover:text-[#F4C430] font-semibold">Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showSuggestion && (
        <div className="fixed top-1/4 right-1/12 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-200 rounded-lg p-4 max-w-sm z-50">
          <h3 className="text-lg font-semibold mb-2 text-[#0e1630]">Still waiting?</h3>
          <p className="text-sm text-gray-700">The doctor hasn't confirmed yet. Would you like to connect with a verified Avaswasthya doctor?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button className="bg-gray-200 px-4 py-1 rounded-full text-gray-700" onClick={() => { setShowSuggestion(false); sessionStorage.setItem('suggestionPopupShown', 'true'); }}>No, wait</button>
            <button className="bg-[#F4C430] hover:bg-[#0e1630] hover:text-white px-4 py-1 rounded-full text-[#0e1630] font-semibold" onClick={() => navigate('/dashboard/book-appointment')}>Connect Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
