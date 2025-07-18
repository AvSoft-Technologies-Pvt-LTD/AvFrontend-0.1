import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BookApp = () => {
  const { state } = useLocation();
  const { test, lab } = state || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "Visit Lab",
    address: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reusable classes for styling
  const inputClasses = "w-full border-b border-gray-400 p-2 rounded";
  const buttonClasses = "bg-[#0e1630] text-white px-4 py-2 rounded hover:bg-[#F4C430] hover:text-[#0e1630] focus:outline-none focus:ring-2 focus:ring-blue-400";
  const errorTextClasses = "text-red-500 text-sm";
  const sectionTitleClasses = "text-lg font-semibold mb-2";
  const containerClasses = "p-6 flex flex-col lg:flex-row gap-8 w-full mx-auto";
  const cardContainerClasses = "bg-white rounded-xl shadow p-4 ";
  const summaryTextClasses = "space-y-1 text-sm";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      setForm({ ...form, [name]: cleaned });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.length > 20) {
      newErrors.fullName = "Full name must be 20 characters or less";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // if (!form.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    // ) {
    //   newErrors.email = "Enter a valid email address";
    // }

    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";

    if (
      form.location === "Home Collection" &&
      test.type !== "Scan" &&
      !form.address.trim()
    ) {
      newErrors.address = "Address is required for home collection";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return false;

    try {
      setLoading(true);
      const appointmentPayload = {
        testTitle: test.title,
        labName: lab.name,
        labLocation: lab.location,
        testPrice: lab.price,
        originalPrice: lab.originalPrice,
        ...form,
      };

      await axios.post(
        "https://680b3642d5075a76d98a3658.mockapi.io/Lab/appointments",
        appointmentPayload
      );

      return true;
    } catch (error) {
      console.error(error);
      alert("Booking failed!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    const success = await handleSubmit();
    if (success) {
      navigate("/dashboard/payment1", {
        state: {
          name: form.fullName,
          email: form.email,
          date: form.date,
          time: form.time,
          location:
            form.location === "Home Collection" && test.type !== "Scan"
              ? form.address
              : lab.location,
          amount: lab.price,
          testTitle: test.title,
          labName: lab.name,
          labLocation: lab.location,
        },
      });
    }
  };

  return (
    <div className={containerClasses}>
      {/* Left - Booking Form */}
      <div className="flex-1 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0e1630] mb-2 text-sm "
        >
          ← Back to Lab Details
        </button>

        <h2 className="text-xl font-bold">Book Appointment</h2>

        {/* Location Options */}
        <div className="flex gap-4">
          <button
            disabled={test.type === "Scan"}
            className={`p-2 rounded shadow ${
              form.location === "Home Collection"
                ? "bg-blue-50 "
                : "border-gray-300"
            }`}
            onClick={() =>
              test.type !== "Scan" &&
              setForm({ ...form, location: "Home Collection" })
            }
          >
            Home Collection
          </button>
          <button
            className={`p-2 rounded shadow ${
              form.location === "Visit Lab"
                ? "bg-blue-50 "
                : "border-gray-300"
            }`}
            onClick={() => setForm({ ...form, location: "Visit Lab" })}
          >
            Visit Lab
          </button>
        </div>

        {form.location === "Home Collection" && test.type !== "Scan" && (
          <div>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.address && (
              <p className={errorTextClasses}>{errors.address}</p>
            )}
          </div>
        )}

        {/* Date & Time */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.date && (
              <p className={errorTextClasses}>{errors.date}</p>
            )}
          </div>
          <div className="w-1/2">
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.time && (
              <p className={errorTextClasses}>{errors.time}</p>
            )}
          </div>
        </div>

        {/* Full Name */}
        <input
          name="fullName"
          placeholder="Full Name "
          maxLength={20}
          value={form.fullName}
          onChange={handleChange}
          className={inputClasses}
        />
        {errors.fullName && (
          <p className={errorTextClasses}>{errors.fullName}</p>
        )}

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number"
          maxLength={10}
          value={form.phone}
          onChange={handleChange}
          className={inputClasses}
        />
        {errors.phone && (
          <p className={errorTextClasses}>{errors.phone}</p>
        )}

        {/* Email */}
        {/* <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className={inputClasses}
        />
        {errors.email && (
          <p className={errorTextClasses}>{errors.email}</p>
        )} */}

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={loading}
          className={buttonClasses}
        >
          {loading ? "Booking..." : "Proceed to Payment"}
        </button>
      </div>

      {/* Right - Summary Card */}
      <div className="mt-8 w-full lg:w-1/3">
        <div className={cardContainerClasses}>
          <h3 className={sectionTitleClasses}>Appointment Summary</h3>
          <div className={summaryTextClasses}>
            <p>
              <strong>Test:</strong> {test.title}
            </p>
            <p>
              <strong>Lab:</strong> {lab.name}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {form.location === "Home Collection" && test.type !== "Scan"
                ? form.address || "Home address not entered"
                : lab.location}
            </p>

            <hr className="my-2" />
            <p>
              <strong>Test Price:</strong> ₹{lab.price}
            </p>
            <p>
              <strong>Home Collection Fee:</strong>{" "}
              ₹{form.location === "Home Collection" && test.type !== "Scan" ? "0" : "0"}
            </p>
            <p className="font-bold text-base mt-2">
              Total:{" "}
              <span className="text-[#0e1630] font-semibold">
                ₹{lab.price}
              </span>
            </p>
          </div>
          <div className="mt-4 bg-blue-50 text-[#0e1630]p-2 rounded text-sm">
            Your report will be ready within 24-48 hours after sample
            collection. You’ll receive an email notification once it’s ready.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookApp;
