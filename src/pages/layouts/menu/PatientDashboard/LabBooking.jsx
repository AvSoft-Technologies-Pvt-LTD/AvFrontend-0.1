import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const LabBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lab, test } = location.state || {};

  // Shared styles
  const iconColor = "text-[#0e1630]";
  const cardBox = "bg-white p-6 rounded shadow-lg space-y-4";
  const label = "font-semibold text-lg";
  const textMuted = "text-sm text-gray-600";

  if (!lab || !test) {
    return <div className="p-4">Error: No lab or test selected. Please go back and try again.</div>;
  }

  const handleClick = () => {
    navigate(`/dashboard/book-app/${test.id}`, {
      state: { lab, test },
    });
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className={`${iconColor}`}>
        ← Back to Labs List
      </button>

      {/* Lab Info */}
      <div className={cardBox}>
        <h2 className="text-2xl font-bold text-gray-800">{lab.name}</h2>
        <p className={textMuted}>
          <FaMapMarkerAlt className={`${iconColor} inline mr-1`} /> {lab.location}
        </p>
        <p className={textMuted}>
          <FaClock className={`${iconColor} inline mr-1`} /> {lab.timings}
        </p>
        <p className="text-green-600 font-semibold">
          <FaStar className="inline text-[#F4C430] mr-1" /> {lab.rating}/5
        </p>

        <hr className="my-4" />
        <h3 className={label}>Facilities & Services</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {lab.nabl && (
            <li className="flex items-center gap-2">
              <FaCheck className={iconColor} /> NABL Accredited
            </li>
          )}
          {lab.digitalReports && (
            <li className="flex items-center gap-2">
              <FaCheck className={iconColor} /> Digital Reports
            </li>
          )}
          {lab.homeCollection && (
            <li className="flex items-center gap-2">
              <FaCheck className={iconColor} /> Home Collection Available
            </li>
          )}
          {lab.expertPathologists && (
            <li className="flex items-center gap-2">
              <FaCheck className={iconColor} /> Expert Pathologists
            </li>
          )}
        </ul>
      </div>

      {/* Test Details */}
      <div className={cardBox}>
        <h3 className={label}>Test Details</h3>

        <p className="font-medium text-lg text-gray-800">{test.title}</p>

        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
          {test.category}
        </span>

        {test.code && (
          <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded inline-block">
            Code: {test.code}
          </span>
        )}

        <p className="text-sm text-gray-500">Report Time: {lab.reportTime}</p>
        <p className="text-sm text-gray-500">
          {test.fasting ? `${test.fasting} hours fasting required` : "No fasting required"}
        </p>

        <div className="text-right">
          <p className="text-green-700 font-bold text-xl">₹{lab.price}</p>
          {lab.originalPrice && (
            <>
              <p className="line-through text-gray-400">₹{lab.originalPrice}</p>
              <p className="text-green-600 text-sm">
                Save ₹{lab.originalPrice - lab.price}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-blue-50 p-6 rounded shadow-lg space-y-4">
        <h3 className={`${label} mb-4`}>Book Your Appointment</h3>
        <p className="text-sm mb-4">
          Choose between home sample collection or visiting the lab for your{" "}
          <b>{test.title}</b>.
        </p>

        {/* Book Button */}
        <button
          onClick={handleClick}
          className="bg-[#0e1630] text-white px-6 py-3 rounded hover:bg-[#F4C430] hover:text-[#0e1630] w-full sm:w-auto"
        >
          Book Appointment
        </button>

        {/* Lab Info Recap */}
        <div className="mt-4 p-4 bg-white rounded shadow-lg text-gray-800">
          <h4 className={label}>Lab Information:</h4>
          <p><strong>Lab Name:</strong> {lab.name}</p>
          <p><strong>Location:</strong> {lab.location}</p>
        </div>
      </div>
    </div>
  );
};

export default LabBooking;
