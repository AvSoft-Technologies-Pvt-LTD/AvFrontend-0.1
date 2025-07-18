import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeartbeat, FaThermometerHalf, FaTint, FaStethoscope, FaPlusCircle } from "react-icons/fa";

const DashboardOverview = () => {
  const [appointments, setAppointments] = useState([]);
  const [healthSummary, setHealthSummary] = useState({});
  const [newVitals, setNewVitals] = useState({ heartRate: "", temperature: "", bloodSugar: "", bloodPressure: "" });
  const [summaryId, setSummaryId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments!", error);
      }
    };

    const fetchHealthSummary = async () => {
      try {
        const response = await axios.get("https://6808fb0f942707d722e09f1d.mockapi.io/health-summary");
        const data = response.data;
        if (data.length) {
          const first = data[0];
          setHealthSummary(first);
          setSummaryId(first.id);
          setIsNew(false);
          setNewVitals({ heartRate: first.heartRate || "", temperature: first.temperature || "", bloodSugar: first.bloodSugar || "", bloodPressure: first.bloodPressure || "" });
        } else {
          setHealthSummary({});
          setNewVitals({ heartRate: "", temperature: "", bloodSugar: "", bloodPressure: "" });
        }
      } catch (error) {
        console.error("Health summary fetch error", error);
      }
    };

    fetchAppointments();
    fetchHealthSummary();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insuranceRes, paymentRes] = await Promise.all([fetch("/api/insurance"), fetch("/api/payments")]);
        setInsuranceDetails(await insuranceRes.json());
        setRecentPayments(await paymentRes.json());
      } catch (error) {
        console.error("Error fetching insurance or payment data", error);
      }
    };

    fetchData();
  }, []);

  const saveHealthSummary = async () => {
    const vitalsToSave = { ...newVitals, lastUpdated: new Date().toLocaleString() };
    try {
      const response = isNew 
        ? await axios.post("https://6808fb0f942707d722e09f1d.mockapi.io/health-summary", vitalsToSave)
        : await axios.put(`https://6808fb0f942707d722e09f1d.mockapi.io/health-summary/${summaryId}`, vitalsToSave);
      setHealthSummary(response.data);
      setSummaryId(response.data.id);
      setIsNew(false);
      setShowModal(false);
      setNewVitals({ heartRate: "", temperature: "", bloodSugar: "", bloodPressure: "" });
    } catch (error) {
      console.error("Health summary save error", error);
    }
  };

  const summaryCards = [
    { label: "Heart Rate", value: healthSummary.heartRate, unit: "bpm", icon: <FaHeartbeat className="text-3xl" />, color: "bg-red-100" },
    { label: "Temperature", value: healthSummary.temperature, unit: "°C", icon: <FaThermometerHalf className="text-3xl" />, color: "bg-blue-100" },
    { label: "Blood Sugar", value: healthSummary.bloodSugar, unit: "mg/dL", icon: <FaTint className="text-3xl" />, color: "bg-green-100" },
    { label: "Blood Pressure", value: healthSummary.bloodPressure, unit: "mmHg", icon: <FaStethoscope className="text-3xl" />, color: "bg-yellow-100" },
  ];

  return (
    <div className="p-6 mt-5 bg-[#0e1630] text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-[#0e 1630]">
          <h1 className="text-2xl font-bold p-4">Recent Appointments</h1>
          <table className="min-w-full divide-y divide-[#f4c430] text-sm">
            <thead className="bg-[#f4c430] text-[#0e1630] text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Specialty</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4c430] text-white">
              {appointments.length > 0 ? (
                appointments.slice(0, 4).map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-[#f4c430]/20 transition duration-200">
                    <td className="px-6 py-4">{appointment.date || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.time || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.doctorName || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.specialty || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${appointment.status === "Confirmed" ? "bg-yellow-100 text-[#0e1630]" : appointment.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                        {appointment.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center px-6 py-10 text-[#f4c430] text-base">💤 No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/2 bg-white text-[#0e1630] p-5 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Health Summary</h2>
            <button className="flex items-center gap-2 text-sm bg-[#F4C430] text-[#0e1630] px-3 py-1 rounded-full shadow hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
              <FaPlusCircle /> {isNew ? "Add Vital" : "Update Vital"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {summaryCards.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl shadow-md flex flex-col items-center justify-center ${item.color} hover:shadow-lg transition`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-md font-semibold">{item.label}</h3>
                <p className="text-xl font-bold">{item.value || "N/A"} <span className="text-sm font-medium text-gray-600">{item.unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-[#0e1630] text-white rounded-2xl shadow-lg p-6 bg-white/60">
          <h2 className="text-lg font-semibold mb-4 border-b border-[#f4c430] pb-2">Insurance Details</h2>
          {insuranceDetails ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Policy No:</span> {insuranceDetails.policyNumber || 'N/A'}</p>
              <p><span className="font-semibold">Provider:</span> {insuranceDetails.provider || 'N/A'}</p>
              <p><span className="font-semibold">Coverage:</span> {insuranceDetails.coverage || 'N/A'}</p>
              <p><span className="font-semibold">Validity:</span> {insuranceDetails.validTill || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-black">Loading insurance data...</p>
          )}
        </div>
        <div className="bg-[#0e1630] text-white rounded-2xl shadow-lg p-6 bg-white/60">
          <h2 className="text-lg font-semibold mb-4 border-b border-[#f4c430] pb-2">Recent Payments</h2>
          {recentPayments && recentPayments.length > 0 ? (
            <ul className="text-sm space-y-2">
              {recentPayments.slice(0, 5).map((payment, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{payment.date || 'N/A'}</span>
                  <span className="text-[#f4c430] font-semibold">₹{payment.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">Loading Payments...</p>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-20 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white text-[#0e1630] p-6 rounded-xl shadow-2xl w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-center">Add Vital Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Heart Rate (bpm)" value={newVitals.heartRate} onChange={(e) => setNewVitals({ ...newVitals, heartRate: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]" />
              <input type="text" placeholder="Temperature (°C)" value={newVitals.temperature} onChange={(e) => setNewVitals({ ...newVitals, temperature: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]" />
              <input type="text" placeholder="Blood Sugar (mg/dL)" value={newVitals.bloodSugar} onChange={(e) => setNewVitals({ ...newVitals, bloodSugar: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]" />
              <input type="text" placeholder="Blood Pressure (mmHg)" value={newVitals.bloodPressure} onChange={(e) => setNewVitals({ ...newVitals, bloodPressure: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]" />
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={saveHealthSummary} className="bg-green-500 text-white px-4 py-2 rounded">{isNew ? "Save" : "Update"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;