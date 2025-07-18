import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { state: bookingDetails } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [method, setMethod] = useState("upi");
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});

  const generateBookingId = () => `APT${Date.now().toString().slice(-6)}`;

  const handleDownloadReceipt = () => {
    const receiptContent = `
      Appointment Receipt

      Booking ID: ${bookingId}
      Patient Name: ${bookingDetails.name}
      Test: ${bookingDetails.testTitle}
      Lab: ${bookingDetails.labName}
      Date & Time: ${bookingDetails.date} at ${bookingDetails.time}
      Location: ${bookingDetails.location}
      Payment Method: ${method}
      Amount Paid: ₹${bookingDetails.amount}
      Status: Paid
    `;

    const blob = new Blob([receiptContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Appointment_Receipt_${bookingId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateCard = () => {
    const errs = {};
    if (!/^\d{16}$/.test(cardData.number)) errs.number = "Invalid card number";
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
      errs.expiry = "Invalid expiry format";
    if (!/^\d{3}$/.test(cardData.cvv)) errs.cvv = "Invalid CVV";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePayment = async () => {
    if (method === "card" && !validateCard()) return;

    setLoading(true);
    const id = generateBookingId();

    const paymentDetails = {
      bookingId: id,
      status: "Paid",
      createdAt: new Date().toISOString(),
      paymentMethod: method,
      amountPaid: bookingDetails.amount,
      paymentStatus: "Success",
      upiTransactionId: method === "upi" ? `UPI-${Date.now()}` : null,
      upiPaymentStatus: method === "upi" ? "Pending" : null,
      cardType: method === "card" ? "Visa" : null,
      cardLast4Digits: method === "card" ? cardData.number.slice(-4) : null,
      bankName: method === "net" ? selectedBank : null,
      netBankingTransactionId: method === "net" ? `NET-${Date.now()}` : null,
      patientName: bookingDetails.name,
      testTitle: bookingDetails.testTitle,
      labName: bookingDetails.labName,
      location: bookingDetails.location,
      date: bookingDetails.date,
      time: bookingDetails.time,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      amount: bookingDetails.amount,
    };

    try {
      await axios.post(
        "https://680b3642d5075a76d98a3658.mockapi.io/Lab/payment",
        paymentDetails
      );
      setSuccess(true);
      setBookingId(id);
    } catch (err) {
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = " w-full p-4 shadow";
  const sectionClass = "bg-white p-6 rounded shadow";
  const labelClass = "flex items-center gap-2";
  const errorText = "text-red-500 text-sm";

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked and payment received.
          </p>

          <hr className="my-4" />

          <div className="text-gray-700 space-y-2 mb-6">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-[#0e1630] mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-9 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                />
              </svg>
              <p>
                <strong>Appointment Details</strong>
              </p>
              <p>
                {new Date(bookingDetails.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                , {bookingDetails.time}
              </p>
              <p>{bookingDetails.location}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              An email confirmation has been sent to {bookingDetails.email}
            </p>
            <p className="text-sm text-gray-500">
              Booking ID: <strong>{bookingId}</strong>
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              className="bg-[#0e1630] hover:bg-[#F4C430] text-white hover:text-[#0e1630] px-4 py-2 rounded"
              onClick={() =>
                navigate(`/dashboard/track-appointment/${bookingId}`)
              }
            >
              Track Appointment
            </button>
            <button
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded"
              onClick={handleDownloadReceipt}
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left - Payment Options */}
      <div className={`lg:col-span-2 ${sectionClass}`}>
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        <div className="space-y-3">
          {[
            { value: "upi", label: "UPI / Google Pay / PhonePe" },
            { value: "card", label: "Credit / Debit Card" },
            { value: "net", label: "Net Banking" },
          ].map((opt) => (
            <label className={labelClass} key={opt.value}>
              <input
                type="radio"
                name="payment"
                checked={method === opt.value}
                onChange={() => setMethod(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="mt-6">
          {method === "upi" && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=HealthLab&am=${bookingDetails.amount}`}
                  alt="UPI QR Code"
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Scan & pay using any UPI app
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or enter your UPI ID
                </label>
                <input
                  type="text"
                  placeholder="e.g., user@upi"
                  className="input p-4 shadow  w-full"
                  value={cardData.upi || ""}
                  onChange={(e) =>
                    setCardData({ ...cardData, upi: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {method === "card" && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                className={inputClass}
                value={cardData.number}
                onChange={(e) =>
                  setCardData({ ...cardData, number: e.target.value })
                }
              />
              {errors.number && <p className={errorText}>{errors.number}</p>}

              <div className="flex  gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input p-4 shadow input-bordered w-1/2"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({ ...cardData, expiry: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="input p-4 shadow input-bordered w-1/2"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({ ...cardData, cvv: e.target.value })
                  }
                />
              </div>
              {errors.expiry && <p className={errorText}>{errors.expiry}</p>}
              {errors.cvv && <p className={errorText}>{errors.cvv}</p>}
            </div>
          )}

          {method === "net" && (
            <div className="space-y-2 mt-3">
              <p className="text-sm text-gray-600 mb-2">Select your bank:</p>
              {["Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map(
                (bank) => (
                  <label key={bank} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="netbank"
                      checked={bookingDetails.bankName === bank}
                      onChange={() => setSelectedBank(bank)}
                    />
                    {bank}
                  </label>
                )
              )}
            </div>
          )}
        </div>

        <button
          className="mt-6 bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630]  px-6 py-2 rounded"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${bookingDetails.amount}`}
        </button>
      </div>

      {/* Right - Order Summary */}
      <div className="bg-gray-50 p-6 rounded shadow space-y-3 text-sm">
        <h3 className="text-lg font-semibold mb-3">Appointment Summary</h3>
        <p>
          <strong>Patient:</strong> {bookingDetails.name}
        </p>
        <p>
          <strong>Test:</strong> {bookingDetails.testTitle}
        </p>
        <p>
          <strong>Lab:</strong> {bookingDetails.labName}
        </p>
        <p>
          <strong>Visit Type:</strong>{" "}
          {bookingDetails.location === bookingDetails.labLocation
            ? "Visit Lab"
            : "Home Sample Collection"}
        </p>
        <p>
          <strong>Address:</strong> {bookingDetails.location}
        </p>
        <p>
          <strong>Date & Time:</strong> {bookingDetails.date} at{" "}
          {bookingDetails.time}
        </p>
        <hr className="my-2" />
        <p>
          <strong>Test Amount:</strong> ₹{bookingDetails.amount}
        </p>
        <p>
          <strong>Collection Fee:</strong> ₹0
        </p>
        <p className="font-bold text-base mt-2">
          Total: <span className="text-[#0e1630] ">₹{bookingDetails.amount}</span>
        </p>
        <div className="bg-blue-50 text-#0e1630]  p-2 rounded mt-2 text-xs">
          You'll receive a confirmation email and your report within 24-48 hours
          after sample collection.
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
