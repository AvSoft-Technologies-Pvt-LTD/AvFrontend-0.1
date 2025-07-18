import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaDownload, FaPrint, FaShareAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TrackAppointment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    fetchAppointment();
    const interval = setInterval(fetchAppointment, 10000); 
    return () => clearInterval(interval);
  }, [bookingId]);

  const fetchAppointment = async () => {
    try {
      const res = await axios.get("https://680b3642d5075a76d98a3658.mockapi.io/Lab/payment");
      const found = res.data.find(item => item.bookingId === bookingId);
      if (!found) {
        throw new Error("Appointment not found");
      }
      setAppointment(found);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      alert("Failed to fetch appointment details. Please try again later.");
    }
  };

  const handleDownloadReport = async () => {
    const input = printRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${appointment?.testTitle || "Lab_Report"}.pdf`);
  };

  const handlePrintReceipt = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;padding:20px} h1{margin-bottom:20px}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareDetails = () => {
    if (navigator.share) {
      navigator.share({
        title: "Track Your Appointment",
        text: `Appointment for ${appointment?.patientName} at ${appointment?.labName}`,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const steps = [
    "Appointment Confirmed",
    "Technician On the Way",
    "Sample Collected",
    "Test Processing",
    "Report Ready",
  ];

  const getCurrentStep = (status) => {
    switch (status) {
      case "Appointment Confirmed":
        return 0;
      case "Technician On the Way":
        return 1;
      case "Sample Collected":
        return 2;
      case "Test Processing":
        return 3;
      case "Report Ready":
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = appointment ? getCurrentStep(appointment?.status) : 0;

  if (!appointment)
    return <div className="text-center mt-20 text-gray-600">Loading appointment details...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <button className="text-[#0e2630] mb-6" onClick={() => navigate("/dashboard/lab-tests")}>
        ← Back to Home
      </button>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Appointment Summary</h1>

      <div className="grid lg:grid-cols-3 gap-8" ref={printRef}>
        {/* Left Section: Timeline + Appointment Details */}
        <div className="col-span-2 space-y-8">
          {/* Timeline */}
          {/* Left Section */}
<div className="space-y-12"> {/* ⬅️ Increase the space between steps */}
  {steps.map((step, idx) => (
    <div key={idx} className="flex items-start gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out border-4 ${
          idx < currentStep
            ? "border-[#0e1630] bg-[#0e1630] text-white"
            : idx === currentStep
            ? "border-[#F4C430] bg-[#F4C430] text-[#0e1630] animate-pulse"
            : "border-gray-300 bg-white text-gray-400"
        }`}>
          {idx <= currentStep ? (
            <span className="w-2.5 h-2.5 bg-white rounded-full" />
          ) : (
            <span className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
          )}
        </div>
        {idx < steps.length - 1 && (
          <div className={`w-1 flex-1 ${
            idx < currentStep ? "bg-[#0e1630]" : "bg-gray-300"
          } transition-all duration-700 ease-in-out`} />
        )}
      </div>
      <div className="pt-1">
        <p className={`font-semibold ${
          idx === currentStep ? "text-[#0e1630]" : "text-gray-700"
        } transition-all duration-700`}>
          {step}
        </p>
        {idx === currentStep && (
          <p className="text-sm text-gray-500">{new Date(appointment?.date).toDateString()}</p>
        )}
      </div>
    </div>
  ))}
</div>


          {/* Appointment Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Appointment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Test Information</h3>
                <p><strong>Test Name:</strong> {appointment?.testTitle}</p>
                <p><strong>Test Code:</strong> {appointment?.testCode || "N/A"}</p>
                <p><strong>Category:</strong> {appointment?.category || "N/A"}</p>
                <p><strong>Report Time:</strong> {appointment?.reportTime || "24-48 hours"}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Appointment Information</h3>
                <p><strong>Date:</strong> {new Date(appointment?.date).toDateString()}</p>
                <p><strong>Time:</strong> {appointment?.time}</p>
                <p><strong>Type:</strong> {appointment?.appointmentType || "Lab Visit"}</p>
                <p><strong>Payment:</strong> {appointment?.paymentStatus}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Patient Information</h3>
              <p><strong>Name:</strong> {appointment?.patientName}</p>
              <p><strong>Phone:</strong> {appointment?.phone}</p>
            </div>
          </div>
        </div>

        {/* Right Section: Lab Info + Actions */}
        <div className="space-y-8">
          {/* Lab Information */}
          <div className="bg-white p-6 rounded-lg shadow text-sm">
            <h3 className="text-lg font-semibold mb-4">Lab Information</h3>
            <p className="font-semibold">{appointment?.labName}</p>
            <p className="flex items-center gap-1 text-gray-600 mt-2">
              <FaMapMarkerAlt /> {appointment?.location}
            </p>
            <p className="flex items-center gap-1 text-gray-600 mt-1">
              <FaPhoneAlt /> {appointment?.labPhone || "+91 98765 43210"}
            </p>
            <div className="border-t my-4"></div>
            <p><strong>Amount Paid:</strong> ₹{appointment?.amountPaid}</p>
            <p><strong>Payment Status:</strong> {appointment?.paymentStatus}</p>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <button 
              onClick={handleDownloadReport} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <FaDownload /> Download Report
            </button>
            <button 
              onClick={handlePrintReceipt} 
              className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2"
            >
              <FaPrint /> Print Receipt
            </button>
            <button 
              onClick={handleShareDetails} 
              className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2"
            >
              <FaShareAlt /> Share Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackAppointment;
